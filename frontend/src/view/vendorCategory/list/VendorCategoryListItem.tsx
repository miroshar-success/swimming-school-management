import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import PropTypes from 'prop-types';
import selectors from 'src/modules/vendorCategory/vendorCategorySelectors';
import MDBox from 'src/mui/components/MDBox';

function VendorCategoryListItem(props) {
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
    if (hasPermissionToRead) {
      return (
        <MDBox key={record.id}>
          <MaterialLink
            component={Link}
            to={`/vendor-category/${record.id}`}
          >
            <ColorBadge label={record.name} />
          </MaterialLink>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        <ColorBadge label={record.name} />
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <MDBox display="inline-flex" flexWrap="wrap" gap={0.8}>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </MDBox>
  );
}

VendorCategoryListItem.propTypes = {
  value: PropTypes.any,
};

export default VendorCategoryListItem;
