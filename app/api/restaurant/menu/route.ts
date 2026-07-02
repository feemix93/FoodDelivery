import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ menuItems });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl } = body;

    if (!name || typeof name !== "string" || !price) {
      return NextResponse.json(
        { error: "Name and price are required." },
        { status: 400 },
      );
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json(
        { error: "Please provide a valid price." },
        { status: 400 },
      );
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        price: parsedPrice,
        imageUrl: imageUrl?.trim() || null,
      },
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 },
    );
  }
}
