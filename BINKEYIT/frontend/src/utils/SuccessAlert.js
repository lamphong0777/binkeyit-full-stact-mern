import Swal from "sweetalert2";

const SuccessAlert = (title) => {
    return Swal.fire({
        icon: "success",
        title: title,
        confirmButtonColor: "#00b050"
    });
}

export default SuccessAlert;