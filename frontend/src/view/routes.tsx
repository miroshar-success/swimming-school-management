import Permissions from 'src/security/permissions';
import config from 'src/config';
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/admin/',
    i18n: 'dashboard.menu',
    loader: () =>
      import('src/view/dashboard/DashboardPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/report',
    collapseName: 'reports',
    i18n: 'collapses.reports.menu',
    parent: '/admin/',
    redirect: '/admin/report/tasks-by-month',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/person-name-breadcrumb',
    collapseName: 'my-profile',
    // labelCode: '{USER_TEXT}',
    i18n: 'roles.admin.label',
    parent: '/admin/',
    redirect: '/admin/profile',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/profile',
    collapseName: 'my-profile',
    i18n: 'auth.profile.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () => import('src/view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/password-change',
    collapseName: 'my-profile',
    i18n: 'auth.passwordChange.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () =>
      import('src/view/auth/PasswordChangeFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/tenant',
    collapseName: 'my-profile',
    i18n: 'tenant.title',
    parent: '/admin/person-name-breadcrumb',
    loader: () =>
      import('src/view/tenant/list/TenantListPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/tenant/new',
    collapseName: 'my-profile',
    i18n: 'tenant.new.title',
    parent: '/admin/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/admin/tenant/:id/edit',
    collapseName: 'my-profile',
    i18n: 'tenant.edit.title',
    parent: '/admin/tenant',
    loader: () =>
      import('src/view/tenant/form/TenantFormPage'),
    permissionRequired: null,
    exact: true,
  },

  config.isPlanEnabled && {
    path: '/admin/plan',
    i18n: 'plan.title',
    collapseName: 'my-profile',
    parent: '/admin/person-name-breadcrumb',
    loader: () => import('src/view/plan/PlanPage'),
    permissionRequired: permissions.planRead,
    exact: true,
  },

  {
    path: '/admin/admin',
    i18n: 'user.menu',
    collapseName: 'my-profile',
    parent: '/admin/person-name-breadcrumb',
    loader: () => import('src/view/admin/list/AdminPage'),
    permissionRequired: permissions.adminRead,
    exact: true,
  },

  {
    path: '/admin/admin/new',
    i18n: 'user.new.title',
    collapseName: 'my-profile',
    parent: '/admin/admin',
    loader: () => import('src/view/admin/new/AdminNewPage'),
    permissionRequired: permissions.adminCreate,
    exact: true,
  },

  {
    path: '/admin/admin/:id/edit',
    i18n: 'user.edit.title',
    collapseName: 'my-profile',
    parent: '/admin/admin',
    loader: () =>
      import('src/view/admin/edit/AdminEditPage'),
    permissionRequired: permissions.adminEdit,
    exact: true,
  },

  {
    path: '/admin/admin/:id',
    i18n: 'user.view.title',
    collapseName: 'my-profile',
    parent: '/admin/admin',
    loader: () =>
      import('src/view/admin/view/AdminViewPage'),
    permissionRequired: permissions.adminRead,
    exact: true,
  },

  {
    path: '/admin/settings-breadcrumb',
    collapseName: 'settings',
    i18n: 'settings.title',
    parent: '/admin/',
    redirect: '/admin/settings',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/audit-log',
    collapseName: 'settings',
    i18n: 'auditLog.menu',
    parent: '/admin/settings-breadcrumb',
    loader: () => import('src/view/auditLog/AuditLogPage'),
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/admin/settings',
    collapseName: 'settings',
    i18n: 'school.menu',
    parent: '/admin/settings-breadcrumb',
    loader: () =>
      import('src/view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
  },

  {
    path: '/admin/document',
    i18n: 'document.menu',
    collapseName: 'settings',
    parent: '/admin/settings-breadcrumb',
    loader: () =>
      import('src/view/document/list/DocumentListPage'),
    permissionRequired: permissions.documentRead,
    exact: true,
  },

  {
    path: '/admin/document/new',
    i18n: 'document.new.title',
    collapseName: 'document',
    parent: '/admin/document',
    loader: () =>
      import('src/view/document/form/DocumentFormPage'),
    permissionRequired: permissions.documentCreate,
    exact: true,
  },

  {
    path: '/admin/document/:id/edit',
    i18n: 'document.edit.title',
    collapseName: 'document',
    parent: '/admin/document',
    loader: () =>
      import('src/view/document/form/DocumentFormPage'),
    permissionRequired: permissions.documentEdit,
    exact: true,
  },

  {
    path: '/admin/document/:id',
    i18n: 'document.view.title',
    collapseName: 'document',
    parent: '/admin/document',
    loader: () =>
      import('src/view/document/view/DocumentViewPage'),
    permissionRequired: permissions.documentRead,
    exact: true,
  },
  {
    path: '/admin/student-breadcrumb',
    collapseName: 'student',
    i18n: 'student.menu',
    parent: '/admin/',
    redirect: '/admin/student',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/student',
    i18n: 'common.list',
    collapseName: 'student',
    parent: '/admin/student-breadcrumb',
    loader: () =>
      import('src/view/student/list/StudentPage'),
    permissionRequired: permissions.studentRead,
    exact: true,
  },

  {
    path: '/admin/student/new',
    i18n: 'student.new.title',
    collapseName: 'student',
    parent: '/admin/student-breadcrumb',
    loader: () =>
      import('src/view/student/form/StudentFormPage'),
    permissionRequired: permissions.studentCreate,
    exact: true,
  },

  {
    path: '/admin/student/:id/edit',
    i18n: 'student.edit.title',
    collapseName: 'student',
    parent: '/admin/student-breadcrumb',
    loader: () =>
      import('src/view/student/form/StudentFormPage'),
    permissionRequired: permissions.studentEdit,
    exact: true,
  },

  {
    path: '/admin/student/:id',
    i18n: 'student.view.title',
    collapseName: 'student',
    parent: '/admin/student-breadcrumb',
    loader: () =>
      import('src/view/student/view/StudentViewPage'),
    permissionRequired: permissions.studentRead,
    exact: true,
  },

  {
    path: '/admin/registration',
    i18n: 'registration.title',
    collapseName: 'student',
    parent: '/admin/student-breadcrumb',
    loader: () =>
      import('src/view/registration/list/RegistrationPage'),
    permissionRequired: permissions.studentRead,
    exact: true,
  },

  {
    path: '/admin/registration/:id',
    i18n: 'registration.registerLessons',
    collapseNmae: 'student',
    parent: '/admin/registration',
    loader: () =>
      import(
        'src/view/registration/form/RegistrationFormPage'
      ),
    exact: true,
  },

  {
    path: '/admin/teacher',
    i18n: 'teacher.menu',
    collapseName: 'teacher-page',
    parent: '/admin/',
    loader: () =>
      import('src/view/teacher/list/TeacherPage'),
    permissionRequired: permissions.teacherRead,
    exact: true,
  },

  {
    path: '/admin/teacher/new',
    i18n: 'teacher.new.title',
    collapseName: 'teacher-page',
    parent: '/admin/teacher',
    loader: () =>
      import('src/view/teacher/form/TeacherFormPage'),
    permissionRequired: permissions.teacherCreate,
    exact: true,
  },

  {
    path: '/admin/teacher/:id/edit',
    i18n: 'teacher.edit.title',
    collapseName: 'teacher-page',
    parent: '/admin/teacher',
    loader: () =>
      import('src/view/teacher/form/TeacherFormPage'),
    permissionRequired: permissions.teacherEdit,
    exact: true,
  },

  {
    path: '/admin/teacher/:id',
    i18n: 'teacher.view.title',
    collapseName: 'teacher-page',
    parent: '/admin/teacher',
    loader: () =>
      import('src/view/teacher/view/TeacherViewPage'),
    permissionRequired: permissions.teacherRead,
    exact: true,
  },

  {
    path: '/admin/payment-breadcrumb',
    i18n: 'payment.menu',
    collapse: 'payment',
    parent: '/admin/',
    redirect: '/admin/payment',
    permissionRequired: permissions.paymentRead,
    virtual: true,
  },

  {
    path: '/admin/payment',
    i18n: 'common.list',
    collapse: 'payment',
    parent: '/admin/payment-breadcrumb',
    loader: () =>
      import('src/view/payment/list/PaymentListPage'),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment/:id/create',
    i18n: 'payment.add.title',
    collapse: 'payment',
    parent: '/admin/payment',
    loader: () =>
      import('src/view/payment/form/PaymentFormPage'),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },

  {
    path: '/admin/payment-history',
    i18n: 'payment.history.title',
    collapse: 'payment',
    parent: '/admin/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentHistory/list/PaymentHistoryListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment-history/:userId/:paymentId',
    i18n: 'payment.history.view.title',
    collapse: 'payment',
    parent: '/admin/payment-history',
    loader: () =>
      import(
        'src/view/paymentHistory/view/PaymentHistoryViewPage'
      ),
    permissionRequired: permissions.paymentRead,
  },

  {
    path: '/admin/payment-expired',
    i18n: 'payment.expired.title',
    collapse: 'payment',
    parent: '/admin/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentExpired/list/PaymentExpiredListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment-expired/:id',
    i18n: 'payment.expired.view.title',
    collapse: 'payment',
    parent: '/admin/payment-expired',
    loader: () =>
      import(
        'src/view/paymentExpired/view/PaymentExpiredViewPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment-category',
    i18n: 'payment.category.title',
    collapse: 'payment',
    parent: '/admin/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentCategory/list/PaymentCategoryListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment-category/new',
    i18n: 'payment.category.new.title',
    collapse: 'payment',
    parent: '/admin/payment-category',
    loader: () =>
      import(
        'src/view/paymentCategory/form/PaymentCategoryFormPage'
      ),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },

  {
    path: '/admin/payment-category/:id/edit',
    i18n: 'payment.category.edit.title',
    collapse: 'payment',
    parent: '/admin/payment-category',
    loader: () =>
      import(
        'src/view/paymentCategory/form/PaymentCategoryFormPage'
      ),
    permissionRequired: permissions.paymentEdit,
    exact: true,
  },

  {
    path: '/admin/payment-category/:id',
    i18n: 'payment.category.view.title',
    collapse: 'payment',
    parent: '/admin/payment-category',
    loader: () =>
      import(
        'src/view/paymentCategory/view/PaymentCategoryViewPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment-method',
    i18n: 'payment.method.title',
    collapse: 'payment',
    parent: '/admin/payment-breadcrumb',
    loader: () =>
      import(
        'src/view/paymentMethod/list/PaymentMethodListPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/payment-method/new',
    i18n: 'payment.method.new.title',
    collapse: 'payment',
    parent: '/admin/payment-method',
    loader: () =>
      import(
        'src/view/paymentMethod/form/PaymentMethodFormPage'
      ),
    permissionRequired: permissions.paymentCreate,
    exact: true,
  },

  {
    path: '/admin/payment-method/:id/edit',
    i18n: 'payment.method.edit.title',
    collapse: 'payment',
    parent: '/admin/payment-method',
    loader: () =>
      import(
        'src/view/paymentMethod/form/PaymentMethodFormPage'
      ),
    permissionRequired: permissions.paymentEdit,
    exact: true,
  },

  {
    path: '/admin/payment-method/:id',
    i18n: 'payment.method.view.title',
    collapse: 'payment',
    parent: '/admin/payment-method',
    loader: () =>
      import(
        'src/view/paymentMethod/view/PaymentMethodViewPage'
      ),
    permissionRequired: permissions.paymentRead,
    exact: true,
  },

  {
    path: '/admin/class-breadcrumb',
    i18n: 'class.menu',
    collapse: 'class',
    parent: '/admin/',
    redirect: '/admin/class',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/class',
    i18n: 'class.title',
    collapse: 'class',
    parent: '/admin/class-breadcrumb',
    loader: () =>
      import('src/view/class/list/ClassListPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/admin/class/new',
    i18n: 'class.new.title',
    collapse: 'class',
    parent: '/admin/class-breadcrumb',
    loader: () =>
      import('src/view/class/form/ClassFormPage'),
    permissionRequired: permissions.classCreate,
    exact: true,
  },

  {
    path: '/admin/class/:id/edit',
    i18n: 'class.edit.title',
    collapse: 'class',
    parent: '/admin/class-breadcrumb',
    loader: () =>
      import('src/view/class/form/ClassFormPage'),
    permissionRequired: permissions.classEdit,
    exact: true,
  },

  {
    path: '/admin/class/:id',
    i18n: 'class.view.title',
    collapse: 'class',
    parent: '/admin/class-breadcrumb',
    loader: () =>
      import('src/view/class/view/ClassViewPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/admin/lesson',
    i18n: 'lesson.title',
    collapse: 'class',
    parent: '/admin/class-breadcrumb',
    loader: () =>
      import('src/view/lesson/list/LessonListPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/admin/lesson/new',
    i18n: 'lesson.new.title',
    collapse: 'class',
    parent: '/admin/lesson',
    loader: () =>
      import('src/view/lesson/form/LessonFormPage'),
    permissionRequired: permissions.classCreate,
    exact: true,
  },

  {
    path: '/admin/lesson/:id/edit',
    i18n: 'lesson.edit.title',
    collapse: 'class',
    parent: '/admin/lesson',
    loader: () =>
      import('src/view/lesson/form/LessonFormPage'),
    permissionRequired: permissions.classEdit,
    exact: true,
  },

  {
    path: '/admin/lesson/:id',
    i18n: 'lesson.view.title',
    collapse: 'class',
    parent: '/admin/lesson',
    loader: () =>
      import('src/view/lesson/view/LessonViewPage'),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/admin/class-category',
    i18n: 'classCategory.title',
    collapse: 'class',
    parent: '/admin/class-breadcrumb',
    loader: () =>
      import(
        'src/view/classCategory/list/ClassCategoryListPage'
      ),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/admin/class-category/new',
    i18n: 'classCategory.new.title',
    collapse: 'class',
    parent: '/admin/class-category',
    loader: () =>
      import(
        'src/view/classCategory/form/ClassCategoryFormPage'
      ),
    permissionRequired: permissions.classCreate,
    exact: true,
  },

  {
    path: '/admin/class-category/:id/edit',
    i18n: 'classCategory.edit.title',
    collapse: 'class',
    parent: '/admin/class-category',
    loader: () =>
      import(
        'src/view/classCategory/form/ClassCategoryFormPage'
      ),
    permissionRequired: permissions.classEdit,
    exact: true,
  },

  {
    path: '/admin/class-category/:id',
    i18n: 'classCategory.view.title',
    collapse: 'class',
    parent: '/admin/class-category',
    loader: () =>
      import(
        'src/view/classCategory/view/ClassCategoryViewPage'
      ),
    permissionRequired: permissions.classRead,
    exact: true,
  },

  {
    path: '/admin/grade-breadcrumb',
    i18n: 'grade.menu',
    collapse: 'grade',
    parent: '/admin/',
    redirect: '/admin/grade',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/grade',
    i18n: 'grade.title',
    collapse: 'grade',
    parent: '/admin/grade-breadcrumb',
    loader: () =>
      import('src/view/grade/list/GradeListPage'),
    permissionRequired: permissions.gradeRead,
    exact: true,
  },

  {
    path: '/admin/grade/new',
    i18n: 'grade.new.title',
    collapse: 'grade',
    parent: '/admin/grade',
    loader: () =>
      import('src/view/grade/form/GradeFormPage'),
    permissionRequired: permissions.gradeCreate,
    exact: true,
  },

  {
    path: '/admin/grade/:id/edit',
    i18n: 'grade.edit.title',
    collapse: 'grade',
    parent: '/admin/grade',
    loader: () =>
      import('src/view/grade/form/GradeFormPage'),
    permissionRequired: permissions.gradeEdit,
    exact: true,
  },

  {
    path: '/admin/grade/:id',
    i18n: 'grade.view.title',
    collapse: 'grade',
    parent: '/admin/grade',
    loader: () =>
      import('src/view/grade/view/GradeViewPage'),
    permissionRequired: permissions.gradeRead,
    exact: true,
  },

  {
    path: '/admin/skill',
    i18n: 'skill.title',
    collapse: 'grade',
    parent: '/admin/grade-breadcrumb',
    loader: () =>
      import('src/view/skill/list/SkillListPage'),
    permissionRequired: permissions.skillRead,
    exact: true,
  },

  {
    path: '/admin/skill/new',
    i18n: 'skill.new.title',
    collapse: 'grade',
    parent: '/admin/skill',
    loader: () =>
      import('src/view/skill/form/SkillFormPage'),
    permissionRequired: permissions.skillCreate,
    exact: true,
  },

  {
    path: '/admin/skill/:id/edit',
    i18n: 'skill.edit.title',
    collapse: 'grade',
    parent: '/admin/skill',
    loader: () =>
      import('src/view/skill/form/SkillFormPage'),
    permissionRequired: permissions.skillEdit,
    exact: true,
  },

  {
    path: '/admin/skill/:id',
    i18n: 'skill.view.title',
    collapse: 'grade',
    parent: '/admin/skill',
    loader: () =>
      import('src/view/skill/view/SkillViewPage'),
    permissionRequired: permissions.skillRead,
    exact: true,
  },

  {
    path: '/admin/attendance',
    i18n: 'attendance.title',
    collapse: 'attendance',
    parent: '/admin/',
    loader: () =>
      import('src/view/attendance/list/AttendanceListPage'),
    permissionRequired: permissions.attendanceRead,
    exact: true,
  },

  {
    path: '/admin/attendance/:id',
    i18n: 'attendance.view.title',
    collapse: 'attendance',
    parent: '/admin/attendance',
    loader: () =>
      import('src/view/attendance/view/AttendanceViewPage'),
    permissionRequired: permissions.attendanceRead,
    exact: true,
  },

  {
    path: '/admin/properties-breadcrumb',
    collapseName: 'properties',
    i18n: 'properties.menu',
    parent: '/admin/',
    redirect: '/admin/pool',
    permissionRequired: null,
    virtual: true,
  },

  {
    path: '/admin/pool',
    collapseName: 'properties',
    i18n: 'pool.menu',
    parent: '/admin/properties-breadcrumb',
    loader: () => import('src/view/pool/list/PoolListPage'),
    permissionRequired: permissions.poolRead,
    exact: true,
  },

  {
    path: '/admin/pool/new',
    collapseName: 'properties',
    i18n: 'pool.new.title',
    parent: '/admin/pool',
    loader: () => import('src/view/pool/form/PoolFormPage'),
    permissionRequired: permissions.poolCreate,
    exact: true,
  },

  {
    path: '/admin/pool/:id/edit',
    collapseName: 'properties',
    i18n: 'pool.edit.title',
    parent: '/admin/pool',
    loader: () => import('src/view/pool/form/PoolFormPage'),
    permissionRequired: permissions.poolEdit,
    exact: true,
  },

  {
    path: '/admin/pool/:id',
    collapseName: 'properties',
    i18n: 'pool.view.title',
    parent: '/admin/pool',
    loader: () => import('src/view/pool/view/PoolViewPage'),
    permissionRequired: permissions.poolRead,
    exact: true,
  },
].filter(Boolean);

const publicRoutes = [
  {
    path: '/admin/auth/signin',
    loader: () => import('src/view/auth/SigninPage'),
  },
  {
    path: '/admin/auth/signup',
    loader: () => import('src/view/auth/SignupPage'),
  },
  {
    path: '/admin/auth/forgot-password',
    loader: () =>
      import('src/view/auth/ForgotPasswordPage'),
  },
].filter(Boolean);

const emptyTenantRoutes = [
  {
    path: '/admin/auth/tenant',
    loader: () => import('src/view/auth/TenantPage'),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: '/admin/auth/empty-permissions',
    loader: () =>
      import('src/view/auth/EmptyPermissionsPage'),
  },
].filter(Boolean);

const emailUnverifiedRoutes = [
  {
    path: '/admin/auth/email-unverified',
    loader: () =>
      import('src/view/auth/EmailUnverifiedPage'),
  },
].filter(Boolean);

const simpleRoutes = [
  {
    path: '/admin/auth/password-reset',
    loader: () => import('src/view/auth/PasswordResetPage'),
  },
  {
    path: '/admin/auth/invitation',
    loader: () => import('src/view/auth/InvitationPage'),
  },
  {
    path: '/admin/auth/verify-email',
    loader: () => import('src/view/auth/VerifyEmailPage'),
  },
  {
    path: '/admin/403',
    loader: () =>
      import('src/view/shared/errors/Error403Page'),
  },
  {
    path: '/admin/500',
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
      if (found.parent && found.parent !== '/admin/') {
        return searchRouteStack(found.parent, exactOnly);
      }
    }

    routes.reverse();

    return routes;
  };

  return searchRouteStack(url, exactOnly);
}
