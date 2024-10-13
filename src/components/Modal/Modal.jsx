import { CgCloseO } from "react-icons/cg";

const Modal = ({isVisible,showModal,setShowModal,children}) => {
    if(!isVisible) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="w-full px-4 md:w-[650px] relative">
                <button onClick={()=> setShowModal(!showModal)} className="text-red-500 text-2xl absolute -top-3 right-1.5 bg-red-200 rounded-full"><CgCloseO /></button>
                <div className="bg-white p-2 md:p-10 rounded">{children}</div>
            </div>
        </div>
    );
};

export default Modal;