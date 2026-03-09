import * as React from 'react'
import { prisma } from "@/lib/prisma";
import { Review } from "@prisma/client"; // Import the type

export default async function Reviews({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; 

  const reviews = await prisma.review.findMany({
    where: { productId: id },
    orderBy: { createdAt: "desc" }
  })

  return (
    <>
      <h1 className='text-xl font-bold mb-8'>Review Page</h1>
      <ul className="space-y-4">
        {reviews.map((r: Review) => (
          <li key={r.id} className="border-b pb-2">
            {r.reviewText}
          </li>
        ))}
      </ul>
      {reviews.length === 0 && <p>No reviews yet.</p>}
    </>
  )
}
