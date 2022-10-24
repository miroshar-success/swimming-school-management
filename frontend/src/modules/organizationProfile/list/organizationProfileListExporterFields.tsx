import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.organizationProfile.fields.id'),
  },
  {
    name: 'companyName',
    label: i18n(
      'entities.organizationProfile.fields.companyName',
    ),
  },
  {
    name: 'industry',
    label: i18n(
      'entities.organizationProfile.fields.industry',
    ),
  },
  {
    name: 'employee',
    label: i18n(
      'entities.organizationProfile.fields.employee',
    ),
  },
  {
    name: 'thirdParties',
    label: i18n(
      'entities.organizationProfile.fields.thirdParties',
    ),
  },
  {
    name: 'location',
    label: i18n(
      'entities.organizationProfile.fields.location',
    ),
  },
  {
    name: 'regulatoryCompliance',
    label: i18n(
      'entities.organizationProfile.fields.regulatoryCompliance',
    ),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'technologyStack',
    label: i18n(
      'entities.organizationProfile.fields.technologyStack',
    ),
  },
  {
    name: 'outsourcedIT',
    label: i18n(
      'entities.organizationProfile.fields.outsourcedIT',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'outsourcedSecurityOperations',
    label: i18n(
      'entities.organizationProfile.fields.outsourcedSecurityOperations',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'pastIncidents',
    label: i18n(
      'entities.organizationProfile.fields.pastIncidents',
    ),
  },
  {
    name: 'cspSecurityPolicies',
    label: i18n(
      'entities.organizationProfile.fields.cspSecurityPolicies',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspListITAssets',
    label: i18n(
      'entities.organizationProfile.fields.cspListITAssets',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspJobRoleInfoSecTraining',
    label: i18n(
      'entities.organizationProfile.fields.cspJobRoleInfoSecTraining',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspIncidentMgmtPlan',
    label: i18n(
      'entities.organizationProfile.fields.cspIncidentMgmtPlan',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspIncidentVendorNotification',
    label: i18n(
      'entities.organizationProfile.fields.cspIncidentVendorNotification',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspCyberInsurance',
    label: i18n(
      'entities.organizationProfile.fields.cspCyberInsurance',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspLatestCyberAwarenessThreats',
    label: i18n(
      'entities.organizationProfile.fields.cspLatestCyberAwarenessThreats',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspMFAUtilized',
    label: i18n(
      'entities.organizationProfile.fields.cspMFAUtilized',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspSecurityTesting',
    label: i18n(
      'entities.organizationProfile.fields.cspSecurityTesting',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'cspBackupStrategy',
    label: i18n(
      'entities.organizationProfile.fields.cspBackupStrategy',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'createdAt',
    label: i18n(
      'entities.organizationProfile.fields.createdAt',
    ),
    render: exporterRenders.datetime(),
  },
  {
    name: 'updatedAt',
    label: i18n(
      'entities.organizationProfile.fields.updatedAt',
    ),
    render: exporterRenders.datetime(),
  },
];
