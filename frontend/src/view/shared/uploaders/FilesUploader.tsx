import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useState } from 'react';
import { getUserNameOrEmailPrefix } from 'src/modules/utils';
import { styleDefObj } from 'src/view/shared/styles/react-file-icon-styles';
import ClearIcon from '@mui/icons-material/Close';
import DragAndDropUploaderArea from 'src/view/shared/uploaders/DragAndDropUploaderArea';
import Errors from 'src/modules/shared/error/errors';
import filesize from 'filesize';
import FileUploader, {
  extractExtensionFrom,
} from 'src/modules/shared/fileUpload/fileUploader';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import moment from 'moment';
import PropTypes from 'prop-types';
import Spinner from 'src/view/shared/Spinner';
import TagAutocompleteForm from 'src/view/tag/autocomplete/TagAutocompleteForm';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import LazyLoad from 'react-lazy-load';
import EllipsisToolTip from 'ellipsis-tooltip-react-chan';
import MDTypography from 'src/mui/components/MDTypography';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function FilesUploader(props) {
  const { darkMode } = selectMuiSettings();
  const [loading, setLoading] = useState(false);

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.downloadUrl,
    }));
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const formats =
    props.formats ||
    (props.storage && props.storage.formats);

  const handleChange = async (uploads) => {
    if (!uploads || !uploads.length) {
      return;
    }

    const newValue = [...value()];

    setLoading(true);

    for (let i = 0; i < uploads.length; i++) {
      try {
        const file = await FileUploader.upload(uploads[i], {
          storage: props.storage,
          formats,
        });
        if (!file) {
          continue;
        }
        newValue.push(file);
      } catch (error) {
        console.error(error);
        Errors.showMessage(error);
      }
    }

    setLoading(false);

    props.onChange && props.onChange(newValue);
  };

  const { max, readonly } = props;

  const size = filesize.partial({
    base: 2,
    standard: 'jedec',
  });

  const onChangeFileProp = (prop, id, newValue) => {
    if (!prop) {
      return;
    }
    const files = [...value()];
    const file = files.find((v) => v.id === id);
    if (!file) {
      return;
    }
    file[prop] = newValue;
    props.onChange && props.onChange(files);
  };

  const onChangeFileTitle = (id, newValue) => {
    onChangeFileProp('title', id, newValue);
  };

  const onChangeFileTags = (id, newValue) => {
    onChangeFileProp('tags', id, newValue);
  };

  const renderFileIcon = (file) => {
    const ext = extractExtensionFrom(file.name);
    const title = file.name.substring(
      0,
      file.name.lastIndexOf('.'),
    );
    const customDefaultLabelColor = styleDefObj[ext]
      ? styleDefObj[ext]['labelColor'] ?? '#777'
      : '#777';
    const libDefaultGlyphColor =
      defaultStyles[ext] &&
      defaultStyles[ext]['labelColor'];
    const options = {
      effect: 'solid',
      place: 'top',
      multiline: true,
      className: 'ellipsis-tooltip',
      type: darkMode ? 'light' : 'dark',
    };
    return (
      <LazyLoad>
        <MDBox mb={0.8} mr={1.6}>
          <MDBox
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={0.8}
          >
            <MDBox minWidth="38.4px" maxWidth="38.4px">
              <MaterialLink
                href={file.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  lineHeight: 0,
                }}
                download
              >
                <FileIcon
                  extension={ext}
                  glyphColor={
                    libDefaultGlyphColor ??
                    customDefaultLabelColor
                  }
                  labelColor={customDefaultLabelColor}
                  {...defaultStyles[ext]}
                  {...styleDefObj[ext]}
                />
              </MaterialLink>
            </MDBox>
            <MDBox
              minWidth={`calc(100% - ${
                readonly ? '38.4' : '70.4'
              }px)`}
              maxWidth={`calc(100% - ${
                readonly ? '38.4' : '70.4'
              }px)`}
            >
              {file.new && (
                <MDBox>
                  <InputFormItem
                    variant="standard"
                    value={file.title ?? title ?? ''}
                    onChange={(newValue) => {
                      onChangeFileTitle(file.id, newValue);
                    }}
                    forceValue
                    required
                  />
                </MDBox>
              )}
              <MDTypography
                display="block"
                variant="button"
                fontWeight="regular"
                color="text"
                lineHeight="0"
                minWidth="100%"
                maxWidth="100%"
              >
                {!file.new && (
                  <EllipsisToolTip options={options}>
                    {file.title}
                  </EllipsisToolTip>
                )}
                {!file.new && <br />}
                <EllipsisToolTip options={options}>
                  {`${file.name} (${size(
                    file.sizeInBytes,
                  )})`}
                </EllipsisToolTip>
                <br />
                <EllipsisToolTip options={options}>
                  {`${getUserNameOrEmailPrefix(
                    file.uploader,
                  )} - ${moment(file.uploadedAt).format(
                    DEFAULT_MOMENT_FORMAT,
                  )}`}
                </EllipsisToolTip>
              </MDTypography>
            </MDBox>
            {!readonly && (
              <MaterialLink
                component="a"
                color="secondary"
                onClick={() => handleRemove(file.id)}
                tabIndex={-1}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <ClearIcon fontSize="small" />
              </MaterialLink>
            )}
          </MDBox>
          {readonly ? (
            <TagAutocompleteForm
              id={file.id}
              handleService={FileUploader.tags}
              tags={file.tags}
            />
          ) : (
            <TagAutocompleteFormItem
              name={`~file~tags~${file.id}`}
              onChange={(newValue) =>
                onChangeFileTags(file.id, newValue)
              }
              value={file.tags}
            />
          )}
        </MDBox>
      </LazyLoad>
    );
  };

  return (
    <div>
      {value() && value().length ? (
        <MDBox
          mt={0.8}
          display="inline-flex"
          flexWrap="wrap"
          width="100%"
        >
          {value().map((item) => {
            return (
              <MDBox
                key={item.id}
                display="block"
                width="25%"
                alignItems="start"
              >
                {renderFileIcon(item)}
              </MDBox>
            );
          })}
        </MDBox>
      ) : null}

      {loading && <Spinner />}

      {loading ||
      readonly ||
      (max && fileList().length >= max) ? null : (
        <LazyLoad>
          <DragAndDropUploaderArea
            handleChange={handleChange}
            // multiple={max !== 1}
            storage={props.storage}
            types={formats}
          />
        </LazyLoad>
      )}
    </div>
  );
}

FilesUploader.propTypes = {
  formats: PropTypes.arrayOf(PropTypes.string),
  max: PropTypes.number,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  storage: PropTypes.object,
  value: PropTypes.any,
};

export default FilesUploader;
