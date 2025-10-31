import { useRef } from 'react';

function Modal({ btnLabel, btnClassName, children, disabled }) {
    const modalRef = useRef();

    function openModal() {
        if (!disabled) {
            modalRef.current.showModal();
        }
    }

    function closeModal() {
        modalRef.current.close();
    }

    function handleBackdropClick(e) {
        const rect = modalRef.current.getBoundingClientRect();
        const isInDialog =
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width;

        if (!isInDialog) {
            closeModal();
        }
    }

    return (
        <>
            <button
                onClick={openModal}
                className={btnClassName}
                disabled={disabled}
            >
                {btnLabel}
            </button>
            <dialog ref={modalRef} onClick={handleBackdropClick}>
                {typeof children === 'function'
                    ? children(closeModal)
                    : children}
            </dialog>
        </>
    );
}
export default Modal;
