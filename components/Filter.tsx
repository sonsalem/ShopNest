"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { CategoryProps } from "@/types";

const Filter = () => {
  const { replace } = useRouter();

  const handleFilterChange = (name: string, value: string) => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set(name, value);
      params.delete("page");
      replace(`${window.location.pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 px-4 md:px-8 xl:px-40 dark:text-white mb-8">
      <Select onValueChange={(value) => handleFilterChange("cat", value)}>
        <SelectTrigger className="w-[170px] md:w-[180px] focus:ring-transparent dark:focus:ring-transparent">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="All Products">All Products</SelectItem>
            {Object.values(CategoryProps).map((value) => {
              return (
                <SelectItem value={value} key={value}>
                  {value.toLowerCase()}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange("sort", value)}>
        <SelectTrigger className="w-[170px] md:w-[180px] focus:ring-transparent dark:focus:ring-transparent">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            <SelectItem value="asc">Expensivest</SelectItem>
            <SelectItem value="desc">Cheapest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder="Min"
        onChange={(e) => handleFilterChange("min", e.target.value)}
        className="focus-visible:ring-transparent dark:focus-visible:ring-transparent w-[170px] md:w-[180px]"
      />
      <Input
        type="text"
        placeholder="Max"
        onChange={(e) => handleFilterChange("max", e.target.value)}
        className="focus-visible:ring-transparent dark:focus-visible:ring-transparent w-[170px] md:w-[180px]"
      />
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => handleFilterChange("title", e.target.value)}
        className="focus-visible:ring-transparent dark:focus-visible:ring-transparent ms-auto w-[170px] md:w-[240px]"
      />
    </div>
  );
};

export default Filter;
