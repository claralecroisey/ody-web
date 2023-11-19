import sanitizeHtml from 'sanitize-html';
import ContentEditable from 'react-contenteditable';
import { useField } from 'formik';
import { useCallback } from 'react';

export function EditableContent({
  name,
}: {
  name: string;
  onBlur?: (value: string) => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);

  const onContentChange = useCallback(
    (evt: { currentTarget: { innerHTML: string } }) => {
      const sanitizeConf = {
        allowedTags: ['b', 'i', 'a', 'p', 'br', 'ul', 'li', 'ol', 'h1', 'h2'],
        allowedAttributes: { a: ['href'] },
      };

      const content = sanitizeHtml(evt.currentTarget.innerHTML, sanitizeConf);
      helpers.setValue(content);
    },
    [helpers],
  );

  return (
    <ContentEditable
      className="textarea textarea-bordered min-h-16"
      placeholder="Copy the job description here"
      onChange={onContentChange}
      onBlur={onContentChange}
      html={field.value}
    />
  );
}
