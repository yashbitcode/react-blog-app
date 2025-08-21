import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    status: boolean;
    userData: any;
} = {
    status: false,
    userData: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;