import taskSelectors from 'src/modules/task/taskSelectors';

const taskInstanceSelectors = {
  selectPermissionToRead:
    taskSelectors.selectPermissionToRead,
  selectPermissionToEdit:
    taskSelectors.selectPermissionToEdit,
  selectPermissionToCreate:
    taskSelectors.selectPermissionToCreate,
  selectPermissionToDestroy:
    taskSelectors.selectPermissionToDestroy,
  selectPermissionToImport:
    taskSelectors.selectPermissionToImport,
};

export default taskInstanceSelectors;
