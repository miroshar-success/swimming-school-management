import Roles from 'src/security/roles';
import Plans from 'src/security/plans';
import Storage from 'src/security/storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adminEdit: {
        id: 'adminEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adminDestroy: {
        id: 'adminDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adminCreate: {
        id: 'adminCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adminImport: {
        id: 'adminImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adminRead: {
        id: 'adminRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      adminAutocomplete: {
        id: 'adminAutocomplete',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      muiEdit: {
        id: 'muiEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      studentEdit: {
        id: 'studentEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      studentDestroy: {
        id: 'studentDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      studentCreate: {
        id: 'studentCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      studentImport: {
        id: 'studentImport',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      studentRead: {
        id: 'studentRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      studentAutocomplete: {
        id: 'studentAutocomplete',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      teacherEdit: {
        id: 'teacherEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      teacherDestroy: {
        id: 'teacherDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      teacherCreate: {
        id: 'teacherCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      teacherImport: {
        id: 'teacherImport',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      teacherRead: {
        id: 'teacherRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      teacherAutocomplete: {
        id: 'teacherAutocomplete',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentRead: {
        id: 'paymentRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentAdd: {
        id: 'paymentAdd',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentEdit: {
        id: 'paymentEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classRead: {
        id: 'classRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classCreate: {
        id: 'classCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classEdit: {
        id: 'classEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classDestroy: {
        id: 'classDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      lessonRead: {
        id: 'lessonRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      lessonCreate: {
        id: 'lessonCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      lessonEdit: {
        id: 'lessonEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      lessonDestroy: {
        id: 'lessonDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      poolRead: {
        id: 'poolRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      poolCreate: {
        id: 'poolCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      poolEdit: {
        id: 'poolEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      poolDestroy: {
        id: 'poolDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      gradeRead: {
        id: 'gradeRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      gradeCreate: {
        id: 'gradeCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      gradeEdit: {
        id: 'gradeEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      gradeDestroy: {
        id: 'gradeDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      skillRead: {
        id: 'skillRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      skillCreate: {
        id: 'skillCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.skillIcons],
      },
      skillEdit: {
        id: 'skillEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.skillIcons],
      },
      skillDestroy: {
        id: 'skillDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [storage.skillIcons],
      },
      classCategoryRead: {
        id: 'classCategoryRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classCategoryCreate: {
        id: 'classCategoryCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classCategoryEdit: {
        id: 'classCategoryEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      classCategoryDestroy: {
        id: 'classCategoryDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentCategoryRead: {
        id: 'paymentCategoryRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentCategoryCreate: {
        id: 'paymentCategoryCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentCategoryEdit: {
        id: 'paymentCategoryEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentCategoryDestroy: {
        id: 'paymentCategoryDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentMethodRead: {
        id: 'paymentMethodRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentMethodCreate: {
        id: 'paymentMethodCreate',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentMethodEdit: {
        id: 'paymentMethodEdit',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      paymentMethodDestroy: {
        id: 'paymentMethodDestroy',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      attendanceRead: {
        id: 'attendanceRead',
        allowedRoles: [roles.admin, roles.manager],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
