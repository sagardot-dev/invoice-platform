"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetSignUrlMutation } from "@/modules/dashboard/server/get-signUrl";
import axios from "axios";
import {
  CameraIcon,
  Eraser,
  Pencil,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { toast } from "sonner";

type DrawingProps = {
  onSave?: (url: string) => void;
};

export const Drawing = ({ onSave }: DrawingProps) => {
  const signUrlMutation = useGetSignUrlMutation();
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handlePenClick = () => {
    setEraseMode(false);
    canvasRef.current?.eraseMode(false);
  };

  const handleEraserClick = () => {
    setEraseMode(true);
    canvasRef.current?.eraseMode(true);
  };

  const handleClearClick = () => {
    canvasRef.current?.clearCanvas();
    setIsSaved(false);
  };

  const handleSaveClick = async () => {
    if (isSaved) {
      toast.info("Already saved!");
      return;
    }
    const paths = await canvasRef.current?.exportPaths();
    if (!paths || paths.length === 0) {
      toast.error("Please draw something before saving!", {
        description: "Please draw suit image and then save",
      });
      return;
    }

    const dataUrl = await canvasRef.current?.exportImage("png");
    if (!dataUrl) return;

    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], `canvas-${Date.now()}.png`, {
      type: "image/png",
    });
    const fileUrl = URL.createObjectURL(file);

    const mime = file.type || "application/octet-stream";
    const ext = "png";
    const fileName = `canvas-${Date.now()}`;

    signUrlMutation.mutate(
      { fileName, ext, type: mime },
      {
        onError: () => toast.error("Failed to get signed URL"),
        onSuccess: async (data) => {
          await axios.put(data.signUrl, file, {
            headers: { "Content-Type": file.type },
          });
          const uploadedUrl = data.signUrl.split("?")[0];
          console.log(uploadedUrl);
          toast.success("Canvas uploaded to S3!");
          if (onSave) onSave(uploadedUrl);
          setIsSaved(true);
        },
      }
    );
  };

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    const mime = file?.type || "application/octet-stream";
    const ext = mime.split("/")[1] || file.name.split(".").pop() || "bin";
    const fileName = file.name.split(".")[0];

    signUrlMutation.mutate(
      { fileName, ext, type: mime },
      {
        onError: () => {
          return;
        },
        onSuccess: async (data) => {
          const res = await axios.put(data.signUrl, file, {
            headers: { "Content-Type": file.type },
          });
          console.log("✅ Uploaded:", res);
        },
      }
    );
  };

  return (
    <>
      <div className="w-full flex justify-between border-b pb-2 p-3">
        <div className="flex flex-wrap gap-x-3 justify-center items-center">
          <Button
            disabled={!eraseMode}
            onClick={handlePenClick}
            type="button"
            variant="customsm"
            className="justify-start gap-2 bg-chart-2"
          >
            <Pencil className="size-3" />
          </Button>
          <Button
            disabled={eraseMode}
            onClick={handleEraserClick}
            type="button"
            variant="customsm"
            className="justify-start gap-2 bg-chart-2"
          >
            <Eraser className="size-3" />
          </Button>
          <Button
            onClick={handleClearClick}
            type="button"
            variant="customsm"
            className="justify-start gap-2 bg-rose-500"
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
        <Button
          disabled={isSaved}
          onClick={handleSaveClick}
          type="button"
          variant="customsm"
          className="justify-start gap-2"
        >
          <Save className="size-3" />
        </Button>
      </div>

      <ReactSketchCanvas
        ref={canvasRef}
        width="100%"
        height="540px"
        canvasColor="transparent"
        strokeColor="#000000"
        className="border! border-primary/30! bg-white flex-1"
      />
    </>
  );
};
