import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
    const hanldeShowConfirmPassword = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    }
    const validateValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(data.password !== data.password_confirmation) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data,
            });
            if(response.data.error) {
                toast.error(response.data.message);
            }
            if(response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                });
                navigate("/login");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <section className="container w-full mx-auto px-2">
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
                <p className={'text-2xl border-b border-b-green-500'}>Welcome to <span className={'font-semibold text-yellow-500'}>Binkey</span><span className={'text-green-500 font-semibold'}>it</span></p>
                <form className="gird gap-2 mt-5" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            autoFocus={true}
                            id="name"
                            name="name"
                            placeholder="Binkeyit Com"
                            className="bg-blue-50 p-2 border rounded"
                            value={data.name}
                            onChange={handleChange}/>
                    </div>

                    <div className="grid gap-1">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
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

                    <div className="grid gap-1">
                        <label htmlFor="password_confirmation">Password confirm: </label>
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
                            className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-700"} text-white font-semibold p-2 rounded mt-2 w-full`}>Register
                    </button>
                </form>

                <p className={'mt-1'}>Already have account. <Link to={"/login"} className={'font-semibold text-green-800 hover:text-green-500'}>Login</Link></p>
            </div>
        </section>
    )
}

export default Register