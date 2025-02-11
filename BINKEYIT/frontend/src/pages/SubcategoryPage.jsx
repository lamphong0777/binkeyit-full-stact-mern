import {useEffect, useState} from "react";
import {createColumnHelper} from "@tanstack/react-table";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import ConfirmBox from "../components/ConfirmBox.jsx";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel.jsx";
import DisplayTable from "../components/DisplayTable.jsx";
import toast from "react-hot-toast";
import ViewImage from "../components/ViewImage.jsx";
import {HiPencil} from "react-icons/hi2";
import {MdDelete} from "react-icons/md";
import Loading from "../components/Loading.jsx";
import EditSubCategory from "../components/EditSubCategory.jsx";


const SubcategoryPage = () => {
    const [openAddSubcategory, setOpenAddSubcategory] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const columnHelper = createColumnHelper();
    const [ImageUrl, setImageUrl] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        _id: ""
    });
    const [deleteSubcategory, setDeleteSubcategory] = useState({
        _id: ""
    });
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

    const fetchSubcategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getAllSubCategories
            })

            const {data: responseData} = response;
            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (e) {
            AxiosToastError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSubcategory();
    }, []);

    const column = [
        columnHelper.accessor('name', {
            header: "Name"
        }),
        columnHelper.accessor('image', {
            header: "Image",
            cell: ({row}) => {
                // console.log("row",)
                return <div className='flex justify-center items-center'>
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className='w-8 h-8 cursor-pointer'
                        onClick={() => {
                            setImageUrl(row.original.image)
                        }}
                    />
                </div>
            }
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: ({row}) => {
                return (
                    <>
                        {
                            row.original.category.map((c, index) => {
                                return (
                                    <p key={c._id + "table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                                )
                            })
                        }
                    </>
                )
            }
        }),
        columnHelper.accessor("_id", {
            header: "Action",
            cell: ({row}) => {
                return (
                    <div className='flex items-center justify-center gap-3'>
                        <button onClick={() => {
                            setOpenEdit(true)
                            setEditData(row.original)
                        }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
                            <HiPencil size={20}/>
                        </button>
                        <button onClick={() => {
                            setOpenDeleteConfirm(true)
                            setDeleteSubcategory(row.original)
                        }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
                            <MdDelete size={20}/>
                        </button>
                    </div>
                )
            }
        })
    ]

    const handleDeleteSubcategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteSubSubCategory,
                data: deleteSubcategory
            })

            const {data: responseData} = response

            if (responseData.success) {
                toast.success(responseData.message)
                await fetchSubcategory();
                setOpenDeleteConfirm(false)
                setDeleteSubcategory({_id: ""})
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className=''>
            <div className='p-2   bg-white shadow-md flex items-center justify-between'>
                <h2 className='font-semibold'>Sub Category</h2>
                <button onClick={() => setOpenAddSubcategory(true)}
                        className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Sub
                    Category
                </button>
            </div>

            <div className='overflow-auto w-full max-w-[95vw]'>
                <DisplayTable
                    data={data}
                    column={column}
                />
            </div>

            {
                loading && (
                    <Loading/>
                )
            }

            {
                openAddSubcategory && (
                    <UploadSubCategoryModel
                        close={() => setOpenAddSubcategory(false)}
                        fetchData={fetchSubcategory}
                    />
                )
            }

            {
                ImageUrl &&
                <ViewImage url={ImageUrl} close={() => setImageUrl("")}/>
            }

            {
                openEdit &&
                <EditSubCategory
                    subData={editData}
                    close={() => setOpenEdit(false)}
                    fetchData={fetchSubcategory}
                />
            }

            {
                openDeleteConfirm && (
                    <ConfirmBox
                        cancel={() => setOpenDeleteConfirm(false)}
                        close={() => setOpenDeleteConfirm(false)}
                        confirm={handleDeleteSubcategory}
                    />
                )
            }
        </section>
    )
}

export default SubcategoryPage;