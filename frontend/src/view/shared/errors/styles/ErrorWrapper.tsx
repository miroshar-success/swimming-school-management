import { styled } from '@mui/material/styles';

const ErrorWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80%',
  minHeight: '100%',
  textAlign: 'center',

  '& .content': {
    '& h1': {
      color: '#434e59',
      fontSize: '57.6px',
      fontWeight: '600',
      lineHeight: '57.6px',
      marginBottom: '19.2px',
    },

    '& .desc': {
      fontSize: '16px',
      lineHeight: '22.4px',
      marginBottom: '12.8px',
    },

    '& .actions': {
      '& button:not(:last-child)': {
        marginRight: '6.4px',
      },
    },
  },
});

export default ErrorWrapper;
