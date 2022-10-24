import { styled } from '@mui/material/styles';

const SocialButtons = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '19.2px',

  '& img': {
    marginLeft: '12.8px',
    marginRight: '12.8px',
    width: '28.8px',
    height: '28.8px',
    cursor: 'pointer',
  },
});

export default SocialButtons;
