import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/const";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createResponse } from "@/lib/server/api-res";
import { HttpStatus, ResponseTitle } from "@/lib/server/response-api-help";
import { headers } from "next/headers";

export async function GET(req: Request) {
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

  const body = await req.json();
  const {
    defaultPage = DEFAULT_PAGE,
    defaultPageSize = DEFAULT_PAGE_SIZE,
    serach,
  } = body;

  const skip = (defaultPage - 1) * defaultPageSize;

  try {
    const whereClause: any = {
      userId: session.user.id,
    };

    if (serach && serach.trim() !== "") {
      whereClause.OR = [
        { invoiceNumber: { contains: serach, mode: "insensitive" } },
        { customer: { name: { contains: serach, mode: "insensitive" } } },
        { customer: { email: { contains: serach, mode: "insensitive" } } },
        {
          customer: { phoneNumber: { contains: serach, mode: "insensitive" } },
        },
        { notes: { contains: serach, mode: "insensitive" } },
      ];
    }

    const totalCount = await prisma.invoice.count({
      where: whereClause,
    });

    const invoices = await prisma.invoice.findMany({
      where: whereClause,
      select: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        saleMen: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: defaultPage,
      skip: skip,
    });
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
