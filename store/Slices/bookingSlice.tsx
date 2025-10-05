import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingDataStep1 {
  fullName: string;
  email: string;
  phone?: string;
}

export interface BookingDataStep2 {
  bookingType: string;
  pickupLocation: string;
  destination?: string;
  tripType?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  returnTime?: string;
  rentalPackage?: string;
  passengers: string;
}

export interface BookingDataStep3 {
  id: number | string;
  name: string;
  type: string;
  ac: boolean;
  seats: string;
  image: string;
  baseRate: string;
  extraKmRate: string;
  features: object;
}

interface BookingState {
  bookingDataStep1: BookingDataStep1 | null;
  bookingDataStep2: BookingDataStep2 | null;
  bookingDataStep3: BookingDataStep3 | null;
  paymentMethod: string;
  finalBooking: any | null;
}

const initialState: BookingState = {
  bookingDataStep1: null,
  bookingDataStep2: null,
  bookingDataStep3: null,
  paymentMethod: 'razorpay',
  finalBooking: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDataStep1: (state, action: PayloadAction<BookingDataStep1>) => {
      state.bookingDataStep1 = action.payload;
    },
    setBookingDataStep2: (state, action: PayloadAction<BookingDataStep2>) => {
      state.bookingDataStep2 = action.payload;
    },
    setBookingDataStep3: (state, action: PayloadAction<BookingDataStep3>) => {
      state.bookingDataStep3 = action.payload;
    },
    clearBookingData: (state) => {
      state.bookingDataStep1 = null;
      state.bookingDataStep2 = null;
      state.bookingDataStep3 = null;
      state.paymentMethod = 'razorpay';
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    clearPaymentMethod: (state) => {
      state.paymentMethod = 'razorpay';
    },
    setFinalBooking: (state, action: PayloadAction<any>) => {  // 🆕
      state.finalBooking = action.payload;
    },
        clearBookingDetails: (state) => {
      // state.bookingDataStep1 = null;
      state.bookingDataStep2 = null;
      state.bookingDataStep3 = null;
      state.paymentMethod = 'razorpay';
      state.finalBooking = null;
    },
  },
});

export const {
  setBookingDataStep1,
  setBookingDataStep2,
  setBookingDataStep3,
  clearBookingData,
  setPaymentMethod,
  setFinalBooking, 
  clearBookingDetails,
  clearPaymentMethod,
} = bookingSlice.actions;

export default bookingSlice.reducer;
