import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';
import selectors from 'src/modules/newsFavorite/newsFavoriteSelectors';
import authSelectors from 'src/modules/auth/authSelectors';

function NewsFavoriteViewItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
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
          <MDButton
            component={Link}
            variant="contained"
            color={sidenavColor}
            to={`/news-favorite/${record.id}`}
            size="large"
          >
            {record.name}
          </MDButton>
        </MDBox>
      );
    }

    return (
      <MDBox key={record.id}>
        <MDTypography variant="button" fontWeight="regular">
          {record.id}
        </MDTypography>
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox pt={1.6} position="relative">
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

NewsFavoriteViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default NewsFavoriteViewItem;
