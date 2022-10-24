import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import LazyLoad from 'react-lazy-load';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import ReactTagsRoot from 'src/view/tag/autocomplete/ReactTagsRoot';
import TagService from 'src/modules/tag/tagService';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function TagAutocompleteFormItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();

  const {
    autoComplete,
    autoFocus,
    externalErrorMessage,
    forceValue,
    label,
    name,
    onChange,
    required,
    rerender,
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
    (formValue || value || defaultValues[name] || []).map(
      (v) => (autoComplete ? v : { id: v.tag, tag: v.tag }),
    );

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue) {
    setValue(name, value || [], {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setCurValue(value || []);
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

  const [suggestions, setSuggestions] = useState([]);
  let dismounted = false;

  useEffect(() => {
    if (autoComplete) {
      const tagsPromise = new Promise<[]>(
        async (resolve) => {
          resolve(
            await TagService.listAutocomplete(null, null),
          );
        },
      );
      tagsPromise.then(
        (value) => !dismounted && setSuggestions(value),
      );
    }
    return () => {
      dismounted = true;
    };
  }, []);

  const updateCurrentValue = (newValue) => {
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    setCurValue(newValue);
    onChange && onChange(newValue);
  };

  const handleDelete = (i) => {
    updateCurrentValue(
      curValue.filter((tag, index) => index !== i),
    );
  };

  const handleAddition = (tag) => {
    updateCurrentValue([...curValue, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = curValue.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    updateCurrentValue(newTags);
  };

  const [focused, setFocused] = useState(false);

  const handleInputFocus = () => setFocused(true);
  const handleInputBlur = () => setFocused(false);

  const handleTagClick = () => {};

  return (
    <LazyLoad>
      <ReactTagsRoot
        ownerState={{ darkMode, sidenavColor }}
      >
        <MDBox
          pt={
            Boolean(label) && label.trim() !== '' ? 1.6 : 0
          }
          position="relative"
        >
          {Boolean(label) && label.trim() !== '' && (
            <MDTypography
              variant="caption"
              color={
                focused
                  ? sidenavColor
                  : darkMode
                  ? 'text'
                  : 'secondary'
              }
              fontWeight="regular"
              position="absolute"
              lineHeight="1"
              top="0"
            >
              {label}
            </MDTypography>
          )}
          <MDBox position="relative">
            <ReactTags
              autocomplete
              autofocus={autoFocus}
              delimiters={delimiters}
              handleAddition={handleAddition}
              handleDelete={handleDelete}
              handleDrag={handleDrag}
              handleInputBlur={handleInputBlur}
              handleInputFocus={handleInputFocus}
              handleTagClick={handleTagClick}
              inputFieldPosition="inline"
              labelField="tag"
              maxLength={50}
              minQueryLength={2}
              placeholder={i18n(
                'entities.tag.placeholders.input',
              )}
              suggestions={suggestions}
              tags={curValue}
            />
            {errorMessage && (
              <MDBox mt={0.6}>
                <MDTypography
                  component="div"
                  variant="caption"
                  color="error"
                  fontWeight="regular"
                >
                  {errorMessage}
                </MDTypography>
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </ReactTagsRoot>
    </LazyLoad>
  );
}

TagAutocompleteFormItem.defaultProps = {
  autoComplete: false,
  autoFocus: false,
  forceValue: false,
  required: false,
};

TagAutocompleteFormItem.propTypes = {
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  forceValue: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

export default TagAutocompleteFormItem;
