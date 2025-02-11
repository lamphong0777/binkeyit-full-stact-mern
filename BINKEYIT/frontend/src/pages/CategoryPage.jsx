import {useEffect, useState} from "react";
import UploadCategoryModel from "../components/UploadCategoryModel.jsx";
import Loading from "../components/Loading.jsx";
import NoData from "../components/NoData.jsx";
import Axios from "../utils/Axios.js";
import summaryApi from "../common/SummaryApi.js";
import ConfirmBox from "../components/ConfirmBox.jsx";
import AxiosToastError from "../utils/AxiosToastError.js";
import toast from "react-hot-toast";
import EditCategory from "../components/EditCategory.jsx";
import Pagination from "../components/Pagination.jsx";
import SummaryApi from "../common/SummaryApi.js";

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [editData, setEditData] = useState({
        name: "",
        image: ""
    });
    const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: ""
    });

    const fetchCategory = async (page = 1) => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getAllCategories,
                params: { page, limit: 12 },
            });

            const { data : categoryData } = response;
            if(categoryData.success){
                setCategoryData(categoryData.data);
                setTotalPage(categoryData.pagination.totalPages);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory(currentPage);
    }, [currentPage]);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...summaryApi.deleteCategory,
                data: deleteCategory
            })

            const { data : categoryData } = response;
            if(categoryData.success){
                toast.success(categoryData.message);
                await fetchCategory(currentPage);
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPage) {
            setCurrentPage(page);
        }
    };

    return (
        <section>
            <div className={'p-2 bg-white shadow-md flex items-center justify-between'}>
                <h2 className={'font-semibold'}>Category</h2>
                <button onClick={()=>setOpenUploadCategory(true)} className={'text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'}>Add
                    category
                </button>
            </div>
            {
                !categoryData[0] && !loading && (
                    <NoData/>
                )
            }
            <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                {
                    categoryData.map((category,index)=>{
                        return(
                            <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                                <img
                                    alt={category.name}
                                    src={category.image}
                                    className='w-full object-scale-down'
                                />
                                <div className='items-center h-9 flex gap-2'>
                                    <button onClick={()=>{
                                        setOpenEdit(true)
                                        setEditData(category)
                                    }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
                                        Edit
                                    </button>
                                    <button onClick={()=>{
                                        setOpenConfirmBoxDelete(true)
                                        setDeleteCategory(category)
                                    }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                loading && (
                    <Loading/>
                )
            }
            {
                openUploadCategory && (
                    <UploadCategoryModel close={() => setOpenUploadCategory(false)} fetchData={fetchCategory} />
                )
            }
            {
                openEdit && (
                    <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} currentPage={currentPage} />
                )
            }
            {
                openConfirmBoxDelete && (
                    <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
                )
            }
            {
                !loading && (
                    <Pagination
                        totalPage={totalPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                )
            }
        </section>
    )
}

export default CategoryPage;