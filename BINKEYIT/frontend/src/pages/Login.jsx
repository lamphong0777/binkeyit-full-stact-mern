import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {Link, useNavigate} from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails.js";
import {setUserDetail} from "../store/userSlice.js";
import {useDispatch} from "react-redux";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            }
        })
    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const validateValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: data,
                validateStatus: (status) => {
                    return status >= 200 && status < 500; // Cho phép các status < 500 không bị coi là lỗi
                },
            });
            if (response.data.error) {
                toast.error(response.data.message);
            }
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
                const userDetails = await fetchUserDetails();
                dispatch(setUserDetail(userDetails.data));

                setData({
                    email: "",
                    password: "",
                });

                navigate("/");
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
                    className={'text-green-500 font-semibold'}>it</span> - Login</p>
                <form className="gird gap-2 mt-5" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            autoFocus={true}
                            id="email"
                            name="email"
                            placeholder="binkeyit@gmail.com"
                            className="bg-blue-50 p-2 border rounded"
                            value={data.email}
                            onChange={handleChange}/>
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="password">Password: </label>
                        <div
                            className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-secondary-100">
                            <input
                                type={showPassword ? "text" : "password"}
                                autoFocus={true}
                                id="password"
                                name="password"
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

                    <button disabled={!validateValue}
                            className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-700"} text-white font-semibold p-2 rounded mt-2 w-full`}>Login
                    </button>
                </form>

                <p className={'mt-1'}>Don&#39;t have an account. <Link to={"/register"}
                                                                       className={'font-semibold text-green-800 hover:text-green-500'}>Register</Link>
                </p>
                <p className={'mt-1'}>Forgot password. <Link to={"/forgot-password"}
                                                                       className={'font-semibold text-green-800 hover:text-green-500'}>Click here</Link>
                </p>
            </div>
        </section>
    )
}

export default Login