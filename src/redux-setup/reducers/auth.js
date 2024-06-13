import {createSlice} from "@reduxjs/toolkit" ;
const initialState = {
    login:{
        userCurrent : null,
        logged: false,
        error: false,
    }
}
const authReducer = createSlice({
    name: "authReducer",
    initialState,
    reducers:{
        loginSuccess: (state, action)=>{
            state.login.userCurrent = action.payload
            state.login.logged = true;
        },
        loginFail: (state, action)=>{
            state.login.error = true;
        },
        loggedOut: (state, action)=>{
            state.login.userCurrent = null;
            state.login.logged = false;
            state.login.error = false;
        },
        updateSuccess:(state, action)=>{
            state.login.userCurrent = action.payload
        }
    }
});
export const {loginSuccess,loggedOut,loginFail, updateSuccess } = authReducer.actions;
export default authReducer.reducer;