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
    path: '/admin',
    i18n: 'admin.menu',
    collapseName: 'my-profile',
    parent: '/person-name-breadcrumb',
    loader: () => import('src/view/admin/list/AdminPage'),
    permissionRequired: permissions.adminRead,
    exact: true,
  },

  {
    path: '/admin/new',
    i18n: 'admin.new.title',
    collapseName: 'my-profile',
    parent: '/admin',
    loader: () => import('src/view/admin/new/AdminNewPage'),
    permissionRequired: permissions.adminCreate,
    exact: true,
  },

  {
    path: '/admin/importer',
    i18n: 'admin.importer.title',
    collapseName: 'my-profile',
    parent: '/admin',
    loader: () =>
      import('src/view/admin/importer/AdminImporterPage'),
    permissionRequired: permissions.adminImport,
    exact: true,
  },

  {
    path: '/admin/:id/edit',
    i18n: 'admin.edit.title',
    collapseName: 'my-profile',
    parent: '/admin',
    loader: () =>
      import('src/view/admin/edit/AdminEditPage'),
    permissionRequired: permissions.adminEdit,
    exact: true,
  },

  {
    path: '/admin/:id',
    i18n: 'admin.view.title',
    collapseName: 'my-profile',
    parent: '/admin',
    loader: () =>
      import('src/view/admin/view/AdminViewPage'),
    permissionRequired: permissions.adminRead,
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
    path: '/audit-log',
    collapseName: 'settings',
    i18n: 'auditLog.menu',
    parent: '/settings-breadcrumb',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    collapseName: 'settings',
    i18n: 'school.menu',
    parent: '/settings-breadcrumb',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/document',
    collapseName: 'settings',
    i18n: 'document.menu',
    parent: '/settings-breadcrumb',
    //loader: () =>
    //  import('src/view/document/DocumentFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/student-breadcrumb',
    collapseName: 'student',
    i18n: 'student.menu',
    parent: '/',
    redirect: '/student',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/student',
    i18n: 'common.list',
    collapseName: 'student',
    parent: '/student-breadcrumb',
    loader: () =>
      import('src/view/student/list/StudentPage'),
    permissionRequired: permissions.studentRead,
    exact: true,
  },

  {
    path: '/student/new',
    i18n: 'student.new.title',
    collapseName: 'student',
    parent: '/student-breadcrumb',
    loader: () =>
      import('src/view/student/form/StudentFormPage'),
    permissionRequired: permissions.studentCreate,
    exact: true,
  },

  {
    path: '/student/importer',
    i18n: 'student.importer.title',
    collapseName: 'student',
    parent: '/student-breadcrumb',
    loader: () =>
      import(
        'src/view/student/importer/StudentImporterPage'
      ),
    permissionRequired: permissions.studentImport,
    exact: true,
  },

  {
    path: '/student/:id/edit',
    i18n: 'student.edit.title',
    collapseName: 'student',
    parent: '/student-breadcrumb',
    loader: () =>
      import('src/view/student/form/StudentFormPage'),
    permissionRequired: permissions.studentEdit,
    exact: true,
  },

  {
    path: '/student/:id',
    i18n: 'student.view.title',
    collapseName: 'student',
    parent: '/student-breadcrumb',
    loader: () =>
      import('src/view/student/view/StudentViewPage'),
    permissionRequired: permissions.studentRead,
    exact: true,
  },

  {
    path: '/registration',
    i18n: 'registration.list.title',
    collapseName: 'student',
    parent: '/student-breadcrumb',
    loader: () =>
      import('src/view/registration/list/RegistrationPage'),
    permissionRequired: permissions.studentRead,
    exact: true,
  },

  {
    path: '/registration/:id',
    i18n: 'registration.assignment',
    collapseNmae: 'student',
    parent: '/registration',
    loader: () =>
      import(
        'src/view/registration/form/RegistrationFormPage'
      ),
    exact: true,
  },

  {
    path: '/teacher',
    i18n: 'teacher.menu',
    collapseName: 'teacher-page',
    parent: '/',
    loader: () =>
      import('src/view/teacher/list/TeacherPage'),
    permissionRequired: permissions.teacherRead,
    exact: true,
  },

  {
    path: '/teacher/new',
    i18n: 'teacher.new.title',
    collapseName: 'teacher-page',
    parent: '/teacher',
    loader: () =>
      import('src/view/teacher/new/TeacherNewPage'),
    permissionRequired: permissions.teacherCreate,
    exact: true,
  },

  {
    path: '/teacher/importer',
    i18n: 'teacher.importer.title',
    collapseName: 'teacher-page',
    parent: '/teacher',
    loader: () =>
      import(
        'src/view/teacher/importer/TeacherImporterPage'
      ),
    permissionRequired: permissions.teacherImport,
    exact: true,
  },

  {
    path: '/teacher/:id/edit',
    i18n: 'teacher.edit.title',
    collapseName: 'teacher-page',
    parent: '/teacher',
    loader: () =>
      import('src/view/teacher/edit/TeacherEditPage'),
    permissionRequired: permissions.teacherEdit,
    exact: true,
  },

  {
    path: '/teacher/:id',
    i18n: 'teacher.view.title',
    collapseName: 'teacher-page',
    parent: '/teacher',
    loader: () =>
      import('src/view/teacher/view/TeacherViewPage'),
    permissionRequired: permissions.teacherRead,
    exact: true,
  },

  {
    path: '/payment-breadcrumb',
    i18n: 'payment.menu',
    collapse: 'payment',
    parent: '/',
    redirect: '/payment',
    permissionRequired: permissions.paymentRead,
    virtual: true,
  },

  {
    path: '/payment',
    i18n: 'common.list',
    collapse: 'payment',
    parent: '/payment-breadcrumb',
    loader: () =>
      import('src/view/payment/list/PaymentListPage'),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment/:id/create',
    i18n: 'payment.create.title',
    collapse: 'payment',
    parent: '/payment',
    loader: () =>
      import('src/view/payment/form/PaymentFormPage'),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },

  {
    path: '/payment-history',
    i18n: 'payment.history.title',
    collapse: 'payment',
    parent: '/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentHistory/list/PaymentHistoryListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-history/:userId/:paymentId',
    i18n: 'payment.history.view.title',
    collapse: 'payment',
    parent: '/payment-history',
    loader: () =>
      import(
        'src/view/paymentHistory/view/PaymentHistoryViewPage'
      ),
    permissionRequired: permissions.paymentRead,
  },

  {
    path: '/payment-expired',
    i18n: 'payment.expired.list.title',
    collapse: 'payment',
    parent: '/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentExpired/list/PaymentExpiredListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-expired/:id',
    i18n: 'payment.expired.view.title',
    collapse: 'payment',
    parent: '/payment-expired',
    loader: () =>
      import(
        'src/view/paymentExpired/view/PaymentExpiredViewPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-category',
    i18n: 'payment.category.list.title',
    collapse: 'payment',
    parent: '/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentCategory/list/PaymentCategoryListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-category/new',
    i18n: 'payment.category.new.title',
    collapse: 'payment',
    parent: '/payment-category',
    loader: () =>
      import(
        'src/view/paymentCategory/form/PaymentCategoryFormPage'
      ),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },

  {
    path: '/payment-category/:id/edit',
    i18n: 'payment.category.edit.title',
    collapse: 'payment',
    parent: '/payment-category',
    loader: () =>
      import(
        'src/view/paymentCategory/form/PaymentCategoryFormPage'
      ),
    permissionRequired: permissions.paymentEdit,
    exact: true,
  },

  {
    path: '/payment-category/:id',
    i18n: 'payment.category.view.title',
    collapse: 'payment',
    parent: '/payment-category',
    loader: () =>
      import(
        'src/view/paymentCategory/view/PaymentCategoryViewPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-method',
    i18n: 'payment.method.list.title',
    collapse: 'payment',
    parent: '/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentMethod/list/PaymentMethodListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/payment-method/new',
    i18n: 'payment.method.new.title',
    collapse: 'payment',
    parent: '/payment-method',
    loader: () =>
      import(
        'src/view/paymentMethod/form/PaymentMethodFormPage'
      ),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },

  {
    path: '/payment-method/:id/edit',
    i18n: 'payment.method.edit.title',
    collapse: 'payment',
    parent: '/payment-method',
    loader: () =>
      import(
        'src/view/paymentMethod/form/PaymentMethodFormPage'
      ),
    permissionRequired: permissions.paymentEdit,
    exact: true,
  },

  {
    path: '/payment-method/:id',
    i18n: 'payment.method.view.title',
    collapse: 'payment',
    parent: '/payment-method',
    loader: () =>
      import(
        'src/view/paymentMethod/view/PaymentMethodViewPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/class-breadcrumb',
    i18n: 'class.menu',
    collapse: 'class',
    parent: '/',
    redirect: '/class',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/class',
    i18n: 'class.list.title',
    collapse: 'class',
    parent: '/class-breadcrumb',
    loader: () =>
      import('src/view/class/list/ClassListPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/class/new',
    i18n: 'class.new.title',
    collapse: 'class',
    parent: '/class-breadcrumb',
    loader: () =>
      import('src/view/class/form/ClassFormPage'),
    permissionRequired: permissions.classCreate,
    exact: true,
  },

  {
    path: '/class/:id/edit',
    i18n: 'class.edit.title',
    collapse: 'class',
    parent: '/class-breadcrumb',
    loader: () =>
      import('src/view/class/form/ClassFormPage'),
    permissionRequired: permissions.classEdit,
    exact: true,
  },

  {
    path: '/class/:id',
    i18n: 'class.view.title',
    collapse: 'class',
    parent: '/class-breadcrumb',
    loader: () =>
      import('src/view/class/view/ClassViewPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/lesson',
    i18n: 'lesson.list.title',
    collapse: 'class',
    parent: '/class-breadcrumb',
    loader: () =>
      import('src/view/lesson/list/LessonListPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/lesson/new',
    i18n: 'lesson.new.title',
    collapse: 'class',
    parent: '/lesson',
    loader: () =>
      import('src/view/lesson/form/LessonFormPage'),
    permissionRequired: permissions.classCreate,
    exact: true,
  },

  {
    path: '/lesson/:id/edit',
    i18n: 'lesson.edit.title',
    collapse: 'class',
    parent: '/lesson',
    loader: () =>
      import('src/view/lesson/form/LessonFormPage'),
    permissionRequired: permissions.classEdit,
    exact: true,
  },

  {
    path: '/lesson/:id',
    i18n: 'lesson.view.title',
    collapse: 'class',
    parent: '/lesson',
    loader: () =>
      import('src/view/lesson/view/LessonViewPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/class-category',
    i18n: 'class.category.list.title',
    collapse: 'class',
    parent: '/class-breadcrumb',
    loader: () =>
      import(
        'src/view/classCategory/list/ClassCategoryListPage'
      ),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/class-category/new',
    i18n: 'class.category.new.title',
    collapse: 'class',
    parent: '/class-category',
    loader: () =>
      import(
        'src/view/classCategory/form/ClassCategoryFormPage'
      ),
    permissionRequired: permissions.classCreate,
    exact: true,
  },

  {
    path: '/class-category/:id/edit',
    i18n: 'class.category.edit.title',
    collapse: 'class',
    parent: '/class-category',
    loader: () =>
      import(
        'src/view/classCategory/form/ClassCategoryFormPage'
      ),
    permissionRequired: permissions.classEdit,
    exact: true,
  },

  {
    path: '/class-category/:id',
    i18n: 'class.category.view.title',
    collapse: 'class',
    parent: '/class-category',
    loader: () =>
      import(
        'src/view/classCategory/view/ClassCategoryViewPage'
      ),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/grade-breadcrumb',
    i18n: 'grade.menu',
    collapse: 'grade',
    parent: '/',
    redirect: '/grade',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/grade',
    i18n: 'grade.list.title',
    collapse: 'grade',
    parent: '/grade-breadcrumb',
    loader: () =>
      import('src/view/grade/list/GradeListPage'),
    permissionRequired: permissions.gradeRead,
    exact: true,
  },

  {
    path: '/grade/new',
    i18n: 'grade.new.title',
    collapse: 'grade',
    parent: '/grade',
    loader: () =>
      import('src/view/grade/form/GradeFormPage'),
    permissionRequired: permissions.gradeCreate,
    exact: true,
  },

  {
    path: '/grade/:id/edit',
    i18n: 'grade.edit.title',
    collapse: 'grade',
    parent: '/grade',
    loader: () =>
      import('src/view/grade/form/GradeFormPage'),
    permissionRequired: permissions.gradeEdit,
    exact: true,
  },

  {
    path: '/grade/:id',
    i18n: 'grade.view.title',
    collapse: 'grade',
    parent: '/grade',
    loader: () =>
      import('src/view/grade/view/GradeViewPage'),
    permissionRequired: permissions.gradeRead,
    exact: true,
  },

  {
    path: '/skill',
    i18n: 'skill.list.title',
    collapse: 'grade',
    parent: '/grade-breadcrumb',
    loader: () =>
      import('src/view/skill/list/SkillListPage'),
    permissionRequired: permissions.skillRead,
    exact: true,
  },

  {
    path: '/skill/new',
    i18n: 'skill.new.title',
    collapse: 'grade',
    parent: '/skill',
    loader: () =>
      import('src/view/skill/form/SkillFormPage'),
    permissionRequired: permissions.skillCreate,
    exact: true,
  },

  {
    path: '/skill/:id/edit',
    i18n: 'skill.edit.title',
    collapse: 'grade',
    parent: '/skill',
    loader: () =>
      import('src/view/skill/form/SkillFormPage'),
    permissionRequired: permissions.skillEdit,
    exact: true,
  },

  {
    path: '/skill/:id',
    i18n: 'skill.view.title',
    collapse: 'grade',
    parent: '/skill',
    loader: () =>
      import('src/view/skill/view/SkillViewPage'),
    permissionRequired: permissions.skillRead,
    exact: true,
  },

  {
    path: '/attendance-breadcrumb',
    i18n: 'attendance.menu',
    collapse: 'attendance',
    parent: '/',
    redirect: '/attendance',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/attendance',
    i18n: 'attendance.list.title',
    collapse: 'attendance',
    parent: '/attendance-breadcrumb',
    //loader: () =>
    //  import('src/view/attendance/list/AttendanceListPage'),
    permissionRequired: permissions.attendanceRead,
    exact: true,
  },

  {
    path: '/properties-breadcrumb',
    collapseName: 'properties',
    i18n: 'properties.menu',
    parent: '/',
    redirect: '/pool',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/pool',
    collapseName: 'properties',
    i18n: 'pool.menu',
    parent: '/properties-breadcrumb',
    loader: () => import('src/view/pool/list/PoolListPage'),
    permissionRequired: permissions.poolRead,
    exact: true,
  },

  {
    path: '/pool/new',
    collapseName: 'properties',
    i18n: 'pool.new.title',
    parent: '/pool',
    loader: () => import('src/view/pool/form/PoolFormPage'),
    permissionRequired: permissions.poolCreate,
    exact: true,
  },

  {
    path: '/pool/:id/edit',
    collapseName: 'properties',
    i18n: 'pool.edit.title',
    parent: '/pool',
    loader: () => import('src/view/pool/form/PoolFormPage'),
    permissionRequired: permissions.poolEdit,
    exact: true,
  },

  {
    path: '/pool/:id',
    collapseName: 'properties',
    i18n: 'pool.view.title',
    parent: '/pool',
    loader: () => import('src/view/pool/view/PoolViewPage'),
    permissionRequired: permissions.poolRead,
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
