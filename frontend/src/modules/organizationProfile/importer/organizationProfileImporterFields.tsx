import schemas from 'src/modules/shared/yup/yupImporterSchemas';
import { i18n } from 'src/i18n';
import organizationProfileEnumerators from 'src/modules/organizationProfile/organizationProfileEnumerators';

export default [
  {
    name: 'companyName',
    label: i18n(
      'entities.organizationProfile.fields.companyName',
    ),
    schema: schemas.string(
      i18n(
        'entities.organizationProfile.fields.companyName',
      ),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
  },
  {
    name: 'industry',
    label: i18n(
      'entities.organizationProfile.fields.industry',
    ),
    schema: schemas.enumerator(
      i18n('entities.organizationProfile.fields.industry'),
      {
        required: true,
        options: organizationProfileEnumerators.industry,
      },
    ),
  },
  {
    name: 'employee',
    label: i18n(
      'entities.organizationProfile.fields.employee',
    ),
    schema: schemas.enumerator(
      i18n('entities.organizationProfile.fields.employee'),
      {
        required: true,
        options: organizationProfileEnumerators.employee,
      },
    ),
  },
  {
    name: 'thirdParties',
    label: i18n(
      'entities.organizationProfile.fields.thirdParties',
    ),
    schema: schemas.enumerator(
      i18n(
        'entities.organizationProfile.fields.thirdParties',
      ),
      {
        required: true,
        options:
          organizationProfileEnumerators.thirdParties,
      },
    ),
  },
  {
    name: 'location',
    label: i18n(
      'entities.organizationProfile.fields.location',
    ),
    schema: schemas.integer(
      i18n('entities.organizationProfile.fields.location'),
      {
        required: true,
        min: 1,
      },
    ),
  },
  {
    name: 'regulatoryCompliance',
    label: i18n(
      'entities.organizationProfile.fields.regulatoryCompliance',
    ),
    schema: schemas.stringArray(
      i18n(
        'entities.organizationProfile.fields.regulatoryCompliance',
      ),
      {
        required: true,
      },
    ),
  },
  {
    name: 'technologyStack',
    label: i18n(
      'entities.organizationProfile.fields.technologyStack',
    ),
    schema: schemas.enumerator(
      i18n(
        'entities.organizationProfile.fields.technologyStack',
      ),
      {
        required: true,
        options:
          organizationProfileEnumerators.technologyStack,
      },
    ),
  },
  {
    name: 'outsourcedIT',
    label: i18n(
      'entities.organizationProfile.fields.outsourcedIT',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.outsourcedIT',
      ),
      {},
    ),
  },
  {
    name: 'outsourcedSecurityOperations',
    label: i18n(
      'entities.organizationProfile.fields.outsourcedSecurityOperations',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.outsourcedSecurityOperations',
      ),
      {},
    ),
  },
  {
    name: 'pastIncidents',
    label: i18n(
      'entities.organizationProfile.fields.pastIncidents',
    ),
    schema: schemas.string(
      i18n(
        'entities.organizationProfile.fields.pastIncidents',
      ),
      {
        min: 0,
        max: 2000,
      },
    ),
  },
  {
    name: 'cspSecurityPolicies',
    label: i18n(
      'entities.organizationProfile.fields.cspSecurityPolicies',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspSecurityPolicies',
      ),
      {},
    ),
  },
  {
    name: 'cspListITAssets',
    label: i18n(
      'entities.organizationProfile.fields.cspListITAssets',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspListITAssets',
      ),
      {},
    ),
  },
  {
    name: 'cspJobRoleInfoSecTraining',
    label: i18n(
      'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
      ),
      {},
    ),
  },
  {
    name: 'cspIncidentMgmtPlan',
    label: i18n(
      'entities.organizationProfile.fields.cspIncidentMgmtPlan',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspIncidentMgmtPlan',
      ),
      {},
    ),
  },
  {
    name: 'cspIncidentVendorNotification',
    label: i18n(
      'entities.organizationProfile.fields.cspIncidentVendorNotification',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspIncidentVendorNotification',
      ),
      {},
    ),
  },
  {
    name: 'cspCyberInsurance',
    label: i18n(
      'entities.organizationProfile.fields.cspCyberInsurance',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspCyberInsurance',
      ),
      {},
    ),
  },
  {
    name: 'cspLatestCyberAwarenessThreats',
    label: i18n(
      'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
      ),
      {},
    ),
  },
  {
    name: 'cspMFAUtilized',
    label: i18n(
      'entities.organizationProfile.fields.cspMFAUtilized',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspMFAUtilized',
      ),
      {},
    ),
  },
  {
    name: 'cspSecurityTesting',
    label: i18n(
      'entities.organizationProfile.fields.cspSecurityTesting',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspSecurityTesting',
      ),
      {},
    ),
  },
  {
    name: 'cspBackupStrategy',
    label: i18n(
      'entities.organizationProfile.fields.cspBackupStrategy',
    ),
    schema: schemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspBackupStrategy',
      ),
      {},
    ),
  },
];
