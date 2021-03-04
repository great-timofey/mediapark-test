import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppCommonStateType, ErrorType } from '$types/common';

export const commonSliceName = 'common';

const initialState: AppCommonStateType = {
  loading: false,
  error: null,
};

export const commonSlice = createSlice({
  name: commonSliceName,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<ErrorType>) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setError } = commonSlice.actions;
export default commonSlice.reducer;
