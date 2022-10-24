import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useRef, useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function GradientTitle(props) {
  const { sidenavColor } = selectMuiSettings();
  const { children } = props;

  const boxRef = useRef(null);

  const [height, setHeight] = useState(0);

  let dismounted = false;

  const handleTitleHeight = () => {
    if (!dismounted && boxRef) {
      setHeight(boxRef.current?.clientHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleTitleHeight);
    handleTitleHeight();
    setTimeout(handleTitleHeight, 300);
    return () => {
      window.removeEventListener(
        'resize',
        handleTitleHeight,
      );
      dismounted = true;
    };
  }, [boxRef]);

  return (
    <>
      <MDBox
        variant="gradient"
        bgColor={sidenavColor}
        borderRadius="lg"
        coloredShadow={sidenavColor}
        position="absolute"
        left="0.8rem"
        right="0.8rem"
        top="-1.2rem"
        zIndex={20}
        py={1.6}
        ref={boxRef}
      >
        <MDTypography
          variant="h3"
          color="white"
          textAlign="center"
        >
          {children}
        </MDTypography>
      </MDBox>
      <MDBox height={height} mt="-1.2rem"></MDBox>
    </>
  );
}

GradientTitle.propTypes = {
  children: PropTypes.any,
};

export default GradientTitle;
