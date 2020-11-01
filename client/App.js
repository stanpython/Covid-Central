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
import LineChart from './LineChart'
import CovidTable from './charts/CovidTable.jsx'
import CovidTableState from './charts/CovidTableState.jsx'


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
      chartIdx: 0,
      USstates: [],
      view: "country",
    };
    this.state.updateSliceCountry = this.updateSliceCountry
    this.state.updateSliceState = this.updateSliceState
    this.state.topButtons = this.topButtons
    this.state.changeView = this.changeView
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
    if (direction === 2 && last <= 211 && start >= 0) {
      const allCountries = await fetch('https://coronavirus-19-api.herokuapp.com/countries')
      const allCountriesJson = await allCountries.json();
      
      return this.setState({data: allCountriesJson.slice(start += 10, last += 10)})
    }
    // console.log(start, last);
  }

  async updateSliceState(direction) {

    if (direction === 1 && stateStart !== 1) {
      const allStates = await fetch('https://api.covidtracking.com/v1/states/current.json')
      const allStatesJson = await allStates.json();
      this.setState({USstates: allStatesJson.slice(stateStart -= 10, stateLast -= 10)})
    }
    if (direction === 2 && stateLast !== 61) {
      const allStates = await fetch('https://api.covidtracking.com/v1/states/current.json')
      const allStatesJson = await allStates.json();
      console.log(stateLast)
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

  covidChart(buttonName) {
    if (buttonName === "state") { 
      this.setState({chartIdx: 1})
    } else if (buttonName === "country") {
      this.setState({chartIdx: 0})
    }
  }

  changeView(view) {
    if (view === "state") { 
      this.setState({view: 'state'})
    } else if (view === "country") {
      this.setState({view: 'country'})
    } else {
      this.setState({view: 'chart'})
    }
  }


  render() {
    const container = [<CountryChartConfirmed data={this.state.data}/>, <CountryChartDeaths data={this.state.data}/>, <CountryChartRecovered data={this.state.data}/>]
    const state = [<StateChartCases data={this.state.USstates}/>, <StateChartDeaths data={this.state.USstates}/>, <StateChartRecovered data={this.state.USstates}/>]
    const chart = [<CovidTable />, <CovidTableState />]
    if (this.state.view === 'country') {
    return (
      <>
        <NavBar onClick={this.changeView.bind(this)}/>
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
          <div className="buttons-div">
          <a onClick={() => this.updateSliceCountry(1)} className="myButton">Show Previous 10</a>
          <a onClick={() => this.updateSliceCountry(2)} className="myButton" style={{marginLeft: "5px"}}>Show Next 10</a>
          </div>
        </div>

      </>
    )
    }
    if (this.state.view === 'state') {
      return (
        <>
          <NavBar onClick={this.changeView.bind(this)}/>
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
      if (this.state.view === 'chart') {
        return (
          <>
          <NavBar onClick={this.changeView.bind(this)}/>
          <div className="chart-and-buttons">
            <div className="chart-button-div">
              <a onClick={() => this.covidChart("country")} className="myButton">View by Country</a>
              <a onClick={() => this.covidChart("state")} className="myButton">View by State</a>
            </div>
            < div className="outer-container" >
              <GlobalCovid data={this.state.global}/>
              {chart[this.state.chartIdx]}
              {/* <CovidTableState /> */}
            </div>
          </div>
          </>
        )
      }
  }

}


class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-sm navbar-custom">
            <a href="/" className="navbar-brand">COVID Central</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCustom">
                <i className="fa fa-bars fa-lg py-1 text-white"></i>
            </button>
            <div className="navbar-collapse collapse" id="navbarCustom">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a onClick={() => this.props.onClick("country")} className="nav-link" href="#">View by Country</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.props.onClick("state")} className="nav-link" href="#">View by US States</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => this.props.onClick("chart")} className="nav-link" href="#">View Data Table</a>
                    </li>
                </ul>
            </div>
        </nav>
      </React.Fragment>
    );
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
