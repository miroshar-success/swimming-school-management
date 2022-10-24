import * as yup from 'yup';
import { i18n } from 'src/i18n';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import vendorEnumerators from 'src/modules/vendor/vendorEnumerators';

const validations = [
  yup.object().shape({
    logo: yupFormSchemas.images(
      i18n('entities.vendor.fields.logo'),
      {
        max: 1,
      },
    ),
    name: yupFormSchemas.string(
      i18n('entities.vendor.fields.name'),
      {
        required: true,
        min: 1,
        max: 250,
      },
    ),
    descriptionOfServices: yupFormSchemas.string(
      i18n('entities.vendor.fields.descriptionOfServices'),
      {
        max: 250,
        min: 1,
      },
    ),
    status: yupFormSchemas.enumerator(
      i18n('entities.vendor.fields.status'),
      {
        required: true,
        options: vendorEnumerators.status,
      },
    ),
    category: yupFormSchemas.relationToOne(
      i18n('entities.vendor.fields.category'),
      {
        required: true,
      },
    ),
    rating: yupFormSchemas.enumerator(
      i18n('entities.vendor.fields.rating'),
      {
        required: true,
        options: vendorEnumerators.rating,
      },
    ),
    industry: yupFormSchemas.enumerator(
      i18n('entities.vendor.fields.industry'),
      {
        required: true,
        options: vendorEnumerators.industry,
      },
    ),
    dataProcessed: yupFormSchemas.stringArray(
      i18n('entities.vendor.fields.dataProcessed'),
      {
        required: true,
        options: vendorEnumerators.dataProcessed,
      },
    ),
    tags: yupFormSchemas.relationToMany(
      i18n('entities.vendor.fields.tags'),
      {},
    ),
  }),
  yup.object().shape({
    primaryContactName: yupFormSchemas.string(
      i18n('entities.vendor.fields.primaryContactName'),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
    primaryContactEmail: yupFormSchemas.email(
      i18n('entities.vendor.fields.primaryContactEmail'),
      {
        required: true,
        max: 100,
        min: 1,
      },
    ),
    primaryContactPhoneNumber: yupFormSchemas.string(
      i18n(
        'entities.vendor.fields.primaryContactPhoneNumber',
      ),
      {
        max: 50,
        min: 1,
      },
    ),
    supportEmail: yupFormSchemas.email(
      i18n('entities.vendor.fields.supportEmail'),
      {
        max: 100,
        min: 1,
      },
    ),
    supportPhoneNumber: yupFormSchemas.string(
      i18n('entities.vendor.fields.supportPhoneNumber'),
      {
        max: 50,
        min: 1,
      },
    ),
    website: yupFormSchemas.string(
      i18n('entities.vendor.fields.website'),
      {
        max: 100,
        min: 1,
      },
    ),
    address: yupFormSchemas.string(
      i18n('entities.vendor.fields.address'),
      {
        max: 500,
        min: 1,
      },
    ),
  }),
  yup.object().shape({
    internalBusinessSponsor: yupFormSchemas.string(
      i18n(
        'entities.vendor.fields.internalBusinessSponsor',
      ),
      {
        min: 1,
        max: 200,
      },
    ),
    contract: yupFormSchemas.files(
      i18n('entities.vendor.fields.contract'),
      {},
    ),
    countryOfIncorporation: yupFormSchemas.enumerator(
      i18n('entities.vendor.fields.countryOfIncorporation'),
      {
        required: true,
        options: vendorEnumerators.countryOfIncorporation,
      },
    ),
  }),
  yup.object().shape({
    documentation: yupFormSchemas.files(
      i18n('entities.vendor.fields.documentation'),
      {},
    ),
    dpiaCompleted: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.dpiaCompleted'),
      {},
    ),
    dtiaCompleted: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.dtiaCompleted'),
      {},
    ),
    iso27001: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.iso27001'),
      {},
    ),
    soc1: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.soc1'),
      {},
    ),
    soc2: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.soc2'),
      {},
    ),
    hippa: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.hippa'),
      {},
    ),
    pcidss: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.pcidss'),
      {},
    ),
    fedramp: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.fedramp'),
      {},
    ),
    gdpr: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.gdpr'),
      {},
    ),
    ccpa: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.ccpa'),
      {},
    ),
    sox: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.sox'),
      {},
    ),
    cobit: yupFormSchemas.boolean(
      i18n('entities.vendor.fields.cobit'),
      {},
    ),
  }),
  yup.object().shape({
    risks: yupFormSchemas.relationToMany(
      i18n('entities.vendor.fields.risks'),
      {},
    ),
  }),
  yup.object().shape({
    tasks: yupFormSchemas.relationToMany(
      i18n('entities.vendor.fields.tasks'),
      {},
    ),
  }),
];

export default validations;
