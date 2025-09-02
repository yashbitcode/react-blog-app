import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    status: boolean;
    verified: boolean;
    userData: any;
} = {
    status: false,
    verified: false,
    userData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            // console.log(action);
            state.status = true;
            state.userData = action.payload.userData;
            state.verified = action.payload.userData?.emailVerification;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setVerificationStatus: (state, action: PayloadAction<{
            verified: boolean
        }>) => {
            state.verified = action.payload.verified
        }
    },
});

export const { login, logout, setVerificationStatus } = authSlice.actions;
export default authSlice.reducer;
