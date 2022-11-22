import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/student/studentSelectors';
import MaterialLink from '@mui/material/Link';
import {
  getUserAvatar,
  getUserNameOrEmailPrefix,
} from 'src/modules/utils';
import { Avatar } from '@mui/material';

function RegistrationListItem(props) {
  const hasPermissionToRead = useSelector(
    selectors.selectPermissionToRead,
  );

  const valueAsArray = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const label = (record) =>
    getUserNameOrEmailPrefix(record);

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
          <MaterialLink
            display="flex"
            component={Link}
            to={`/student/${record.id}`}
            textTransform="capitalize"
            alignItems="center"
          >
            <Avatar
              src={getUserAvatar(record)}
              sx={{ mr: 1, width: 32, height: 32 }}
            />
            {label(record)}
          </MaterialLink>
        </div>
      );
    }

    return <div key={record.id}>{label(record)}</div>;
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </>
  );
}

RegistrationListItem.propTypes = {
  value: PropTypes.any,
};

export default RegistrationListItem;
