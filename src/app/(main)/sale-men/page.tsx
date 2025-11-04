"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UploadCloud } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const page = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const preSignMutation = useMutation({
    mutationFn: async (data: { fileName: string; ext: string }) => {
      const res = await axios.post("api/get-presign-url", { data });
      return res.data;
    },
    onSuccess: async (data) => {
      console.log(data);
      const res = await axios.put(data?.signUrl, data?.fileName);
    },
    onError: () => {
      console.log("get error");
    },
  });

  const handleBoxClick = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.click();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const mime = selectedFile.type || "jpg";
    const ext =
      mime.split("/")[1] || selectedFile.name.split(".").pop() || "bin";

    const fileName = selectedFile.name.split(".")[0];

    console.log(ext, fileName);

    preSignMutation.mutate({ fileName, ext });
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);
  };

  const onSubmit = async () => {
    if (!file || !name) console.error("File is need");
  };

  return (
    <>
      <div className=" flex flex-col justify-center items-start gap-5">
        <div
          onClick={handleBoxClick}
          className=" w-30 h-30 border rounded-md border-dashed flex justify-center items-center"
        >
          <UploadCloud />
        </div>
        <Input
          onChange={handleUpload}
          ref={fileRef}
          className="hidden"
          type="file"
        />
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="name"
        />
        <Button className=" " onClick={() => {}}>
          Submit
        </Button>
      </div>

      <div>
        {file && (
          <>
            <img
              className=" mt-6 "
              src={preview || "/"}
              alt="image"
              width={130}
              height={130}
            />
          </>
        )}
      </div>
    </>
  );
};

export default page;
