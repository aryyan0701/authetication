import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Email is already existed",
        },
        { status: 400 }  
      );
    } else {
      const hasedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        username,
        email,
        password: hasedPassword,
      });

      await newUser.save();

      return Response.json(
        {
          success: true,
          message: "User registered successfully",
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
