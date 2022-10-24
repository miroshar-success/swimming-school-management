import { FormProvider, useForm } from 'react-hook-form';
import { i18n } from 'src/i18n';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Errors from 'src/modules/shared/error/errors';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import MDBox from 'src/mui/components/MDBox';
import LazyLoad from 'react-lazy-load';

const schema = yup.object().shape({
  tags: yupFormSchemas.relationToMany(
    i18n('entities.tag.label'),
    {},
  ),
});

function TagAutocompleteForm(props) {
  const { name, label, id, tags, handleService } = props;

  const [initialValues] = useState({
    tags: tags || [],
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = async (values) => {
    try {
      await handleService(id, values);
    } catch (error) {
      Errors.handle(error);
    }
  };

  return (
    <MDBox flexGrow={1} width="100%">
      <LazyLoad>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TagAutocompleteFormItem
                name={name}
                label={label}
                onChange={form.handleSubmit(onSubmit)}
                value={tags}
                forceValue
              />
            </form>
          </FormProvider>
        </FormWrapper>
      </LazyLoad>
    </MDBox>
  );
}

TagAutocompleteForm.defaultProps = {
  name: 'tags',
};

TagAutocompleteForm.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  handleService: PropTypes.func.isRequired,
};

export default TagAutocompleteForm;
