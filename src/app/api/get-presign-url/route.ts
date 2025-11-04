import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION!;
const bucket = process.env.AWS_BUCKET!;

const client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECERT_KEY!,
  },
});

export async function GET(req: Request) {
  const { fileName, mime } = await req.json();
  const key = `uploads/${fileName}-${crypto.randomUUID()}.${mime}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  try {
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return Response.json(
      {
        success: true,
        message: "get the url",
        url: url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error?.message || error || "get the url",
      },
      { status: 500 }
    );
  }
}
