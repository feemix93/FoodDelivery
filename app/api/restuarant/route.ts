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
