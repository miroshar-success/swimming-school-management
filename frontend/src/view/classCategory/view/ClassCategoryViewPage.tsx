import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/classCategory/view/classCategoryViewActions';
import selectors from 'src/modules/classCategory/view/classCategoryViewSelectors';
import ClassCategoryView from 'src/view/classCategory/view/ClassCategoryView';
import ClassCategoryViewToolbar from 'src/view/classCategory/view/ClassCategoryViewToolbar';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ClassCategoryPage() {
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
              {i18n('classCategory.view.title')}
            </MDTypography>
            <ClassCategoryViewToolbar match={match} />
          </MDBox>
          <ClassCategoryView
            loading={loading}
            record={record}
          />
        </MDBox>
      </Card>
    </>
  );
}

export default ClassCategoryPage;
