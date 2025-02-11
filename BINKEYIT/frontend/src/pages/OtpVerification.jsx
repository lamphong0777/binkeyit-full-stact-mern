import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import {Link, useLocation, useNavigate} from "react-router-dom";

const OtpVerification = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);
    const location = useLocation();

    const validateValue = data.every(el => el);

    useEffect(() => {
        if(!location?.state?.email){
            navigate("/forgot-password");
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummaryApi.otpVerification,
                data: {
                    otp: data.join(""),
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
                setData(["", "", "", "", "", ""]);
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email,
                    }
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
                    className={'text-green-500 font-semibold'}>it</span> - Verify OTP</p>
                <form className="gird gap-2 mt-5" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="otp">Enter your OTP: </label>
                        <div className={"flex gap-1"}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <input
                                            key={"otp"+index}
                                            type="text"
                                            maxLength={1}
                                            value={data[index]}
                                            ref={(ref) => {
                                                inputRef.current[index] = ref;
                                                return ref;
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                let newData = [...data];
                                                newData[index] = value;
                                                setData(newData);
                                                if(value && (index+1 < data.length)) {
                                                    inputRef.current[index+1].focus();
                                                }
                                            }}
                                            id="otp"
                                            className="bg-blue-50 p-2 border rounded w-full text-center text-2xl"
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <button disabled={!validateValue}
                            className={`${validateValue ? "bg-green-700 hover:bg-green-800" : "bg-gray-700"} text-white font-semibold p-2 rounded mt-2 w-full`}>Verify
                    </button>
                </form>

                <p className={'mt-1'}>Already have account. <Link to={"/login"} className={'font-semibold text-green-800 hover:text-green-500'}>Login</Link></p>
            </div>
        </section>
    )
}

export default OtpVerification