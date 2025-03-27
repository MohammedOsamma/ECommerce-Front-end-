import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    let cpyFilter = { ...filters };
    const indexOffCurrentSection = Object.keys(cpyFilter).indexOf(getSectionId);
    if (indexOffCurrentSection === -1) {
      cpyFilter = {
        ...cpyFilter,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const indexOffCurrentOption =
        cpyFilter[getSectionId].indexOf(getCurrentOption);
      if (indexOffCurrentOption === -1) {
        cpyFilter[getSectionId].push(getCurrentOption);
      } else {
        cpyFilter[getSectionId].splice(indexOffCurrentOption, 1);
      }
    }
    setFilters(cpyFilter);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilter));
  }

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);
  console.log(filters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-extrabold text-lg">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground ">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200ppx]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((product) => (
                <ShoppingProductTile product={product} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
