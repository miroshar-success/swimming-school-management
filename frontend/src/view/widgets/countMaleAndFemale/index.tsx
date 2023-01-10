import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MDBox from 'src/mui/components/MDBox';

import { i18n } from 'src/i18n';
import actions from 'src/modules/widget/countMaleAndFemale/countMaleAndFemaleActions';
import countMaleAndFemaleSelectors from 'src/modules/widget/countMaleAndFemale/countMaleAndFemaleSelectors';
import ComplexStatisticsCardForGender from 'src/view/shared/cards/ComplexStatisticsCardForGender';

interface CountMaleAndFemaleProps {
  title?: string;
  color?:
    | 'dark'
    | 'success'
    | 'info'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'error';
}

function CountMaleAndFemale({
  title,
  color,
}: CountMaleAndFemaleProps): JSX.Element {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    countMaleAndFemaleSelectors.selectLoading,
  );

  const countMale = useSelector(
    countMaleAndFemaleSelectors.selectCountMale,
  );

  const countFemale = useSelector(
    countMaleAndFemaleSelectors.selectCountFemale,
  );

  useEffect(() => {
    dispatch(actions.doGetCountMaleAndFemale());
  }, [dispatch]);

  return (
    <>
      <MDBox height="100%" mt={2}>
        {!isLoading && (
          <ComplexStatisticsCardForGender
            title={title}
            countMale={countMale}
            countFemale={countFemale}
            color={color}
            icon="wc"
          />
        )}
      </MDBox>
    </>
  );
}

CountMaleAndFemale.defaultProps = {
  title: i18n('widgets.countMaleAndFemale.title'),
  color: 'warning',
};

export default CountMaleAndFemale;
