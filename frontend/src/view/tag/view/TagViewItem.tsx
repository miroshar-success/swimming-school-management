import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';

function TagViewItem(props) {
  const { darkMode } = selectMuiSettings();

  const { hiddenLabel, hideNoViewItem, label, value } =
    props;

  const valueAsArray = () => {
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
    return hideNoViewItem ? null : (
      <NoViewItem {...props} />
    );
  }

  return (
    <MDBox
      pt={
        !hiddenLabel &&
        Boolean(label) &&
        label.trim() !== ''
          ? 1.6
          : 0
      }
      position="relative"
    >
      {!hiddenLabel &&
        Boolean(label) &&
        label.trim() !== '' && (
          <MDTypography
            variant="caption"
            color={darkMode ? 'text' : 'secondary'}
            fontWeight="regular"
            position="absolute"
            lineHeight="1"
            top="0"
          >
            {label}
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

TagViewItem.defaultProps = {
  label: null,
  hiddenLabel: false,
  hideNoViewItem: true,
};

TagViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  hiddenLabel: PropTypes.bool,
  hideNoViewItem: PropTypes.bool,
};

export default TagViewItem;
