import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILoading {
  isLoadingList: boolean;
  isLoadingDetails: boolean;
}

const initialLoading: ILoading = {
  isLoadingList: false,
  isLoadingDetails: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoading,
  reducers: {
    setIsLoadingList(state, action: PayloadAction<boolean>) {
      state.isLoadingList = action.payload;
    },
    setIsLoadingDetails(state, action: PayloadAction<boolean>) {
      state.isLoadingDetails = action.payload;
    },
  },
});

export const { setIsLoadingList, setIsLoadingDetails } = loadingSlice.actions;
export default loadingSlice.reducer;
