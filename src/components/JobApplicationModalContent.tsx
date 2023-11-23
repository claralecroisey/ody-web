import { useRef, useState } from 'react';
import { useUpdateJobApplicationMutation } from '../queries/useUpdateJobApplicationMutation';
import { JobApplicationData } from '../types/JobApplication';
import { Field, Formik } from 'formik';
import { Modal, ModalActions, ModalBody, ModalHeader } from './ui/Modal';
import { EditableContent } from './form/EditableContent';
import { useDeleteJobApplicationMutation } from '../queries/useDeleteJobApplicationMutation';
import { UUID } from 'crypto';
import Tag from './ui/Tag';
import { JobApplicationStatuses } from '../consts/jobApplication';

export function JobApplicationModalContent({
  job: { id, title, companyName, description, status },
  onDelete,
}: {
  job: JobApplicationData;
  onDelete: () => void;
}) {
  const deleteModalRef = useRef<HTMLDialogElement>(null);
  const { mutateAsync: updateJob } = useUpdateJobApplicationMutation();
  const { mutateAsync: deleteJob } = useDeleteJobApplicationMutation();
  const [isEditMode, setIsEditMode] = useState(false);

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: UUID,
  ) {
    e.preventDefault();
    await deleteJob(id);

    // Close stacked modals
    deleteModalRef.current?.close();
    onDelete();
  }

  return (
    <>
      <Formik
        initialValues={{
          title,
          description,
          status,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            await updateJob({ id, data: values });
          } catch (error) {
            // TODO: Handle error
          } finally {
            setSubmitting(false);
            setIsEditMode(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {isEditMode ? (
              <>
                <button className="mb-2 place-self-end" type="submit">
                  Save
                </button>
                <ModalHeader>
                  <div className="space-y-4">
                    <div className="flex justify-between align-bottom">
                      <input
                        type="text"
                        placeholder="Title"
                        className="input input-bordered w-full max-w-xs text-2xl font-medium"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Field
                        as="select"
                        name="status"
                        className="select select-bordered select-sm self-start"
                      >
                        {Object.entries(JobApplicationStatuses).map(
                          ([enumValue, strValue]) => (
                            <option key={enumValue} value={enumValue}>
                              {strValue}
                            </option>
                          ),
                        )}
                      </Field>
                    </div>
                    <span>{companyName}</span>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <EditableContent name="description" />
                </ModalBody>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="mb-4 place-self-end"
                  onClick={e => {
                    e.preventDefault();
                    setIsEditMode(true);
                  }}
                >
                  Edit
                </button>
                <ModalHeader>
                  <div className="flex justify-between align-bottom">
                    <h1 className="text-2xl font-medium">{values.title}</h1>
                    <Tag color="gray">
                      {JobApplicationStatuses[values.status]}
                    </Tag>
                  </div>
                  <span>{companyName}</span>
                </ModalHeader>
                <ModalBody>
                  <div className="h-48 overflow-x-auto border-b-2 border-solid border-gray-100 p-2">
                    {values.description}
                  </div>
                </ModalBody>
              </>
            )}
          </form>
        )}
      </Formik>
      <ModalActions>
        <div className="flex flex-col items-center space-y-2">
          <a
            className="link-error link flex items-center self-center text-sm"
            onClick={() => deleteModalRef.current?.showModal()}
          >
            Delete this job application
          </a>
          <button className="btn btn-sm">Close</button>
        </div>
      </ModalActions>

      {/* Delete Job application Modal */}
      <Modal size="sm" ref={deleteModalRef}>
        <ModalBody>
          <span className="text-xl">
            Are you sure you want to delete this job application?
          </span>
        </ModalBody>
        <ModalActions>
          <button
            onClick={e => handleDelete(e, id)}
            className="btn btn-error btn-sm"
          >
            Yes, delete
          </button>
          <button className="btn btn-sm">Cancel</button>
        </ModalActions>
      </Modal>
    </>
  );
}
