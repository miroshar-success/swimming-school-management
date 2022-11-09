import adminList from 'src/modules/user/adminList/adminListReducers';
import adminForm from 'src/modules/user/adminForm/adminFormReducers';
import studentList from 'src/modules/user/studentList/studentListReducers';
import studentForm from 'src/modules/user/studentForm/studentFormReducers';
import teacherList from 'src/modules/user/teacherList/teacherListReducers';
import teacherForm from 'src/modules/user/teacherForm/teacherFormReducers';
import view from 'src/modules/user/view/userViewReducers';
import importerReducer from 'src/modules/user/importer/userImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  adminList,
  teacherList,
  studentList,
  adminForm,
  teacherForm,
  studentForm,
  view,
  importer: importerReducer,
});
