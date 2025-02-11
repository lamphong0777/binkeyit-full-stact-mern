import {useSelector} from "react-redux";
import {useState} from "react";
import {useGlobalContext} from "../provider/GlobalProvider.jsx";
import {AxiosError} from "axios";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import {MdDelete, MdEdit} from "react-icons/md";
import AddAddress from "../components/AddAddress.jsx";
import EditAddressDetails from "../components/EditAddressDetails.jsx";
import ConfirmBox from "../components/ConfirmBox.jsx";

const Address = () => {
    const addressList = useSelector((state) => state.addresses.addressList);
    const [editData, setEditData] = useState({});
    const [openEdit, setOpenEdit] = useState(false);
    const [openAddress, setOpenAddress] = useState(false);
    const {fetchAddress} = useGlobalContext();
    const [openConfirmBox, setOpenConfirmBox] = useState(false);
    const [deleteAddressId, setDeleteAddressId] = useState('');

    const handleDisableAddress = async (id) => {
        try {
            const response = await Axios({
                ...SummaryApi.disableAddress,
                data: {
                    _id: id
                }
            });
            const {data: responseData} = response;
            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchAddress) {
                    fetchAddress();
                }
            }
        } catch (e) {
            AxiosError(e);
        } finally {
            setOpenConfirmBox(false);
        }
    }

    return (
        <div>
            <div className='bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center'>
                <h2 className='font-semibold text-ellipsis line-clamp-1'>Address</h2>
                <button
                    onClick={() => setOpenAddress(true)}
                    className='border border-primary-200 text-primary-200 px-3 hover:bg-primary-200 hover:text-black py-2 rounded-full'>
                    Add Address
                </button>
            </div>
            <div className='bg-blue-50 p-2 grid gap-4'>
                {
                    addressList.map((address, index) => {
                        return (
                            <div key={'address-' + index}
                                 className={`border rounded p-3 flex gap-3 bg-white ${!address.status && 'hidden'}`}>
                                <div className={'w-full'}>
                                    <p>{address.address_line}</p>
                                    <p>{address.city}</p>
                                    <p>{address.state}</p>
                                    <p>{address.country} - {address.pincode}</p>
                                    <p>{address.mobile}</p>
                                </div>
                                <div className={'grid gap-10'}>
                                    <button
                                        onClick={() => {
                                            setOpenEdit(true);
                                            setEditData(address);
                                        }}
                                        className={'bg-green-200 p-1 rounded hover:text-white hover:bg-green-600'}
                                    >
                                        <MdEdit/>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setDeleteAddressId(address._id);
                                            setOpenConfirmBox(true);
                                            console.log(deleteAddressId);
                                        }}
                                        className={'bg-red-200 p-1 rounded hover:text-white hover:bg-red-600'}
                                    >
                                        <MdDelete size={20}/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
                <div onClick={() => setOpenAddress(true)}
                     className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
                    Add address
                </div>
            </div>

            {
                openAddress && (
                    <AddAddress close={() => setOpenAddress(false)}/>
                )
            }

            {
                openEdit && (
                    <EditAddressDetails data={editData} close={() => setOpenEdit(false)}/>
                )
            }

            {
                openConfirmBox && (
                    <ConfirmBox
                        confirm={() => handleDisableAddress(deleteAddressId)}
                        close={() => setOpenConfirmBox(false)}
                        cancel={() => setOpenConfirmBox(false)}/>
                )
            }

        </div>
    )
}

export default Address;