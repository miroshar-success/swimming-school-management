import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  Tooltip,
} from '@mui/material';
import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import {
  extractsHostUrl,
  extractsDomain,
} from 'src/modules/utils';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import authSelectors from 'src/modules/auth/authSelectors';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BoxShadows from 'src/view/shared/theme/BoxShadows';
import CardButtonActions from 'src/view/shared/components/CardButtonActions';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import LazyLoad from 'react-lazy-load';
import lightColors from 'src/mui/assets/theme/base/colors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import newsArticleListActions from 'src/modules/newsArticle/list/newsArticleListActions';
import newsArticleSelectors from 'src/modules/newsArticle/newsArticleSelectors';
import NewsArticleService from 'src/modules/newsArticle/newsArticleService';
import NewsFavoriteService from 'src/modules/newsFavorite/newsFavoriteService';
import NotificationItem from 'src/mui/shared/Items/NotificationItem';
import riskSelectors from 'src/modules/risk/riskSelectors';
import SearchIcon from '@mui/icons-material/Search';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import taskSelectors from 'src/modules/task/taskSelectors';

function NewsArticleCard(props) {
  const dispatch = useDispatch();

  const {
    row,
    doOpenDestroyConfirmModal,
    handleOpenCreateTask,
    handleOpenCreateRisk,
  } = props;

  const { sidenavColor, darkMode } = selectMuiSettings();

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
    newsArticleSelectors.selectPermissionToEdit,
  );

  const hasPermissionToDestroy = useSelector(
    newsArticleSelectors.selectPermissionToDestroy,
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewNewsArticle = () => {
    getHistory().push(`/news-article/${row.id}`);
  };

  const handleEditNewsArticle = () => {
    getHistory().push(`/news-article/${row.id}/edit`);
  };

  const handleFavoriteToggle = () => {
    const togglePromise = new Promise(async (resolve) => {
      resolve(await NewsFavoriteService.toggle(row.id));
    });

    togglePromise.then(() => {
      dispatch(
        newsArticleListActions.doFetchCurrentFilter(),
      );
    });
  };

  return (
    <LazyLoad>
      <Card sx={{ overflow: 'hidden' }}>
        <CardHeader
          avatar={
            Boolean(row.author) ? (
              <Avatar
                sx={{
                  textTransform: 'uppercase',
                  bgcolor: darkMode
                    ? darkColors[sidenavColor]?.main
                    : lightColors[sidenavColor]?.main,
                }}
              >
                {row.author.substring(0, 1)}
              </Avatar>
            ) : null
          }
          action={
            row.tenant === currentTenant.id && (
              <>
                <IconButton onClick={handleOpenMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Tooltip
                  title={i18n(
                    'entities.newsArticle.tooltips.addBookmark',
                  )}
                  disableInteractive
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
                    onClick={handleViewNewsArticle}
                    icon={<SearchIcon />}
                    title={i18n('common.view')}
                  />
                  {hasPermissionToEdit && (
                    <NotificationItem
                      onClick={handleEditNewsArticle}
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
                href={row.link}
                target="_blank"
                underline="hover"
              >
                {row.title}
              </MaterialLink>
            </MDTypography>
          }
          subheader={undefined}
        />
        {Boolean(row.image) && (
          <CardMedia
            component="img"
            image={row.image}
            alt={row.title}
            sx={{
              margin: 'auto',
              objectFit: 'contain',
              width: '50%',
              borderRadius: 1.6,
              boxShadow: BoxShadows('md'),
            }}
          />
        )}
        <CardContent sx={{ pb: 0 }}>
          {Boolean(row.description) &&
            row.description.trim() !== '' && (
              <MDTypography
                variant="body2"
                color="text"
                fontWeight="regular"
                whiteSpace="pre-line"
                mb={1.6}
              >
                {row.description}
              </MDTypography>
            )}
          <MDTypography
            variant="body2"
            color={sidenavColor}
            fontWeight="regular"
            mb={1.6}
          >
            <MaterialLink
              href={extractsHostUrl(row.link)}
              target="_blank"
              underline="hover"
            >
              {extractsDomain(row.link)}
            </MaterialLink>
          </MDTypography>
          <MDTypography
            variant="body2"
            fontWeight="regular"
            color="text"
            textAlign="right"
          >
            {row.date
              ? moment(row.date).format(
                  DEFAULT_MOMENT_FORMAT,
                )
              : null}
          </MDTypography>
        </CardContent>

        <CardActions disableSpacing>
          <MDBox px={0.8} pb={0.8} width="100%">
            <TagAutocompleteForm
              name="tags"
              id={row.id}
              tags={row.tags}
              handleService={NewsArticleService.tags}
            />
          </MDBox>
        </CardActions>

        <CardButtonActions
          buttons={[
            hasPermissionCreateTask && {
              label: i18n(
                'entities.product.tooltips.createTask',
              ),
              icon: <AssignmentIcon />,
              onClick: () =>
                handleOpenCreateTask([
                  {
                    id: row.id,
                    title: row.title,
                  },
                ]),
            },
            hasPermissionCreateRisk && {
              label: i18n(
                'entities.product.tooltips.createRisk',
              ),
              icon: <GppMaybeIcon />,
              onClick: () =>
                handleOpenCreateRisk([
                  {
                    id: row.id,
                    title: row.title,
                  },
                ]),
            },
          ].filter(Boolean)}
        />
      </Card>
    </LazyLoad>
  );
}

export default NewsArticleCard;
