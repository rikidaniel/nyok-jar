import Swal from 'sweetalert2';

export function showDeleteUserConfirmation(expectedName: string) {
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
    html: `
      <p>Please type <strong>${expectedName}</strong> to confirm deletion.</p>
    `,
    input: 'text',
    inputPlaceholder: `Type the name: ${expectedName}`,
    showCancelButton: true,
    confirmButtonText: 'Yes, delete!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true,
    preConfirm: (inputValue) => {
      if (inputValue !== expectedName) {
        Swal.showValidationMessage(`The input must exactly match "${expectedName}"`);
        return false;
      }
      return true;
    }
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

