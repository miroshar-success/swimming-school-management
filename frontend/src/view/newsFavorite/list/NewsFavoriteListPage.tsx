import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import NewsFavoriteListFilter from 'src/view/newsFavorite/list/NewsFavoriteListFilter';
import NewsFavoriteListTable from 'src/view/newsFavorite/list/NewsFavoriteListTable';
import NewsFavoriteListToolbar from 'src/view/newsFavorite/list/NewsFavoriteListToolbar';

function NewsFavoriteListPage(props) {
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
              {i18n('entities.newsFavorite.list.title')}
            </MDTypography>
            <NewsFavoriteListToolbar />
          </MDBox>
          <NewsFavoriteListFilter />
        </MDBox>
        <NewsFavoriteListTable />
      </Card>
    </>
  );
}

export default NewsFavoriteListPage;
