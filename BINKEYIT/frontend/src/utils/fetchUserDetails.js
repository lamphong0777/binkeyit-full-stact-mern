import summaryApi from "../common/SummaryApi.js";
import Axios from "./Axios.js";

const fetchUserDetails = async () => {
    try {
        const response = await Axios({
            ...summaryApi.userDetails,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default fetchUserDetails;