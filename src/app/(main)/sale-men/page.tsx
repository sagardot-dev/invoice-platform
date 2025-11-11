import { HelperForm } from "@/modules/helper/ui/components/create-helper-from";
import { HelperDataCard } from "@/modules/helper/ui/components/helper-data-card";
import SalemanForm from "@/modules/saleman/ui/components/create-saleman-from";
import { SalemanDataCard } from "@/modules/saleman/ui/components/saleman-data-card";

const Page = () => {
  return (
    <div className=" w-full overflow-x-hidden-hidden flex-1 container  mx-auto  grid grid-cols-2 grid-rows-2 gap-6">
      <SalemanForm />
      <HelperForm />
      <SalemanDataCard/>
      <HelperDataCard/>
    </div>
  );
};

export default Page;
