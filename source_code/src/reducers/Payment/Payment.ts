import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface paymentState {
  paymentSuccess: boolean;
}

const initialState: paymentState = {
  paymentSuccess: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentSuccess: (state, action: PayloadAction<boolean>) => {
      state.paymentSuccess = action.payload;
    },
  },
});

export const { setPaymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;
