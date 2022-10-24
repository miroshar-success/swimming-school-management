import { GRID_MODE, LIST_MODE } from 'src/modules/types';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/policyTemplate/list/policyTemplateListActions';
import AddIcon from '@mui/icons-material/Add';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import destroyActions from 'src/modules/policyTemplate/destroy/policyTemplateDestroyActions';
import destroySelectors from 'src/modules/policyTemplate/destroy/policyTemplateDestroySelectors';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import policyTemplateListActions from 'src/modules/policyTemplate/list/policyTemplateListActions';
import policyTemplateListSelectors from 'src/modules/policyTemplate/list/policyTemplateListSelectors';
import policyTemplateSelectors from 'src/modules/policyTemplate/policyTemplateSelectors';
import selectors from 'src/modules/policyTemplate/list/policyTemplateListSelectors';
import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function PolicyTemplateToolbar(props) {
  const { viewMode, onSetViewMode } = props;
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
  const filter = useSelector(
    policyTemplateListSelectors.selectFilter,
  );

  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToDestroy = useSelector(
    policyTemplateSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    policyTemplateSelectors.selectPermissionToCreate,
  );
  const hasPermissionToImport = useSelector(
    policyTemplateSelectors.selectPermissionToImport,
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
    if (!hasPermissionToDestroy || viewMode !== LIST_MODE) {
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

  const renderFavoriteButton = () => {
    const disabled = loading;
    const button = (
      <MDButton
        variant={
          filter?.favorites ? 'contained' : 'outlined'
        }
        color="warning"
        type="button"
        disabled={disabled}
        onClick={() => {
          dispatch(
            policyTemplateListActions.doFetchFavorites(),
          );
        }}
        size="medium"
        iconOnly
      >
        <BookmarkIcon />
      </MDButton>
    );
    return (
      <Tooltip
        disableInteractive
        title={i18n(
          'entities.policyTemplate.fields.favorites',
        )}
      >
        {disabled ? <span>{button}</span> : button}
      </Tooltip>
    );
  };

  const renderGridModeButton = () => {
    const disabled = viewMode === GRID_MODE || loading;
    const button = (
      <MDButton
        variant="contained"
        color={sidenavColor}
        type="button"
        disabled={disabled}
        onClick={() => {
          onSetViewMode(GRID_MODE);
        }}
        size="medium"
        iconOnly
      >
        <GridViewSharpIcon />
      </MDButton>
    );
    return (
      <Tooltip
        disableInteractive
        title={i18n('common.grid')}
      >
        {disabled ? <span>{button}</span> : button}
      </Tooltip>
    );
  };

  const renderListModeButton = () => {
    const disabled = viewMode === LIST_MODE || loading;
    const button = (
      <MDButton
        variant="contained"
        color={sidenavColor}
        type="button"
        disabled={disabled}
        onClick={() => {
          onSetViewMode(LIST_MODE);
        }}
        size="medium"
        iconOnly
      >
        <TableRowsSharpIcon />
      </MDButton>
    );
    return (
      <Tooltip
        disableInteractive
        title={i18n('common.list')}
      >
        {disabled ? <span>{button}</span> : button}
      </Tooltip>
    );
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToCreate && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          component={Link}
          to="/policy-template/new"
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
          to="/policy-template/importer"
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
          to="/audit-logs?entityNames=policyTemplate"
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

      {renderFavoriteButton()}
      {renderGridModeButton()}
      {renderListModeButton()}
    </ToolbarWrapper>
  );
}

export default PolicyTemplateToolbar;
