import { Grid, TableContainer } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import paymentEnumerators from 'src/modules/payment/paymentEnumerators';
import studentSelectors from 'src/modules/student/studentSelectors';

function PaymentExpiredView(props) {
  const { student, loading } = props;
  const { sidenavColor } = selectMuiSettings();

  if (loading || !student) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={1.6} mb={4.8}>
      <Grid item xs={12} md={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          px={2.4}
        >
          <LogoViewItem
            label={i18n('user.fields.avatars')}
            value={student.avatars}
          />
        </MDBox>
      </Grid>
      <Grid item container xs={12} md={9} spacing={1.6}>
        <Grid item xs={12} md={6}>
          <TextViewItem
            label={i18n('user.fields.studentNumber')}
            value={student.studentNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextViewItem
            label={i18n('user.fields.fullName')}
            value={student.fullName}
          />
        </Grid>
        <TableContainer sx={{ boxShadow: 'none' }}>
          <Table>
            <MDBox component="thead">
              <TableRow>
                <DataTableHeadCell>
                  {i18n('payment.fields.category')}
                </DataTableHeadCell>
                <DataTableHeadCell>
                  {i18n('payment.fields.month')}
                </DataTableHeadCell>
                <DataTableHeadCell>
                  {i18n('payment.fields.cost')}
                </DataTableHeadCell>
                <DataTableHeadCell>
                  {i18n('payment.fields.paymentMethod')}
                </DataTableHeadCell>
                <DataTableHeadCell>
                  {i18n('payment.fields.paymentDate')}
                </DataTableHeadCell>
              </TableRow>
            </MDBox>
            <TableBody>
              {student.payments.map((payment) => (
                <TableRow key={payment.id}>
                  <DataTableBodyCell>
                    {payment.category.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {payment.month +
                      1 +
                      '/admin' +
                      payment.year}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {payment.cost}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {payment.paymentMethod.name}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {moment(payment.createdAt).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )}
                  </DataTableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default PaymentExpiredView;
