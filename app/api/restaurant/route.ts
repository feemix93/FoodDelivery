import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany();
    return NextResponse.json({ restaurants });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, city, rating, reviews, deliveryTime } = body;
    console.log("GGGGGGGGGG", city);

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Restaurant name is required." },
        { status: 400 },
      );
    }

    if (!city || typeof city !== "string" || !city.trim()) {
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    }

    console.log("CREATE_PAYLOAD", {
      name,
      city,
      description,
      rating,
      reviews,
      deliveryTime,
    });
    let restaurant;
    try {
      restaurant = await prisma.restaurant.create({
        data: {
          name: name.trim(),
          description: description?.trim() || null,
          city: city.trim(),
          rating: typeof rating === "number" ? rating : null,
          reviews: typeof reviews === "number" ? reviews : null,
          deliveryTime: deliveryTime?.trim() || null,
        },
      });
    } catch (e) {
      console.error("PRISMA_CREATE_ERROR", e);
      throw e;
    }

    return NextResponse.json(restaurant, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create restaurant" },
      { status: 500 },
    );
  }
}
