import { colorBadgeSelectFormItemRenderOption } from 'src/view/shared/form/items/ColorBadgeSelectFormItem';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import selectors from 'src/modules/taskList/taskListSelectors';
import taskListEnumerators from 'src/modules/taskList/taskListEnumerators';
import TaskListFormModal from 'src/view/taskList/form/TaskListFormModal';
import TaskListService from 'src/modules/taskList/taskListService';

function renderTags(values, getTagProps, ownerState) {
  return values.map((value, index) => (
    <MDBox key={index} mr={0.4} mb={0.4}>
      <ColorBadge
        label={value.label}
        color={value.color}
        {...getTagProps({ index })}
      />
    </MDBox>
  ));
}

function TaskListAutocompleteFormItem(props) {
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
    return TaskListService.listAutocomplete(value, limit);
  };

  const colorFn = (taskdisplaycolor) =>
    taskListEnumerators.taskdisplaycolorColor[
      taskListEnumerators.taskdisplaycolor.indexOf(
        taskdisplaycolor,
      )
    ];

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      const value = originalValue.id;
      let label = originalValue.label;
      let color =
        colorFn(originalValue.color) || originalValue.color;

      if (originalValue.name) {
        label = originalValue.name;
      }

      if (originalValue.taskdisplaycolor) {
        color = colorFn(originalValue.taskdisplaycolor);
      }

      return {
        key: value,
        value,
        label,
        color,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
        color: originalValue.color,
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
        renderOption={colorBadgeSelectFormItemRenderOption}
        renderTags={renderTags}
        rerender={rerender}
      />

      {modalVisible && (
        <TaskListFormModal
          onClose={doCloseModal}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default TaskListAutocompleteFormItem;
