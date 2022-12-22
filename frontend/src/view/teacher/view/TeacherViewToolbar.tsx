import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import teacherSelectors from 'src/modules/teacher/teacherSelectors';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function TeacherViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const { match } = props;

  const hasPermissionToEdit = useSelector(
    teacherSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/teacher/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}
      <MDButton
        component={Link}
        to={`/teacher`}
        variant="gradient"
        color={sidenavColor}
        type="button"
        startIcon={<KeyboardBackspaceIcon />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>
    </ToolbarWrapper>
  );
}

export default TeacherViewToolbar;
