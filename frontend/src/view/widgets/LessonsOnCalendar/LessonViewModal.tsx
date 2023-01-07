import { Dialog, DialogContent } from '@mui/material';
import { FormButtons } from 'src/view/shared/styles/FormWrapper';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import GradientTitle from 'src/view/shared/components/GradientTitle';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import ReactDOM from 'react-dom';
import selectors from 'src/modules/lesson/view/lessonViewSelectors';
import lessonViewActions from 'src/modules/lesson/view/lessonViewActions';
import lessonSelectors from 'src/modules/lesson/lessonSelectors';
import LessonView from 'src/view/lesson/view/LessonView';

function LessonViewModal(props) {
  const dispatch = useDispatch();

  const { sidenavColor } = selectMuiSettings();

  const editable = useSelector(
    lessonSelectors.selectPermissionToEdit,
  );

  const loading = useSelector(selectors.selectLoading);
  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(lessonViewActions.doFind(props.id));
  }, [dispatch, props.id]);

  const doClose = () => {
    return props.onClose();
  };

  const doEdit = () => {
    doClose();
    props.onEdit();
  };

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth="xl"
      fullWidth={true}
    >
      <DialogContent>
        <GradientTitle>
          {i18n('lesson.view.title')}
        </GradientTitle>
        <LessonView
          loading={loading}
          record={record}
          isInstance={true}
        />
        {editable && (
          <MDBox mt={1.6}>
            <FormButtons
              style={{
                flexDirection: 'row-reverse',
                margin: 0,
              }}
            >
              <MDButton
                variant="gradient"
                color={sidenavColor}
                onClick={doEdit}
                startIcon={<EditIcon />}
              >
                {i18n('lesson.edit.title')}
              </MDButton>
              <MDButton
                variant="outlined"
                color={sidenavColor}
                onClick={doClose}
                startIcon={<CloseIcon />}
              >
                {i18n('common.cancel')}
              </MDButton>
            </FormButtons>
          </MDBox>
        )}
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default LessonViewModal;
