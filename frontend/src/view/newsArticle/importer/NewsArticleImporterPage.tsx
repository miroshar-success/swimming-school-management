import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/newsArticle/importer/newsArticleImporterActions';
import fields from 'src/modules/newsArticle/importer/newsArticleImporterFields';
import selectors from 'src/modules/newsArticle/importer/newsArticleImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

function NewsArticleImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.newsArticle.importer.hint'),
  );

  return (
    <>
      <Card>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          p={2.4}
        >
          <MDTypography variant="h3">
            {i18n('entities.newsArticle.importer.title')}
          </MDTypography>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default NewsArticleImportPage;
