import Breadcrumb from "@/components/BreadCrumb";
import Cart from "@/components/Cart";

const Cartpage = () => {
  return (
    <>
      <Breadcrumb />
      <div className=" px-4 md:px-8 xl:px-40 my-10">
        <div className="text-3xl mb-6 dark:text-white">Shooping..</div>
        <Cart />
      </div>
    </>
  );
};

export default Cartpage;
