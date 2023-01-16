import { useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import colors from 'src/mui/assets/theme/base/colors';
import { IconButton, Avatar } from '@mui/material';
import { i18n } from 'src/i18n';

function SchoolsViewItem(props) {
  const { value } = props;

  return (
    <MDBox
      borderRadius="sm"
      border={1}
      borderColor="grey.300"
      overflow="hidden"
    >
      <Avatar
        src={value.logos[0]?.downloadUrl}
        alt="Logo"
        sx={{
          width: '100%',
          height: 160,
        }}
        variant="square"
      />
      <MDTypography
        variant="h5"
        fontWeight="medium"
        sx={{ borderBottom: 1, borderColor: 'grey.300' }}
        p={2}
      >
        {value.name ? value.name : ''}
      </MDTypography>
      <MDBox
        p={2}
        display="flex"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" fontWeight="regular">
          {value.town ? value.town : ''}
        </MDTypography>
        <MDBox display="flex">
          <MDTypography variant="h6" fontWeight="regular">
            {`${i18n('schools.fields.phone')}: `}
          </MDTypography>
          <MDTypography variant="h6" fontWeight="regular">
            {value.phoneNumber ? value.phoneNumber : ''}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

SchoolsViewItem.propTypes = {
  value: PropTypes.object,
};

export default SchoolsViewItem;
