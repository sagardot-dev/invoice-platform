import { Description } from "@radix-ui/react-dialog";
import { success } from "zod";

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

  if(!name || !email || !address){
    return Response.json({
        success: false,
        title: "All feild are required",
        description : "Please fill the all feilds",
        
    })
  }
}
