import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Investor } from "../services/api";

interface InvestorsState {
  list: Investor[];
}

const initialState: InvestorsState = {
  list: [],
};

export const investorsSlice = createSlice({
  name: "investors",
  initialState,
  reducers: {
    setInvestors: (state, action: PayloadAction<Investor[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setInvestors } = investorsSlice.actions;
export default investorsSlice.reducer;
