import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    order: []
}

const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        handleSetOrder: (state, action) => {
            state.order = [...action.payload];
        }
    }
});

export const {handleSetOrder} = orderSlice.actions;
export default orderSlice.reducer;