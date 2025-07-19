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
  const { productId } = data;

  try {
    const cart = await prismaDB.cart.findUnique({
      where: { userEmail: email },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const productIds = cart.productIds || [];
    const productIndex = productIds.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex === -1) {
      return NextResponse.json(
        { message: "Product not found in cart" },
        { status: 404 }
      );
    }

    productIds.splice(productIndex, 1);

    const updatedCart = await prismaDB.cart.update({
      where: { userEmail: email },
      data: { productIds },
    });

    return NextResponse.json({ cart: updatedCart });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong", error: e.message },
      { status: 500 }
    );
  }
}
