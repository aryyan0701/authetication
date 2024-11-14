import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST (req: Request){
    await dbConnect();

    try {
        const {username, password} = await req.json();

        const user  = await UserModel.findOne({username});


        if (user && await bcrypt.compare(password, user.password)) {
            return Response.json(
                {
                    success: true,
                    message: "User successfully logged in",
                  },
                  { status: 200 } 
            )
        }else{
            return Response.json(
                {
                    success: false,
                    message: "Your credentials are incorrect",
                  },
                  {
                    status: 401 ,
                  }
            )
        }

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Error logging in user",
              },
              {
                status: 500,
              }
        )
    }
}
