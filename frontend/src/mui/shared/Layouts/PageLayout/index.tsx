import { useDispatch } from 'react-redux';
import { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MDBox from 'src/mui/components/MDBox';
import muiActions from 'src/modules/mui/muiActions';

interface Props {
  background?: 'white' | 'light' | 'default';
  children: ReactNode;
}

function PageLayout({
  background,
  children,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(muiActions.doLayout('page'));
  }, [pathname]);

  return (
    <>
      <MDBox
        width="100%"
        height="100%"
        minHeight="100vh"
        bgColor={background}
        sx={{ overflowX: 'hidden' }}
      >
        {children}
      </MDBox>
    </>
  );
}

// Declaring default props for PageLayout
PageLayout.defaultProps = {
  background: 'default',
};

export default PageLayout;
