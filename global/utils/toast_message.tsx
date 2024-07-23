import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastMessage = () => {
  useEffect(() => {
    import("react-toastify").then((module) => {
      // the library uses browser modules so we can only use it on
      // the client side, hence the import is inside useEffect()
    });
  }, []);

  return <ToastContainer />;
};

export const showToast = (message: string, type: "success" | "error" | "warning") => {
  const autoCloseTimeMs = 5000;

  switch (type) {
    case "success":
      toast.success(message, {
        autoClose: autoCloseTimeMs,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "error":
      toast.error(message, {
        autoClose: autoCloseTimeMs,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case "warning":
      toast.warning(message, {
        autoClose: autoCloseTimeMs,
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      break;
  }
};

export default ToastMessage;
