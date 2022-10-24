import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TagListFilter from 'src/view/tag/list/TagListFilter';
import TagListTable from 'src/view/tag/list/TagListTable';
import TagListToolbar from 'src/view/tag/list/TagListToolbar';

function TagListPage(props) {
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
              {i18n('entities.tag.list.title')}
            </MDTypography>

            <TagListToolbar />
          </MDBox>
          <TagListFilter />
        </MDBox>
        <TagListTable />
      </Card>
    </>
  );
}

export default TagListPage;
