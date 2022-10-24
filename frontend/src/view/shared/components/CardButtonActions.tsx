import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Colors from 'src/view/shared/theme/Colors';
import Grid from '@mui/material/Grid';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

interface CardButtonActionsProps {
  buttons?: any[];
}

function CardButtonActions({
  buttons,
}: CardButtonActionsProps) {
  const { sidenavColor, darkMode } = selectMuiSettings();

  if (!buttons || !buttons.length) {
    return null;
  }

  const RenderButton = ({
    isFirst,
    label,
    icon,
    onClick,
  }) => (
    <>
      {!isFirst && (
        <MDBox
          width="1px"
          bgColor={Colors(sidenavColor, 0.1)}
        />
      )}
      <Grid xs item>
        <Button
          onClick={onClick}
          color="inherit"
          variant="text"
          size="large"
          startIcon={icon}
          sx={{
            borderRadius: 0,
            p: 0,
          }}
          fullWidth
        >
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="inherit"
          >
            {label}
          </MDTypography>
        </Button>
      </Grid>
    </>
  );

  return (
    <CardActions
      sx={{ background: Colors(sidenavColor, 0.1), p: 0 }}
      disableSpacing
    >
      <Grid alignItems="stretch" container>
        {buttons.map((props, idx) => (
          <RenderButton
            key={`card-action-button-${idx}`}
            isFirst={idx === 0}
            {...props}
          />
        ))}
      </Grid>
    </CardActions>
  );
}

export default CardButtonActions;
