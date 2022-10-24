import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import NewsFavoriteFormModal from 'src/view/newsFavorite/form/NewsFavoriteFormModal';
import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import selectors from 'src/modules/newsFavorite/newsFavoriteSelectors';

function NewsFavoriteAutocompleteFormItem(props) {
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
    return NewsFavoriteService.listAutocomplete(
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

      if (originalValue.id) {
        label = originalValue.id;
      }

      return {
        key: value,
        value,
        label,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
      };
    },
  };

  return (
    <>
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        rerender={rerender}
      />

      {modalVisible && (
        <NewsFavoriteFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default NewsFavoriteAutocompleteFormItem;
