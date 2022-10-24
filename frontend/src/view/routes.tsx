import Permissions from 'src/security/permissions';
import config from 'src/config';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/',
    i18n: 'dashboard.menu',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/report',
    collapseName: 'reports',
    i18n: 'collapses.reports.menu',
    parent: '/',
    redirect: '/report/tasks-by-month',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/report/tasks-by-month',
    collapseName: 'reports',
    i18n: 'reports.tasksByMonth.menu',
    parent: '/report',
    loader: () =>
      import('src/view/report/view/TasksByMonthPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
  },

  {
    path: '/person-name-breadcrumb',
    collapseName: 'my-profile',
    // labelCode: '{USER_TEXT}',
    i18n: 'roles.admin.label',
    parent: '/',
    redirect: '/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/password-change',
    collapseName: 'my-profile',
    i18n: 'auth.passwordChange.title',
    parent: '/person-name-breadcrumb',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant',
    collapseName: 'my-profile',
    i18n: 'tenant.list.title',
    parent: '/person-name-breadcrumb',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant/new',
    collapseName: 'my-profile',
    i18n: 'tenant.new.title',
    parent: '/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/tenant/:id/edit',
    collapseName: 'my-profile',
    i18n: 'tenant.edit.title',
    parent: '/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/plan',
    i18n: 'plan.title',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/user',
    i18n: 'user.menu',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/user/list/UserPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/user/new',
    i18n: 'user.new.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () => import('src/view/user/new/UserNewPage'),
    permissionRequired: permissions.userCreate,
    exact: true,
  },

  {
    path: '/user/importer',
    i18n: 'user.importer.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () =>
      import('src/view/user/importer/UserImporterPage'),
    permissionRequired: permissions.userImport,
    exact: true,
  },

  {
    path: '/user/:id/edit',
    i18n: 'user.edit.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () => import('src/view/user/edit/UserEditPage'),
    permissionRequired: permissions.userEdit,
    exact: true,
  },

  {
    path: '/user/:id',
    i18n: 'user.view.title',
    collapseName: 'my-profile',
    parent: '/user',
    loader: () => import('src/view/user/view/UserViewPage'),
    permissionRequired: permissions.userRead,
    exact: true,
  },

  {
    path: '/settings-breadcrumb',
    collapseName: 'settings',
    i18n: 'settings.title',
    parent: '/',
    redirect: '/settings',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/audit-logs',
    collapseName: 'settings',
    i18n: 'auditLog.menu',
    parent: '/settings-breadcrumb',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    collapseName: 'settings',
    i18n: 'settings.tenant',
    parent: '/settings-breadcrumb',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/vendor-management',
    collapseName: 'vendor-management',
    i18n: 'collapses.vendors.menu',
    parent: '/',
    redirect: '/vendor',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/vendor',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.menu',
    parent: '/vendor-management',
    loader: () =>
      import('src/view/vendor/list/VendorListPage'),
    permissionRequired: permissions.vendorRead,
    exact: true,
  },

  {
    path: '/vendor/new',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.new.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/form/VendorFormPage'),
    permissionRequired: permissions.vendorCreate,
    exact: true,
  },

  {
    path: '/vendor/importer',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.importer.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/importer/VendorImporterPage'),
    permissionRequired: permissions.vendorImport,
    exact: true,
  },

  {
    path: '/vendor/:id/edit',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.edit.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/form/VendorFormPage'),
    permissionRequired: permissions.vendorEdit,
    exact: true,
  },

  {
    path: '/vendor/:id',
    collapseName: 'vendor-management',
    i18n: 'entities.vendor.view.title',
    parent: '/vendor',
    loader: () =>
      import('src/view/vendor/view/VendorViewPage'),
    permissionRequired: permissions.vendorRead,
    exact: true,
  },

  {
    path: '/vendor-category',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.menu',
    parent: '/vendor-management',
    loader: () =>
      import(
        'src/view/vendorCategory/list/VendorCategoryListPage'
      ),
    permissionRequired: permissions.vendorCategoryRead,
    exact: true,
  },

  {
    path: '/vendor-category/new',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.new.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/form/VendorCategoryFormPage'
      ),
    permissionRequired: permissions.vendorCategoryCreate,
    exact: true,
  },

  {
    path: '/vendor-category/importer',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.importer.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/importer/VendorCategoryImporterPage'
      ),
    permissionRequired: permissions.vendorCategoryImport,
    exact: true,
  },

  {
    path: '/vendor-category/:id/edit',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.edit.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/form/VendorCategoryFormPage'
      ),
    permissionRequired: permissions.vendorCategoryEdit,
    exact: true,
  },

  {
    path: '/vendor-category/:id',
    collapseName: 'vendor-management',
    i18n: 'entities.vendorCategory.view.title',
    parent: '/vendor-category',
    loader: () =>
      import(
        'src/view/vendorCategory/view/VendorCategoryViewPage'
      ),
    permissionRequired: permissions.vendorCategoryRead,
    exact: true,
  },

  {
    path: '/tasks-breadcrumb',
    collapseName: 'tasks',
    i18n: 'collapses.tasks.menu',
    parent: '/',
    redirect: '/task',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/task',
    collapseName: 'tasks',
    i18n: 'entities.task.menu',
    parent: '/tasks-breadcrumb',
    loader: () => import('src/view/task/list/TaskListPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
  },

  {
    path: '/task/new',
    collapseName: 'tasks',
    i18n: 'entities.task.new.title',
    parent: '/task',
    loader: () => import('src/view/task/form/TaskFormPage'),
    permissionRequired: permissions.taskCreate,
    exact: true,
  },

  {
    path: '/task/importer',
    collapseName: 'tasks',
    i18n: 'entities.task.importer.title',
    parent: '/task',
    loader: () =>
      import('src/view/task/importer/TaskImporterPage'),
    permissionRequired: permissions.taskImport,
    exact: true,
  },

  {
    path: '/task/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.task.edit.title',
    parent: '/task',
    loader: () => import('src/view/task/form/TaskFormPage'),
    permissionRequired: permissions.taskEdit,
    exact: true,
  },

  {
    path: '/task/:id',
    collapseName: 'tasks',
    i18n: 'entities.task.view.title',
    parent: '/task',
    loader: () => import('src/view/task/view/TaskViewPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
  },

  {
    path: '/task-priority',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.menu',
    parent: '/tasks-breadcrumb',
    loader: () =>
      import(
        'src/view/taskPriority/list/TaskPriorityListPage'
      ),
    permissionRequired: permissions.taskPriorityRead,
    exact: true,
  },

  {
    path: '/task-priority/new',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.new.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/form/TaskPriorityFormPage'
      ),
    permissionRequired: permissions.taskPriorityCreate,
    exact: true,
  },

  {
    path: '/task-priority/importer',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.importer.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/importer/TaskPriorityImporterPage'
      ),
    permissionRequired: permissions.taskPriorityImport,
    exact: true,
  },

  {
    path: '/task-priority/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.edit.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/form/TaskPriorityFormPage'
      ),
    permissionRequired: permissions.taskPriorityEdit,
    exact: true,
  },

  {
    path: '/task-priority/:id',
    collapseName: 'tasks',
    i18n: 'entities.taskPriority.view.title',
    parent: '/task-priority',
    loader: () =>
      import(
        'src/view/taskPriority/view/TaskPriorityViewPage'
      ),
    permissionRequired: permissions.taskPriorityRead,
    exact: true,
  },

  {
    path: '/task-list',
    collapseName: 'tasks',
    i18n: 'entities.taskList.menu',
    parent: '/tasks-breadcrumb',
    loader: () =>
      import('src/view/taskList/list/TaskListListPage'),
    permissionRequired: permissions.taskListRead,
    exact: true,
  },

  {
    path: '/task-list/new',
    collapseName: 'tasks',
    i18n: 'entities.taskList.new.title',
    parent: '/task-list',
    loader: () =>
      import('src/view/taskList/form/TaskListFormPage'),
    permissionRequired: permissions.taskListCreate,
    exact: true,
  },

  {
    path: '/task-list/importer',
    collapseName: 'tasks',
    i18n: 'entities.taskList.importer.title',
    parent: '/task-list',
    loader: () =>
      import(
        'src/view/taskList/importer/TaskListImporterPage'
      ),
    permissionRequired: permissions.taskListImport,
    exact: true,
  },

  {
    path: '/task-list/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.taskList.edit.title',
    parent: '/task-list',
    loader: () =>
      import('src/view/taskList/form/TaskListFormPage'),
    permissionRequired: permissions.taskListEdit,
    exact: true,
  },

  {
    path: '/task-list/:id',
    collapseName: 'tasks',
    i18n: 'entities.taskList.view.title',
    parent: '/task-list',
    loader: () =>
      import('src/view/taskList/view/TaskListViewPage'),
    permissionRequired: permissions.taskListRead,
    exact: true,
  },

  {
    path: '/note',
    collapseName: 'tasks',
    i18n: 'entities.note.menu',
    parent: '/tasks-breadcrumb',
    loader: () => import('src/view/note/list/NoteListPage'),
    permissionRequired: permissions.noteRead,
    exact: true,
  },

  {
    path: '/note/new',
    collapseName: 'tasks',
    i18n: 'entities.note.new.title',
    parent: '/note',
    loader: () => import('src/view/note/form/NoteFormPage'),
    permissionRequired: permissions.noteCreate,
    exact: true,
  },

  {
    path: '/note/importer',
    collapseName: 'tasks',
    i18n: 'entities.note.importer.title',
    parent: '/note',
    loader: () =>
      import('src/view/note/importer/NoteImporterPage'),
    permissionRequired: permissions.noteImport,
    exact: true,
  },

  {
    path: '/note/:id/edit',
    collapseName: 'tasks',
    i18n: 'entities.note.edit.title',
    parent: '/note',
    loader: () => import('src/view/note/form/NoteFormPage'),
    permissionRequired: permissions.noteEdit,
    exact: true,
  },

  {
    path: '/note/:id',
    collapseName: 'tasks',
    i18n: 'entities.note.view.title',
    parent: '/note',
    loader: () => import('src/view/note/view/NoteViewPage'),
    permissionRequired: permissions.noteRead,
    exact: true,
  },

  {
    path: '/risk-management',
    collapseName: 'risk-management',
    i18n: 'collapses.risks.menu',
    parent: '/',
    redirect: '/risk',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/risk',
    collapseName: 'risk-management',
    i18n: 'entities.risk.menu',
    parent: '/risk-management',
    loader: () => import('src/view/risk/list/RiskListPage'),
    permissionRequired: permissions.riskRead,
    exact: true,
  },

  {
    path: '/risk/new',
    collapseName: 'risk-management',
    i18n: 'entities.risk.new.title',
    parent: '/risk',
    loader: () => import('src/view/risk/form/RiskFormPage'),
    permissionRequired: permissions.riskCreate,
    exact: true,
  },

  {
    path: '/risk/importer',
    collapseName: 'risk-management',
    i18n: 'entities.risk.importer.title',
    parent: '/risk',
    loader: () =>
      import('src/view/risk/importer/RiskImporterPage'),
    permissionRequired: permissions.riskImport,
    exact: true,
  },

  {
    path: '/risk/:id/edit',
    collapseName: 'risk-management',
    i18n: 'entities.risk.edit.title',
    parent: '/risk',
    loader: () => import('src/view/risk/form/RiskFormPage'),
    permissionRequired: permissions.riskEdit,
    exact: true,
  },

  {
    path: '/risk/:id',
    collapseName: 'risk-management',
    i18n: 'entities.risk.view.title',
    parent: '/risk',
    loader: () => import('src/view/risk/view/RiskViewPage'),
    permissionRequired: permissions.riskRead,
    exact: true,
  },

  {
    path: '/risk-category',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.menu',
    parent: '/risk-management',
    loader: () =>
      import(
        'src/view/riskCategory/list/RiskCategoryListPage'
      ),
    permissionRequired: permissions.riskCategoryRead,
    exact: true,
  },

  {
    path: '/risk-category/new',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.new.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/form/RiskCategoryFormPage'
      ),
    permissionRequired: permissions.riskCategoryCreate,
    exact: true,
  },

  {
    path: '/risk-category/importer',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.importer.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/importer/RiskCategoryImporterPage'
      ),
    permissionRequired: permissions.riskCategoryImport,
    exact: true,
  },

  {
    path: '/risk-category/:id/edit',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.edit.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/form/RiskCategoryFormPage'
      ),
    permissionRequired: permissions.riskCategoryEdit,
    exact: true,
  },

  {
    path: '/risk-category/:id',
    collapseName: 'risk-management',
    i18n: 'entities.riskCategory.view.title',
    parent: '/risk-category',
    loader: () =>
      import(
        'src/view/riskCategory/view/RiskCategoryViewPage'
      ),
    permissionRequired: permissions.riskCategoryRead,
    exact: true,
  },

  {
    path: '/product',
    collapseName: 'marketplace',
    i18n: 'entities.product.menu',
    parent: '/',
    loader: () =>
      import('src/view/product/list/ProductListPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },

  {
    path: '/product/new',
    collapseName: 'marketplace',
    i18n: 'entities.product.new.title',
    parent: '/product',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productCreate,
    exact: true,
  },

  {
    path: '/product/importer',
    collapseName: 'marketplace',
    i18n: 'entities.product.importer.title',
    parent: '/product',
    loader: () =>
      import(
        'src/view/product/importer/ProductImporterPage'
      ),
    permissionRequired: permissions.productImport,
    exact: true,
  },

  {
    path: '/product/:id/edit',
    collapseName: 'marketplace',
    i18n: 'entities.product.edit.title',
    parent: '/product',
    loader: () =>
      import('src/view/product/form/ProductFormPage'),
    permissionRequired: permissions.productEdit,
    exact: true,
  },

  {
    path: '/product/:id',
    collapseName: 'marketplace',
    i18n: 'entities.product.view.title',
    parent: '/product',
    loader: () =>
      import('src/view/product/view/ProductViewPage'),
    permissionRequired: permissions.productRead,
    exact: true,
  },

  {
    path: '/product-category',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/productCategory/list/ProductCategoryListPage'
      ),
    permissionRequired: permissions.productCategoryRead,
    exact: true,
  },

  {
    path: '/product-category/new',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.new.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/form/ProductCategoryFormPage'
      ),
    permissionRequired: permissions.productCategoryCreate,
    exact: true,
  },

  {
    path: '/product-category/importer',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.importer.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/importer/ProductCategoryImporterPage'
      ),
    permissionRequired: permissions.productCategoryImport,
    exact: true,
  },

  {
    path: '/product-category/:id/edit',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.edit.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/form/ProductCategoryFormPage'
      ),
    permissionRequired: permissions.productCategoryEdit,
    exact: true,
  },

  {
    path: '/product-category/:id',
    collapseName: 'marketplace',
    i18n: 'entities.productCategory.view.title',
    parent: '/product-category',
    loader: () =>
      import(
        'src/view/productCategory/view/ProductCategoryViewPage'
      ),
    permissionRequired: permissions.productCategoryRead,
    exact: true,
  },

  {
    path: '/organization-profile',
    i18n: 'entities.organizationProfile.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/organizationProfile/view/OrganizationProfileViewPage'
      ),
    permissionRequired: permissions.organizationProfileRead,
    exact: true,
  },
  {
    path: '/organization-profile/new',
    i18n: 'entities.organizationProfile.new.title',
    parent: '/organization-profile',
    loader: () =>
      import(
        'src/view/organizationProfile/form/OrganizationProfileFormPage'
      ),
    permissionRequired:
      permissions.organizationProfileCreate,
    exact: true,
  },
  {
    path: '/organization-profile/:id/edit',
    i18n: 'entities.organizationProfile.edit.title',
    parent: '/organization-profile',
    loader: () =>
      import(
        'src/view/organizationProfile/form/OrganizationProfileFormPage'
      ),
    permissionRequired: permissions.organizationProfileEdit,
    exact: true,
  },

  {
    path: '/news-article',
    i18n: 'entities.newsArticle.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/newsArticle/list/NewsArticleListPage'
      ),
    permissionRequired: permissions.newsArticleRead,
    exact: true,
  },
  {
    path: '/news-article/new',
    i18n: 'entities.newsArticle.new.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/form/NewsArticleFormPage'
      ),
    permissionRequired: permissions.newsArticleCreate,
    exact: true,
  },
  {
    path: '/news-article/importer',
    i18n: 'entities.newsArticle.importer.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/importer/NewsArticleImporterPage'
      ),
    permissionRequired: permissions.newsArticleImport,
    exact: true,
  },
  {
    path: '/news-article/:id/edit',
    i18n: 'entities.newsArticle.edit.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/form/NewsArticleFormPage'
      ),
    permissionRequired: permissions.newsArticleEdit,
    exact: true,
  },
  {
    path: '/news-article/:id',
    i18n: 'entities.newsArticle.view.title',
    parent: '/news-article',
    loader: () =>
      import(
        'src/view/newsArticle/view/NewsArticleViewPage'
      ),
    permissionRequired: permissions.newsArticleRead,
    exact: true,
  },

  {
    path: '/news-favorite',
    i18n: 'entities.newsFavorite.menu',
    parent: '/',
    loader: () =>
      import(
        'src/view/newsFavorite/list/NewsFavoriteListPage'
      ),
    permissionRequired: permissions.newsFavoriteRead,
    exact: true,
  },
  {
    path: '/news-favorite/new',
    i18n: 'entities.newsFavorite.new.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/form/NewsFavoriteFormPage'
      ),
    permissionRequired: permissions.newsFavoriteCreate,
    exact: true,
  },
  {
    path: '/news-favorite/importer',
    i18n: 'entities.newsFavorite.importer.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/importer/NewsFavoriteImporterPage'
      ),
    permissionRequired: permissions.newsFavoriteImport,
    exact: true,
  },
  {
    path: '/news-favorite/:id/edit',
    i18n: 'entities.newsFavorite.edit.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/form/NewsFavoriteFormPage'
      ),
    permissionRequired: permissions.newsFavoriteEdit,
    exact: true,
  },
  {
    path: '/news-favorite/:id',
    i18n: 'entities.newsFavorite.view.title',
    parent: '/news-favorite',
    loader: () =>
      import(
        'src/view/newsFavorite/view/NewsFavoriteViewPage'
      ),
    permissionRequired: permissions.newsFavoriteRead,
    exact: true,
  },

  {
    path: '/tag',
    i18n: 'entities.tag.menu',
    parent: '/',
    loader: () => import('src/view/tag/list/TagListPage'),
    permissionRequired: permissions.tagRead,
    exact: true,
  },
  {
    path: '/tag/new',
    i18n: 'entities.tag.new.title',
    parent: '/tag',
    loader: () => import('src/view/tag/form/TagFormPage'),
    permissionRequired: permissions.tagCreate,
    exact: true,
  },
  {
    path: '/tag/importer',
    i18n: 'entities.tag.importer.title',
    parent: '/tag',
    loader: () =>
      import('src/view/tag/importer/TagImporterPage'),
    permissionRequired: permissions.tagImport,
    exact: true,
  },
  {
    path: '/tag/:id/edit',
    i18n: 'entities.tag.edit.title',
    parent: '/tag',
    loader: () => import('src/view/tag/form/TagFormPage'),
    permissionRequired: permissions.tagEdit,
    exact: true,
  },
  {
    path: '/tag/:id',
    i18n: 'entities.tag.view.title',
    parent: '/tag',
    loader: () => import('src/view/tag/view/TagViewPage'),
    permissionRequired: permissions.tagRead,
    exact: true,
  },

  {
    path: '/documents',
    collapseName: 'documents',
    i18n: 'collapses.documents.menu',
    parent: '/',
    redirect: '/document',
    permissionRequired: permissions.documentRead,
    virtual: true,
  },

  {
    path: '/document',
    collapseName: 'documents',
    i18n: 'entities.document.menu',
    parent: '/documents',
    loader: () =>
      import('src/view/document/list/DocumentListPage'),
    permissionRequired: permissions.documentRead,
    exact: true,
  },

  {
    path: '/policy-template',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.menu',
    parent: '/documents',
    loader: () =>
      import(
        'src/view/policyTemplate/list/PolicyTemplateListPage'
      ),
    permissionRequired: permissions.policyTemplateRead,
    exact: true,
  },
  {
    path: '/policy-template/new',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.new.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/form/PolicyTemplateFormPage'
      ),
    permissionRequired: permissions.policyTemplateCreate,
    exact: true,
  },
  {
    path: '/policy-template/importer',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.importer.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/importer/PolicyTemplateImporterPage'
      ),
    permissionRequired: permissions.policyTemplateImport,
    exact: true,
  },
  {
    path: '/policy-template/:id/edit',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.edit.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/form/PolicyTemplateFormPage'
      ),
    permissionRequired: permissions.policyTemplateEdit,
    exact: true,
  },
  {
    path: '/policy-template/:id',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.view.title',
    parent: '/policy-template',
    loader: () =>
      import(
        'src/view/policyTemplate/view/PolicyTemplateViewPage'
      ),
    permissionRequired: permissions.policyTemplateRead,
    exact: true,
  },

  {
    path: '/policy',
    collapseName: 'documents',
    i18n: 'entities.policy.menu',
    parent: '/documents',
    loader: () =>
      import('src/view/policy/list/PolicyListPage'),
    permissionRequired: permissions.policyRead,
    exact: true,
  },
  {
    path: '/policy/new',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.new.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/form/PolicyFormPage'),
    permissionRequired: permissions.policyCreate,
    exact: true,
  },
  {
    path: '/policy/importer',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.importer.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/importer/PolicyImporterPage'),
    permissionRequired: permissions.policyImport,
    exact: true,
  },
  {
    path: '/policy/:id/edit',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.edit.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/form/PolicyFormPage'),
    permissionRequired: permissions.policyEdit,
    exact: true,
  },
  {
    path: '/policy/:id',
    collapseName: 'documents',
    i18n: 'entities.policyTemplate.view.title',
    parent: '/policy',
    loader: () =>
      import('src/view/policy/view/PolicyViewPage'),
    permissionRequired: permissions.policyRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () =>
      import('src/view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () =>
      import('src/view/shared/errors/Error404Page'),
  },
].filter(Boolean);

export default {
  privateRoutes,
  publicRoutes,
  emptyTenantRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};

export function findRoute(url = null, routes = []) {
  return (
    !!url &&
    (routes.find((route) => url === route.path) ||
      routes.find(
        (route) =>
          /\/:[\w\d_-]+/g.test(route.path) &&
          new RegExp(
            `^${route.path.replace(
              /:[\w\d_-]+/g,
              '[\\w\\d]+',
            )}$`,
          ).test(url),
      ))
  );
}

export function matchedRoutes(
  url = null,
  exactOnly = false,
) {
  if (url === null || url === undefined) {
    return null;
  }

  let routes = [];

  const searchRouteStack = (url, exactOnly) => {
    const found = findRoute(url, privateRoutes);

    if (exactOnly === true) {
      return found;
    }

    if (found) {
      routes.push(found);
      if (found.parent && found.parent !== '/') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}
