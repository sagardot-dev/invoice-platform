import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createResponse } from "@/lib/server/api-res";
import { HttpStatus, ResponseTitle } from "@/lib/server/response-api-help";
import { headers } from "next/headers";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.NOT_FOUND,
        "Missing Id",
        "Id id required to access this route"
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

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id },
      select: {
        id: true,
        invoiceNumber: true,
        date: true,
        customerStatus: true,
        paymentMethod: true,
        totalAmount: true,
        notes: true,
        reselling: true,
        isReadymade: true,
        customerSignature: true,
        customer: true,

        saleMen: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
          },
        },

        helpers: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        jacket: true,
        pant: true,
        shirt: true,
      },
    });
    if (!invoice) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.NOT_FOUND,
          "Something went wrong",
          "No invoice data with this id"
        ),
        {
          status: HttpStatus.NOT_FOUND,
        }
      );
    }
    return Response.json(
      createResponse(
        true,
        ResponseTitle.SUCCESS,
        "Invoices fetched successfully",
        "Fetched full invoice data",
        { invoice }
      ),
      { status: HttpStatus.OK }
    );
  } catch (error: any) {
    if (!session?.user) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.INTERNAL_SERVER_ERROR,
          error?.message || "server error",
          "You are not authorized to access this"
        ),
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        }
      );
    }
  }
}
