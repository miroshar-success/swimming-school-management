import { Button, Tooltip } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'src/modules/task/list/taskListActions';
import AddIcon from '@mui/icons-material/Add';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import destroyActions from 'src/modules/task/destroy/taskDestroyActions';
import destroySelectors from 'src/modules/task/destroy/taskDestroySelectors';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import React, { useState } from 'react';
import selectors from 'src/modules/task/list/taskListSelectors';
import taskSelectors from 'src/modules/task/taskSelectors';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function TaskToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const [
    destroyAllConfirmVisible,
    setDestroyAllConfirmVisible,
  ] = useState(false);

  const dispatch = useDispatch();

  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToDestroy = useSelector(
    taskSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    taskSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    taskSelectors.selectPermissionToImport,
  );

  const doOpenDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(true);
  };

  const doCloseDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(false);
  };

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const doDestroyAllSelected = () => {
    doCloseDestroyAllConfirmModal();

    dispatch(destroyActions.doDestroyAll(selectedKeys));
  };

  const renderExportButton = () => {
    const disabledWithTooltip = !hasRows || loading;

    const button = (
      <MDButton
        variant="outlined"
        color={sidenavColor}
        type="button"
        disabled={disabledWithTooltip || exportLoading}
        onClick={doExport}
        startIcon={<DescriptionIcon />}
        size="small"
      >
        {i18n('common.export')}
      </MDButton>
    );

    if (!disabledWithTooltip) {
      return button;
    }

    return (
      <>
        <Tooltip
          disableInteractive
          title={i18n('common.noDataToExport')}
        >
          <span>{button}</span>
        </Tooltip>
      </>
    );
  };

  const renderDestroyButton = () => {
    if (!hasPermissionToDestroy) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="gradient"
        color={sidenavColor}
        type="button"
        disabled={destroyLoading || disabled}
        onClick={doOpenDestroyAllConfirmModal}
        startIcon={<DeleteIcon />}
        size="small"
      >
        {i18n('common.destroy')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip
          disableInteractive
          title={i18n('common.mustSelectARow')}
        >
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToCreate && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          component={Link}
          to="/task/new"
          startIcon={<AddIcon />}
          size="small"
        >
          {i18n('common.new')}
        </MDButton>
      )}

      {hasPermissionToImport && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          component={Link}
          to="/task/importer"
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          {i18n('common.import')}
        </MDButton>
      )}

      {renderDestroyButton()}

      {hasPermissionToAuditLogs && (
        <MDButton
          variant="outlined"
          color={sidenavColor}
          component={Link}
          to="/audit-logs?entityNames=task"
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      {renderExportButton()}

      {destroyAllConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroyAllSelected()}
          onClose={() => doCloseDestroyAllConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default TaskToolbar;
