import { prisma } from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { slug } = await req.json();

  const views = await prisma.post.update({
    where: { slug },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  console.log(views);

  return NextResponse.json({ success: true });
}