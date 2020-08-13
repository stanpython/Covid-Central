/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './App.css';
import CountryChartConfirmed from './charts/CountryChart-confirmed';
import CountryChartDeaths from './charts/CountryChart-deaths';
import CountryChartRecovered from './charts/CountryChart-recovered';
import StateChartCases from './charts/StateChart-confirmed';
import StateChartDeaths from './charts/StateChart-deaths';
import StateChartRecovered from './charts/StateChart-recovered';
import "core-js/stable";
import "regenerator-runtime/runtime";

let start = 1;
let last = 11;

let stateStart = 1;
let stateLast = 11;


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      global: [],
      index: 0,
      USstates: [],
      view: "country",
    };
    this.state.updateSliceCountry = this.updateSliceCountry
    this.state.updateSliceState = this.updateSliceState
    this.state.topButtons = this.topButtons
  }
  

  async componentDidMount() {
    const allCountries = await fetch('https://coronavirus-19-api.herokuapp.com/countries')
    const allCountriesJson = await allCountries.json();
    const allStates = await fetch('https://api.covidtracking.com/v1/states/current.json')
    const allStatesJson = await allStates.json();
    
    this.setState({ data: allCountriesJson.slice(1, 11), global: allCountriesJson[0], USstates: allStatesJson.slice(1,10)})
    // console.log(this.state.global)
  };

  componentDidUpdate() {

  }

  async updateSliceCountry(direction) {

    if (direction === 1 && start !== 1) {
      const allCountries = await fetch('https://coronavirus-19-api.herokuapp.com/countries')
      const allCountriesJson = await allCountries.json();
      return this.setState({data: allCountriesJson.slice(start -= 10, last -= 10)})
    }
    if (direction === 2) {
      const allCountries = await fetch('https://coronavirus-19-api.herokuapp.com/countries')
      const allCountriesJson = await allCountries.json();
      return this.setState({data: allCountriesJson.slice(start += 10, last += 10)})
    }
    console.log(start, last);
  }

  async updateSliceState(direction) {

    if (direction === 1 && stateStart !== 1) {
      const allStates = await fetch('https://api.covidtracking.com/v1/states/current.json')
      const allStatesJson = await allStates.json();
      this.setState({USstates: allStatesJson.slice(stateStart -= 10, stateLast -= 10)})
    }
    if (direction === 2) {
      const allStates = await fetch('https://api.covidtracking.com/v1/states/current.json')
      const allStatesJson = await allStates.json();
      this.setState({USstates: allStatesJson.slice(stateStart += 10, stateLast += 10)})
    }
    // console.log(stateStart, stateLast, "clicked", this.state.USstates);
  }

  topButtons(buttonName) {
    if (buttonName === 'recovered') {
      this.setState({index: 2})
    } else if (buttonName === 'cases') {
      this.setState({index: 0})
    } else if (buttonName === 'deaths') {
      this.setState({index: 1})
    }
  }

  changeView(view) {
    this.setState({
      view: 'state',
    })
  }


  render() {
    let container = [<CountryChartConfirmed data={this.state.data}/>, <CountryChartDeaths data={this.state.data}/>, <CountryChartRecovered data={this.state.data}/>]
    let state = [<StateChartCases data={this.state.USstates}/>, <StateChartDeaths data={this.state.USstates}/>, <StateChartRecovered data={this.state.USstates}/>]
    if (this.state.view === 'country') {
    return (
      <>
        <div className="chart-and-buttons">
          <div className="chart-button-div">
            <a onClick={() => this.topButtons("cases")} className="myButton">Confirmed Cases</a>
            <a onClick={() => this.topButtons("deaths")} className="myButton">Deaths</a>
            <a onClick={() => this.topButtons("recovered")} className="myButton">Recovered</a>
          </div>
          < div className="outer-container" >
            <GlobalCovid data={this.state.global}/>
            {container[this.state.index]}
          </div>
        </div>
        <div className="buttons-div">
          <a onClick={() => this.updateSliceCountry(1)} className="myButton">Last 10</a>
          <a onClick={() => this.updateSliceCountry(2)} className="myButton">Next 10</a>
        </div>
      </>
    )
    }
    if (this.state.view === 'state') {
      return (
        <>
          <div className="chart-and-buttons">
            <div className="chart-button-div">
              <a onClick={() => this.topButtons("cases")} className="myButton">Confirmed Cases</a>
              <a onClick={() => this.topButtons("deaths")} className="myButton">Deaths</a>
              <a onClick={() => this.topButtons("recovered")} className="myButton">Recovered</a>
            </div>
            < div className="outer-container" >
              <GlobalCovid data={this.state.global}/>
              {state[this.state.index]}
            </div>
          </div>
          <div className="buttons-div">
            <a onClick={() => this.updateSliceState(1)} className="myButton">Last 10</a>
            <a onClick={() => this.updateSliceState(2)} className="myButton">Next 10</a>
          </div>
        </>
      )
      }
  }

}


const GlobalCovid = (props) => {
  const {data} = props;
  // console.log(data);
  const cases = Number(data.cases).toLocaleString();
  const deaths = Number(data.deaths).toLocaleString();
  const recovered = Number(data.recovered).toLocaleString();
  const todayCases = Number(data.todayCases).toLocaleString();
  const todayDeaths = Number(data.todayDeaths).toLocaleString();
  return (
    <div className="global-outer">
      <div className="global-container">
        <p>Global</p>
        <p className="orange">Coronavirus Cases</p>
        <p className="today">{cases}</p>
        <p>Cases Today</p>
        <p className="today">+{todayCases}</p>
      </div>
      <div className="global-container">
        <p>Global</p>
        <p className="orange">Deaths</p>
        <p className="today">{deaths}</p>
        <p>Deaths Today</p>
        <p className="today">+{todayDeaths}</p>
      </div>
      <div className="global-container">
        <p>Global</p>
        <p className="orange">Recovered</p>
        <p className="today">{recovered}</p>
      </div>
    </div>
  )
}

const AddTripButton = props => {
  return <button onClick={props.addTrip}>Add a trip</button>
}




export default App;