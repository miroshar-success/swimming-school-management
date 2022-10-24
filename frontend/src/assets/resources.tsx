import { CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import authSelectors from 'src/modules/auth/authSelectors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

export function BrandLogo(props) {
  const { darkMode, transparentSidenav, whiteSidenav } =
    selectMuiSettings();
  const logoUrl = useSelector(authSelectors.selectLogoUrl);
  let brand = resources.brand.white;
  if (props.sidenav) {
    brand =
      (transparentSidenav && !darkMode) || whiteSidenav
        ? resources.brand.dark
        : resources.brand.white;
  }
  return (
    <>
      <CardMedia
        src={logoUrl ? logoUrl : brand}
        component="img"
        sx={{
          maxWidth: '100%',
          width: props.width ? props.width : 'auto',
          margin: 0,
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </>
  );
}

const resources = {
  brand: {
    white: '/images/vor-light.svg',
    dark: '/images/vor-dark.svg',
  },
};
