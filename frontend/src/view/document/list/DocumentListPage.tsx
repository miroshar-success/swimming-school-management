import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import DocumentListFilter from 'src/view/document/list/DocumentListFilter';
import DocumentListTable from 'src/view/document/list/DocumentListTable';
import DocumentListToolbar from 'src/view/document/list/DocumentListToolbar';
import { Card } from '@mui/material';

function DocumentListPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={2.4}
          >
            <MDTypography variant="h3">
              {i18n('document.title')}
            </MDTypography>
            <DocumentListToolbar />
          </MDBox>
          <DocumentListFilter />
        </MDBox>
        <DocumentListTable />
      </Card>
    </>
  );
}

export default DocumentListPage;
