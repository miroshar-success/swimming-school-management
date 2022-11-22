import { i18n } from 'src/i18n';
import MDBadge from 'src/mui/components/MDBadge';

function StudentStatusView(props) {
  const { value } = props;

  if (!value) {
    return null;
  }

  if (value === 'active') {
    return (
      <MDBadge
        variant="contained"
        color="success"
        badgeContent={i18n('student.status.active')}
        container
      />
    );
  }

  return (
    <MDBadge
      variant="contained"
      color="warning"
      badgeContent={i18n('student.status.preRegistration')}
      container
    />
  );
}

export default StudentStatusView;
