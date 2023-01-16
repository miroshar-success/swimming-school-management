import { Divider, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector, useDispatch } from 'react-redux';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import selectors from 'src/modules/schools/list/schoolsListSelectors';
import Spinner from 'src/view/shared/Spinner';
import SchoosViewItem from './SchoolsViewItem';

function SchoolsViewLayout() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const hasRows = useSelector(selectors.selectHasRows);

  const { sidenavColor } = selectMuiSettings();

  console.log(rows);

  return (
    <MDBox
      bgColor="white"
      p={2.4}
      pb={4}
      borderRadius="lg"
      shadow="md"
    >
      <Grid container spacing={1.6}>
        <Grid item xs={12}>
          <MDTypography
            variant="h4"
            fontWeight="medium"
            pb={1}
            sx={{
              borderBottom: '0.5px solid gray',
            }}
          >
            {i18n('schools.subtitle.results')}
          </MDTypography>
        </Grid>
        {loading && (
          <Grid item xs={12}>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner />
            </MDBox>
          </Grid>
        )}
        {!loading && !hasRows && (
          <Grid item xs={12}>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <MDTypography>
                {i18n('table.noData')}
              </MDTypography>
            </MDBox>
          </Grid>
        )}
        {!loading &&
          rows.map((row) => (
            <Grid item xs={12} key={row.id}>
              <Grid container spacing={2.4}>
                <Grid item md={4} sm={6} xs={12}>
                  <MDBox
                    component={Link}
                    to={`/schools/${row.id}`}
                  >
                    <SchoosViewItem value={row} />
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </MDBox>
  );
}

export default SchoolsViewLayout;
