//Import Internal Files
import JOBS from "./initialData";

import axios from 'axios';

export const requestJobs = () => async (dispatch) => {

    const baseUrl = "https://localhost:44378/job";
    var currentDate = new Date();
    const date = { month: currentDate.getMonth() + 1, year: currentDate.getFullYear() };

    dispatch({
        type: JOBS.DATE,
        month: date.month,
        year: date.year
    });

    dispatch({
        type: JOBS.LOAD,
    });

    const params = new URLSearchParams({ month: encodeURIComponent(date.month), year: encodeURIComponent(date.year) });

    try {
        const res = await axios.get(baseUrl, { params });
        if (res.status === 200) {
            let data = res.data;
            let combinedArray = [];
            combinedArray.push(data.title, ...data.jobsDetails);
            dispatch({
                type: JOBS.LOAD_SUCCESS,
                jobsData: ([...combinedArray]),
                isError: false,
            });
        }
        else {
            dispatch({
                type: JOBS.MESSAGE,
                message: (`Some error occured. Error: ${res.error}`),
                isShowMessage: true,
            });
        }

    } catch (e) {
        dispatch({
            type: JOBS.LOAD_SUCCESS,
            jobsData: [],
            isError: true,
        });
        dispatch({
            type: JOBS.MESSAGE,
                message: (`Some error occured. Error: ${e.response.data}`),
                isShowMessage: true,
        });
    }
};