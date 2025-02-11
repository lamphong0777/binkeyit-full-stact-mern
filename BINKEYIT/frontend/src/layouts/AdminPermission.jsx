import {useSelector} from "react-redux";
import isAdmin from "../utils/isAdmin.js";


const AdminPermission = ({children}) => {
    const user = useSelector((state) => state.user);
    return (
        <>
            {
                isAdmin(user.role) ? children : <p className={'text-red-600 bg-red-100 p-4'}>Do not have permission</p>
            }
        </>
    )
}

export default AdminPermission;