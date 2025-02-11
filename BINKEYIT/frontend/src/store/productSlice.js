import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCategory: [],
    loadingCategory: false,
    allSubCategory: [],
    product: [],
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setAllCategory: (state, action) => {
            state.allCategory = [...action.payload];
        },
        setLoadingCategory: (state, action) => {
            state.loadingCategory = action.payload;
        },
        setAllSubcategory: (state, action) => {
            state.allSubCategory = [...action.payload];
        }
    }
})

export const { setAllCategory, setAllSubcategory, setLoadingCategory } = productSlice.actions;
export default productSlice.reducer;