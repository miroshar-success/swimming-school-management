import { getUserNameOrEmailPrefix } from 'src/modules/utils';
import { Icon } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TimelineProvider } from 'src/mui/shared/Timeline/context';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import NoViewItem from 'src/view/shared/view/NoViewItem';
import PropTypes from 'prop-types';
import selectors from 'src/modules/skill/skillSelectors';
import timelineItem from 'src/mui/shared/Timeline/TimelineItem/styles';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';

function SkillViewItem(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
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

  const displayableRecord = (record, lastItem = false) => {
    return (
      <MDBox
        key={record.id}
        position="relative"
        mb={lastItem ? 0 : 2.4}
        sx={(theme: any) =>
          timelineItem(theme, {
            lastItem,
            isDark: darkMode,
          })
        }
      >
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgColor="#000"
          color="white"
          width="1.6rem"
          height="1.6rem"
          borderRadius="50%"
          position="absolute"
          top="0.25rem"
          left="1.6px"
          zIndex={2}
          sx={{
            fontSize: ({ typography: { size } }: any) =>
              size.sm,
          }}
        >
          <Icon fontSize="inherit">skill</Icon>
        </MDBox>
        <MDBox ml={4.6} lineHeight={0} maxWidth="24rem">
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{
              maxWidth: '100%',
              display: 'inline-block',
              whiteSpace: 'break-spaces',
            }}
          >
            {record.name}
          </MDTypography>
          <MDBox
            mt={0.4}
            display="flex"
            justifyContent="flex-start"
          >
            <MDTypography
              variant="caption"
              fontWeight="bold"
              color="text"
              textTransform="capitalize"
              mr={0.8}
            >
              {getUserNameOrEmailPrefix(record.createdBy)}
            </MDTypography>
            <MDTypography
              variant="caption"
              color={darkMode ? 'secondary' : 'text'}
              fontWeight="regular"
            >
              {moment(record.createdAt).format(
                DEFAULT_MOMENT_FORMAT,
              )}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    );
  };

  if (!valueAsArray().length) {
    return <NoViewItem {...props} />;
  }

  return (
    <MDBox
      pt={props.hiddenLabel ? 0 : 1.6}
      position="relative"
    >
      {!props.hiddenLabel && (
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
      <TimelineProvider value={darkMode}>
        {valueAsArray()
          .sort(
            (a, b) =>
              moment(b.createdAt).unix() -
              moment(a.createdAt).unix(),
          )
          .map((value, idx, arr) =>
            displayableRecord(
              value,
              idx + 1 === arr.length,
            ),
          )}
      </TimelineProvider>
    </MDBox>
  );
}

SkillViewItem.defaultProps = {
  hiddenLabel: false,
};

SkillViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  hiddenLabel: PropTypes.bool,
};

export default SkillViewItem;
