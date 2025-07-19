import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/authOptions';
import { prismaDB } from "@/lib/prismaDB";
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { email } = session.user;
  const data = await req.json();
  const { id } = data;

  try {
    let cart = await prismaDB.cart.findUnique({
      where: { userEmail: email },
    });

    if (cart) {
      const productIds = cart.productIds || [];
      const productIndex = productIds.findIndex(
        (item) => item.productId === id
      );

      if (productIndex > -1) {
        productIds[productIndex].quantity += 1;
      } else {
        productIds.push({ productId: id, quantity: 1 });
      }

      cart = await prismaDB.cart.update({
        where: { userEmail: email },
        data: { productIds },
      });
    } else {
      cart = await prismaDB.cart.create({
        data: {
          user: { connect: { email } },
          productIds: [{ productId: id, quantity: 1 }],
        },
      });
    }

    return NextResponse.json({ cart });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong in Cart", error: e.message },
      { status: 500 }
    );
  }
}
