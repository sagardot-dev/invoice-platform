import { Description } from "@radix-ui/react-dialog";
import { success } from "zod";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const {
    name,
    email,
    image,
    address,
    phoneNumber,
    taxId,
    websiteUrl,
    whatsappNumber,
  } = await req.json();

  if (!name || !email || !address) {
    return Response.json(
      {
        success: false,
        title: "All feild are required",
        description: "Please fill the all feilds",
      },
      { status: 400 }
    );
  }

  try {
    const data = await prisma.company.create({
      data: {
        name,
        email,
        image,
        address,
        phoneNumber,
        taxId,
        websiteUrl,
        whatsappNumber,
      },
    });
    if (!data) {
      return Response.json(
        {
          success: false,
          title: "Something went wrong",
          description: "Error while creating company data",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        title: "Successfully created",
        description: "Congres you complete create company data",
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        title: error?.message || "Something went wrong",
        description: "Server Error while creating company data",
      },
      { status: 500 }
    );
  }
}
