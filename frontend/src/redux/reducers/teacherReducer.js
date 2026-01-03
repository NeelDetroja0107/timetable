const initialState = { teachers: [], loading: false, error: null };

export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TEACHERS_REQUEST":
      return { ...state, loading: true };
    case "TEACHERS_SUCCESS":
      return { ...state, loading: false, teachers: action.payload };
    case "TEACHERS_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "TEACHER_ADD_REQUEST":
      return { ...state, loading: true };
    case "TEACHER_ADD_SUCCESS":
      return { ...state, loading: false, teachers: [...state.teachers, action.payload] };
    case "TEACHER_ADD_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
