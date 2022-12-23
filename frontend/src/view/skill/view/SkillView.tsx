import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';
import MDBox from 'src/mui/components/MDBox';

function SkillView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid item md={6} xs={12}>
          <Grid container spacing={1.6}>
            <Grid xs={12} item>
              <TextViewItem
                label={i18n('skill.fields.name')}
                value={record.name}
              />
            </Grid>
            <Grid xs={12} item>
              <TextViewItem
                label={i18n('skill.fields.grade')}
                value={record.grade.name}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <ImagesViewItem
            label={i18n('skill.fields.icon')}
            value={record.icon}
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

export default SkillView;
