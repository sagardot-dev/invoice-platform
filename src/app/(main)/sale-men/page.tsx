"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import InvoiceList from "@/components/global/test.invoice";

const Page = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");

  const preSignMutation = useMutation({
    mutationFn: async (data: { fileName: string; ext: string }) => {
      const res = await axios.post("/api/get-presign-url", data);
      return res.data;
    },
    onSuccess: async (data) => {
      if (!file) return;
      const res = await axios.put(data.signUrl, file, {
        headers: { "Content-Type": file.type },
      });
      console.log("✅ Uploaded:", data);
      setFileName(data.fileName);
    },
    onError: () => console.log("❌ Error getting presigned URL"),
  });

  const handleBoxClick = () => {
    fileRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const mime = selectedFile.type || "application/octet-stream";
    const ext =
      mime.split("/")[1] || selectedFile.name.split(".").pop() || "bin";
    const fileName = selectedFile.name.split(".")[0];
    preSignMutation.mutate({ fileName, ext });

    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const createInvoiceMutation = useMutation({
    mutationFn: async (data: { name: string; fileName: string }) => {
      const res = await axios.post("api/create-invoice", data);
      return res;
    },
    onSuccess: (data) => {
      toast.success("create invoice");
    },
    onError: () => {
      toast.error("invoice creation error");
    },
  });

  const onSumbit = (name: string, fileName: string) => {
    createInvoiceMutation.mutate({ name, fileName });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start gap-5">
        <div
          onClick={handleBoxClick}
          className="w-30 h-30 border rounded-md border-dashed flex justify-center items-center"
        >
          <UploadCloud />
        </div>
        <Input
          disabled={createInvoiceMutation.isPending}
          onChange={handleUpload}
          ref={fileRef}
          className="hidden"
          type="file"
        />
        <Input
          disabled={createInvoiceMutation.isPending}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
        />
        <Button
          disabled={createInvoiceMutation.isPending}
          onClick={() => onSumbit(name, fileName)}
        >
          Submit
        </Button>
      </div>

      {preview && (
        <img
          className="mt-6"
          src={preview}
          alt="preview"
          width={130}
          height={130}
        />
      )}
      <div className=" mt-10 ">
        <InvoiceList/>
      </div>
    </>
  );
};

export default Page;
