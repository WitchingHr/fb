import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/lib/dbConnect";

// sign up new user
export async function POST(request: Request) {
  try {
    // get data from request body
    const body = await request.json();
    const { firstName, lastName, email, password } = body;
    
    // check if data is present
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.redirect("/");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword,
      },
    });

    // if no user, throw error
    if (!user) {
      throw new Error("Error creating user");
    }

    // return user
    return NextResponse.json(user);

  } catch (error: any) {
    // return error
    console.error(error);
  } 
}
