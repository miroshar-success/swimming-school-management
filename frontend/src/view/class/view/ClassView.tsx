import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import CreationInfo from 'src/view/shared/view/CreationInfo';
import React from 'react';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import ClassCategoryViewItem from 'src/view/classCategory/view/ClassCategoryViewItem';
import PoolViewItem from 'src/view/pool/view/PoolViewItem';

function ClassView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <TextViewItem
            label={i18n('class.fields.name')}
            value={record.name}
          />
        </Grid>
        <Grid xs={12} item>
          <ClassCategoryViewItem
            label={i18n('class.fields.category')}
            value={record.category}
          />
        </Grid>
        <Grid xs={12} item>
          <PoolViewItem
            label={i18n('class.fields.pool')}
            value={record.pool}
          />
        </Grid>
        <Grid xs={12} item>
          <TextViewItem
            label={i18n('class.fields.duration')}
            value={record.duration}
          />
        </Grid>
        <Grid xs={12} item></Grid>
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

export default ClassView;
