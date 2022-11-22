import { Avatar, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import authSelectors from 'src/modules/auth/authSelectors';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import MDBox from 'src/mui/components/MDBox';
import selectors from 'src/modules/teacher/teacherSelectors';
import TeacherService from 'src/modules/teacher/teacherService';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';

function TeacherAutocompleteFormItem(props) {
  const { mode, name, rerender: parentRerender } = props;

  const { setValue, getValues } = useFormContext();

  const isMultiple = mode && mode === 'multiple';

  const [avatar, setAvatar] = useState(null);
  const [rerender, setRerender] = useState(0);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const currentTeacher = useSelector(
    authSelectors.selectCurrentUser,
  );

  const onChangeTeacherAutocomplete = (value) => {
    setAvatar(
      (value && (value.avatar || getUserAvatar(value))) ??
        null,
    );
  };

  const doSelectCurrentTeacher = () => {
    const teacher = {
      id: currentTeacher.id,
      label: getUserNameOrEmailPrefix(currentTeacher),
      avatar: getUserAvatar(currentTeacher),
    };
    if (isMultiple) {
      setValue(
        name,
        [...(getValues()[name] || []), teacher],
        {
          shouldValidate: false,
          shouldDirty: true,
        },
      );
    } else {
      setValue(name, teacher, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
    setRerender(rerender + 1);
  };

  const fetchFn = (value, limit) => {
    return TeacherService.fetchTeacherAutocomplete(
      value,
      limit,
    );
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        value: originalValue.id,
        avatar: originalValue.avatar,
        label: originalValue.label,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        avatar: originalValue.avatar,
        label: originalValue.label,
      };
    },
  };

  useEffect(() => {
    setRerender(rerender + 1);
  }, [parentRerender]);

  return (
    <>
      <MDBox position="relative" pl={4.8}>
        <Avatar
          src={avatar}
          sx={{
            position: 'absolute',
            flexShrink: 0,
            bottom: 4,
            left: 0,
            width: 32,
            height: 32,
          }}
        />
        <AutocompleteInMemoryFormItem
          {...props}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Avatar
                src={option.avatar}
                alt={option.label}
                sx={{
                  width: 24,
                  height: 24,
                  mr: 1,
                }}
              />
              {option.label}
            </Box>
          )}
          fetchFn={fetchFn}
          mapper={mapper}
          onOpenModal={() => doSelectCurrentTeacher()}
          hasPermissionToCreate={hasPermissionToCreate}
          rerender={rerender}
          onChange={onChangeTeacherAutocomplete}
          createButtonIcon={<AccountCircleIcon />}
        />
      </MDBox>
    </>
  );
}

export default TeacherAutocompleteFormItem;
