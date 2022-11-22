import PropTypes from 'prop-types';
import React from 'react';
import { Avatar } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

function ImagesListView(props) {
  const { variant, value } = props;
  const valueAsArray = () => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  if (
    !valueAsArray().length ||
    !valueAsArray()[0].downloadUrl
  ) {
    return (
      <Avatar variant={variant ? variant : 'circular'}>
        <PhotoCameraIcon />
      </Avatar>
    );
  }

  const src = valueAsArray()[0].downloadUrl;
  return (
    <Avatar
      variant={variant ? variant : 'circular'}
      src={src}
    />
  );
}

ImagesListView.propTypes = {
  src: PropTypes.any,
  value: PropTypes.any,
  variant: PropTypes.string,
};

export default ImagesListView;
