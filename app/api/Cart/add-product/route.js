import connectDb from "@/mongoDb/connectDb";
import Cart from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/lib/authOption";

export async function POST(req) {
  const session = await getServerSession(AuthOptions);
  const { email } = session.user;  // Destructuring for readability
  const data = await req.json();
  const { id } = data;  // Assume `id` is the product ID being sent

  await connectDb();

  try {
    let cart = await Cart.findOne({ email });

    if (cart) {
      // Check if the product already exists in the cart
      const productIndex = cart.productIds.findIndex(item => item.productId.toString() === id);

      if (productIndex > -1) {
        // If the product exists, increase its quantity by 1
        cart.productIds[productIndex].quantity += 1;
      } else {
        // If the product does not exist, add it with quantity 1
        cart.productIds.push({ productId: id, quantity: 1 });
      }

      cart.updatedAt = new Date();  // Update the updatedAt field
      await cart.save();
    } else {
      // If the cart does not exist, create a new cart with the product
      cart = await Cart.create({ email, productIds: [{ productId: id, quantity: 1 }] });
    }

    return NextResponse.json({ cart });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Something went wrong in Cart", error: e.message },{status:500});
  }
}
