import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { extractsDomain } from 'src/modules/utils';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MaterialLink from '@mui/material/Link';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PropTypes from 'prop-types';

function NewsArticleListItem(props) {
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
      <div key={record.id}>
        <MaterialLink href={record.link} target="_blank">
          <ColorBadge label={renderNews(record)} />
        </MaterialLink>
      </div>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <>
      {valueAsArray().map((value) =>
        displayableRecord(value),
      )}
    </>
  );
}

NewsArticleListItem.propTypes = {
  value: PropTypes.any,
};

export default NewsArticleListItem;
