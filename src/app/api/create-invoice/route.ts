import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createResponse } from "@/lib/server/api-res";
import { HttpStatus, ResponseTitle } from "@/lib/server/response-api-help";
import { invoiceSchema } from "@/schema";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const json = await req.json();
  const body = json.data;

  const parsed = invoiceSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.BAD_REQUEST,
        "Invalid input",
        JSON.stringify(parsed.error.format())
      ),
      {
        status: HttpStatus.BAD_REQUEST,
      }
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.UNAUTHORIZED,
        "Please login to access",
        "You are not authorized to access this"
      ),
      {
        status: HttpStatus.UNAUTHORIZED,
      }
    );
  }

  // ✅ Use validated data
  const data = parsed.data;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Check if customer already exists
      let customerRecord = await tx.customer.findUnique({
        where: { email: data.customer.email }, // ✅ Use data
      });

      // If customer doesn't exist, create new one
      if (!customerRecord) {
        customerRecord = await tx.customer.create({
          data: {
            name: data.customer.name,
            email: data.customer.email,
            phoneNumber: data.customer.phoneNumber,
            address: data.customer.address || null,
            gender: data.customer.gender,
            height: data.customer.height || null,
            weight: data.customer.weight || null,
            stayDays: data.customer.stayDays || null,
            userId: session.user.id,
          },
        });
      }

      // Create jacket if it has meaningful data
      let jacketRecord = null;
      if (
        data.jacket &&
        Object.keys(data.jacket).length > 0 &&
        (data.jacket.quantity ||
          data.jacket.tailorName ||
          data.jacket.jacketType)
      ) {
      
        jacketRecord = await tx.jacket.create({
          data: data.jacket,
        });
      }

      // Create pant if it has meaningful data
      let pantRecord = null;
      if (
        data.pant &&
        Object.keys(data.pant).length > 0 &&
        (data.pant.quantity || data.pant.tailorName || data.pant.pantType)
      ) {
        pantRecord = await tx.pant.create({
          data: data.pant, 
        });
      }

      // Create shirt if it has meaningful data
      let shirtRecord = null;
      if (
        data.shirt &&
        Object.keys(data.shirt).length > 0 &&
        (data.shirt.quantity || data.shirt.tailorName || data.shirt.shirtType)
      ) {
        shirtRecord = await tx.shirt.create({
          data: data.shirt,
        });
      }

      // Create invoice
      const invoice = await tx.invoice.create({
        data: {
          invoiceNumber: data.invoiceNumber,
          date: data.date,
          customerStatus: data.customerStatus,
          paymentMethod: data.paymentMethod,
          totalAmount: data.totalAmount || null,
          notes: data.notes || null,
          reselling: data.reselling,
          isReadymade: data.isReadymade,
          customerSignature: data.customerSignature || null,
          userId: session.user.id,
          customerId: customerRecord.id,
          jacketId: jacketRecord?.id || null,
          pantId: pantRecord?.id || null,
          shirtId: shirtRecord?.id || null,
          saleMen: data.saleManIds?.length
            ? { connect: data.saleManIds.map((id: string) => ({ id })) }
            : undefined,
          helpers: data.helperIds?.length
            ? { connect: data.helperIds.map((id: string) => ({ id })) }
            : undefined,
        },
      });

      return invoice;
    });

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "Invoice created successfully",
        result.invoiceNumber
      ),
      {
        status: HttpStatus.CREATED,
      }
    );
  } catch (error: any) {
    console.error("Invoice creation error:", error);
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        error?.message || "Server error",
        "Server error while creating invoice"
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
