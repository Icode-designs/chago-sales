import { setProducts } from "@/store/slices/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/utils/fetchAllProducts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchProducts() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchVendorProducts() {
      setLoading(true);
      try {
        const remoteProducts = await fetchProducts(user?.uid as string);
        dispatch(setProducts(remoteProducts));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchVendorProducts();
  }, [user?.uid, dispatch]);
}
