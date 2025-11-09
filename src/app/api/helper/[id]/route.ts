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
        "helper id is required",
        "helper id is missing || wrong URL"
      ),
      {
        status: HttpStatus.NOT_FOUND,
      }
    );
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.UNAUTHORIZED,
        "You are not authoried",
        "Please login to get teh full access"
      ),
      {
        status: HttpStatus.UNAUTHORIZED,
      }
    );
  }
  try {
    const helper = await prisma.helper.findUnique({
      where: {
        id,
      },
    });
    if (!helper) {
      return Response.json(
        createResponse(
          false,
          ResponseTitle.DATABASE_ERROR,
          "Some went wrong!",
          "Some thing went wrong from database, try again later"
        ),
        {
          status: HttpStatus.BAD_REQUEST,
        }
      );
    }

    return Response.json(
      createResponse(
        true,
        ResponseTitle.CREATED,
        "Sale man created",
        "helper created succefully",
        helper
      ),
      {
        status: HttpStatus.CREATED,
      }
    );
  } catch (error: any) {
    return Response.json(
      createResponse(
        false,
        ResponseTitle.SERVICE_UNAVAILABLE,
        error?.message || "Server error",
        "Server error while creating helper"
      ),
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
