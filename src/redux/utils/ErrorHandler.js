import toastr from 'toastr'

export default function ErrorHandler (error) {
  const options = {
    'closeButton': true,
    'progressBar': true,
    'showDuration': '300',
    'hideDuration': '1000',
    'timeOut': '5000'
  }
  toastr.error(error, 'Error', options)
}
