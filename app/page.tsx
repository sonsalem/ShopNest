import Categories from "@/components/Categories";
import Landing from "@/components/Landing";
import Products from "@/components/Products";

const page = () => {
  return (
    <div className="mb-20">
      <Landing />
      <Categories />
      <div className="mt-10"></div>
      <Products limit={8} sort="desc" slider={true} name="Our Products" />
      <Products limit={8} />
      <Products limit={8} sort="desc" slider={true} />
    </div>
  );
};

export default page;
