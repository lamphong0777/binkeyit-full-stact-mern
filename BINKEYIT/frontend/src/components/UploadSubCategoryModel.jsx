import {IoClose} from "react-icons/io5";
import {useState} from "react";
import UploadImage from "../utils/UploadImage.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import toast from "react-hot-toast";
import {useSelector} from "react-redux";

const UploadSubCategoryModel = ({close, fetchData}) => {
    const allCategory = useSelector(state => state.product.allCategory);
    const [loadingImage, setLoadingImage] = useState(false);

    const [subcategoryData, setSubcategoryData] = useState({
        name: "",
        image: "",
        category: []
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSubcategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadSubcategoryImage = async (e) => {
        try {
            setLoadingImage(true);
            const file = e.target.files[0];
            const response = await UploadImage(file);

            const {data: responseData} = response;
            setSubcategoryData((prev) => {
                return {
                    ...prev,
                    image: responseData.data.url
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingImage(false);
        }
    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subcategoryData.category.findIndex(el => el._id === categoryId);
        subcategoryData.category.splice(index, 1);
        setSubcategoryData((prev) => {
            return {
                ...prev,
            }
        })
    }

    const handleSubmitSubcategory = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.addSubCategory,
                data: subcategoryData
            });

            const {data: responseData} = response;
            if (responseData.success) {
                toast.success(responseData.message);
                if (close) {
                    close()
                }
                if (fetchData) {
                    fetchData()
                }
            }
        } catch (e) {
            AxiosToastError(e);
        }
    }
    return (
        <section
            className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-5xl bg-white p-4 rounded'>
                <div className='flex items-center justify-between gap-3'>
                    <h1 className='font-semibold'>Add Sub Category</h1>
                    <button onClick={close}>
                        <IoClose size={25}/>
                    </button>
                </div>
                <form onSubmit={handleSubmitSubcategory} className='my-3 grid gap-3'>
                    <div className='grid gap-1'>
                        <label htmlFor='name'>Name</label>
                        <input
                            id='name'
                            name='name'
                            value={subcategoryData.name}
                            onChange={handleChange}
                            className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded '
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <div className='border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center'>
                                {
                                    !subcategoryData.image ? (
                                        <p className='text-sm text-neutral-400'>No Image</p>
                                    ) : (
                                        <img
                                            alt='subCategory'
                                            src={subcategoryData.image}
                                            className='w-full h-full object-scale-down'
                                        />
                                    )
                                }
                            </div>
                            {
                                loadingImage ? (
                                    <div
                                        className='px-4 py-1 border border-primary-100 text-primary-200 rounded'>
                                        Loading...
                                    </div>
                                ) : (
                                    <label htmlFor='uploadSubCategoryImage'>
                                        <div
                                            className='px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900 cursor-pointer  '>
                                            Upload Image
                                        </div>
                                        <input
                                            type='file'
                                            id='uploadSubCategoryImage'
                                            className='hidden'
                                            onChange={handleUploadSubcategoryImage}
                                        />
                                    </label>
                                )
                            }

                        </div>
                    </div>

                    <div className='grid gap-1'>
                        <label>Select Category</label>
                        <div className='border focus-within:border-primary-200 rounded'>
                            {/*display value**/}
                            <div className='flex flex-wrap gap-2'>
                                {
                                    subcategoryData.category.map((cat, index) => {
                                        return (
                                            <p key={cat._id + "selectedValue"}
                                               className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                                {cat.name}
                                                <div className='cursor-pointer hover:text-red-600'
                                                     onClick={() => handleRemoveCategorySelected(cat._id)}>
                                                    <IoClose size={20}/>
                                                </div>
                                            </p>
                                        )
                                    })
                                }
                            </div>

                            {/*select category**/}
                            <select
                                className='w-full p-2 bg-transparent outline-none border'
                                onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id === value)

                                    setSubcategoryData((preve) => {
                                        return {
                                            ...preve,
                                            category: [...preve.category, categoryDetails]
                                        }
                                    })
                                }}
                            >
                                <option value={""}>Select Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return (
                                            <option value={category?._id}
                                                    key={category._id + "subcategory"}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button
                        className={`px-4 py-2 border
                            ${subcategoryData?.name && subcategoryData?.image && subcategoryData?.category[0] ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"}    
                            font-semibold
                        `}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

export default UploadSubCategoryModel;