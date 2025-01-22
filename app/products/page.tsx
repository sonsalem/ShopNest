import Breadcrumb from "@/components/BreadCrumb";
import Filter from "@/components/Filter";
import Loader from "@/components/Loader";
import Products from "@/components/Products";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="mb-20">
      <Breadcrumb />
      <Filter />
      <Suspense fallback={<Loader />}>
        <Products pagination={true} perPage={8} name="All Products" />
      </Suspense>
    </div>
  );
};

export default page;
