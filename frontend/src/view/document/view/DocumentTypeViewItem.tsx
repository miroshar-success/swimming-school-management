import documentEnumerators from 'src/modules/document/documentEnumerators';
import EnumColorBadgeViewItem from 'src/view/shared/view/EnumColorBadgeViewItem';
import PropTypes from 'prop-types';

function DocumentTypeViewItem(props) {
  const { value, label } = props;
  return (
    <EnumColorBadgeViewItem
      value={value}
      label={label}
      enums={documentEnumerators.type}
      colors={documentEnumerators.typeColor}
      i18nPrefix="entities.document.enumerators.type"
    />
  );
}

DocumentTypeViewItem.propsType = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default DocumentTypeViewItem;
