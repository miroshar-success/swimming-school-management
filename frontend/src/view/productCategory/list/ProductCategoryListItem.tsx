import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';

function ProductCategoryListItem(props) {
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
    <MDBox
      display="inline-flex"
      flexWrap="wrap"
      gap={0.8}
      lineHeight={0}
    >
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </MDBox>
  );
}

ProductCategoryListItem.propTypes = {
  value: PropTypes.any,
};

export default ProductCategoryListItem;
