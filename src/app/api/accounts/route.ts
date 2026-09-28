import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || !email || password.length < 6) return NextResponse.json({ error: "Fyll i namn, giltig e-post och ett lösenord på minst 6 tecken." }, { status: 400 });
  if (findUserByEmail(email)) return NextResponse.json({ error: "Det finns redan ett konto med den e-posten." }, { status: 409 });

  const user = createUser(name, email, password);
  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
}