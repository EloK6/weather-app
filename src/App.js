import React, { Component } from "react";
import "./App.css";
import Chart from "./visualizations/Chart";

class App extends Component {
  state = {
    temps: {},
    city: "sf" // city whose temperatures to show
  };

  componentDidMount() {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL || ""}/sf.json`),
      fetch(`${process.env.PUBLIC_URL || ""}/ny.json`),
      fetch(`${process.env.PUBLIC_URL || ""}/am.json`)
    ])
      .then(responses => Promise.all(responses.map(resp => resp.json())))
      .then(([sf, ny, am]) => {
        sf.forEach(day => (day.date = new Date(day.date)));
        ny.forEach(day => (day.date = new Date(day.date)));
        am.forEach(day => (day.date = new Date(day.date)));
        this.setState({ temps: { sf, ny, am } });
      });
  }

  updateCity = e => {
    this.setState({ city: e.target.value });
  };

  render() {
    const data = this.state.temps[this.state.city];

    return (
      <div className="App">
        <h1>
          2017 Temperatures for
          <select name="city" onChange={this.updateCity}>
            {[
              { label: "San Francisco", value: "sf" },
              { label: "New York", value: "ny" },
              { label: "Amsterdam", value: "am" }
            ].map(option => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </h1>
        <p>Exercice from FrontEndMaster</p>
        <Chart data={data} />
      </div>
    );
  }
}

export default App;
