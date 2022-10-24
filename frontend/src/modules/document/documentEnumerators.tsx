import { i18n } from 'src/i18n';
import { extractExtensionFrom } from 'src/modules/shared/fileUpload/fileUploader';

const documentEnumerators = {
  type: [
    'internal',
    'policy',
    'risk',
    'task',
    'taskInstance',
    'vendor',
  ],
  typeColor: [],
  extension: ['pdf', 'doc,docx', 'xls,xlsx', 'csv'],
};

export const getDocumentType = (filename) => {
  const ext = extractExtensionFrom(filename);
  const key = documentEnumerators.extension.find((exts) =>
    exts
      .split(/[ ]*,[ ]*/)
      .map((v) => v.toLowerCase())
      .includes(ext),
  );
  if (!key) {
    return null;
  }
  return i18n(
    `entities.document.enumerators.extension.${key}`,
  );
};

export default documentEnumerators;
