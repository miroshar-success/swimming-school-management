import React, { useEffect } from 'react';
import { getHistory } from 'src/modules/store';
import SettingsForm from 'src/view/settings/SettingsForm';
import Spinner from '../shared/Spinner';
import actions from 'src/modules/settings/settingsActions';
import selectors from 'src/modules/settings/settingsSelectors';
import { useSelector, useDispatch } from 'react-redux';

const SettingsFormPage = (props) => {
  const dispatch = useDispatch();

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const settings = useSelector(selectors.selectSettings);

  useEffect(() => {
    dispatch(actions.doInit());
  }, []);

  return (
    <>
      {initLoading && <Spinner />}

      {!initLoading && settings && (
        <SettingsForm
          settings={settings}
          onCancel={() => getHistory().push('/admin')}
        />
      )}
    </>
  );
};

export default SettingsFormPage;
