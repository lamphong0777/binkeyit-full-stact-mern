export const baseUrl = import.meta.env.VITE_API_URL;

const SummaryApi = {
    register: {
        url: 'api/user/register',
        method: 'POST',
    },
    login: {
        url: 'api/user/login',
        method: 'POST',
    },
    forgotPassword: {
        url: 'api/user/forgot-password',
        method: 'PUT',
    },
    otpVerification: {
        url: 'api/user/verify-forgot-password-otp',
        method: 'PUT',
    },
    resetPassword: {
        url: 'api/user/reset-password',
        method: 'PUT',
    },
    refreshToken: {
        url: 'api/user/refresh-token',
        method: 'POST',
    },
    userDetails: {
        url: 'api/user/user-details',
        method: 'GET',
    },
    logout: {
        url: 'api/user/logout',
        method: 'GET',
    },
    uploadAvatar: {
        url: 'api/user/upload-avatar',
        method: 'PUT',
    },
    updateUserDetails: {
        url: "api/user/update-profile",
        method: 'PUT',
    },
    uploadImage: {
        url: 'api/file/upload',
        method: 'POST',
    },
    addCategory: {
        url: 'api/category/create',
        method: 'POST',
    },
    getAllCategories: {
        url: 'api/category/all',
        method: 'GET',
    },
    updateCategory: {
        url: 'api/category/update',
        method: 'PUT',
    },
    deleteCategory: {
        url: 'api/category/remove',
        method: 'DELETE',
    },
    getAllSubCategories: {
        url: 'api/subcategory/all',
        method: 'GET',
    },
    addSubCategory: {
        url: 'api/subcategory/create',
        method: 'POST',
    },
    updateSubCategory: {
        url: 'api/subcategory/update',
        method: 'PUT',
    },
    deleteSubSubCategory: {
        url: 'api/subcategory/remove',
        method: 'DELETE',
    },
    //Product
    createProduct: {
        url: 'api/product/create',
        method: 'POST',
    },
    getProduct: {
        url: 'api/product/get',
        method: 'POST',
    },
    getProductByCategory: {
        url: 'api/product/get-product-by-category',
        method: 'POST',
    },
    getProductByCategoryAndSubCategory: {
        url: 'api/product/get-pruduct-by-category-and-subcategory',
        method: 'POST',
    },
    getProductDetails: {
        url: 'api/product/get-product-details',
        method: 'POST',
    },
    updateProductDetails: {
        url: 'api/product/update-product-details',
        method: 'PUT',
    },
    deleteProduct: {
        url: 'api/product/delete-product',
        method: 'DELETE',
    },
    searchProduct: {
        url: 'api/product/search-product',
        method: 'POST',
    },
    getCartItem: {
        url: 'api/cart/get',
            method: 'GET',
    },
    addToCart: {
        url: 'api/cart/create',
        method: 'POST',
    },
    updateCartItemQty: {
        url: 'api/cart/update-qty',
        method: 'PUT',
    },
    deleteCartItem: {
        url: 'api/cart/delete-cart-item',
        method: 'DELETE',
    },
    createAddress : {
        url : 'api/address/create',
        method : 'POST'
    },
    getAddress : {
        url : 'api/address/get',
        method : 'GET'
    },
    updateAddress : {
        url : 'api/address/update',
        method : 'PUT'
    },
    disableAddress : {
        url : 'api/address/disable',
        method : 'DELETE'
    },
    // Order api
    CashOnDeliveryOrder : {
        url : "/api/order/cash-on-delivery",
        method : 'POST'
    },
    payment_url : {
        url : "/api/order/checkout",
        method : 'POST'
    },
    getOrderItems : {
        url : '/api/order/order-list',
        method : 'GET'
    }
}

export default SummaryApi;