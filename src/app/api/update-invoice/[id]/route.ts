// app/api/update-invoice/[id]/route.ts
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { createResponse } from "@/lib/server/api-res";
import { HttpStatus, ResponseTitle } from "@/lib/server/response-api-help";
import { invoiceSchema } from "@/schema";
import { headers } from "next/headers";

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
    const result = await prisma.$transaction(async (tx) => {
      // 1. Check if invoice exists and belongs to user
      const existingInvoice = await tx.invoice.findFirst({
        where: {
          id: id,
          userId: session.user.id,
        },
        include: {
          jacket: true,
          pant: true,
          shirt: true,
          customer: true,
        },
      });

      if (!existingInvoice) {
        throw new Error("Invoice not found or you don't have permission");
      }

      // 2. Handle Customer
      let customerRecord = await tx.customer.findUnique({
        where: { email: data.customer.email },
      });

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
      } else if (customerRecord.id === existingInvoice.customerId) {
        customerRecord = await tx.customer.update({
          where: { id: customerRecord.id },
          data: {
            name: data.customer.name,
            phoneNumber: data.customer.phoneNumber,
            address: data.customer.address || null,
            gender: data.customer.gender,
            height: data.customer.height || null,
            weight: data.customer.weight || null,
            stayDays: data.customer.stayDays || null,
          },
        });
      }

      // 3. Handle Jacket
      let jacketId = null;
      const hasJacketData =
        data.jacket &&
        Object.keys(data.jacket).length > 0 &&
        (data.jacket.quantity ||
          data.jacket.tailorName ||
          data.jacket.jacketType);

      if (hasJacketData && data.jacket) {
        if (existingInvoice.jacketId) {
          await tx.jacket.update({
            where: { id: existingInvoice.jacketId },
            data: {
              quantity: data.jacket.quantity,
              tailorName: data.jacket.tailorName,
              fittingDate: data.jacket.fittingDate,
              addVest: data.jacket.addVest,
              addMonogram: data.jacket.addMonogram,
              jacketType: data.jacket.jacketType,
              jacketFabricImage: data.jacket.jacketFabricImage,
              jacketStyleDrawing: data.jacket.jacketStyleDrawing,
              jacketCustomStyle: data.jacket.jacketCustomStyle,
              monogramName: data.jacket.monogramName,
              monogramImage: data.jacket.monogramImage,
              liningImage: data.jacket.liningImage,
              ch: data.jacket.ch,
              wa: data.jacket.wa,
              hip: data.jacket.hip,
              nk: data.jacket.nk,
              sh: data.jacket.sh,
              sleeve: data.jacket.sleeve,
              arm: data.jacket.arm,
              fr: data.jacket.fr,
              ba: data.jacket.ba,
              lg: data.jacket.lg,
              vLg: data.jacket.vLg,
              ocLg: data.jacket.ocLg,
              nSho: data.jacket.nSho,
              sqSho: data.jacket.sqSho,
              rdSho: data.jacket.rdSho,
              sloSho: data.jacket.sloSho,
              hBk: data.jacket.hBk,
              curveBk: data.jacket.curveBk,
              shoNk: data.jacket.shoNk,
              bigM: data.jacket.bigM,
              holBk: data.jacket.holBk,
              holCh: data.jacket.holCh,
              brBly: data.jacket.brBly,
              lLo: data.jacket.lLo,
              rLo: data.jacket.rLo,
              erect: data.jacket.erect,
              flatB: data.jacket.flatB,
              note: data.jacket.note,
            },
          });
          jacketId = existingInvoice.jacketId;
        } else {
          const jacket = await tx.jacket.create({
            data: data.jacket,
          });
          jacketId = jacket.id;
        }
      } else if (existingInvoice.jacketId) {
        await tx.jacket.delete({
          where: { id: existingInvoice.jacketId },
        });
        jacketId = null;
      }

      // 4. Handle Pant
      let pantId = null;
      const hasPantData =
        data.pant &&
        Object.keys(data.pant).length > 0 &&
        (data.pant.quantity || data.pant.tailorName || data.pant.pantType);

      if (hasPantData && data.pant) {
        if (existingInvoice.pantId) {
          await tx.pant.update({
            where: { id: existingInvoice.pantId },
            data: {
              quantity: data.pant.quantity,
              tailorName: data.pant.tailorName,
              fittingDate: data.pant.fittingDate,
              addInnerLining: data.pant.addInnerLining,
              pantType: data.pant.pantType,
              pantLength: data.pant.pantLength,
              pantFabricImage: data.pant.pantFabricImage,
              pantStyleDrawing: data.pant.pantStyleDrawing,
              pantCustomStyle: data.pant.pantCustomStyle,
              monogramName: data.pant.monogramName,
              monogramImage: data.pant.monogramImage,
              wa: data.pant.wa,
              hip: data.pant.hip,
              cr: data.pant.cr,
              th: data.pant.th,
              kn: data.pant.kn,
              bo: data.pant.bo,
              lg: data.pant.lg,
              slantingPkt: data.pant.slantingPkt,
              straightPkt: data.pant.straightPkt,
              americanPkt: data.pant.americanPkt,
              backRhtPkt: data.pant.backRhtPkt,
              backLhtPkt: data.pant.backLhtPkt,
              cuffs: data.pant.cuffs,
              wpIn: data.pant.wpIn,
              wpOut: data.pant.wpOut,
              flatB: data.pant.flatB,
              lowFront: data.pant.lowFront,
              underBelly: data.pant.underBelly,
              note: data.pant.note,
            },
          });
          pantId = existingInvoice.pantId;
        } else {
          const pant = await tx.pant.create({
            data: data.pant,
          });
          pantId = pant.id;
        }
      } else if (existingInvoice.pantId) {
        await tx.pant.delete({
          where: { id: existingInvoice.pantId },
        });
        pantId = null;
      }

      // 5. Handle Shirt
      let shirtId = null;
      const hasShirtData =
        data.shirt &&
        Object.keys(data.shirt).length > 0 &&
        (data.shirt.quantity || data.shirt.tailorName || data.shirt.shirtType);

      if (hasShirtData && data.shirt) {
        if (existingInvoice.shirtId) {
          await tx.shirt.update({
            where: { id: existingInvoice.shirtId },
            data: {
              quantity: data.shirt.quantity,
              tailorName: data.shirt.tailorName,
              fittingDate: data.shirt.fittingDate,
              addMonogram: data.shirt.addMonogram,
              addTie: data.shirt.addTie,
              shirtType: data.shirt.shirtType,
              shirtFabricImage: data.shirt.shirtFabricImage,
              shirtStyleDrawing: data.shirt.shirtStyleDrawing,
              shirtCustomStyle: data.shirt.shirtCustomStyle,
              shirtMonogramName: data.shirt.shirtMonogramName,
              shirtMonogramImage: data.shirt.shirtMonogramImage,
              ch: data.shirt.ch,
              wa: data.shirt.wa,
              hip: data.shirt.hip,
              nk: data.shirt.nk,
              sh: data.shirt.sh,
              sleeve: data.shirt.sleeve,
              arm: data.shirt.arm,
              fr: data.shirt.fr,
              ba: data.shirt.ba,
              lg: data.shirt.lg,
              stb: data.shirt.stb,
              stw: data.shirt.stw,
              ah: data.shirt.ah,
              dressLg: data.shirt.dressLg,
              skirtLg: data.shirt.skirtLg,
              nLow: data.shirt.nLow,
              sqSho: data.shirt.sqSho,
              rdSho: data.shirt.rdSho,
              sloSho: data.shirt.sloSho,
              brBly: data.shirt.brBly,
              sloNk: data.shirt.sloNk,
              note: data.shirt.note,
            },
          });
          shirtId = existingInvoice.shirtId;
        } else {
          const shirt = await tx.shirt.create({
            data: data.shirt,
          });
          shirtId = shirt.id;
        }
      } else if (existingInvoice.shirtId) {
        await tx.shirt.delete({
          where: { id: existingInvoice.shirtId },
        });
        shirtId = null;
      }

      // 6. Update Invoice
      const updatedInvoice = await tx.invoice.update({
        where: { id: id },
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
          customerId: customerRecord.id,
          jacketId: jacketId,
          pantId: pantId,
          shirtId: shirtId,
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
    });

    return Response.json(
      createResponse(
        true,
        ResponseTitle.SUCCESS,
        "Invoice updated successfully",
        "successfully updated invoice ",
        result
      ),
      {
        status: HttpStatus.OK,
      }
    );
  } catch (error: any) {
    console.error("Invoice update error:", error);
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
