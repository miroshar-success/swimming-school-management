import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';

function TagListItem(props) {
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
        <ColorBadge label={record.tag || record.label} />
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <MDBox display="flex" fledWrap="wrap" gap={0.8}>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </MDBox>
  );
}

TagListItem.propTypes = {
  value: PropTypes.any,
};

export default TagListItem;
