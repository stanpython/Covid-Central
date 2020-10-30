import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import XYAxis from './components/axis/xy-axis';
import Line from './components/line/line';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

class LineChart extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: 'Jan', value: 2 },
        { name: 'Feb', value: 4 },
        { name: 'Mar', value: 388 },
        { name: 'Apr', value: 225559		 },
        { name: 'May', value: 1108510 },
        { name: 'Jun', value: 1815956 },
        { name: 'July', value: 2678418 },
        { name: 'Aug', value: 5172509 },
        // { name: 'Sep', value: 0 },
        // { name: 'Oct', value: 55 },
        // { name: 'Nov', value: 60 },
        // { name: 'Dec', value: 80 },
      ],
    }
  }

  // async componentDidMount() {
  //   const response = await fetch('https://api.covidtracking.com/v1/us/daily.json');
  //   const responseJson = await response.json();
  //   this.setState({data: responseJson.slice(0,12).reverse()})
  // }

  render() {
    const { data } = this.state;
    const parentWidth = 1200;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 500 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(data.map(d => d.name))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.value))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x(d => xScale(d.name))
      .y(d => yScale(d.value))
      .curve(curveMonotoneX);

    return (
      <div>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}

export default LineChart
