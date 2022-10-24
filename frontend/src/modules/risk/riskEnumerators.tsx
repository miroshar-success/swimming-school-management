import {
  lightGreen,
  green,
  yellow,
  orange,
  red,
  grey,
} from '@mui/material/colors';
import colors from 'src/mui/assets/theme/base/colors';

const riskEnumerators = {
  status: [
    'Open',
    'Acceptance',
    'Avoidance',
    'Mitigation',
    'Remediation',
    'Transfer',
  ],
  statusColor: [
    colors.open.main,
    colors.acceptance.main,
    colors.avoidance.main,
    colors.mitigation.main,
    colors.success.main,
    colors.transfer.main,
  ],
  likelihood: [
    'Very Unlikely 1-10%',
    'Unlikely 11-30%',
    'Possible 31-50%',
    'Likely 51-80%',
    'Very Likely > 80%',
  ],
  likelihoodColor: [
    colors.info.main,
    colors.low.main,
    colors.medium.main,
    colors.high.main,
    colors.critical.main,
  ],
  impact: [
    'Negligible',
    'Minor',
    'Moderate',
    'Significant',
    'Severe',
  ],
  impactColor: [
    colors.info.main,
    colors.low.main,
    colors.medium.main,
    colors.high.main,
    colors.critical.main,
  ],
  inherentScoreMap: [
    ['Low', 'Low', 'Low Med', 'Medium', 'Medium'],
    ['Low', 'Low Med', 'Low Med', 'Medium', 'Med Hi'],
    ['Low', 'Low Med', 'Medium', 'Med Hi', 'Med Hi'],
    ['Low', 'Low Med', 'Medium', 'Med Hi', 'High'],
    ['Low Med', 'Medium', 'Med Hi', 'High', 'High'],
  ],
  inherentScore: [
    'Low',
    'Low Med',
    'Medium',
    'Med Hi',
    'High',
  ],
  inherentScoreColor: [
    green[700],
    lightGreen[300],
    yellow[500],
    orange[500],
    red[900],
  ],
};

export default riskEnumerators;
