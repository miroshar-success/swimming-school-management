import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/product/destroy/productDestroyActions';
import destroySelectors from 'src/modules/product/destroy/productDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import productSelectors from 'src/modules/product/productSelectors';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function ProductViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const [destroyConfirmVisible, setDestroyConfirmVisible] =
    useState(false);

  const dispatch = useDispatch();

  const id = props.match.params.id;

  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    productSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    productSelectors.selectPermissionToDestroy,
  );
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const doOpenDestroyConfirmModal = () => {
    setDestroyConfirmVisible(true);
  };

  const doCloseDestroyConfirmModal = () => {
    setDestroyConfirmVisible(false);
  };

  const doDestroy = () => {
    doCloseDestroyConfirmModal();
    dispatch(destroyActions.doDestroy(id));
  };

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/product/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}

      {hasPermissionToDestroy && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<DeleteIcon />}
          disabled={destroyLoading}
          onClick={doOpenDestroyConfirmModal}
          size="small"
        >
          {i18n('common.destroy')}
        </MDButton>
      )}

      {hasPermissionToAuditLogs && (
        <MDButton
          variant="outlined"
          color={sidenavColor}
          component={Link}
          to={`/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      <MDButton
        variant="outlined"
        color={sidenavColor}
        component={Link}
        to={'/product'}
        startIcon={<ArrowBackIcon />}
        size="small"
      >
        {i18n('common.back')}
      </MDButton>

      {destroyConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy()}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default ProductViewToolbar;
