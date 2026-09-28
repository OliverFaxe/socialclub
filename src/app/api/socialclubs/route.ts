import { NextResponse } from "next/server";
import { createSocialClub, userExists } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const ownerId = typeof body?.ownerId === "string" ? body.ownerId : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";

  if (!userExists(ownerId)) return NextResponse.json({ error: "Skapa ett konto innan du skapar en club." }, { status: 401 });
  if (!name || !description) return NextResponse.json({ error: "Fyll i både namn och beskrivning." }, { status: 400 });

  return NextResponse.json({ socialClub: createSocialClub(ownerId, name, description) }, { status: 201 });
}