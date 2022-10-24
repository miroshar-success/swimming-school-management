import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import NewsArticleFormModal from 'src/view/newsArticle/form/NewsArticleFormModal';
import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import selectors from 'src/modules/newsArticle/newsArticleSelectors';
import Box from '@mui/material/Box';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { extractsDomain } from 'src/modules/utils';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function NewsArticleAutocompleteFormItem(props) {
  const { setValue, getValues } = useFormContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [rerender, setRerender] = useState(0);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const doCloseModal = () => {
    setModalVisible(false);
  };

  const doOpenModal = () => {
    setModalVisible(true);
  };

  const doCreateSuccess = (record) => {
    const { name, mode } = props;

    if (mode && mode === 'multiple') {
      setValue(
        name,
        [...(getValues()[name] || []), record],
        { shouldValidate: false, shouldDirty: true },
      );
    } else {
      setValue(name, record, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    setRerender(rerender + 1);

    doCloseModal();
  };

  const fetchFn = (value, limit) => {
    return NewsArticleService.listAutocomplete(
      value,
      limit,
    );
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      const value = originalValue.id;
      let label = originalValue.label;
      const link = originalValue.link;
      const date = originalValue.date;

      if (originalValue.title) {
        label = originalValue.title;
      }

      return {
        key: value,
        value,
        label,
        link,
        date,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
        link: originalValue.link,
        date: originalValue.date,
      };
    },
  };

  const { sidenavColor } = selectMuiSettings();

  const renderOption = (props, option) => {
    return (
      <Box component="li" {...props}>
        <MDBox>
          <MDTypography
            component="span"
            variant="button"
            fontWeight="regular"
            color={sidenavColor}
            mr={0.8}
          >
            {extractsDomain(option.link)}
          </MDTypography>
          <MDTypography
            component="span"
            variant="button"
            fontWeight="regular"
            textDecoration="underline"
          >
            {option.label}
          </MDTypography>
          <MDTypography
            display="block"
            component="span"
            variant="button"
            fontWeight="regular"
            color="text"
          >
            {moment(option.date).format(
              DEFAULT_MOMENT_FORMAT,
            )}
          </MDTypography>
        </MDBox>
      </Box>
    );
  };

  return (
    <>
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        renderOption={renderOption}
        rerender={rerender}
      />

      {modalVisible && (
        <NewsArticleFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default NewsArticleAutocompleteFormItem;
