import { InvoiceFormWrapper } from "@/modules/create-invoice/components/invoice-page";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className=" w-full h-full flex-1 flex justify-center  mx-auto overflow-x-hidden! hide bar px-2 ">
      <Suspense fallback={<>Loading...</>}>
        <InvoiceFormWrapper />
      </Suspense>
    </div>
  );
};

export default Page;
