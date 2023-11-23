import { ForwardedRef, ReactNode, forwardRef } from 'react';

export const ModalHeader = ({ children }: { children: ReactNode }) => (
  <>
    <div>{children}</div>
    <div className="divider"></div>
  </>
);

export const ModalBody = ({ children }: { children: ReactNode }) => (
  <div className="py-4">{children}</div>
);

export const ModalActions = ({ children }: { children: ReactNode }) => (
  <div className="modal-action mt-2 justify-center">
    <form method="dialog">
      <div className="flex items-center space-x-4">
        {/* if there is a button in form, it will close the modal */}
        {children}
      </div>
    </form>
  </div>
);

export const Modal = forwardRef(function (
  { size = 'lg', children }: { size?: 'sm' | 'lg'; children: ReactNode },
  ref: ForwardedRef<HTMLDialogElement> | null,
) {
  const sizeClasses = size === 'sm' ? 'w-1/2' : 'h-4/5 w-11/12 max-w-screen-md';
  return (
    <dialog ref={ref} className="modal">
      <div className={`modal-box flex ${sizeClasses} flex-col justify-between`}>
        {children}
      </div>
    </dialog>
  );
});
