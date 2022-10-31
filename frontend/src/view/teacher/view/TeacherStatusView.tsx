import { i18n } from 'src/i18n';
import React from 'react';
import ColoredChip from 'src/view/shared/ColoredChip';
import MDBadge from 'src/mui/components/MDBadge';

function TeacherStatusView(props) {
  const { value } = props;

  if (!value) {
    return null;
  }

  if (value === 'active') {
    return (
      <MDBadge
        variant="contained"
        color="success"
        badgeContent={i18n('teacher.status.active')}
        container
      />
    );
  }

  if (value === 'empty-permissions') {
    return (
      <MDBadge
        variant="contained"
        color="error"
        badgeContent={i18n(
          'teacher.status.empty-permissions',
        )}
        container
      />
    );
  }

  return (
    <MDBadge
      variant="contained"
      color="warning"
      badgeContent={i18n('teacher.status.invited')}
      container
    />
  );
}

export default TeacherStatusView;
