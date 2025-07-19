import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/authOptions';
import { prismaDB } from "@/lib/prismaDB";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { email } = session.user;

  try {
    const cart = await prismaDB.cart.findUnique({
      where: { userEmail: email },
    });

    if (cart) {
      const totalProducts = (cart.productIds || []).reduce(
        (total, product) => total + product.quantity,
        0
      );
      return NextResponse.json({ totalProducts, cart });
    } else {
      return NextResponse.json({ totalProducts: 0, cart: null });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong", error: e.message },
      { status: 500 }
    );
  }
}
