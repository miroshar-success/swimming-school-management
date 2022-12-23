import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ClassViewItem from 'src/view/class/view/ClassViewItem';
import TeacherViewItem from 'src/view/teacher/view/TeacherViewItem';

function LessonView(props) {
  const renderView = () => {
    const { record } = props;
    console.log(record);

    return (
      <Grid spacing={1.6} container>
        <Grid md={6} xs={12} item>
          <TextViewItem
            label={i18n('lesson.fields.class')}
            value={record.class.name}
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <TextViewItem
            label={i18n('lesson.fields.day')}
            value={record.day}
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <TextViewItem
            label={i18n('lesson.fields.time')}
            value={record.time}
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <TeacherViewItem
            label={i18n('lesson.fields.teacher')}
            value={record.teacher}
          />
        </Grid>
        <Grid xs={12} item>
          <CreationInfo {...props} />
        </Grid>
      </Grid>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default LessonView;
