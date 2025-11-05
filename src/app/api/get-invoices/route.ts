import prisma from "@/lib/db";

export async function GET(req:Request) {
    const invoice = await prisma.invoice.findMany();


     return Response.json(
        {
          success: true,
          message: "success fully get all teh products",
          invoice: invoice,
        },
        { status: 200 }
      );
    
}