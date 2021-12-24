import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { logout } from "../actions/auth";
import { dateSelection } from "../helpers/constants";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Dashboard2(props) {
  const [selection, setSelection] = useState("");
  const url = "https://www.gov.uk/bank-holidays.json";
  const [apiData, setApiData] = useState("");
  const [displayData, setDisplayData] = useState("");

  // Making API Call and storing result in dislplayData and Api Data. Api Data will be used for future reference and displayData
  //   is used for displaying data in table
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let newli = [];
        for (let i in data) {
          newli = [...newli, data[i]];
        }
        setApiData(newli);
        setDisplayData(newli);
      });
  }, []);

  //   Handling Drop-down selection

  function handleChange(e) {
    let today = new Date();
    let rangeDate1 = new Date();

    if (e.target.value === "Yesterday") {
      rangeDate1.setDate(today.getDate() - 1);
      setSelection("Yesterday");
    } else if (e.target.value === "Last Week") {
      rangeDate1.setDate(today.getDate() - 7);
      setSelection("Last Week");
    } else if (e.target.value === "Last Month") {
      rangeDate1.setDate(today.getDate() - 30);
      setSelection("Last Month");
    } else if (e.target.value === "Custom") {
      setSelection("Custom");
      return;
    } else {
      setDisplayData(apiData);
      setSelection("All");
      return;
    }

    let newLi = apiData.filter((data) => {
      const newData = data.events.filter((event) => {
        const holidayDate = new Date(event.date);
        if (holidayDate >= rangeDate1 && holidayDate <= today) {
          return event;
        }
      });
      if (newData.length) {
        return (data["events"] = newData);
      }
    });

    setDisplayData(newLi);

    return;
  }

  function handleLogOut(e) {
    e.preventDefault();
    props.dispatch(logout());
  }

  // Handling Custom Search
  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = Object.fromEntries(formData);
    const startDate = new Date(date.startDate);
    const endDate = new Date(date.endDate);

    let newLi = apiData.filter((data) => {
      const newData = data.events.filter((event) => {
        const holidayDate = new Date(event.date);
        if (holidayDate >= startDate && holidayDate <= endDate) {
          return event;
        }
      });
      if (newData.length) {
        return (data["events"] = newData);
      }
    });

    setDisplayData(newLi);
    return;
  }

  return (
    <div className="container margin-5-pct">
      <h3>Select the Date</h3>

      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) => handleChange(e)}
      >
        <option defaultValue>All Holidays</option>
        {dateSelection.map((criteria) => (
          <option value={criteria} key={criteria}>
            {criteria}
          </option>
        ))}
      </select>
      {selection === "Custom" && (
        <div>
          <br />
          <form onSubmit={handleFormSubmit}>
            <input type="date" name="startDate" />{" "}
            <input type="date" name="endDate" />{" "}
            <button className="btn btn-danger">Search</button>
          </form>
        </div>
      )}
      {displayData && (
        <>
          {displayData.map((ele) => (
            <table className="table" key={ele.division}>
              <thead>
                <tr>
                  <th scope="col">{ele.division}</th>
                  <th scope="col">Title</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {ele["events"].map((event) => (
                  <tr key={ele["events"].indexOf(event)}>
                    <td></td>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Dashboard2);
