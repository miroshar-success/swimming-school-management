import Permissions from 'src/security/permissions';
import { i18n } from 'src/i18n';
import config from 'src/config';
import { Icon } from '@mui/material';

const permissions = Permissions.values;

const menus = [
  {
    path: '/admin',
    exact: true,
    icon: <Icon>dashboard</Icon>,
    name: i18n('dashboard.menu'),
    permissionRequired: null,
  },

  {
    name: i18n('student.menu'),
    icon: <Icon>people</Icon>,
    key: 'student',
    permissionRequired: permissions.studentRead,
    collapse: [
      {
        path: '/admin/registration',
        name: i18n('registration.menu'),
        icon: <Icon>group_add</Icon>,
        permissionRequired: permissions.studentEdit,
      },
      {
        path: '/admin/student',
        name: i18n('common.list'),
        icon: <Icon>people</Icon>,
        permissionRequired: permissions.studentRead,
      },
    ],
  },

  {
    path: '/admin/teacher',
    icon: <Icon>account_box</Icon>,
    name: i18n('teacher.menu'),
    permissionRequired: permissions.teacherRead,
  },

  {
    key: 'payment',
    icon: <Icon>payment</Icon>,
    name: i18n('payment.menu'),
    permissionRequired: permissions.paymentRead,
    collapse: [
      {
        name: i18n('common.list'),
        icon: <Icon>payment</Icon>,
        path: '/admin/payment',
        permissionRequired: permissions.paymentRead,
      },
      {
        name: i18n('payment.history.menu'),
        icon: <Icon>history</Icon>,
        path: '/admin/payment-history',
        permissionRequired: permissions.paymentRead,
      },
      {
        name: i18n('payment.expired.menu'),
        icon: <Icon>assignment_late</Icon>,
        path: '/admin/payment-expired',
        permissionRequired: permissions.paymentRead,
      },
      {
        name: i18n('payment.category.menu'),
        icon: <Icon>money</Icon>,
        path: '/admin/payment-category',
        permissionRequired: permissions.paymentRead,
      },
      {
        name: i18n('payment.method.menu'),
        icon: <Icon>payments</Icon>,
        path: '/admin/payment-method',
        permissionRequired: permissions.paymentRead,
      },
    ],
  },

  {
    key: 'class',
    icon: <Icon>class</Icon>,
    name: i18n('class.menu'),
    permissionRequired: permissions.classRead,
    collapse: [
      {
        path: '/admin/class',
        name: i18n('class.menu'),
        icon: <Icon>class</Icon>,
        permissionRequired: permissions.classRead,
      },
      {
        path: '/admin/lesson',
        name: i18n('lesson.menu'),
        icon: <Icon>pool</Icon>,
        permissionRequired: permissions.classRead,
      },
      {
        path: '/admin/class-category',
        name: i18n('classCategory.menu'),
        icon: <Icon>interests</Icon>,
        permissionRequired: permissions.classRead,
      },
    ],
  },

  {
    path: '/admin/attendance',
    icon: <Icon>how_to_reg</Icon>,
    name: i18n('attendance.menu'),
    permissionRequired: permissions.attendanceRead,
  },

  {
    key: 'grade',
    icon: <Icon>window</Icon>,
    name: i18n('grade.menu'),
    permissionRequired: permissions.gradeRead,
    collapse: [
      {
        path: '/admin/grade',
        name: i18n('grade.menu'),
        icon: <Icon>category</Icon>,
        permissionRequired: permissions.gradeRead,
      },
      {
        path: '/admin/skill',
        name: i18n('skill.menu'),
        icon: <Icon>spoke</Icon>,
        permissionRequired: permissions.gradeRead,
      },
    ],
  },

  {
    key: 'property',
    icon: <Icon>dataset</Icon>,
    name: i18n('property.menu'),
    permissionRequired: null,
    collapse: [
      {
        path: '/admin/pool',
        icon: <Icon>pool</Icon>,
        name: i18n('property.pool.menu'),
        permissionRequired: permissions.poolRead,
      },
    ],
  },

  {
    name: i18n('settings.menu'),
    key: 'settings',
    icon: <Icon>settings</Icon>,
    permissionRequired: permissions.settingsEdit,
    collapse: [
      {
        path: '/admin/document',
        name: i18n('document.menu'),
        permissionRequired: permissions.settingsEdit,
        icon: <Icon>folder</Icon>,
      },
      {
        path: '/admin/audit-log',
        name: i18n('auditLog.menu'),
        permissionRequired: permissions.auditLogRead,
        icon: <Icon>restore</Icon>,
      },
    ],
  },
].filter(Boolean);

const profileRoutes = [
  {
    name: i18n('auth.profile.title'),
    path: '/admin/profile',
    icon: <Icon>person_outline</Icon>,
  },
  {
    name: i18n('auth.passwordChange.title'),
    path: '/admin/password-change',
    icon: <Icon>lock</Icon>,
  },
].filter(Boolean);

const tenantRoutes = [
  {
    path: '/admin/tenant',
    name: i18n('school.menu'),
    permissionRequired: permissions.settingsEdit,
    icon: <Icon>school</Icon>,
  },
].filter(Boolean);

const adminRoutes = [
  {
    path: '/admin/admin',
    name: i18n('user.menu'),
    permissionRequired: permissions.adminRead,
    icon: <Icon>person</Icon>,
  },
].filter(Boolean);

const planRoutes = [
  config.isPlanEnabled && {
    path: '/admin/plan',
    permissionRequired: permissions.planRead,
    icon: <Icon>credit_card_outlined</Icon>,
    name: i18n('plan.menu'),
  },
].filter(Boolean);

const studentRoutes = [
  {
    path: '/student',
    icon: <Icon>dashboard</Icon>,
    name: i18n('student.dashboard.menu'),
  },
  {
    path: '/student/class',
    icon: <Icon>class</Icon>,
    name: i18n('student.class.menu'),
  },
  {
    path: '/student/attendance',
    icon: <Icon>how_to_reg</Icon>,
    name: i18n('student.attendance.menu'),
  },
  {
    path: '/student/payment',
    icon: <Icon>payment</Icon>,
    name: i18n('student.payment.menu'),
  },
  {
    path: '/student/file',
    icon: <Icon>folder</Icon>,
    name: i18n('student.file.menu'),
  },
].filter(Boolean);

export {
  menus,
  profileRoutes,
  tenantRoutes,
  adminRoutes,
  planRoutes,
  studentRoutes,
};
