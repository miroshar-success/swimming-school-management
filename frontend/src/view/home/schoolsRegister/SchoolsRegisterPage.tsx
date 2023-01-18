import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import actions from 'src/modules/schools/register/schoolsRegisterActions';
import selectors from 'src/modules/schools/register/schoolsRegisterSelectors';
import SchoolsRegister from 'src/view/home/schoolsRegister/SchoolsRegister';
import Spinner from 'src/view/shared/Spinner';

function SchoolsRegisterPage(props) {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const saveLoading = useSelector(
    selectors.selectSaveLoading,
  );

  const doSubmit = (data) => {
    dispatch(actions.doAdd(match.params.id, data));
  };

  return (
    <>
      <SchoolsRegister
        saveLoading={saveLoading}
        onSubmit={doSubmit}
        onCancel={() =>
          getHistory().push(`/schools/${match.params.id}`)
        }
      />
    </>
  );
}

export default SchoolsRegisterPage;
