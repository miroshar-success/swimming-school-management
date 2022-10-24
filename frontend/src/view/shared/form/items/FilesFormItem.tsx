import { FormControl, FormHelperText } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function FilesFormItem(props) {
  const { darkMode } = selectMuiSettings();

  const {
    externalErrorMessage,
    forceValue,
    formats,
    hint,
    label,
    max,
    name,
    onChange,
    required,
    rerender,
    storage,
    value,
  } = props;

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : value || defaultValues[name] || [];

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setCurValue(value);
    }
  }, [value]);

  const refresh = useSelector(formSelectors.selectRefresh);

  useEffect(() => {
    setCurValue(getInitialValue());
  }, [rerender, refresh]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const formHelperText = errorMessage || hint;

  return (
    <FormControl
      fullWidth
      required={required}
      error={Boolean(errorMessage)}
      component="fieldset"
      size="small"
    >
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          fontWeight="regular"
          color={darkMode ? 'text' : 'secondary'}
        >
          {`${label}${required ? ' *' : ''}`}
        </MDTypography>
      )}

      <FilesUploader
        storage={storage}
        formats={formats || storage.formats}
        value={curValue}
        onChange={(value) => {
          setCurValue(value);
          setValue(name, value, {
            shouldValidate: false,
            shouldDirty: true,
          });
          onChange && onChange(value);
        }}
        max={max}
      />

      {formHelperText && (
        <FormHelperText
          style={{ marginTop: 0, fontWeight: 400 }}
        >
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

FilesFormItem.defaultProps = {
  forceValue: false,
  max: undefined,
  required: false,
};

FilesFormItem.propTypes = {
  forceValue: PropTypes.bool,
  formats: PropTypes.any,
  formItemProps: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  storage: PropTypes.object.isRequired,
  value: PropTypes.array,
};

export default FilesFormItem;
