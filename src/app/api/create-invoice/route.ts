import prisma from "@/lib/db";

export  async function POST(req: Request) {
  const { name, fileName } = await req.json();

  try {
    const invoice = await prisma.invoice.create({
      data: {
        name,
        fileName,
      },
    });
    if (invoice) {
      return Response.json(
        {
          success: true,
          message: "success fully create invoice",
          invoice: invoice,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error || "server error while creating invoice",
      },
      { status: 500 }
    );
  }
}
