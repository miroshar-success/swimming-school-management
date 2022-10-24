import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import DocumentForm from 'src/view/document/form/DocumentForm';
import DocumentListFilter from 'src/view/document/list/DocumentListFilter';
import DocumentListTable from 'src/view/document/list/DocumentListTable';
import DocumentListToolbar from 'src/view/document/list/DocumentListToolbar';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function DocumentListPage(props) {
  return (
    <Grid spacing={1.6} container>
      <Grid xs={12} item>
        <DocumentForm />
      </Grid>
      <Grid xs={12} item>
        <Card>
          <MDBox pt={2.4} px={2.4}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
              pb={2.4}
            >
              <MDTypography variant="h3">
                {i18n('entities.document.list.title')}
              </MDTypography>
              <DocumentListToolbar />
            </MDBox>
            <DocumentListFilter />
          </MDBox>
          <DocumentListTable />
        </Card>
      </Grid>
    </Grid>
  );
}

export default DocumentListPage;
