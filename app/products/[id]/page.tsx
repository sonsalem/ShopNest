import ProductSingelPage from "@/components/ProductSingelPage";
import { ParamsType } from "@/types";

const Page = async ({ params }: ParamsType) => {
  const { id } = await params;

  return <ProductSingelPage id={id} cn="xl:px-40" />;
};

export default Page;
