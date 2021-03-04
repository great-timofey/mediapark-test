import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppCommonStateType, ErrorType } from '$types/common';

export const commonSliceName = 'common';

interface BreedsReducerStateType {
  common: AppCommonStateType;
}

const initialState: BreedsReducerStateType = {
  common: {
    loading: false,
    error: null,
  },
};

export const counterSlice = createSlice({
  name: commonSliceName,
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.common.loading = action.payload;
    },
    setError: (state, action: PayloadAction<ErrorType>) => {
      state.common.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, setError } = counterSlice.actions;
export default counterSlice.reducer;
