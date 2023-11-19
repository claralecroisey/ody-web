import { Field, Formik } from 'formik';
import { EditableContent } from '../components/form/EditableContent';
import * as Yup from 'yup';

const AddJobSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  url: Yup.string().required('Required'),
});

export function AddJob() {
  return (
    <div className="container flex h-full flex-col">
      <h1 className="mb-12 text-2xl font-semibold">Add a new Job listing</h1>
      <Formik
        initialValues={{
          title: '',
          role: '',
          description: '',
          companyId: '',
          url: '',
        }}
        validationSchema={AddJobSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(JSON.stringify(values, null, 2));
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="flex justify-center">
            <form
              className="flex w-4/5 flex-col items-stretch space-y-4"
              onSubmit={handleSubmit}
            >
              <label htmlFor="title">Title</label>
              <input
                type="text"
                placeholder="Web Software Engineer"
                className="input input-bordered w-full"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <span className="text-sm text-error">
                {errors.title && touched.title && errors.title}
              </span>

              <label htmlFor="role">Role</label>
              <Field as="select" name="role" className="select select-bordered">
                <option>Select a role</option>
                <option>Fullstack Engineer</option>
                <option>Frontend Engineer</option>
                <option>Backend Engineer</option>
                <option>Solutions Engineer</option>
              </Field>
              <span className="text-sm text-error">
                {errors.role && touched.role && errors.role}
              </span>

              <label htmlFor="description">Description</label>
              <EditableContent name="description" />
              <span className="text-sm text-error">
                {errors.description &&
                  touched.description &&
                  errors.description}
              </span>

              <label htmlFor="url">Job listing URL</label>
              <input
                type="text"
                placeholder="https://www.linkedin.com/jobs/view/1234567890/"
                className="input input-bordered w-full"
                name="url"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.url}
              />
              <span className="text-sm text-error">
                {errors.url && touched.url && errors.url}
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-sm self-center"
              >
                Add job
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
