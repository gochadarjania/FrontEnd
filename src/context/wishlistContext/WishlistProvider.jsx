import request from "@/utils/axiosUtils";
import { WishlistAPI } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";
import useDelete from "@/utils/hooks/useDelete";
import useFetchQuery from "@/utils/hooks/useFetchQuery";;
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import CartContext from ".";
import ThemeOptionContext from "../themeOptionsContext";

const WishlistProvider = (props) => {
  const router = useRouter();
  const isCookie = Cookies.get("uat");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const { setOpenAuthModal } = useContext(ThemeOptionContext);

  // Getting data from Wishlist API
  const { data: WishlistApiData, isLoading: WishlistAPILoading, refetch } = useFetchQuery([WishlistAPI], () => request({ url: WishlistAPI }), { enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });

  // Adding data to Wishlist API
  const { mutate, isLoading } = useCreate(WishlistAPI, false, false, "Added to Wishlist List");

  // Delete Cart API Data
  const { mutate: deleteWishlist, isLoading: deleteWishlistLoader } = useDelete(WishlistAPI, false, false, "Product Deleted from Wishlist");

  // Refetching Cart API
  useEffect(() => {
    if (isCookie && !deleteWishlistLoader) {
      refetch();
    }
  }, [deleteWishlistLoader, isCookie]);

  // Remove and Delete cart data from API and State
  const removeWishlist = (id, wishId) => {
    if (isCookie && wishId) {
      let id = typeof wishId == "object" ? wishId.id : wishId;
      deleteWishlist(id);
    }
  };

  useEffect(() => {
    if (isCookie) {
      if (WishlistApiData) {
        setWishlistProducts(WishlistApiData.data);
      }
    }
  }, [WishlistAPILoading, isCookie, WishlistApiData]);

  // Common Handler for Add to wishlist
  const addToWishlist = (productObj) => {
    if (Cookies.get("uat")) {
      router.push("/wishlist");
    } else {
      setOpenAuthModal(true);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...props,
        wishlistProducts,
        WishlistAPILoading,
        setWishlistProducts,
        removeWishlist,
        refetch,
        isLoading,
        WishlistAPILoading,
        addToWishlist,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default WishlistProvider;
