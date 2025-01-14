import connectDb from "@/mongoDb/connectDb";
import Cart from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption";

export async function GET() {
  const session = await getServerSession(AuthOptions);
  const { email } = session.user;
  await connectDb();

  try {
    // Find the cart associated with the user's email
    const cart = await Cart.findOne({ email });

    if (cart) {
        
        // Calculate the total number of products in the cart
        const totalProducts = cart.productIds.reduce((total, product) => total + product.quantity, 0);
        
        return NextResponse.json({ totalProducts,cart });
    }else{
        return NextResponse.json({ totalProducts: 0, cart: [] });
    }

  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" },{status:(500)});
  }
}

