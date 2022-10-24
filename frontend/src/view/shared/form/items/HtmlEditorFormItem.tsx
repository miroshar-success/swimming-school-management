import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDEditor from 'src/mui/components/MDEditor';
import MDTypography from 'src/mui/components/MDTypography';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

interface HtmlEditorFormItemProps {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
}

function HtmlEditorFormItem({
  name,
  label,
  value,
  required,
}: HtmlEditorFormItemProps) {
  const { setValue } = useFormContext();
  const { darkMode } = selectMuiSettings();
  const [editorValue, setEditorValue] = useState(
    value ?? '',
  );
  const onChangeEditor = (newVal) => {
    setEditorValue(newVal);
    setValue(name, newVal, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };
  return (
    <MDBox
      pt={Boolean(label) ? 1.6 : 0}
      position="relative"
    >
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {label}
        </MDTypography>
      )}
      <MDEditor
        value={editorValue}
        onChange={onChangeEditor}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
          ],
        }}
        formats={[
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'link',
        ]}
      />
      <MDBox display="none">
        <TextAreaFormItem
          name={name}
          label={label}
          required={required ?? false}
          variant="standard"
          fullWidth
        />
      </MDBox>
    </MDBox>
  );
}

HtmlEditorFormItem.defaultProps = {
  value: '',
  required: false,
};

export default HtmlEditorFormItem;
