"use client";
import { Button } from "@/components/ui/button";
import { useGetSignUrlMutation } from "@/modules/dashboard/server/get-signUrl";
import axios from "axios";
import { Eraser, Pencil, Save, Trash2, UploadCloud } from "lucide-react";
import React, { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { toast } from "sonner";

export const Drawing = () => {
  const signUrlMutation = useGetSignUrlMutation();
  const [preview, setPreview] = useState("");
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [eraseMode, setEraseMode] = useState(false);

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
  };

  const handleSaveClick = async () => {
    const dataUrl = await canvasRef.current?.exportImage("png");
    if (!dataUrl) return;
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File([blob], `canvas-${Date.now()}.png`, {
      type: "image/png",
    });
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);

    const mime = file.type || "application/octet-stream";
    const ext = "png";
    const fileName = `canvas-${Date.now()}`;
    signUrlMutation.mutate(
      { fileName, ext, type: mime },
      {
        onError: () => {
          toast.error("Failed to get signed URL");
        },
        onSuccess: async (data) => {
          await axios.put(data.signUrl, file, {
            headers: { "Content-Type": file.type },
          });
          toast.success("Canvas uploaded to S3!");
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
            className="justify-start gap-2"
          >
            <Pencil className="size-3" />
          </Button>
          <Button
            disabled={eraseMode}
            onClick={handleEraserClick}
            type="button"
            variant="customsm"
            className="justify-start gap-2"
          >
            <Eraser className="size-3" />
          </Button>
          <Button
            onClick={handleClearClick}
            type="button"
            variant="customsm"
            className="justify-start gap-2"
          >
            <Trash2 className="size-3" />
          </Button>
          <Button
            onClick={handleSaveClick}
            type="button"
            variant="customsm"
            className="justify-start gap-2"
          >
            <Save className="size-3" />
          </Button>
        </div>
        <Button
          type="button"
          variant="customsm"
          className="justify-start gap-2"
        >
          <UploadCloud className="size-3" />
        </Button>
      </div>

      <ReactSketchCanvas
        ref={canvasRef}
        width="100%"
        height="540px"
        canvasColor="transparent"
        strokeColor="#000000"
        className="border! border-primary/30! bg-white"
      />
    </>
  );
};
