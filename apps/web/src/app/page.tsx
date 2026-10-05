import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { prisma } from "@/lib/prisma/prisma";
import { projects } from "@/data/projects";
import Hero from "@/components/core/hero";
import Testimonials from "@/components/core/testimonies/testimony";
import TestimonialForm from "@/components/core/testimonies/testimonies-cms/testimony-form";
import GuestLoginButton from "@/components/login/guest-login";
import NowBoard from "@/components/now-board";
import FeaturedProjects from "@/components/featured-projects";
import { Panel } from "@/components/brut/panel";

// Not rebuilt yet (still in git, restore when we port them):
// Skills, CaseStudy, HowIThink, ProjectsCarousel

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const session = await getServerSession(authOptions);

  // Only approved and active testimonials
  const approvedTestimonials = await prisma.testimonials.findMany({
    where: { is_approved: true, is_active: true },
    include: { user: true },
    orderBy: { created_at: "desc" },
  });

  const invitation = token
    ? await prisma.testimonialInvitation.findUnique({ where: { token } })
    : null;

  const validToken =
    invitation && invitation.status === "PENDING" && new Date() < invitation.expires_at
      ? token
      : undefined;

  return (
    <main className="overflow-x-hidden">
      <Hero token={validToken} />
      <NowBoard />
      <FeaturedProjects projects={projects.filter((p) => p.featured).slice(0, 6)} />

      <section id="testimonials" className="scroll-mt-24">
        <Suspense fallback={null}>
          <Testimonials items={approvedTestimonials} token={token} />
        </Suspense>
      </section>

      <section id="leave-note" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-16 md:px-8">
        <Panel label="leave-a-note ~">
          <h2 className="text-3xl">Leave a note</h2>
          <p className="mt-2 mb-6 text-lg">Worked with me or on one of my projects? I&apos;d like to hear how it went.</p>
          {validToken ? (
            session?.user ? (
              <TestimonialForm
                userId={session.user.id}
                invitationToken={validToken}
                invitation_id={invitation!.id}
                isInvited
              />
            ) : (
              <div className="border-[3px] border-dashed border-ink p-6">
                <p className="text-lg font-semibold">You were invited to leave a testimonial.</p>
                <p className="mb-4 mt-1">Sign in first so I can verify it's you.</p>
                <GuestLoginButton />
              </div>
            )
          ) : (
            <div className="border-[3px] border-dashed border-ink p-6">
              <p className="text-lg font-semibold">Testimonials are invite-only.</p>
              <p className="mt-1">Contact me if you&apos;d like to leave feedback.</p>
            </div>
          )}
        </Panel>
      </section>
    </main>
  );
}