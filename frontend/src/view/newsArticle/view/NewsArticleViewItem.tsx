import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { extractsDomain } from 'src/modules/utils';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';

function NewsArticleViewItem(props) {
  const { darkMode } = selectMuiSettings();

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

  const renderNews = (record) => {
    return (
      <>
        <MDTypography
          component="span"
          fontSize="inherit"
          color="inherit"
          fontWeight="bold"
          mr={0.8}
        >
          {extractsDomain(record.link)}
        </MDTypography>
        {record.title}
        <br />
        <MDTypography
          component="span"
          variant="caption"
          color="inherit"
          fontWeight="regular"
        >
          {moment(record.date).format(
            DEFAULT_MOMENT_FORMAT,
          )}
        </MDTypography>
      </>
    );
  };

  const displayableRecord = (record) => {
    return (
      <MDBox key={record.id}>
        <MaterialLink href={record.link} target="_blank">
          <ColorBadge label={renderNews(record)} />
        </MaterialLink>
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
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </MDBox>
  );
}

NewsArticleViewItem.defaultProps = {
  hiddenLabel: false,
};

NewsArticleViewItem.propTypes = {
  hiddenLabel: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.any,
};

export default NewsArticleViewItem;
