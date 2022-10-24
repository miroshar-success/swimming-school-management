import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import MDBox from 'src/mui/components/MDBox';
import ProductCategoryFormModal from 'src/view/productCategory/form/ProductCategoryFormModal';
import ProductCategoryService from 'src/modules/productCategory/productCategoryService';
import selectors from 'src/modules/productCategory/productCategorySelectors';

function ProductCategoryAutocompleteFormItem(props) {
  const {
    autoFocus,
    label,
    margin,
    mode,
    name,
    required,
    rerender: parentRerender,
    shrink,
    size,
    variant,
  } = props;

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
    return ProductCategoryService.listAutocomplete(
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

      if (originalValue.name) {
        label = originalValue.name;
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

  useEffect(() => {
    setRerender(rerender + 1);
  }, [parentRerender]);

  return (
    <MDBox position="relative">
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={doOpenModal}
        hasPermissionToCreate={hasPermissionToCreate}
        rerender={rerender}
      />

      {modalVisible && (
        <ProductCategoryFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </MDBox>
  );
}

export default ProductCategoryAutocompleteFormItem;
