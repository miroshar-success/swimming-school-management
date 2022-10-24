import { useMemo, useEffect } from 'react';

import { Line } from 'react-chartjs-2';

import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import configs from 'src/mui/shared/Charts/LineCharts/DefaultLineChart/configs';
import colors from 'src/mui/assets/theme/base/colors';

import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'src/view/shared/Spinner';
import NumberFormat from 'react-number-format';
import actions from 'src/modules/widget/tasksByMonth/tasksByMonthActions';
import selectors from 'src/modules/widget/tasksByMonth/tasksByMonthSelectors';
import { i18n } from 'src/i18n';

function TasksByMonth(): JSX.Element {
  const height = '15.3rem';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.doInit());
  }, [dispatch]);

  const isLoading = useSelector(selectors.selectLoading);
  const totalAmounts = useSelector(
    selectors.selectTotalAmounts,
  );
  const chart = useSelector(
    selectors.selectLineChartDatasets,
  );

  const lineColors = {
    created: 'info',
    completed: 'success',
    overdue: 'warning',
    notCompleted: 'primary',
  };

  chart.datasets.forEach((dataset) => {
    dataset.color = lineColors[dataset.label];
    dataset.label =
      ' ' + i18n(`entities.task.states.${dataset.label}`);
  });

  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0,
        pointRadius: 3,
        borderWidth: 4,
        backgroundColor: 'transparent',
        fill: true,
        pointBackgroundColor: colors[dataset.color]
          ? colors[dataset.color || 'dark'].main
          : colors.dark.main,
        borderColor: colors[dataset.color]
          ? colors[dataset.color || 'dark'].main
          : colors.dark.main,
        maxBarThickness: 6,
      }))
    : [];

  const { data, options } = configs(
    chart.labels || [],
    chartDatasets,
  );

  const renderSummary = ({ title, count, icon, color }) => (
    <MDBox display="flex" mr={2.4} height="2.4rem">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              color="text"
            >
              {title}
            </MDTypography>
            <MDTypography variant="h5" fontWeight="bold">
              <NumberFormat
                value={count}
                displayType="text"
                thousandSeparator={true}
              />
            </MDTypography>
          </MDBox>
        </>
      )}
    </MDBox>
  );

  const renderChart = (
    <MDBox py={1.6} px={1.6}>
      <MDBox display="flex" mb={1.6}>
        {renderSummary({
          title: i18n('entities.task.label'),
          count: totalAmounts.all ?? 0,
          icon: 'assignment',
          color: 'info',
        })}
        {renderSummary({
          title: i18n('entities.task.states.created'),
          count: totalAmounts.created ?? 0,
          icon: 'date_range',
          color: 'info',
        })}
        {renderSummary({
          title: i18n('entities.task.states.completed'),
          count: totalAmounts.completed ?? 0,
          icon: 'event_available',
          color: 'success',
        })}
        {renderSummary({
          title: i18n('entities.task.states.overdue'),
          count: totalAmounts.overdue ?? 0,
          icon: 'event_available',
          color: 'warning',
        })}
        {renderSummary({
          title: i18n('entities.task.states.notCompleted'),
          count: totalAmounts.notCompleted ?? 0,
          icon: 'event_busy',
          color: 'primary',
        })}
      </MDBox>
      {useMemo(
        () => (
          <MDBox height={height}>
            {isLoading ? (
              <Spinner />
            ) : (
              <Line data={data} options={options} />
            )}
          </MDBox>
        ),
        [chart, height],
      )}
    </MDBox>
  );

  return (
    <Card>
      <MDBox pt={2.4} px={1.6}>
        <MDTypography variant="h6" fontWeight="medium">
          {i18n('widgets.tasksByMonth.title')}
        </MDTypography>
      </MDBox>
      {renderChart}
    </Card>
  );
}

export default TasksByMonth;
