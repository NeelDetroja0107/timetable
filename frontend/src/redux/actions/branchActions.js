import { getBranches, addBranch } from "../../services/api";

export const fetchBranches = () => async (dispatch) => {
  dispatch({ type: "BRANCHES_REQUEST" });
  try {
    const { data } = await getBranches();
    dispatch({ type: "BRANCHES_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "BRANCHES_FAIL",
      payload: error.message,
    });
  }
};

export const createBranch = (branch) => async (dispatch) => {
  dispatch({ type: "BRANCH_ADD_REQUEST" });
  try {
    const { data } = await addBranch(branch);
    dispatch({ type: "BRANCH_ADD_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "BRANCH_ADD_FAIL",
      payload: error.message,
    });
  }
};
