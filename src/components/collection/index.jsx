"use client";
import CategoryContext from "@/context/categoryContext";
import ThemeOptionContext from "@/context/themeOptionsContext";
import Loader from "@/layout/loader";
import Breadcrumbs from "@/utils/commonComponents/breadcrumb";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useContext, useEffect, useState } from "react";
import CollectionBanner from "./collectionBanner";
import CollectionInfiniteScroll from "./collectionInfiniteScroll";
import CollectionLeftSidebar from "./collectionLeftSidebar";
import CollectionNoSidebar from "./collectionNoSidebar";
import CollectionOffCanvas from "./collectionOffcanvas";
import CollectionRightSidebar from "./collectionRightSidebar";
import CollectionSidebarPopUp from "./collectionSidebarPopUp";
import MainCollectionSlider from "./collectionSlider";
import LayoutSidebar from "./layoutSidebar";

const CollectionContain = () => {
  const [filter, setFilter] = useState({ category: [], brand: [], price: [], attribute: [], rating: [], sortBy: "asc", field: "created_at" });
  const { themeOption } = useContext(ThemeOptionContext);
  const [category, brand, attribute, price, rating, sortBy, field, layout, paginate] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout", "paginate"]);
  const collectionLayout = layout?.layout ? layout?.layout : themeOption?.collection?.collection_layout;
  const { categoryIsLoading } = useContext(CategoryContext);

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        paginate: paginate?.paginate ? paginate?.paginate : 12,
        category: category ? category?.category?.split(",") : [],
        brand: brand ? brand?.brand?.split(",") : [],
        attribute: attribute ? attribute?.attribute?.split(",") : [],
        price: price ? price?.price?.split(",") : [],
        rating: rating ? rating?.rating?.split(",") : [],
        sortBy: sortBy ? sortBy?.sortBy : "asc",
        field: field ? field?.field : "created_at",
      };
    });
  }, [category, brand, attribute, price, rating, sortBy, field, paginate]);

  const isCollectionMatch = {
    collection_category_slider: <MainCollectionSlider filter={filter} setFilter={setFilter} />,
    collection_category_sidebar: <LayoutSidebar filter={filter} setFilter={setFilter} />,
    collection_banner: <CollectionBanner filter={filter} setFilter={setFilter} />,
    collection_top_filter: <CollectionOffCanvas filter={filter} setFilter={setFilter} />,
    collection_no_sidebar: <CollectionNoSidebar filter={filter} setFilter={setFilter} />,
    collection_left_sidebar: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_right_sidebar: <CollectionRightSidebar filter={filter} setFilter={setFilter} />,
    collection_2_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_3_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_4_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_5_grid: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_list_view: <CollectionLeftSidebar filter={filter} setFilter={setFilter} />,
    collection_sidebar_popup: <CollectionSidebarPopUp filter={filter} setFilter={setFilter} />,
    collection_product_infinite_scroll: <CollectionInfiniteScroll filter={filter} setFilter={setFilter} />,
  };

  return (
    <>
      {categoryIsLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs title={"Collections"} subNavigation={[{ name: "Collections" }]} />
          {isCollectionMatch[collectionLayout]}
        </>
      )}
    </>
  );
};

export default CollectionContain;
