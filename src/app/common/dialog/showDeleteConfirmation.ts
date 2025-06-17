import Swal from 'sweetalert2';

export function showDeleteConfirmation(message?: string) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success m-1',
      cancelButton: 'btn btn-danger m-1'
    },
    buttonsStyling: false,
    allowOutsideClick: false,
  });

  return swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete!',
    cancelButtonText: 'No, cancel!',
    allowOutsideClick: false,
    reverseButtons: true
  });
}

export function showDeletedMessage() {
  Swal.fire({
    title: 'Deleted!',
    text: 'Your data has been deleted.',
    icon: 'success',
    allowOutsideClick: false,
  }).then();
}

export function showCancelledMessage() {
  Swal.fire({
    title: 'Cancelled',
    text: 'Your data is safe :)',
    icon: 'error',
    allowOutsideClick: false,
  }).then();
}
