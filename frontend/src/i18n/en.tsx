const en = {
  common: {
    areYouSure: 'Are you sure?',
    back: 'Back',
    boolean: {
      false: 'No',
      true: 'Yes',
    },
    cancel: 'Cancel',
    continue: 'Continue',
    createdAt: 'Created At',
    createdBy: 'Created By',
    destroy: 'Delete',
    discard: 'Discard',
    edit: 'Edit',
    end: 'End',
    export: 'Export to Excel',
    filters: 'Filters',
    grid: 'Grid',
    import: 'Import',
    list: 'List',
    more: 'More',
    mustSelectARow: 'Must select a row',
    new: 'New',
    next: 'Next',
    no: 'No',
    noDataToExport: 'No data to export',
    or: 'or',
    outOf: ' out of ',
    pause: 'Pause',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    select: 'Select',
    start: 'Start',
    view: 'View',
    yes: 'Yes',
  },

  app: {
    title: 'Natacion Mexico',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'UI Style Configurator',
      description: 'See our dashboard options.',
      sidenavColor: 'Colors',
      sidenavType: {
        title: 'Sidenav Type',
        description:
          'Choose between different sidenav types.',
        dark: 'Dark',
        transparent: 'Transparent',
        white: 'white',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Light / Dark',
    },
  },

  auth: {
    tenants: 'Schools',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    manager: {
      label: 'Manager',
      description: 'Manager access',
    },
    student: {
      label: 'Student',
      description: 'Student access',
    },
    teacher: {
      label: 'Teacher',
      description: 'Teacher access',
    },
  },

  user: {
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      name: 'Name',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
      rememberMe: 'Remember me',
      birthday: 'Birthday',
      RFC: 'RFC',
      CURP: 'CURP',
      comment: 'Comment',
      studentNumber: 'Student Number',
      Number: 'Number',
      guardianFullName: `Guardian's Full Name`,
      guardianPhoneNumber: `Guardian's Phone Number`,
      bloodType: 'Blood Type',
      sex: 'Gender',
      healthInsuranceCompany:
        'Health Insurance Company Name',
      healthInsuranceNumber: 'Health Insurance Number',
      diseaseAllergyCondition:
        'Do you have any diseases or Allergy? If you have, please simply describe.',
      address: 'Address',
      street: 'Street',
      postalCode: 'Postal Code',
      cologne: 'Cologne',
      city: 'City',
      generalInfo: 'General Information',
      schedules: 'Schedules',
      paymentList: 'Payment History',
      attendance: 'Attendance',
      attendanceHistory: 'Attendance History',
      class: 'Class',
      lessons: 'Lessons',
      registrationDate: 'Registration Date',
      nextPaymentDate: 'Next Payment Date',
    },
    status: {
      active: 'Active',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
      preRegistration: 'Pre-registration',
    },
    invite: 'Invite',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Users',
    menu: 'Users',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'Users successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'Invite User(s)',
      titleModal: 'Invite User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  teacher: {
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Teachers',
    subTitle: {
      generalInfo: 'General Information',
      profileData: 'Profile Data',
      schedules: 'Schedules',
    },
    menu: 'Teachers',
    doAddSuccess: 'Teacher(s) successfully saved',
    doUpdateSuccess: 'Teacher successfully saved',
    exporterFileName: 'teachers_export',
    doDestroySuccess: 'Teacher successfully deleted',
    doDestroyAllSelectedSuccess:
      'Teachers successfully deleted',
    edit: {
      title: 'Edit Teacher',
    },
    new: {
      title: 'Add Teacher',
      titleModal: 'Add Teacher',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View Teacher',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Teachers',
      fileName: 'teachers_import_data',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'Teacher with this email already exists',
      userNotFound: 'Teacher not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  student: {
    subtitle: {
      profileData: 'Profile',
      otherData: 'Other Information',
      address: 'Address',
    },
    registration: {
      menu: 'Registration',
      title: 'Registration',
    },
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Students',
    menu: 'Students',
    doAddSuccess: 'Student(s) successfully saved',
    doUpdateSuccess: 'Student successfully saved',
    exporterFileName: 'students_export',
    doDestroySuccess: 'Student successfully deleted',
    doDestroyAllSelectedSuccess:
      'Students successfully deleted',
    edit: {
      title: 'Edit Student',
    },
    new: {
      title: 'Add Student',
      titleModal: 'Add Student',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View Student',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Students',
      fileName: 'users_import_data',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'Student with this email already exists',
      userNotFound: 'Student not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  payment: {
    doAddSuccess: 'Payment(s) successfully saved',
    doUpdateSuccess: 'Payment successfully saved',
    doDestroySuccess: 'Payment successfully deleted',
    doDestroyAllSelectedSuccess:
      'Payments successfully deleted',
    menu: 'Payments',
    title: 'Payments',
    fields: {
      id: 'Id',
      month: 'Month',
      year: 'Year',
      expiredDate: 'Expired Date',
      cost: 'Total',
      category: 'Payment Category',
      price: 'Price',
      quantity: 'Quantity',
      VAT: 'VAT',
      paymentMethod: 'Payment Method',
      paymentCategory: 'Payment Category',
      lessonsNumber: 'Number of Lessons',
      lastPayment: 'Last Payment',
      paymentDate: 'Payment Date',
      amount: 'SubTotal',
    },
    history: {
      menu: 'Payment History',
      title: 'Payment History',
      view: {
        title: 'View Payment History',
      },
    },
    expired: {
      menu: 'Expired Payments',
      title: 'Expired Payments',
      view: {
        title: 'View Expired Payment',
      },
    },
    category: {
      menu: 'Payment Categories',
      title: 'Payment Categories',
      new: {
        title: 'Add Payment Category',
      },
      edit: {
        title: 'Edit Payment Category',
      },
      view: {
        title: 'View Payment Category',
      },
      doDestroySuccess:
        'Payment Category successfully deleted',
      doAddSuccess:
        'Payment Category(s) successfully saved',
      doUpdateSuccess:
        'Payment Category successfully saved',
      doDestroyAllSelectedSuccess:
        'Payment Categories successfully deleted',
      fields: {
        name: 'Payment Category Title',
      },
    },
    method: {
      menu: 'Payment Methods',
      title: 'Payment Methods',
      new: {
        title: 'Add Payment Method',
      },
      edit: {
        title: 'Edit Payment Method',
      },
      view: {
        title: 'View Payment Method',
      },
      doDestroySuccess:
        'Payment Method successfully deleted',
      doAddSuccess: 'Payment Method(s) successfully saved',
      doUpdateSuccess: 'Payment Method successfully saved',
      doDestroyAllSelectedSuccess:
        'Payment Methods successfully deleted',
      fields: {
        name: 'Payment Method Title',
      },
    },
    add: {
      title: 'Add Payment',
    },
  },

  registration: {
    doRegisterSuccess: 'Lesson(s) successfully registered',
    menu: 'Registration',
    title: 'Registration',
    registerLessons: 'Register Lessons',
  },

  class: {
    doAddSuccess: 'Class(s) successfully saved',
    doUpdateSuccess: 'Class successfully saved',
    doDestroySuccess: 'Class successfully deleted',
    doDestroyAllSelectedSuccess:
      'Classes successfully deleted',
    menu: 'Classes',
    title: 'Classes',
    fields: {
      name: 'Class Name',
      category: 'Category',
      pool: 'Pool',
      duration: 'Duration',
      grade: 'Grade',
    },
    new: {
      title: 'Add Class',
    },
    edit: {
      title: 'Edit Class',
    },
    view: {
      title: 'View Class',
    },
  },

  classCategory: {
    doAddSuccess: 'Class Category(s) successfully saved',
    doUpdateSuccess: 'Class Category successfully saved',
    doDestroySuccess: 'Class Category successfully deleted',
    doDestroyAllSelectedSuccess:
      'Class Categories successfully deleted',
    menu: 'Classe Categories',
    title: 'Classe Categories',
    fields: {
      name: 'Class Category Name',
      comment: 'Comment',
    },
    new: {
      title: 'Add Class Category',
    },
    edit: {
      title: 'Edit Class Category',
    },
    view: {
      title: 'View Class Category',
    },
  },

  lesson: {
    doAddSuccess: 'Lesson(s) successfully saved',
    doUpdateSuccess: 'Lesson successfully saved',
    doDestroySuccess: 'Lesson successfully deleted',
    doDestroyAllSelectedSuccess:
      'Lessons successfully deleted',
    menu: 'Lessons',
    title: 'Lessons',
    fields: {
      class: 'Class',
      day: 'Day',
      time: 'Time',
      teacher: 'Teacher',
    },
    new: {
      title: 'Add Lesson',
    },
    edit: {
      title: 'Edit Lesson',
    },
    view: {
      title: 'View Lesson',
    },
    update: {
      success: 'Lesson successfully updated',
    },
    create: {
      success: 'Lesson successfully created',
    },
  },

  widgets: {
    lessonsOnCalendar: {
      modals: {
        new: {
          title: 'Add Lesson',
        },
        edit: {
          title: 'Edit Lesson',
        },
        recurring: {
          title: 'Recurring Lesson',
        },
      },
      title: 'Calendar',
    },
  },

  attendance: {
    doAddSuccess: 'Attendance(s) successfully saved',
    title: 'Attendance',
    menu: 'Attendance',
    class: {
      menu: 'Classes',
    },
    history: {
      menu: 'History',
    },
    view: {
      title: 'View Attendance',
      note: 'Please check attended students',
    },
    subTitle: {
      inProgress: 'In Progress',
      upcoming: 'Upcoming',
      finished: 'Finished',
      seeAll: 'See All',
    },
  },

  pool: {
    doAddSuccess: 'Swimming Pool(s) successfully saved',
    doUpdateSuccess: 'Swimming Pool successfully saved',
    doDestroySuccess: 'Swimming Pool successfully deleted',
    doDestroyAllSelectedSuccess:
      'Swimming Pools successfully deleted',
    menu: 'Swimming Pools',
    title: 'Swimming Pools',
    fields: {
      name: 'Name',
    },
    new: {
      title: 'Add Swimming Pool',
    },
    edit: {
      title: 'Edit Swimming Pool',
    },
    view: {
      title: 'View Swimming Pool',
    },
  },

  document: {
    doAddSuccess: 'Document(s) successfully saved',
    doUpdateSuccess: 'Document successfully saved',
    doDestroySuccess: 'Document successfully deleted',
    doDestroyAllSelectedSuccess:
      'Documents successfully deleted',
    menu: 'Documents',
    title: 'Documents',
    fields: {
      name: 'Name',
      description: 'Description',
      attachment: 'Attachment',
      lastUpdatedRange: 'Last Updated Date Range',
      lastUpdated: 'Last Updated Date',
    },
    new: {
      title: 'Add Document',
    },
    edit: {
      title: 'Edit Document',
    },
    view: {
      title: 'View Document',
    },
  },

  grade: {
    doAddSuccess: 'Grade(s) successfully saved',
    doUpdateSuccess: 'Grade successfully saved',
    doDestroySuccess: 'Grade successfully deleted',
    doDestroyAllSelectedSuccess:
      'Grades successfully deleted',
    menu: 'Grades',
    title: 'Grades',
    fields: {
      name: 'Name',
    },
    new: {
      title: 'Add Grade',
    },
    edit: {
      title: 'Edit Grade',
    },
    view: {
      title: 'View Grade',
    },
  },

  skill: {
    doAddSuccess: 'Skill(s) successfully saved',
    doUpdateSuccess: 'Skill successfully saved',
    doDestroySuccess: 'Skill successfully deleted',
    doDestroyAllSelectedSuccess:
      'Skills successfully deleted',
    menu: 'Skills',
    title: 'Skills',
    fields: {
      name: 'Name',
      grade: 'Grade',
      icon: 'Icon',
    },
    new: {
      title: 'Add Skill',
    },
    edit: {
      title: 'Edit Skill',
    },
    view: {
      title: 'View Skill',
    },
  },

  property: {
    menu: 'Properties',
    pool: {
      menu: 'Pools',
    },
  },

  school: {
    menu: 'My School',
  },

  tenant: {
    name: 'tenant',
    label: 'Schools',
    menu: 'Schools',
    title: 'Schools',
    create: {
      button: 'Create School',
      success: 'School successfully saved',
    },
    update: {
      success: 'School successfully saved',
    },
    destroy: {
      success: 'School successfully deleted',
    },
    destroyAll: {
      success: 'School(s) successfully deleted',
    },
    edit: {
      title: 'Edit School',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'School Name',
      tenantId: 'School',
      tenantUrl: 'School URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New School',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select School',
    validation: {
      url: 'Your school URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  plan: {
    menu: 'Subscriptions',
    title: 'Subscriptions',

    free: {
      label: 'Free',
      price: '0',
      unit: '$',
    },
    growth: {
      label: 'Growth',
      price: '10',
      unit: '$',
    },
    enterprise: {
      label: 'Enterprise',
      price: '50',
      unit: '$',
    },

    pricingPeriod: 'month',
    current: 'Current Subscription',
    subscribe: 'Subscribe',
    manage: 'Manage Subscription',
    cancelAtPeriodEnd:
      'This plan will be canceled at the end of the period.',
    somethingWrong:
      'There is something wrong with your subscription. Please go to manage subscription for more details.',
    notPlanUser: `You are not the manager of this subscription.`,
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    tenant: 'School',
    menu: 'Settings',
    save: {
      success:
        'Settings successfully saved. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      logos: 'Logo',
      backgroundImages: 'Background Images',
      shade: 'Shade',
    },
  },
  dashboard: {
    menu: 'Dashboard',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min: '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
    placeholder: {
      title: 'Click or drag and drop files here',
      size: '(Max {0})',
    },
    title: 'Title',
    file: 'File',
    uploadedBy: 'Uploaded by',
    uploadedAt: 'Uploaded at',
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint: 'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
    noOptions: 'No data found',
  },

  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },

  imagesViewer: {
    noImage: 'No image',
  },

  table: {
    noData: 'No records found',
    loading: 'Loading...',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} of {2}',
    labelRowsPerPage: 'Per page:',
  },
};

export default en;
