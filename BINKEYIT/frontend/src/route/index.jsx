import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import OtpVerification from "../pages/OtpVerification.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import UserMenuMobile from "../pages/UserMenuMobile.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import Profile from "../pages/Profile.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import Address from "../pages/Address.jsx";
import AdminPermission from "../layouts/AdminPermission.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SubcategoryPage from "../pages/SubcategoryPage.jsx";
import ProductAdmin from "../pages/ProductAdmin.jsx";
import UploadProduct from "../pages/UploadProduct.jsx";
import ProductListPage from "../pages/ProductListPage.jsx";
import ProductDisplayPage from "../pages/ProductDisplayPage.jsx";
import Success from "../pages/Success.jsx";
import {Cancel} from "axios";
import CartMobile from "../pages/CartMobile.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "search",
                element: <SearchPage/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "verify-forgot-password-otp",
                element: <OtpVerification/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path: "user-menu",
                element: <UserMenuMobile/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children: [
                    {
                        path: "profile",
                        element: <Profile/>
                    },
                    {
                        path: "my-orders",
                        element: <MyOrders/>
                    },
                    {
                        path: "save-address",
                        element: <Address/>
                    },
                    {
                        path: "category",
                        element: <AdminPermission><CategoryPage/></AdminPermission>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermission><SubcategoryPage/></AdminPermission>
                    },
                    {
                        path: "product",
                        element: <AdminPermission><ProductAdmin/></AdminPermission>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermission><UploadProduct/></AdminPermission>
                    }
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage/>
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplayPage/>
            },
            {
                path: "cart",
                element: <CartMobile/>
            },
            {
                path: "checkout",
                element: <CheckoutPage/>
            },
            {
                path: "success",
                element: <Success/>
            },
            {
                path: "cancel",
                element: <Cancel/>
            }
        ]
    }
]);

export default router;