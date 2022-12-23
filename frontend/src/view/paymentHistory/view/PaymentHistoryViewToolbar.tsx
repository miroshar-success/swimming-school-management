import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function PaymentHistoryViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const { match } = props;

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      <MDButton
        component={Link}
        to={`/payment-history`}
        variant="gradient"
        color={sidenavColor}
        type="button"
        startIcon={<KeyboardBackspace />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>
    </ToolbarWrapper>
  );
}

export default PaymentHistoryViewToolbar;
