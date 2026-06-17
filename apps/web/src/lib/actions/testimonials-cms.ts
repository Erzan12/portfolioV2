"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { sendModerationEmail } from "../mail/internal-mailer/mailer";

/**
 * GUEST: Submit a new testimonial
 */
export async function submitTestimonial(data: { 
  name: string; 
  role?: string; 
  content: string; 
  userId: string;
  invitation_id: string
}) {
  const testimonial = await prisma.testimonials.create({
    data: {
      name: data.name,
      role: data.role,
      content: data.content,
      userId: data.userId,
      is_approved: false,
      is_published: false,
      is_active: true,
      invitation_id: data.invitation_id
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/my-testimonials");
  return testimonial;
}

export async function moderateTestimonial(
  testimonialId: string,
  data: { approve: boolean; feedback?: string; },
  adminId: string,
) {
  return prisma.$transaction(async (tx) => {
    const testimonial = await tx.testimonials.findUnique({
      where: { id: testimonialId },
      // select: {
      //   id: true,
      //   invitation_id: true,
      //   user: true
      // },
      include: {
        user: true,
      }
    });

    if (!testimonial) {
      throw new Error("Testimonial not found");
    }

    const testimonialStatus = data.approve
      ? "APPROVED"
      : "REJECTED";

    const testimonialInvitationStatus = data.approve 
      ? "ACCEPTED"
      : "DECLINED";

    const session = await getServerSession(authOptions);

    if (session?.user?.role !== "ADMINISTRATOR") {
      throw new Error("Unauthorized");
    }

    // Update the Testimonial & include the user email to send the notification
    await tx.testimonials.update({
      where: { id: testimonialId },
      data: {
        is_approved: data.approve,
        is_published: data.approve,
        is_active: data.approve,     // optional rule
        status: data.approve ? "APPROVED" : "REJECTED",
        feedback: data.feedback
          ? {
              create: {
                my_feedback: data.feedback,
                admin: {
                  connect: {
                    id: adminId, // <- you must pass this
                  },
                },
              },
            }
          : undefined,
      },
      include: {
        user: true, // Assuming relation is named 'user'
      }
    });
    
    // Update invitation status
    if (testimonial.invitation_id) {
      await tx.testimonialInvitation.update({
        where: {
          id: testimonial.invitation_id,
        },
        data: {
          status: testimonialInvitationStatus ? "ACCEPTED" : "DECLINED",
          accepted_at: data.approve ? new Date() : null,
        },
      });
    }

    // Handle Feedback
    if (data.feedback?.trim) {
      await tx.testimonialFeedback.upsert({
        where: { testimonial_id: testimonialId },
        update: {
          my_feedback: data.feedback,
          adminId: session.user.id,
        },
        create: {
          testimonial_id: testimonialId,
          my_feedback: data.feedback,
          adminId: session.user.id,
        },
      });
    }

    // TRIGGER EMAIL (The "Confirm & Email" part)
    // We only send if we have a user email
    const userEmail = testimonial.user?.email;
    if (userEmail) {
      await sendModerationEmail({
        to: userEmail,
        name: testimonial.name,
        approved: data.approve,
        feedback: data.feedback
      });
    }

    revalidatePath("/admin/my-testimonials");
    revalidatePath("/");
    return testimonial;
  })
}