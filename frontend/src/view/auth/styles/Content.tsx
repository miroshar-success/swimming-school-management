import { styled } from '@mui/material/styles';

const Content = styled('div')(({ theme }) => ({
  width: '400px',
  height: '100%',
  minHeight: '100%',
  overflowY: 'auto',
  zIndex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '44.8px 32px',
  backgroundColor: '#fff',

  [theme.breakpoints.down('md')]: {
    width: '100%',
    borderLeft: 0,
  },
}));

export default Content;
