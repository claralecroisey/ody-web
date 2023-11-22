import { ForwardedRef, ReactNode, forwardRef } from 'react';

export const ModalHeader = ({ children }: { children: ReactNode }) => (
  <div className="pb-6">{children}</div>
);

export const ModalBody = ({ children }: { children: ReactNode }) => (
  <p className="py-4">{children}</p>
);

export const Modal = forwardRef(function (
  { children }: { children: ReactNode },
  ref: ForwardedRef<HTMLDialogElement> | null,
) {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box flex h-4/5 w-11/12 max-w-screen-md flex-col justify-between">
        <div id="modal-content">{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <div className="flex items-center justify-end space-x-10">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
});
