import { useState } from 'react';
import { useUpdateJobApplicationMutation } from '../queries/useUpdateJobApplicationMutation';
import { JobApplicationData } from '../types/JobApplication';
import { Formik } from 'formik';
import { ModalBody, ModalHeader } from './ui/Modal';
import { EditableContent } from './form/EditableContent';

export function JobApplicationModalContent({
  job: { id, title, companyName, description },
}: {
  job: JobApplicationData;
}) {
  const { mutateAsync: updateJob } = useUpdateJobApplicationMutation();
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <Formik
        initialValues={{
          title,
          description,
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
                <button className="place-self-end" type="submit">
                  Save
                </button>
                <ModalHeader>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Title"
                      className="input input-bordered w-full max-w-xs text-2xl font-medium"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <br />
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
                  className="place-self-end"
                  onClick={e => {
                    e.preventDefault();
                    setIsEditMode(true);
                  }}
                >
                  Edit
                </button>
                <ModalHeader>
                  <h1 className="text-2xl font-medium">{values.title}</h1>
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
    </>
  );
}
