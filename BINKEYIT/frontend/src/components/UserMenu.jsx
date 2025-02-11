import {IoIosLogOut} from "react-icons/io";
import Axios from "../utils/Axios.js";
import summaryApi from "../common/SummaryApi.js";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/userSlice.js";
import toast from "react-hot-toast";
import Divider from "./Divider.jsx";
import {Link, useNavigate} from "react-router-dom";
import {BiLinkExternal} from "react-icons/bi";
import isAdmin from "../utils/isAdmin.js";

const UserMenu = ({close}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...summaryApi.logout
            })
            // console.log("logout", response)
            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleClose = () => {
        if (close) {
            close()
        }
    }

    return (
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile}</span>
                <Link onClick={handleClose} to={'/dashboard/profile'} className="text-primary-200"><BiLinkExternal
                    size={15}/></Link>
                <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : ""}</span>
            </div>

            <Divider/>
            <div className='text-sm grid gap-1'>
                {
                    isAdmin(user.role) && (
                        <div className='flex flex-col gap-1'>
                            <Link onClick={handleClose} to={"/dashboard/category"}
                                  className='px-2 hover:bg-orange-500 py-1'>Category</Link>

                            <Link onClick={handleClose} to={"/dashboard/subcategory"}
                                  className='px-2 hover:bg-orange-500 py-1'>Sub
                                category</Link>

                            <Link onClick={handleClose} to={"/dashboard/upload-product"}
                                  className='px-2 hover:bg-orange-500 py-1'>Upload
                                product</Link>

                            <Link onClick={handleClose} to={"/dashboard/product"}
                                  className='px-2 hover:bg-orange-500 py-1'>Product</Link>
                        </div>
                    )
                }

                <Link onClick={handleClose} to={"/dashboard/my-orders"} className='px-2 hover:bg-orange-500 py-1'>My
                    orders</Link>

                <Link onClick={handleClose} to={"/dashboard/save-address"} className='px-2 hover:bg-orange-500 py-1'>Save
                    Address</Link>

                <button onClick={handleLogout} className='text-left px-2 text-orange-800 hover:bg-orange-500 py-1 flex items-center'>
                    <IoIosLogOut size={21}/> Log Out
                </button>
            </div>
        </div>
    )
        ;
}

export default UserMenu;