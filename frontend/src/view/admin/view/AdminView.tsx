import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import AdminStatusView from 'src/view/admin/view/AdminStatusView';

function AdminView(props) {
  const { admin, loading } = props;
  const { sidenavColor } = selectMuiSettings();

  if (loading || !admin) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={1.6} mb={4.8}>
      <Grid item xs={12} md={3} xl={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          px={2.4}
        >
          <LogoViewItem
            label={i18n('user.fields.avatars')}
            value={admin.avatars}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={6}
        xl={6}
        spacing={1.6}
      >
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('user.fields.email')}
            value={admin.email}
          />
        </Grid>
        <Grid container item spacing={1.6}>
          <Grid item xs={12} md={6} xl={6}>
            <TextViewItem
              label={i18n('user.fields.firstName')}
              value={admin.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <TextViewItem
              label={i18n('user.fields.lastName')}
              value={admin.lastName}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('user.fields.phoneNumber')}
            value={admin.phoneNumber}
            prefix={'+'}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomViewItem
            label={i18n('user.fields.roles')}
            value={admin.roles}
            render={(value) =>
              value.map((roleId) => (
                <MDBadgeDot
                  key={roleId}
                  width="max-content"
                  badgeContent={Roles.labelOf(roleId)}
                  color={sidenavColor}
                  variant="contained"
                  size="md"
                />
              ))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <AdminStatusView value={admin.status} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminView;
