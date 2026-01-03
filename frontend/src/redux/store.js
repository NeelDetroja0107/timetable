import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { teacherReducer } from "./reducers/teacherReducer";
import { branchReducer } from "./reducers/branchReducer";
import { divisionReducer } from "./reducers/divisionReducer";
import { subjectReducer } from "./reducers/subjectReducer";
import { classroomReducer } from "./reducers/classroomReducer";
import { timetableReducer } from "./reducers/timetableReducer";
import { reportReducer } from "./reducers/reportReducer";

const rootReducer = combineReducers({
  teacher: teacherReducer,
  branch: branchReducer,
  division: divisionReducer,
  subject: subjectReducer,
  classroom: classroomReducer,
  timetable: timetableReducer,
  report: reportReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
