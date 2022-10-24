import React from 'react';
import { i18n } from 'src/i18n';
import ProductCategoryListFilter from 'src/view/productCategory/list/ProductCategoryListFilter';
import ProductCategoryListTable from 'src/view/productCategory/list/ProductCategoryListTable';
import ProductCategoryListToolbar from 'src/view/productCategory/list/ProductCategoryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ProductCategoryListPage(props) {
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
              {i18n('entities.productCategory.list.title')}
            </MDTypography>
            <ProductCategoryListToolbar />
          </MDBox>
          <ProductCategoryListFilter />
        </MDBox>
        <ProductCategoryListTable />
      </Card>
    </>
  );
}

export default ProductCategoryListPage;
