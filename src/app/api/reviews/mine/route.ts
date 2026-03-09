import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reviews = await prisma.review.findMany({
    where: { userId },
    include: {
      product: true,
      responses: {
        include:{
          admin:true,
        }
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}