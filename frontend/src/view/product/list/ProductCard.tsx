import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  Tooltip,
} from '@mui/material';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import authSelectors from 'src/modules/auth/authSelectors';
import BoxShadows from 'src/view/shared/theme/BoxShadows';
import CardButtonActions from 'src/view/shared/components/CardButtonActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import LazyLoad from 'react-lazy-load';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationItem from 'src/mui/shared/Items/NotificationItem';
import PriceRatingMark from 'src/view/shared/components/PriceRatingMark';
import ProductCategoryListItem from 'src/view/productCategory/list/ProductCategoryListItem';
import ProductFavoriteService from 'src/modules/productFavorite/productFavoriteService';
import productListActions from 'src/modules/product/list/productListActions';
import productSelectors from 'src/modules/product/productSelectors';
import ProductService from 'src/modules/product/productService';
import RatingMark from 'src/view/shared/components/RatingMark';
import riskSelectors from 'src/modules/risk/riskSelectors';
import SearchIcon from '@mui/icons-material/Search';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import taskSelectors from 'src/modules/task/taskSelectors';

function ProductCard(props) {
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
    productSelectors.selectPermissionToEdit,
  );

  const hasPermissionToDestroy = useSelector(
    productSelectors.selectPermissionToDestroy,
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleViewProduct = () => {
    getHistory().push(`/product/${row.id}`);
  };

  const handleEditProduct = () => {
    getHistory().push(`/product/${row.id}/edit`);
  };

  const handleFavoriteToggle = () => {
    const togglePromise = new Promise(async (resolve) => {
      resolve(await ProductFavoriteService.toggle(row.id));
    });

    togglePromise.then(() => {
      dispatch(productListActions.doFetchCurrentFilter());
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
                    'entities.product.tooltips.addFavorite',
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
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
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
                    onClick={handleViewProduct}
                    icon={<SearchIcon />}
                    title={i18n('common.view')}
                  />
                  {hasPermissionToEdit && (
                    <NotificationItem
                      onClick={handleEditProduct}
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
                {row.title}
              </MaterialLink>
            </MDTypography>
          }
        />
        <MDBox position="relative">
          <RatingMark precision={0.1} rating={row.rating} />
          <PriceRatingMark
            precision={0.1}
            rating={row.price}
          />
        </MDBox>
        {Boolean(row.logo) && row.logo.length && (
          <CardMedia
            component="img"
            image={row.logo[0]?.downloadUrl}
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
        {Boolean(row.description) && (
          <CardContent>
            <MDTypography
              variant="body2"
              color="text"
              fontWeight="regular"
              whiteSpace="pre-line"
            >
              {row.description}
            </MDTypography>
          </CardContent>
        )}
        <MDBox display="flex" justifyContent="center">
          <ProductCategoryListItem value={row.category} />
        </MDBox>
        <CardActions disableSpacing>
          <MDBox p={0.8} width="100%">
            <TagAutocompleteForm
              name="tags"
              id={row.id}
              tags={row.tags}
              handleService={ProductService.tags}
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

export default ProductCard;
