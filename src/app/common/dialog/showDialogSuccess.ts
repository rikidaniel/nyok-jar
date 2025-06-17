import Swal from "sweetalert2";

export function showDialogSuccess() {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Data saved successfully!",
    showConfirmButton: false,
    timer: 1500
  }).then()
}
