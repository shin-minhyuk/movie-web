import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const autoClose = 1000

export const notify = ({ type, text }) => {
  switch (type) {
    case 'default':
      toast(text)
      break
    case 'success':
      toast.success(text)
      break
    case 'warning':
      toast.warning(text)
      break
    case 'error':
      toast.error(text)
      break
  }
}

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={autoClose}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
  )
}

export default Toast
