import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';
import selectors from 'src/modules/product/productSelectors';

function ProductViewItem(props) {
  const { darkMode } = selectMuiSettings();
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );
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

  const displayableRecord = (record) => {
    if (
      hasPermissionToRead &&
      record.tenant === currentTenant.id
    ) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/product/${record.id}`}
          >
            <ColorBadge label={record.title} />
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        <ColorBadge label={record.title} />
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={
        props.hiddenLabel || !Boolean(props.label) ? 0 : 1.6
      }
      position="relative"
    >
      {!props.hiddenLabel && Boolean(props.label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {props.label}
        </MDTypography>
      )}
      <MDBox
        display="inline-flex"
        flexWrap="wrap"
        gap={0.8}
      >
        {valueAsArray().map((value) =>
          displayableRecord(value),
        )}
      </MDBox>
    </MDBox>
  );
}

ProductViewItem.defaultProps = {
  hiddenLabel: false,
};

ProductViewItem.propTypes = {
  hiddenLabel: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default ProductViewItem;
