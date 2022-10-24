import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import tenant from 'src/modules/tenant/tenantReducers';
import plan from 'src/modules/plan/planReducers';
import user from 'src/modules/user/userReducers';
import auditLog from 'src/modules/auditLog/auditLogReducers';
import settings from 'src/modules/settings/settingsReducers';
import vendor from 'src/modules/vendor/vendorReducers';
import vendorCategory from 'src/modules/vendorCategory/vendorCategoryReducers';
import task from 'src/modules/task/taskReducers';
import taskPriority from 'src/modules/taskPriority/taskPriorityReducers';
import taskList from 'src/modules/taskList/taskListReducers';
import note from 'src/modules/note/noteReducers';
import risk from 'src/modules/risk/riskReducers';
import riskCategory from 'src/modules/riskCategory/riskCategoryReducers';
import product from 'src/modules/product/productReducers';
import productCategory from 'src/modules/productCategory/productCategoryReducers';
import organizationProfile from 'src/modules/organizationProfile/organizationProfileReducers';
import newsArticle from 'src/modules/newsArticle/newsArticleReducers';
import newsFavorite from 'src/modules/newsFavorite/newsFavoriteReducers';
import tag from 'src/modules/tag/tagReducers';
import policyTemplate from 'src/modules/policyTemplate/policyTemplateReducers';
import policy from 'src/modules/policy/policyReducers';
import { combineReducers } from 'redux';
import form from 'src/modules/form/formReducers';
import document from 'src/modules/document/documentReducers';
import mui from 'src/modules/mui/muiReducers';
import widget from 'src/modules/widget/widgetReducers';
import taskInstance from 'src/modules/taskInstance/taskInstanceReducers';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    document,
    form,
    mui,
    widget,
    taskInstance,
    layout,
    auth,
    tenant,
    plan,
    user,
    auditLog,
    settings,
    vendor,
    vendorCategory,
    task,
    taskPriority,
    taskList,
    note,
    risk,
    riskCategory,
    product,
    productCategory,
    organizationProfile,
    newsArticle,
    newsFavorite,
    tag,
    policyTemplate,
    policy,
  });
