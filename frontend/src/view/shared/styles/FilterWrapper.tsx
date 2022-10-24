import { styled } from '@mui/material/styles';

const FilterWrapper = styled('div')(({ theme }) => ({
  marginBottom: '12.8px',

  '& form': {
    width: '100%',
  },
}));

export const FilterButtons = styled('div')({
  paddingTop: '6.4px',
  textAlign: 'right',

  '& > *': {
    marginLeft: '6.4px !important',
    marginBottom: '6.4px !important',
  },
});

export default FilterWrapper;
