import { useSelector, useDispatch } from 'react-redux';
import { Widget } from '@typeform/embed-react';
import actions from 'src/modules/auth/authActions';
import Card from '@mui/material/Card';
import MDBox from 'src/mui/components/MDBox';
import selectors from 'src/modules/auth/authSelectors';
import Spinner from 'src/view/shared/Spinner';

function QuizForm(): JSX.Element {
  const dispatch = useDispatch();

  const loading = useSelector(
    selectors.selectLoadingAnswer,
  );
  const currentTenant = useSelector(
    selectors.selectCurrentTenant,
  );
  const currentUser = useSelector(
    selectors.selectCurrentUser,
  );

  const typeForm = useSelector(selectors.selectTypeForm);

  const doSubmit = async ({ responseId }) => {
    dispatch(actions.doFetchAnswer(responseId));
  };

  return (
    <Card sx={{ height: 400 }}>
      <MDBox
        position="relative"
        sx={{
          transform: 'scale(0.8)',
          transformOrigin: 'left top',
          width: '125%',
        }}
      >
        <MDBox height="500px">
          {!loading && (
            <Widget
              id={typeForm.id}
              style={{ height: '100%' }}
              hidden={{
                tenant_id: currentTenant.id,
                user_id: currentUser.id,
              }}
              onSubmit={doSubmit}
              autoFocus
            />
          )}
        </MDBox>
        {loading && (
          <MDBox
            display="flex"
            position="absolute"
            left="0"
            right="0"
            top="0"
            bottom="0"
          >
            <Spinner />
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default QuizForm;
