import Swal from "sweetalert2";

export function showDialogError(message: string){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    allowOutsideClick: false,
    // footer: '<a href="#">Why do I have this issue?</a>'
  }).then();
}
