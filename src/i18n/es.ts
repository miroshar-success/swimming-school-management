const es = {
  app: {
    title: 'VOR | GRC - Conciencia informada',
  },
  auth: {
    userNotFound:
      'Lo sentimos, no reconocemos tus credenciales',
    wrongPassword:
      'Lo sentimos, no reconocemos tus credenciales',
    weakPassword: 'Esta contraseña es muy débil.',
    emailAlreadyInUse: 'Correo electrónico ya está en uso',
    invalidEmail:
      'Por favor proporcione un correo electrónico válido',
    passwordReset: {
      invalidToken:
        'El enlace de restablecimiento de contraseña no es válido o ha expirado',
      error: 'Correo electrónico no reconocido',
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'El enlace de verificación de correo electrónico no es válido o ha expirado.',
      error: 'Correo electrónico no reconocido',
      signedInAsWrongUser:
        'Esta confirmación por correo electrónico se envió a {0} pero ha iniciado sesión como {1}.',
    },
    passwordChange: {
      invalidPassword:
        'La contraseña anterior no es válida.',
    },
  },
  user: {
    errors: {
      userAlreadyExists:
        'El usuario con este correo electrónico ya existe.',
      userNotFound: 'Usuario no encontrado.',
      destroyingHimself: 'No puedes eliminarte a ti mismo.',
      revokingOwnPermission:
        'No puede revocar su propio permiso de administrador.',
      revokingPlanUser:
        'No puede revocar el permiso de administrador del administrador del plan.',
      destroyingPlanUser:
        'No puede eliminar el administrador del plan.',
    },
  },
  tenant: {
    exists:
      'Ya hay un espacio de trabajo en esta aplicación.',
    url: {
      exists:
        'Esta URL del espacio de trabajo ya está en uso.',
    },
    invitation: {
      notSameEmail:
        'Esta invitación se envió a {0} pero has iniciado sesión como {1}.',
    },
    planActive:
      'Hay un plan activo para este espacio de trabajo. Por favor, cancele el plan primero.',
    stripeNotConfigured: 'Stripe no está configurado.',
  },
  importer: {
    errors: {
      invalidFileEmpty: 'El archivo esta vacio',
      invalidFileExcel:
        'Solo se permiten archivos de Excel(.xlsx)',
      invalidFileUpload:
        'Archivo inválido. Asegúrese de estar utilizando la última versión de la plantilla.',
      importHashRequired: 'Se requiere hash de importación',
      importHashExistent:
        'Los datos ya han sido importados',
    },
  },
  errors: {
    inUse: {
      message: '`{0}` is in use',
    },
    notFound: {
      message: 'Extraviado',
    },
    forbidden: {
      message: 'Prohibido',
    },
    validation: {
      message: 'Ocurrió un error',
    },
  },
  email: {
    error:
      'El proveedor de correo electrónico no está configurado.',
  },
  preview: {
    error:
      'Lo sentimos, esta operación no está permitida en el modo de vista previa.',
  },

  entities: {
    vendor: {
      errors: {
        unique: {
          reference: 'Ref # debe ser único',
        },
      },
    },
    vendorCategory: {
      errors: {
        unique: {},
      },
    },
    task: {
      errors: {
        unique: {
          reference: 'Ref # debe ser único',
        },
      },
    },
    taskPriority: {
      errors: {
        unique: {},
      },
    },
    taskList: {
      errors: {
        unique: {},
      },
    },
    note: {
      errors: {
        unique: {},
      },
    },
    risk: {
      errors: {
        unique: {
          reference: 'Ref # debe ser único',
        },
      },
    },
    riskCategory: {
      errors: {
        unique: {},
      },
    },
    product: {
      errors: {
        unique: {
          reference: 'Ref # debe ser único',
        },
      },
    },
    productCategory: {
      errors: {
        unique: {
          name: 'Name debe ser único',
        },
      },
    },
    organizationProfile: {
      errors: {
        unique: {},
      },
    },
    newsArticle: {
      errors: {
        unique: {},
      },
    },
    newsFavorite: {
      errors: {
        unique: {},
      },
    },
    tag: {
      errors: {
        unique: {},
      },
    },
    policyTemplate: {
      errors: {
        unique: {},
      },
    },
    policy: {
      errors: {
        unique: {
          name: 'Name debe ser único',
        },
      },
    },
  },
};

export default es;
