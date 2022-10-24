import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { extractExtensionFrom } from 'src/modules/shared/fileUpload/fileUploader';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { FormProvider, useForm } from 'react-hook-form';
import { getDocumentType } from 'src/modules/document/documentEnumerators';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { styleDefObj } from 'src/view/shared/styles/react-file-icon-styles';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import actions from 'src/modules/document/list/documentListActions';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/document/destroy/documentDestroyActions';
import destroySelectors from 'src/modules/document/destroy/documentDestroySelectors';
import documentFormActions from 'src/modules/document/form/documentFormActions';
import documentFormSelectors from 'src/modules/document/form/documentFormSelectors';
import documentSelectors from 'src/modules/document/documentSelectors';
import DocumentTypeViewItem from 'src/view/document/view/DocumentTypeViewItem';
import EditIcon from '@mui/icons-material/Edit';
import filesize from 'filesize';
import FormWrapper from 'src/view/shared/styles/FormWrapper';
import IconButton from '@mui/material/IconButton';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import SaveIcon from '@mui/icons-material/Save';
import selectors from 'src/modules/document/list/documentListSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TagAutocompleteFormItem from 'src/view/tag/autocomplete/TagAutocompleteFormItem';
import TagListItem from 'src/view/tag/list/TagListItem';
import Tooltip from '@mui/material/Tooltip';
import UserListItem from 'src/view/user/list/UserListItem';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  title: yupFormSchemas.string(
    i18n('entities.document.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  tags: yupFormSchemas.relationToMany(
    i18n('entities.document.fields.tags'),
    {},
  ),
});

function DocumentListTable(props) {
  const { sidenavColor } = selectMuiSettings();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [recordIdToEdit, setRecordIdToEdit] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const saveLoading = useSelector(
    documentFormSelectors.selectSaveLoading,
  );

  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    documentSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    documentSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doOpenEdit = (id) => {
    setRecordIdToEdit(id);
  };

  const doCloseEdit = () => {
    setRecordIdToEdit(null);
  };

  const defaultValues = {
    title: null,
    tags: [],
  };

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues,
  });

  const onSubmit = (values) => {
    dispatch(
      documentFormActions.doUpdate(recordIdToEdit, values),
    );
    doCloseEdit();
  };

  const record = rows?.find(
    (row) => row.id === recordIdToEdit,
  );

  if (record) {
    Object.keys(defaultValues).forEach((key) => {
      form.register(key);
      form.setValue(key, record[key] || defaultValues[key]);
    });
  }

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const size = filesize.partial({
    base: 2,
    standard: 'jedec',
  });

  const renderFileIcon = (filename) => {
    const ext = extractExtensionFrom(filename);

    const customDefaultLabelColor = styleDefObj[ext]
      ? styleDefObj[ext]['labelColor'] ?? '#777'
      : '#777';
    const libDefaultGlyphColor =
      defaultStyles[ext] &&
      defaultStyles[ext]['labelColor'];

    return (
      <MDBox minWidth="32px" maxWidth="32px" lineHeight={0}>
        <FileIcon
          extension={ext}
          glyphColor={
            libDefaultGlyphColor ?? customDefaultLabelColor
          }
          labelColor={customDefaultLabelColor}
          {...defaultStyles[ext]}
          {...styleDefObj[ext]}
        />
      </MDBox>
    );
  };

  return (
    <>
      <FormWrapper>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TableContainer sx={{ boxShadow: 'none' }}>
              <Table>
                <MDBox component="thead">
                  <TableRow>
                    <DataTableHeadCell
                      padding="checkbox"
                      width="0"
                      sorted={false}
                    >
                      {hasRows && (
                        <Checkbox
                          color={sidenavColor}
                          checked={Boolean(isAllSelected)}
                          onChange={() =>
                            doToggleAllSelected()
                          }
                          size="small"
                        />
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      sorted={false}
                      width="0"
                    >
                      {' '}
                    </DataTableHeadCell>
                    <DataTableHeadCell sorted={false}>
                      {' '}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      onClick={() => doChangeSort('title')}
                      sorted={
                        sorter.field === 'title'
                          ? sorter.order
                          : 'none'
                      }
                    >
                      {i18n(
                        'entities.document.fields.title',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      onClick={() => doChangeSort('type')}
                      sorted={
                        sorter.field === 'type'
                          ? sorter.order
                          : 'none'
                      }
                    >
                      {i18n(
                        'entities.document.fields.type',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      onClick={() =>
                        doChangeSort('typeTitle')
                      }
                      sorted={
                        sorter.field === 'typeTitle'
                          ? sorter.order
                          : 'none'
                      }
                    >
                      {i18n(
                        'entities.document.fields.typeTitle',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell sorted={false}>
                      {i18n(
                        'entities.document.fields.tags',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      onClick={() => doChangeSort('name')}
                      sorted={
                        sorter.field === 'name'
                          ? sorter.order
                          : 'none'
                      }
                    >
                      {i18n(
                        'entities.document.fields.name',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell sorted={false}>
                      {i18n(
                        'entities.document.fields.uploader',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      onClick={() =>
                        doChangeSort('uploadedAt')
                      }
                      sorted={
                        sorter.field === 'uploadedAt'
                          ? sorter.order
                          : 'none'
                      }
                    >
                      {i18n(
                        'entities.document.fields.uploadedAt',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell
                      onClick={() =>
                        doChangeSort('sizeInBytes')
                      }
                      sorted={
                        sorter.field === 'sizeInBytes'
                          ? sorter.order
                          : 'none'
                      }
                    >
                      {i18n(
                        'entities.document.fields.size',
                      )}
                    </DataTableHeadCell>
                    <DataTableHeadCell sorted={false}>
                      {i18n(
                        'entities.document.fields.extension',
                      )}
                    </DataTableHeadCell>
                  </TableRow>
                </MDBox>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <DataTableBodyCell
                        align="center"
                        colSpan={100}
                      >
                        <Spinner />
                      </DataTableBodyCell>
                    </TableRow>
                  )}
                  {!loading && !hasRows && (
                    <TableRow>
                      <DataTableBodyCell
                        align="center"
                        colSpan={100}
                      >
                        <MDTypography align="center">
                          {i18n('table.noData')}
                        </MDTypography>
                      </DataTableBodyCell>
                    </TableRow>
                  )}
                  {!loading &&
                    rows.map((row) => (
                      <TableRow key={row.id}>
                        <DataTableBodyCell padding="checkbox">
                          <Checkbox
                            color={sidenavColor}
                            checked={selectedKeys.includes(
                              row.id,
                            )}
                            onChange={() =>
                              doToggleOneSelected(row.id)
                            }
                            size="small"
                          />
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          <MDBox
                            display="flex"
                            justifyContent="flex-end"
                          >
                            {row.id === recordIdToEdit ? (
                              hasPermissionToEdit && (
                                <>
                                  <Tooltip
                                    disableInteractive
                                    title={i18n(
                                      'common.cancel',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      color={sidenavColor}
                                      onClick={() =>
                                        doCloseEdit()
                                      }
                                      disabled={saveLoading}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    disableInteractive
                                    title={i18n(
                                      'common.save',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      color={sidenavColor}
                                      onClick={form.handleSubmit(
                                        onSubmit,
                                      )}
                                      disabled={saveLoading}
                                    >
                                      <SaveIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )
                            ) : (
                              <>
                                {hasPermissionToEdit && (
                                  <Tooltip
                                    disableInteractive
                                    title={i18n(
                                      'common.edit',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      color={sidenavColor}
                                      onClick={() =>
                                        doOpenEdit(row.id)
                                      }
                                      disabled={saveLoading}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                {hasPermissionToDestroy && (
                                  <Tooltip
                                    disableInteractive
                                    title={i18n(
                                      'common.destroy',
                                    )}
                                  >
                                    <IconButton
                                      size="small"
                                      color={sidenavColor}
                                      onClick={() =>
                                        doOpenDestroyConfirmModal(
                                          row.id,
                                        )
                                      }
                                      disabled={saveLoading}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </>
                            )}
                          </MDBox>
                        </DataTableBodyCell>
                        <DataTableBodyCell pr={0}>
                          {renderFileIcon(row.name)}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {row.id === recordIdToEdit ? (
                            <InputFormItem
                              name="title"
                              label={i18n(
                                'entities.document.fields.title',
                              )}
                              variant="standard"
                              hideLabel
                              required
                            />
                          ) : (
                            row.title
                          )}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          <DocumentTypeViewItem
                            value={row.type}
                          />
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {row.typeTitle}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {row.id === recordIdToEdit ? (
                            <TagAutocompleteFormItem name="tags" />
                          ) : (
                            <TagListItem value={row.tags} />
                          )}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {row.name}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          <UserListItem
                            value={row.uploader}
                          />
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {row.uploadedAt
                            ? moment(row.uploadedAt).format(
                                DEFAULT_MOMENT_FORMAT,
                              )
                            : null}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {size(row.sizeInBytes)}
                        </DataTableBodyCell>
                        <DataTableBodyCell>
                          {getDocumentType(row.name)}
                        </DataTableBodyCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </form>
        </FormProvider>
      </FormWrapper>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default DocumentListTable;
