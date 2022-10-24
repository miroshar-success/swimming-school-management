import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/productCategory/view/productCategoryViewActions';
import selectors from 'src/modules/productCategory/view/productCategoryViewSelectors';
import ProductCategoryView from 'src/view/productCategory/view/ProductCategoryView';
import ProductCategoryViewToolbar from 'src/view/productCategory/view/ProductCategoryViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ProductCategoryPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doFind(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3" mb={2.4}>
              {i18n('entities.productCategory.view.title')}
            </MDTypography>
            <ProductCategoryViewToolbar match={match} />
          </MDBox>
          <ProductCategoryView
            loading={loading}
            record={record}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default ProductCategoryPage;
