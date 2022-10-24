import MDBox from 'src/mui/components/MDBox';
import { Parser as HtmlToReactParser } from 'html-to-react';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDTypography from 'src/mui/components/MDTypography';

function HtmlViewItem(props) {
  const { value, label } = props;
  const { darkMode } = selectMuiSettings();
  const htmlToReactParser = new HtmlToReactParser();
  const reactElement = htmlToReactParser.parse(value);
  return (
    <MDBox pt={1.6} position="relative">
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        lineHeight={1}
        position="absolute"
        top="0"
      >
        {label}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular">
        {reactElement}
      </MDTypography>
    </MDBox>
  );
}

export default HtmlViewItem;
