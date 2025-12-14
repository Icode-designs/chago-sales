import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestType } from "@/types/requestType";

interface StateType {
  requestList: RequestType[];
}

const initialState: StateType = {
  requestList: [],
};

const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<RequestType[]>) => {
      state.requestList = action.payload;
    },
    setRequest: (state, action: PayloadAction<RequestType>) => {
      if (action.payload) {
        state.requestList.push(action.payload);
      } else {
        console.log("request list dispatch error");
      }
    },
  },
});

export const { setRequests, setRequest } = requestSlice.actions;

export default requestSlice.reducer;
