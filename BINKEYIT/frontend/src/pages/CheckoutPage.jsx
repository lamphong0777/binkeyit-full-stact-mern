import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useGlobalContext} from "../provider/GlobalProvider.jsx";
import AddAddress from "../components/AddAddress.jsx";
import {DisplayPriceInRupees} from "../utils/DisplayPriceInRupees.js";
import toast from "react-hot-toast";
import {loadStripe} from "@stripe/stripe-js";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [openAddress, setOpenAddress] = useState(false);
    const [selectAddress, setSelectAddress] = useState(0);

    const {fetchCartItem, fetchOrder, totalPrice, totalQty, notDiscountTotalPrice} = useGlobalContext();
    const addressList = useSelector(state => state.addresses.addressList);
    const cartItemsList = useSelector(state => state.cartItem.cart);

    // console.log("addressList", addressList);
    // console.log("cartItemsList", cartItemsList);

    const handleCashOnDelivery = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.CashOnDeliveryOrder,
                data: {
                    list_items : cartItemsList,
                    addressId : addressList[selectAddress]?._id,
                    subTotalAmt : totalPrice,
                    totalAmt :  totalPrice,
                }
            });
            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItem){
                    fetchCartItem()
                }
                if(fetchOrder){
                    fetchOrder()
                }
                navigate('/success',{
                    state : {
                        text : "Order"
                    }
                })
            }
        } catch (e) {
            AxiosToastError(e);
        }
    }

    const handleOnlinePayment = async () => {
        try {
            toast.loading("Loading...")
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripePublicKey)

            const response = await Axios({
                ...SummaryApi.payment_url,
                data : {
                    list_items : cartItemsList,
                    addressId : addressList[selectAddress]?._id,
                    subTotalAmt : totalPrice,
                    totalAmt :  totalPrice,
                }
            })

            const { data : responseData } = response

            await stripePromise.redirectToCheckout({sessionId: responseData.id})

            if(fetchCartItem){
                fetchCartItem()
            }
            if(fetchOrder){
                fetchOrder()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='bg-blue-50'>
            <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
                <div className='w-full'>
                    {/***address***/}
                    <h3 className='text-lg font-semibold'>Choose your address</h3>
                    <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList.map((address, index) => {
                                return (
                                    <label key={index} htmlFor={"address" + index} className={!address.status && "hidden"}>
                                        <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                                            <div>
                                                <input id={"address" + index} type='radio' value={index}
                                                       onChange={(e) => setSelectAddress(e.target.value)}
                                                       name='address'/>
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.country} - {address.pincode}</p>
                                                <p>{address.mobile}</p>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                        <div onClick={() => setOpenAddress(true)}
                             className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                            Add address
                        </div>
                    </div>


                </div>

                <div className='w-full max-w-md bg-white py-4 px-2'>
                    {/**summary**/}
                    <h3 className='text-lg font-semibold'>Summary</h3>
                    <div className='bg-white p-4'>
                        <h3 className='font-semibold'>Bill details</h3>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Items total</p>
                            <p className='flex items-center gap-2'><span
                                className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span>
                            </p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Quantity total</p>
                            <p className='flex items-center gap-2'>{totalQty} item</p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Delivery Charge</p>
                            <p className='flex items-center gap-2'>Free</p>
                        </div>
                        <div className='font-semibold flex items-center justify-between gap-4'>
                            <p>Grand total</p>
                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <button className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold'
                                onClick={handleOnlinePayment}>Online Payment
                        </button>

                        <button
                            className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'
                            onClick={handleCashOnDelivery}>Cash on Delivery
                        </button>
                    </div>
                </div>
            </div>


            {
                openAddress && (
                    <AddAddress close={() => setOpenAddress(false)}/>
                )
            }
        </section>
    )
}

export default CheckoutPage;