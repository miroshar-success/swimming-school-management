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
import moment from 'moment';
import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import paymentEnumerators from 'src/modules/payment/paymentEnumerators';

function PaymentHistoryView(props) {
  const { student, paymentId, loading } = props;
  const { sidenavColor } = selectMuiSettings();

  if (loading || !student) {
    return <Spinner />;
  }

  const payment = student.payments?.find((post, index) => {
    if (post.id === paymentId) return true;
  });

  console.log(payment);

  return (
    <Grid container spacing={1.6} mb={4.8}>
      <Grid item xs={12} md={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          px={2.4}
        >
          <LogoViewItem
            label={i18n('student.fields.avatars')}
            value={student.avatars}
          />
        </MDBox>
      </Grid>
      <Grid item container xs={12} md={8} spacing={1.6}>
        <Grid container item spacing={1.6}>
          <Grid item xs={12} md={6}>
            <TextViewItem
              label={i18n('student.fields.studentNumber')}
              value={student.studentNumber}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextViewItem
              label={i18n('student.fields.fullName')}
              value={student.fullName}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextViewItem
              label={i18n('payment.fields.category')}
              value={payment.category.name}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextViewItem
              label={i18n('payment.fields.lessonsNumber')}
              value={payment.lessonsNumber}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextViewItem
              label={i18n('payment.fields.price')}
              value={payment.price}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextViewItem
              label={i18n('payment.fields.quantity')}
              value={payment.quantity}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextViewItem
              label={i18n('payment.fields.amount')}
              value={payment.quantity * payment.price}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextViewItem
            label={i18n('payment.fields.paymentMethod')}
            value={payment.paymentMethod.name}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextViewItem
            label={i18n('payment.fields.VAT')}
            value={payment.VAT}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextViewItem
            label={i18n('payment.fields.cost')}
            value={payment.cost}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextViewItem
            label={i18n('payment.fields.paymentDate')}
            value={moment(payment.createdAt).format(
              DEFAULT_MOMENT_FORMAT_DATE_ONLY,
            )}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextViewItem
            label={i18n('payment.fields.month')}
            value={payment.year}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextViewItem
            label={i18n('payment.fields.month')}
            value={paymentEnumerators.months[payment.month]}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PaymentHistoryView;
