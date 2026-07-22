import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cities = await prisma.restaurant.findMany({
      where: { city: { not: null } },
      distinct: ["city"],
      select: { city: true },
      orderBy: { city: "asc" },
    });

    return NextResponse.json({
      cities: Array.from(
        new Set(cities.map((item) => item.city).filter(Boolean)),
      ),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant cities" },
      { status: 500 },
    );
  }
}
