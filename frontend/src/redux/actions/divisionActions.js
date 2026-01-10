import { getDivisions, addDivision, deleteDivision as deleteDivisionAPI } from "../../services/divisionService";


export const fetchDivisions = () => async (dispatch) => {
  dispatch({ type: "DIVISIONS_REQUEST" });
  try {
    const { data } = await getDivisions();
    dispatch({ type: "DIVISIONS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DIVISIONS_FAIL", payload: error.message });
  }
};


export const createDivision = (division) => async (dispatch) => {
  dispatch({ type: "DIVISION_ADD_REQUEST" });
  try {
    const { data } = await addDivision(division);
    dispatch({ type: "DIVISION_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "DIVISION_ADD_FAIL", payload: error.message });
  }
};


export const deleteDivision = (id) => async (dispatch) => {
  dispatch({ type: "DIVISION_DELETE_REQUEST" });
  try {
    await deleteDivisionAPI(id);
    dispatch({ type: "DIVISION_DELETE_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DIVISION_DELETE_FAIL", payload: error.message });
  }
};
