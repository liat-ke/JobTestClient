//Import External Files
import React, { useEffect } from "react";
import { Chart } from "react-google-charts";
import { useSelector, useDispatch } from "react-redux";

//Import Internal Files
import { requestJobs } from "./Store/action";
import "./jobChart.scss";



const JobChart = () => {
  const { jobsData, isLoading, message, isShowMessage, month, year } = useSelector((state) => state);
  const dispatch = useDispatch();

  const options = {
    chart: {
      title: "Cumulative jobs views vs. prediction ",
      subtitle: `In Month: ${month} Year: ${year}`,
    },
  };

  const baseUrl = "https://localhost:44378/job";

  useEffect(() => {
    dispatch(requestJobs());
  }, [dispatch]);

 
  return (
    <div>
      {isLoading && <div className="loading">Data loading...</div>}
      <div className="job-details">
        {
          (jobsData && jobsData.length) > 0 &&
          <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={jobsData}
            options={options}
            id="google-chart"
          />
        }
      </div>
      {
        isShowMessage === true &&
        <div className="err-message">{message ? <p>{message}</p> : null}</div>
      }

    </div>

  );
}

export default JobChart;