import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createResponse } from "@/lib/server/api-res";
import { HttpStatus, ResponseTitle } from "@/lib/server/response-api-help";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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

  const searchParams = req.nextUrl.searchParams;
  const defaultPage = parseInt(
    searchParams.get("page") || searchParams.get("defaultPage") || "1"
  );
  const defaultPageSize = parseInt(
    searchParams.get("pageSize") || searchParams.get("defaultPageSize") || "10"
  );
  const search = searchParams.get("search") || "";

  const skip = (defaultPage - 1) * defaultPageSize;

  try {
    const whereClause: any = {
      userId: session.user.id,
    };

    if (search && search.trim() !== "") {
      whereClause.OR = [
        { invoiceNumber: { contains: search, mode: "insensitive" } },
        { customer: { name: { contains: search, mode: "insensitive" } } },
        { customer: { email: { contains: search, mode: "insensitive" } } },
        {
          customer: { phoneNumber: { contains: search, mode: "insensitive" } },
        },
        { notes: { contains: search, mode: "insensitive" } },
      ];
    }

    const [totalCount, invoices] = await Promise.all([
      prisma.invoice.count({
        where: whereClause,
      }),
      prisma.invoice.findMany({
        where: whereClause,
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
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          saleMen: {
            select: {
              id: true,
              name: true,
              email: true,
              status: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: defaultPageSize,
        skip: skip,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / defaultPageSize);
    return Response.json(
      createResponse(
        true,
        ResponseTitle.SUCCESS,
        "Invoices fetched successfully",
        "Get teh invoice data",
        {
          invoices,
          pagination: {
            currentPage: defaultPage,
            pageSize: defaultPageSize,
            totalCount,
            totalPages,
            hasNextPage: defaultPage < totalPages,
            hasPreviousPage: defaultPage > 1,
          },
        }
      ),
      {
        status: HttpStatus.OK,
      }
    );
  } catch (error: any) {
    console.error("Fetch invoices error:", error);
    return Response.json(
      createResponse(
        false,
        ResponseTitle.INTERNAL_SERVER_ERROR,
        error?.message || "Server error",
        "Failed to fetch invoices"
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
