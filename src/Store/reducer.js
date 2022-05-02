import JOBS from "./initialData";

const initalState = {
    jobsData: [],
    isLoading: false,
    isError: false,
    message: "",
    isShowMessage:false
  };

  const reducer = (state = initalState, action) => {
    switch (action.type) {
      case JOBS.LOAD:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
      case JOBS.LOAD_SUCCESS:
        return {
          ...state,
          jobsData: action.jobsData,
          isLoading: false,
        };
        case JOBS.MESSAGE:
          return {
            ...state,
            message: action.message,
            isShowMessage: true,
          };
          case JOBS.DATE:
            return {
              ...state,
              month: action.month,
              year: action.year,
            };
      default:
        return state;
    }
  };
  
  export default reducer;