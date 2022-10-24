import { Grid, Icon, Link } from '@mui/material';
import NumberFormat from 'react-number-format';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

interface SummaryItemProps {
  title: string;
  icon: string;
  color: string;
  descriptions: {
    count: number;
    suffix: string;
  }[];
}

function SummaryItem({
  title,
  icon,
  color,
  descriptions,
}: SummaryItemProps) {
  return (
    <Grid item xs={12}>
      <MDBox display="flex" justifyContent="space-between">
        <MDBox display="flex">
          <MDBox
            width="2.4rem"
            height="2.4rem"
            bgColor={color ?? 'info'}
            variant="gradient"
            borderRadius="md"
            display="flex"
            shadow="md"
            justifyContent="center"
            alignItems="center"
            color="white"
            mr={1.6}
          >
            <Icon fontSize="medium">{icon}</Icon>
          </MDBox>
          <MDBox lineHeight={1}>
            <MDTypography
              variant="body2"
              fontWeight="bold"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
            <MDBox>
              {descriptions.map(
                (description, index, descs) => (
                  <span key={title + index}>
                    <MDTypography
                      variant="button"
                      fontWeight="bold"
                      color="text"
                    >
                      <NumberFormat
                        value={description.count ?? 0}
                        displayType="text"
                        thousandSeparator
                      />
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      fontWeight="regular"
                      color="secondary"
                    >
                      {description.suffix
                        ? ' ' + description.suffix.trim()
                        : ''}
                      {index + 1 < descs.length ? ', ' : ''}
                    </MDTypography>
                  </span>
                ),
              )}
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
    </Grid>
  );
}

SummaryItem.defaultProps = {
  descriptions: [],
};

export default SummaryItem;
