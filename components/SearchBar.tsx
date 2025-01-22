"use cleint";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  if (typeof window !== "undefined") {
    const router = useRouter();
    const searchParams = () => new URLSearchParams(window.location.search);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;

      const params = new URLSearchParams(searchParams());
      params.set("title", name);
      // if (name) router.push(`/products?title=${name}`);
      if (name) router.push(`/products?${params.toString()}`);
      else router.push(`/products`);
    };

    return (
      <form
        onSubmit={handleSearch}
        className=" ring-1 ring-gray-400 rounded-md ps-1 pe-2 md:pe-3 flex items-center justify-between focus-within:ring-main transition-all"
      >
        <input
          type="text"
          name="name"
          placeholder="Search..."
          className="h-full py-[7.5px] bg-transparent focus:outline-none px-1 md:px-3"
        />
        <button type="submit">
          <Search size={20} className="cursor-pointer" />
        </button>
      </form>
    );
  }

  return <></>;
};

export default SearchBar;
