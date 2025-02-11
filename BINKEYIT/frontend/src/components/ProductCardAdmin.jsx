import {useState} from "react";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import ConfirmBox from "./ConfirmBox.jsx";
import EditProductAdmin from "./EditProductAdmin.jsx";


const ProductCardAdmin = ({data, fetchProductData}) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleCancelDelete = () => {
        setDeleteOpen(false);
    }

    const handleDelete = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProduct,
                data: {
                    _id: data._id,
                }
            });

            const {data: responseData} = response;
            if (responseData.success) {
                toast.success(responseData.message);
                if (fetchProductData) {
                    fetchProductData();
                }
                setDeleteOpen(false);
            }
        } catch (e) {
            AxiosToastError(e);
        }
    }

    return (
        <div className='w-36 p-4 bg-white rounded'>
            <div>
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-full object-scale-down'
                />
            </div>
            <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
            <p className='text-slate-400'>{data?.unit}</p>
            <div className='grid grid-cols-2 gap-3 py-2'>
                <button onClick={() => setEditOpen(true)}
                        className='border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit
                </button>
                <button onClick={() => setDeleteOpen(true)}
                        className='border px-1 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded'>Delete
                </button>
            </div>

            {
                editOpen && (
                    <EditProductAdmin
                        fetchProductData={fetchProductData}
                        data={data}
                        close={() => setEditOpen(false)}/>
                )
            }

            {
                deleteOpen && (
                    <ConfirmBox
                        close={handleCancelDelete}
                        confirm={handleDelete}
                        cancel={handleCancelDelete}/>
                )
            }
        </div>
    )
}

export default ProductCardAdmin;