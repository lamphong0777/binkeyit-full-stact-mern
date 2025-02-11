import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {useLocation, useNavigate} from "react-router-dom";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa6";

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [data, setData] = useState({
        new_password: "",
        password_confirmation: "",
    });
    console.log("location", location);
    useEffect(() => {
        if(!location?.state?.data?.success) {
            navigate("/forgot-password");
        }
    }, []);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const hanldeShowConfirmPassword = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            }
        })
    }
    const validateValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(data.new_password !== data.password_confirmation) {
            toast.error("Passwords don't match");
            return;
        }
        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: {
                    new_password: data.new_password,
                    confirm_password: data.password_confirmation,
                    email: location?.state?.email,
                },
                validateStatus: (status) => {
                    return status >= 200 && status < 500; // Cho phép các status < 500 không bị coi là lỗi
                },
            });
            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/");
                setData({
                    new_password: "",
                    password_confirmation: "",
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <section className="container w-full mx-auto px-2">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
                <p className={'text-2xl border-b border-b-green-500'}><span
                    className={'font-semibold text-yellow-500'}>Binkey</span><span
                    className={'text-green-500 font-semibold'}>it</span> - Reset password</p>
                <form className="gird gap-2 mt-5" onSubmit={handleSubmit}>
                    <div className="grid gap-1 mb-2">
                        <label htmlFor="password">New password: </label>
                        <div
                            className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-secondary-100">
                            <input
                                type={showPassword ? "text" : "password"}
                                autoFocus={true}
                                id="new_password"
                                name="new_password"
                                placeholder="*********"
                                className="w-full focus:outline-none bg-transparent"
                                value={data.password}
                                onChange={handleChange}/>
                            <div onClick={handleShowPassword} className="ms-1 cursor-pointer">
                                {
                                    showPassword ? <FaEye/> : <FaEyeSlash/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="password_confirmation">Confirm password: </label>
                        <div
                            className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-secondary-100">
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                autoFocus={true}
                                id="password_confirmation"
                                name="password_confirmation"
                                placeholder="*********"
                                className="w-full focus:outline-none bg-transparent"
                                value={data.password_confirmation}
                                onChange={handleChange}/>
                            <div onClick={hanldeShowConfirmPassword} className="ms-1 cursor-pointer">
                                {
                                    showPasswordConfirm ? <FaEye/> : <FaEyeSlash/>
                                }
                            </div>
                        </div>
                    </div>

                    <button disabled={!validateValue}
                            className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-700"} text-white font-semibold p-2 rounded mt-2 w-full`}>Reset password
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword