import {createContext, useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {handleAddItemCart} from "../store/cartProductSlice.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import {priceWithDiscount} from "../utils/priceWithDiscount.js";
import {handleAddAddress} from "../store/addressSlice.js";
import {handleSetOrder} from "../store/orderSlice.js";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [notDiscountTotalPrice,setNotDiscountTotalPrice] = useState(0);
    const [totalQty,setTotalQty] = useState(0);

    const cartItem = useSelector((state) => state.cartItem.cart);
    const user = useSelector((state) => state?.user);

    const fetchCartItem = async () => {
        try{
            const response = await Axios({
                ...SummaryApi.getCartItem
            });

            const { data : responseData } = response;
            if(responseData.success){
                dispatch(handleAddItemCart(responseData.data));
            }
        } catch (e) {
            console.log(e);
        }
    }

    const updateCartItem = async (id, qty) => {
       try {
           const response = await Axios({
               ...SummaryApi.updateCartItemQty,
               data: {
                   _id: id,
                   qty: qty
               }
           });
           const { data : responseData } = response;
           if(responseData.success){
               await fetchCartItem();
               return responseData;
           }

       } catch (e) {
           AxiosToastError(e);
           return e;
       }
    }

    const deleteCartItem = async (cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cartId,
                }
            });
            const { data : responseData } = response;
            if(responseData.success){
                toast.success(responseData.message);
                await fetchCartItem();
            }
        } catch (e) {
            AxiosToastError(e);
        }
    }

    useEffect(() => {
        const qty = cartItem.reduce((prev, current) => {
            return prev + current.quantity;
        }, 0);

        setTotalQty(qty);
        const tPrice = cartItem.reduce((prev, current) => {
            const priceAfterDiscount = priceWithDiscount(current?.productId?.price, current?.productId?.discount);
            return prev + (priceAfterDiscount * current.quantity);
        }, 0);
        setTotalPrice(tPrice);
        const notDiscountPrice = cartItem.reduce((prev, current) => {
            return prev + (current?.productId?.price * current.quantity);
        }, 0);
        setNotDiscountTotalPrice(notDiscountPrice);
    }, [cartItem]);

    const handleLogout = async () => {
        localStorage.clear();
        dispatch(handleAddItemCart([]));
    }

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAddress,
            });

            const { data : responseData } = response;

            if(responseData.success){
                dispatch(handleAddAddress(responseData.data));
            }

        } catch (e) {
            // AxiosToastError(e);
        }
    }

    const fetchOrder = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getOrderItems
            });

            const { data : responseData } = response;
            if(responseData.success){
                dispatch(handleSetOrder(responseData.data));
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCartItem();
        handleLogout();
        fetchAddress();
        fetchOrder();
    }, [user]);
    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            fetchOrder,
            totalPrice,
            totalQty,
            notDiscountTotalPrice,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;