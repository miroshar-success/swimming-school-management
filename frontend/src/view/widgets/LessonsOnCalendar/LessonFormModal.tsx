import { Dialog, DialogContent } from '@mui/material';
import { getAbsoluteDateTimeByHour } from 'src/modules/utils';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Errors from 'src/modules/shared/error/errors';
import moment from 'moment';
import ReactDOM from 'react-dom';
import selectors from 'src/modules/lesson/form/lessonFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import LessonForm from 'src/view/lesson/form/LessonForm';
import lessonFormActions from 'src/modules/lesson/form/lessonFormActions';
import LessonService from 'src/modules/lesson/lessonService';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function LessonFormModal(props) {
  const dispatch = useDispatch();
  const [saveLoading, setSaveLoading] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const dueDate = moment(props.dueDate);
  const mode =
    props.dueDate === null
      ? 'edit'
      : props.id
      ? 'recurring'
      : 'new';
  const title = i18n(
    `widgets.lessonsOnCalendar.modals.${mode}.title`,
    dueDate.format('dddd, LL'),
  );

  const initLoading = useSelector(
    selectors.selectInitLoading,
  );

  const record = useSelector(selectors.selectRecord);

  const resetInfos =
    mode === 'edit' || !dispatched || initLoading
      ? {}
      : {
          dueDate: getAbsoluteDateTimeByHour(
            moment(record.dueDate ?? moment.now())
              .year(dueDate.year())
              .month(dueDate.month())
              .date(dueDate.date())
              .toISOString(),
          ).toISOString(),
          completedDate: null,
          status: null,
        };

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      if (mode === 'edit') {
        await LessonService.update(props.id, data);
      } else if (mode === 'recurring') {
        await LessonService.create({
          ...data,
          lesson: record.lesson?._id ?? null,
        });
      } else {
        await LessonService.create(data);
      }
      setSaveLoading(false);
      props.onSuccess();
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const doClose = () => {
    return props.onClose();
  };

  useEffect(() => {
    dispatch(lessonFormActions.doInit(props.id));
    setDispatched(true);
  }, [dispatch, props.id]);

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth={mode === 'edit' ? 'xl' : 'md'}
      fullWidth={true}
    >
      <DialogContent>
        <MDBox>
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
            <LessonForm
              saveLoading={saveLoading}
              initLoading={initLoading}
              isEditing={mode === 'edit'}
              record={{
                ...record,
                ...resetInfos,
              }}
              hiddenImpossibleFields={mode !== 'edit'}
              onSubmit={doSubmit}
              onCancel={doClose}
              title={title}
              modal
            />
          )}
        </MDBox>
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default LessonFormModal;
