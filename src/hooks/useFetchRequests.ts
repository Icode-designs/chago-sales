import { fetchRequests } from "@/lib/services/requestServices";
import { setRequests } from "@/store/slices/requestSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function useFetchRequests() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function userRequests() {
      setLoading(true);
      try {
        const requests = await fetchRequests(user?.uid as string);
        dispatch(setRequests(requests));
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    userRequests();
  }, [dispatch]);

  return { loading };
}
