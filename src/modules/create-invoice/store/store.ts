import { jacketSchema } from "@/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import z from "zod";

type jacketFormState = z.infer<typeof jacketSchema>;

const defaultJacketValues: jacketFormState = {
  quantity: 1,
  tailorName: "",
  fittingDate: new Date(),
  addVest: false,
  addMonogram: false,
  jacketType: "NORMAL",
  jacketFabricImage: "",
  jacketStyleDrawing: "",
  jacketCustomStyle: "",
  monogramName: "",
  monogramImage: "",
  liningImage: "",
  ch: 0,
  wa: 0,
  hip: 0,
  nk: 0,
  sh: 0,
  sleeve: 0,
  arm: 0,
  fr: 0,
  ba: 0,
  lg: 0,
  vLg: 0,
  ocLg: 0,
  nSho: false,
  sqSho: false,
  rdSho: false,
  sloSho: false,
  hBk: false,
  curveBk: false,
  shoNk: false,
  bigM: false,
  holBk: false,
  holCh: false,
  brBly: false,
  lLo: false,
  rLo: false,
  erect: false,
  flatB: false,
  note: "",
};

interface JacketState {
  data: jacketFormState;
  setData: (value: Partial<jacketFormState>) => void;
  reset: () => void;
}

export const useJacketFromStore = create<JacketState>()(
  persist(
    (set) => ({
      data: defaultJacketValues,
      setData: (value) =>
        set((state) => ({ data: { ...state.data, ...value } })),
      reset: () => set({ data: defaultJacketValues }),
    }),
    {
      name: "jacket-form-state",
    }
  )
);
