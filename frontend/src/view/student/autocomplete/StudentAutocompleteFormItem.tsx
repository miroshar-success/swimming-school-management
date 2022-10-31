import { Avatar, Box } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import authSelectors from 'src/modules/auth/authSelectors';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import MDBox from 'src/mui/components/MDBox';
import selectors from 'src/modules/user/userSelectors';
import UserService from 'src/modules/user/userService';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';

function StudentAutocompleteFormItem(props) {
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

  const isMultiple = mode && mode === 'multiple';

  const [avatar, setAvatar] = useState(null);
  const [rerender, setRerender] = useState(0);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const currentUser = useSelector(
    authSelectors.selectCurrentUser,
  );

  const onChangeUserAutocomplete = (value) => {
    setAvatar(
      (value && (value.avatar || getUserAvatar(value))) ??
        null,
    );
  };

  const doSelectCurrentUser = () => {
    const user = {
      id: currentUser.id,
      label: getUserNameOrEmailPrefix(currentUser),
      avatar: getUserAvatar(currentUser),
    };
    if (isMultiple) {
      setValue(name, [...(getValues()[name] || []), user], {
        shouldValidate: false,
        shouldDirty: true,
      });
    } else {
      setValue(name, user, {
        shouldValidate: false,
        shouldDirty: true,
      });
    }
    setRerender(rerender + 1);
  };

  const fetchFn = (value, limit) => {
    return UserService.fetchUserAutocomplete(value, limit);
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
          onOpenModal={() => doSelectCurrentUser()}
          hasPermissionToCreate={hasPermissionToCreate}
          rerender={rerender}
          onChange={onChangeUserAutocomplete}
          createButtonIcon={<AccountCircleIcon />}
        />
      </MDBox>
    </>
  );
}

export default StudentAutocompleteFormItem;
