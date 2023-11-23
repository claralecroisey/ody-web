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

export const Modal = forwardRef(function (
  {
    size = 'lg',
    actions,
    children,
  }: { size?: 'sm' | 'lg'; actions: ReactNode; children: ReactNode },
  ref: ForwardedRef<HTMLDialogElement> | null,
) {
  const sizeClasses = size === 'sm' ? 'w-1/2' : 'h-4/5 w-11/12 max-w-screen-md';
  return (
    <dialog ref={ref} className="modal">
      <div className={`modal-box flex ${sizeClasses} flex-col justify-between`}>
        <div id="modal-content" className="flex flex-1 flex-col">
          {children}
        </div>
        <div className="modal-action mt-2">
          <form method="dialog">
            <div className="flex items-center justify-end space-x-10">
              {/* if there is a button in form, it will close the modal */}
              {actions}
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
});
