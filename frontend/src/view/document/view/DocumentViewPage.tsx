import { Grid, Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import actions from 'src/modules/document/view/documentViewActions';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import DocumentView from 'src/view/document/view/DocumentView';
import DocumentViewToolbar from 'src/view/document/view/DocumentViewToolbar';
import selectors from 'src/modules/document/view/documentViewSelectors';

function DocumentPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Grid spacing={1.6} container>
      <Grid xs={12} item>
        <Card>
          <MDBox p={2.4}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <MDTypography variant="h4">
                {i18n('document.view.title')}
              </MDTypography>
              <DocumentViewToolbar match={match} />
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid xs={12} item>
        <DocumentView loading={loading} record={record} />
      </Grid>
    </Grid>
  );
}

export default DocumentPage;
