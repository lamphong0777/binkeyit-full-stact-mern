import {Outlet, useLocation} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, {Toaster} from 'react-hot-toast';
import {useDispatch} from "react-redux";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import {setUserDetail} from "./store/userSlice.js";
import {useEffect} from "react";
import {setAllCategory, setAllSubcategory, setLoadingCategory} from "./store/productSlice.js";
import Axios from "./utils/Axios.js";
import SummaryApi from "./common/SummaryApi.js";
import GlobalProvider from "./provider/GlobalProvider.jsx";
import CartMobileLink from "./components/CartMobileLink.jsx";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();

    const fetchUser = async () => {
        const userData = await fetchUserDetails();
        dispatch(setUserDetail(userData.data));
    }

    const fetchCategory = async () => {
        try {
            dispatch(setLoadingCategory(true));
            const response = await Axios({
                ...SummaryApi.getAllCategories,
            })
            const { data : responseData } = response;
            if(responseData.success) {
                dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
            }
        } catch (e) {
            // console.log(e);
        } finally {
            dispatch(setLoadingCategory(false));
        }
    }

    const fetchSubCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAllSubCategories,
            });
            const { data : responseData } = response;
            if(responseData.success) {
                dispatch(setAllSubcategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))));
                // console.log("Get all sub category", responseData.data);
            }
        } catch (e) {
            // console.log(e);
        } finally {
        }
    }

    useEffect(() => {
        fetchUser();
        fetchCategory();
        fetchSubCategory();
    }, []);

    return (
        <GlobalProvider>
            <Header/>
            <main className="min-h-[78vh]">
                <Outlet/>
            </main>
            <Footer/>
            <Toaster/>
            {
                location.pathname !== '/checkout' && (
                    <CartMobileLink/>
                )
            }
        </GlobalProvider>
    );
}

export default App;
