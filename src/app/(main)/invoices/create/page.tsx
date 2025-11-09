import { InvoiceFormWrapper } from "@/modules/create-invoice/components/invoice-page";

const Page = () => {
  return (
    <div className=" w-full h-full flex-1 container mx-auto  grid grid-cols-3">
      <InvoiceFormWrapper />
    </div>
  );
};

export default Page;
