import Axios from "./Axios.js";
import summaryApi from "../common/SummaryApi.js";


const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image);
        return await Axios({
            ...summaryApi.uploadImage,
            data: formData,
        });
    } catch (e) {
        return e;
    }
}

export default uploadImage;