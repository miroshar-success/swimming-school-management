import { i18n } from 'src/i18n';
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

  return (
    <MDBadge
      variant="contained"
      color="warning"
      badgeContent={i18n('teacher.status.preRegistration')}
      container
    />
  );
}

export default TeacherStatusView;
