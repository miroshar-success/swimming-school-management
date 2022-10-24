import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import actions from 'src/modules/riskCategory/form/riskCategoryFormActions';
import selectors from 'src/modules/riskCategory/form/riskCategoryFormSelectors';
import { getHistory } from 'src/modules/store';
import RiskCategoryForm from 'src/view/riskCategory/form/RiskCategoryForm';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import Spinner from 'src/view/shared/Spinner';
import PageTitle from 'src/view/shared/styles/PageTitle';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function RiskCategoryFormPage(props) {
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );
  const record = useSelector(selectors.selectRecord);

  const isEditing = Boolean(match.params.id);
  const title = isEditing
    ? i18n('entities.riskCategory.edit.title')
    : i18n('entities.riskCategory.new.title');

  useEffect(() => {
    dispatch(actions.doInit(match.params.id));
    setDispatched(true);
  }, [dispatch, match.params.id]);

  const doSubmit = (id, data) => {
    if (isEditing) {
      dispatch(actions.doUpdate(id, data));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <>
      <Card>
        <MDBox py={2.4} px={2.4}>
          <MDBox
            pb={2.4}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {title}
            </MDTypography>
          </MDBox>
          {initLoading && <Spinner />}

          {dispatched && !initLoading && (
            <RiskCategoryForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              record={record}
              isEditing={isEditing}
              onSubmit={doSubmit}
              onCancel={() =>
                getHistory().push('/risk-category')
              }
            />
          )}
        </MDBox>
      </Card>
    </>
  );
}

export default RiskCategoryFormPage;
