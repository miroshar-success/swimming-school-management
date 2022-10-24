import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import Spinner from 'src/view/shared/Spinner';

function TagView(props) {
  const renderView = () => {
    const { record } = props;

    return (
      <Grid spacing={1.6} container>
        <Grid xs={12} item>
          <CustomViewItem
            label={i18n('entities.tag.fields.tag')}
            value={[record.tag]}
            render={(values) =>
              values.map((value) => (
                <ColorBadge label={value} />
              ))
            }
          />
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

export default TagView;
