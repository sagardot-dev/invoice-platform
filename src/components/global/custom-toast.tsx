"use client";

import { toast } from "sonner";
import React from "react";

type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CustomToastProps {
  title: string;
  description?: string;
  data?: object;
  position?: ToastPosition;
}

export function useCustomToast() {
  return ({
    title,
    description,
    data,
    position = "bottom-right",
  }: CustomToastProps) => {
    toast(title, {
      description: (
        <div className="flex flex-col gap-2">
          {description && <p className=" text-accent/70">{description}</p>}
          {data && (
            <pre className="text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-sm p-4">
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          )}
        </div>
      ),
      position,
      classNames: { content: "flex flex-col gap-2" },
      style: {
        "--border-radius": "calc(var(--radius) + 5px)",
        backgroundColor: "var(--color-accent-foreground)",
        color: "var(--color-accent)",
      } as React.CSSProperties,
    });
  };
}
