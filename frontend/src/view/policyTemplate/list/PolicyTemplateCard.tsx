import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  Tooltip,
} from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import authSelectors from 'src/modules/auth/authSelectors';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CardButtonActions from 'src/view/shared/components/CardButtonActions';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import LazyLoad from 'react-lazy-load';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationItem from 'src/mui/shared/Items/NotificationItem';
import PolicyTemplateFavoriteService from 'src/modules/policyTemplateFavorite/policyTemplateFavoriteService';
import policyTemplateListActions from 'src/modules/policyTemplate/list/policyTemplateListActions';
import policyTemplateSelectors from 'src/modules/policyTemplate/policyTemplateSelectors';
import PolicyTemplateService from 'src/modules/policyTemplate/policyTemplateService';
import riskSelectors from 'src/modules/risk/riskSelectors';
import SearchIcon from '@mui/icons-material/Search';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import taskSelectors from 'src/modules/task/taskSelectors';

function PolicyTemplateCard(props) {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const {
    row,
    doOpenDestroyConfirmModal,
    handleOpenCreateTask,
    handleOpenCreateRisk,
  } = props;

  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const hasPermissionCreateTask = useSelector(
    taskSelectors.selectPermissionToCreate,
  );
  const hasPermissionCreateRisk = useSelector(
    riskSelectors.selectPermissionToCreate,
  );

  const hasPermissionToEdit = useSelector(
    policyTemplateSelectors.selectPermissionToEdit,
  );

  const hasPermissionToDestroy = useSelector(
    policyTemplateSelectors.selectPermissionToDestroy,
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewPolicyTemplate = () => {
    getHistory().push(`/policy-template/${row.id}`);
  };

  const handleEditPolicyTemplate = () => {
    getHistory().push(`/policy-template/${row.id}/edit`);
  };

  const handleFavoriteToggle = () => {
    const togglePromise = new Promise(async (resolve) => {
      resolve(
        await PolicyTemplateFavoriteService.toggle(row.id),
      );
    });

    togglePromise.then(() => {
      dispatch(
        policyTemplateListActions.doFetchCurrentFilter(),
      );
    });
  };

  return (
    <LazyLoad>
      <Card sx={{ overflow: 'hidden' }}>
        <CardHeader
          action={
            row.tenant === currentTenant.id && (
              <>
                <IconButton onClick={handleOpenMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Tooltip
                  disableInteractive
                  title={i18n(
                    'entities.policyTemplate.tooltips.addBookmark',
                  )}
                >
                  <span>
                    <IconButton
                      onClick={handleFavoriteToggle}
                      color={
                        row.favorite ? 'warning' : 'default'
                      }
                    >
                      {row.favorite ? (
                        <BookmarkIcon />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </IconButton>
                  </span>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <NotificationItem
                    onClick={handleViewPolicyTemplate}
                    icon={<SearchIcon />}
                    title={i18n('common.view')}
                  />
                  {hasPermissionToEdit && (
                    <NotificationItem
                      onClick={handleEditPolicyTemplate}
                      icon={<EditIcon />}
                      title={i18n('common.edit')}
                    />
                  )}
                  {hasPermissionToDestroy && (
                    <NotificationItem
                      onClick={() => {
                        doOpenDestroyConfirmModal(row.id);
                      }}
                      icon={<DeleteIcon />}
                      title={i18n('common.destroy')}
                    />
                  )}
                </Menu>
              </>
            )
          }
          title={
            <MDTypography variant="h5" fontWeight="regular">
              <MaterialLink
                href={row.website}
                target="_blank"
                underline="hover"
              >
                {row.name}
              </MaterialLink>
            </MDTypography>
          }
        />
        <CardContent sx={{ py: 0 }}>
          {Boolean(row.description) && (
            <MDTypography
              variant="body2"
              color="text"
              fontWeight="regular"
              whiteSpace="pre-line"
            >
              {row.description}
            </MDTypography>
          )}
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            lineHeight={0}
          >
            <IconButton
              color={sidenavColor}
              href={row.attachment[0].downloadUrl}
              size="medium"
            >
              <DownloadIcon />
            </IconButton>
            <MDTypography
              variant="body2"
              fontWeight="regular"
              color="text"
              textAlign="right"
            >
              {row.lastUpdated
                ? moment(row.lastUpdated).format(
                    DEFAULT_MOMENT_FORMAT,
                  )
                : null}
            </MDTypography>
          </MDBox>
        </CardContent>
        <CardActions disableSpacing>
          <MDBox p={0.8} width="100%">
            <TagAutocompleteForm
              name="tags"
              id={row.id}
              tags={row.tags}
              handleService={PolicyTemplateService.tags}
            />
          </MDBox>
        </CardActions>
        <CardButtonActions
          buttons={[
            hasPermissionCreateTask && {
              label: i18n(
                'entities.policyTemplate.tooltips.createTask',
              ),
              icon: <AssignmentIcon />,
              onClick: () =>
                handleOpenCreateTask([
                  {
                    id: row.id,
                    name: row.name,
                  },
                ]),
            },
            hasPermissionCreateRisk && {
              label: i18n(
                'entities.policyTemplate.tooltips.createRisk',
              ),
              icon: <GppMaybeIcon />,
              onClick: () =>
                handleOpenCreateRisk([
                  {
                    id: row.id,
                    name: row.name,
                  },
                ]),
            },
          ].filter(Boolean)}
        />
      </Card>
    </LazyLoad>
  );
}

export default PolicyTemplateCard;
