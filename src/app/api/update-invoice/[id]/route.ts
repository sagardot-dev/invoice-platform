// app/api/update-invoice/[id]/route.ts
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createResponse } from "@/lib/server/api-res";
import { HttpStatus, ResponseTitle } from "@/lib/server/response-api-help";
import { invoiceSchema } from "@/schema";
import { headers } from "next/headers";

async function upsertGarment(
  tx: any,
  model: "jacket" | "pant" | "shirt",
  data: any,
  existingId: string | null,
  requiredFields: string[]
) {
  const hasData =
    data &&
    Object.keys(data).length > 0 &&
    requiredFields.some((field) => data[field]);

  if (!hasData) {
    if (existingId) {
      await tx[model].delete({ where: { id: existingId } });
    }
    return null;
  }

  if (existingId) {
    return tx[model].update({
      where: { id: existingId },
      data: data,
    });
  } else {
    return tx[model].create({
      data: data,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id } = await params;

  if (!id) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.NOT_FOUND,
        "Missing Id",
        "Id is required to access this route"
      ),
      {
        status: HttpStatus.NOT_FOUND,
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

  const data = parsed.data;

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // 1. Check if invoice exists and belongs to user (with minimal data)
        const existingInvoice = await tx.invoice.findFirst({
          where: {
            id: id,
            userId: session.user.id,
          },
          select: {
            id: true,
            customerId: true,
            jacketId: true,
            pantId: true,
            shirtId: true,
          },
        });

        if (!existingInvoice) {
          throw new Error("Invoice not found or you don't have permission");
        }

        // 2. Handle Customer - Upsert by email
        const customerRecord = await tx.customer.upsert({
          where: { email: data.customer.email },
          update: {
            name: data.customer.name,
            phoneNumber: data.customer.phoneNumber,
            address: data.customer.address || null,
            gender: data.customer.gender,
            height: data.customer.height || null,
            weight: data.customer.weight || null,
            stayDays: data.customer.stayDays || null,
          },
          create: {
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

        // 3. Handle all garments in PARALLEL (HUGE performance boost!)
        const [jacketRecord, pantRecord, shirtRecord] = await Promise.all([
          upsertGarment(tx, "jacket", data.jacket, existingInvoice.jacketId, [
            "quantity",
            "tailorName",
            "jacketType",
          ]),
          upsertGarment(tx, "pant", data.pant, existingInvoice.pantId, [
            "quantity",
            "tailorName",
            "pantType",
          ]),
          upsertGarment(tx, "shirt", data.shirt, existingInvoice.shirtId, [
            "quantity",
            "tailorName",
            "shirtType",
          ]),
        ]);

        // 4. Update Invoice
        const updatedInvoice = await tx.invoice.update({
          where: { id: id },
          data: {
            invoiceNumber: data.invoiceNumber,
            date: data.date,
            customerStatus: data.customerStatus,
            paymentMethod: data.paymentMethod,
            totalAmount: data.totalAmount || null,
            notes: data.notes || null,
            reselling: data.reselling ?? false,
            isReadymade: data.isReadymade ?? false,
            customerSignature: data.customerSignature || null,
            customerId: customerRecord.id,
            jacketId: jacketRecord?.id || null,
            pantId: pantRecord?.id || null,
            shirtId: shirtRecord?.id || null,
            saleMen: {
              set: data.saleManIds?.length
                ? data.saleManIds.map((id: string) => ({ id }))
                : [],
            },
            helpers: {
              set: data.helperIds?.length
                ? data.helperIds.map((id: string) => ({ id }))
                : [],
            },
          },
          include: {
            customer: true,
            jacket: true,
            pant: true,
            shirt: true,
            saleMen: true,
            helpers: true,
          },
        });

        return updatedInvoice;
      },
      {
        maxWait: 10000, // 10 seconds to start
        timeout: 30000, // 30 seconds to complete
      }
    );

    return Response.json(
      createResponse(
        true,
        ResponseTitle.SUCCESS,
        "Invoice updated successfully",
        "Successfully updated invoice",
        result
      ),
      {
        status: HttpStatus.OK,
      }
    );
  } catch (error: any) {
    console.error("Invoice update error:", {
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      invoiceId: id,
    });

    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        error?.message || "Server error",
        "Server error while updating invoice"
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
