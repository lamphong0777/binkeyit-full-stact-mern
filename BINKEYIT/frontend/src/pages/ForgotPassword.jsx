import {useState} from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {Link, useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
    });

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
        try {
            const response = await Axios({
                ...SummaryApi.forgotPassword,
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
                navigate("/verify-forgot-password-otp", {
                    state: {
                        email: data.email,
                    }
                });
                setData({
                    email: "",
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
                    className={'text-green-500 font-semibold'}>it</span> - Forgot password</p>
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

                    <button disabled={!validateValue}
                            className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-700"} text-white font-semibold p-2 rounded mt-2 w-full`}>Send email
                    </button>
                </form>

                <p className={'mt-1'}>Already have account. <Link to={"/login"} className={'font-semibold text-green-800 hover:text-green-500'}>Login</Link></p>
            </div>
        </section>
    )
}

export default ForgotPassword