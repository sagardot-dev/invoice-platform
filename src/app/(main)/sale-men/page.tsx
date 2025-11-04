"use client";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const page = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({});
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | null>(null);

  const handleBoxClick = () => {
    if (fileRef.current) {
      fileRef.current.value = "";
      fileRef.current.click();
    }
  };

  const handleUplaod = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(imageUrl);
    }
  };

  return (
    <div>
      <div
        onClick={handleBoxClick}
        className=" w-30 h-30 border rounded-md border-dashed flex justify-center items-center"
      >
        <UploadCloud />
      </div>
      <Input
        onChange={handleUplaod}
        ref={fileRef}
        className="hidden"
        type="file"
      />
      <div>
        {file && (
          <>
            <img className=" mt-6 " src={file} alt="image" width={130} height={130} />
          </>
        )}
      </div>
    </div>
  );
};

export default page;
