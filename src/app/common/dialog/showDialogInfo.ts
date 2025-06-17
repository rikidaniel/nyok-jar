import Swal from "sweetalert2";

export function showDialogInfo(message: string){
  Swal.fire({
    icon: "info",
    title: "Info!",
    text: message,
    allowOutsideClick: false,
    // footer: '<a href="#">Why do I have this issue?</a>'
  }).then();
}
