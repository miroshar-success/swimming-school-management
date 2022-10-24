import * as yup from 'yup';
import { i18n } from 'src/i18n';
import organizationProfileEnumerators from 'src/modules/organizationProfile/organizationProfileEnumerators';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const validations = [
  yup.object().shape({
    companyName: yupFormSchemas.string(
      i18n(
        'entities.organizationProfile.fields.companyName',
      ),
      {
        required: true,
        min: 1,
        max: 200,
      },
    ),
    industry: yupFormSchemas.enumerator(
      i18n('entities.organizationProfile.fields.industry'),
      {
        required: true,
        options: organizationProfileEnumerators.industry,
      },
    ),
    employee: yupFormSchemas.enumerator(
      i18n('entities.organizationProfile.fields.employee'),
      {
        required: true,
        options: organizationProfileEnumerators.employee,
      },
    ),
    thirdParties: yupFormSchemas.enumerator(
      i18n(
        'entities.organizationProfile.fields.thirdParties',
      ),
      {
        required: true,
        options:
          organizationProfileEnumerators.thirdParties,
      },
    ),
    location: yupFormSchemas.integer(
      i18n('entities.organizationProfile.fields.location'),
      {
        required: true,
        min: 1,
      },
    ),
  }),
  yup.object().shape({
    regulatoryCompliance: yupFormSchemas.stringArray(
      i18n(
        'entities.organizationProfile.fields.regulatoryCompliance',
      ),
      {
        required: true,
        options:
          organizationProfileEnumerators.regulatoryCompliance,
      },
    ),
  }),
  yup.object().shape({
    technologyStack: yupFormSchemas.enumerator(
      i18n(
        'entities.organizationProfile.fields.technologyStack',
      ),
      {
        required: true,
        options:
          organizationProfileEnumerators.technologyStack,
      },
    ),
    outsourcedIT: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.outsourcedIT',
      ),
      {},
    ),
  }),
  yup.object().shape({
    outsourcedSecurityOperations: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.outsourcedSecurityOperations',
      ),
      {},
    ),
    pastIncidents: yupFormSchemas.string(
      i18n(
        'entities.organizationProfile.fields.pastIncidents',
      ),
      {
        min: 0,
        max: 2000,
      },
    ),
    cspSecurityPolicies: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspSecurityPolicies',
      ),
      {},
    ),
    cspListITAssets: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspListITAssets',
      ),
      {},
    ),
    cspJobRoleInfoSecTraining: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
      ),
      {},
    ),
    cspIncidentMgmtPlan: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspIncidentMgmtPlan',
      ),
      {},
    ),
    cspIncidentVendorNotification: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspIncidentVendorNotification',
      ),
      {},
    ),
    cspCyberInsurance: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspCyberInsurance',
      ),
      {},
    ),
    cspLatestCyberAwarenessThreats: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
      ),
      {},
    ),
    cspMFAUtilized: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspMFAUtilized',
      ),
      {},
    ),
    cspSecurityTesting: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspSecurityTesting',
      ),
      {},
    ),
    cspBackupStrategy: yupFormSchemas.boolean(
      i18n(
        'entities.organizationProfile.fields.cspBackupStrategy',
      ),
      {},
    ),
  }),
];

export default validations;
