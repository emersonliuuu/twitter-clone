import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  profilePicture?: string;
  followers?: string[];
  following?: string[];
  description?: string;
  createAt?: Date;
}

export interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    changeProfile: (state, action: PayloadAction<string>) => {
      state.currentUser!.profilePicture = action.payload;
    },
    following: (state, action: PayloadAction<string>) => {
      const followerId = action.payload;
      if (state.currentUser!.following?.includes(followerId)) {
        state.currentUser!.following.splice(
          state.currentUser!.following.findIndex((key) => key === followerId)
        );
      } else {
        state.currentUser!.following?.push(followerId);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  changeProfile,
  following,
} = userSlice.actions;

export default userSlice.reducer;
