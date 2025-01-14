import connectDb from "@/mongoDb/connectDb";
import Cart from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption";

export async function POST(req) {
  const session = await getServerSession(AuthOptions);
  const { email } = session.user;
  const data = await req.json();
  const { productId } = data; // Product ID to be updated or deleted
  
  await connectDb();

  try {
    // Find the cart by user's email
    const cart = await Cart.findOne({ email });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const productIndex = cart.productIds.findIndex(
      (product) => product.productId === productId
    );

    if (productIndex === -1) {
      return NextResponse.json({ message: "Product not found in cart" },{status:(404)});
    }

    const product = cart.productIds[productIndex];

    if (product.quantity > 1) {
      // If quantity > 1, reduce the quantity by 1
      cart.productIds[productIndex].quantity -= 1;
      await cart.save();
      return NextResponse.json({ cart });
    } else {
      // If quantity is 1, remove the product completely
      cart.productIds.splice(productIndex, 1);
      await cart.save();
      return NextResponse.json({ cart });
    }

  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong" });
  }
}




