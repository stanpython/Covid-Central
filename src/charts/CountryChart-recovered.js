/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import './CountryChart.css';
// import data from '../data';

class BarChart extends Component {
  plot(chart, width, height) {
    const { data } = this.props;

    // create scales!
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.recovered)])
      .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
    const tooltip = d3.select('body').append('div').attr('class', 'toolTip');
    const u = chart.selectAll('.bar')
      .data(data);

    u
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', (d) => xScale(d.country))
      .attr('y', (d) => yScale(d.recovered))
      .attr('height', (d) => (height - yScale(d.recovered)))
      .attr('width', (d) => xScale.bandwidth())
      .on('mouseover', (d) => {
        tooltip
          .style('left', `${d3.event.pageX - 70}px`)
          .style('top', `${d3.event.pageY - 90}px`)
          .style('display', 'inline-block')
          .html(`${d.country}<br>` + `Active Cases: ${Number(d.active).toLocaleString()}<br>` + `Today's Cases: +${d.todayCases}<br>` + `Today's Deaths: +${d.todayDeaths}`);
      })
      .on('mouseout', (d) => { tooltip.style('display', 'none'); })
      // .attr("fill", "#69b3a2")
      .style('fill', (d, i) => colorScale(i));

    chart.selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .classed('bar-label', true)
      .attr('x', (d) => xScale(d.country) + xScale.bandwidth() / 2)
      .attr('dx', 0)
      .attr('y', (d) => yScale(d.recovered))
      .attr('dy', -6)
      .style('font-size', '14px')
      .style('color', 'rgb(77, 77, 77)')
      .text((d) => Number(d.recovered).toLocaleString());

    const xAxis = d3.axisBottom()
      .scale(xScale);

    chart.append('g')
      .style('font-size', '14px')
      .classed('x axis', true)
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft()
      .ticks(5)
      .scale(yScale);

    chart.append('g')
      .style('font-size', '14px')
      .classed('y axis', true)
      .attr('transform', 'translate(0,0)')
      .call(yAxis);

    chart.select('.x.axis')
      .append('text')
      .attr('x', width / 2)
      .attr('y', 60)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('Countries');

    chart.append('g')
      .append('text')
      .attr('x', (width / 2.7))
      .attr('y', 0 - (60 / 2))
      .style('text-anchor', 'start')
      .style('font-size', '22px')
      .style('text-decoration', 'underline')
      .text('Total Recovered by Country');

    // const yGridlines = d3.axisLeft()
    //   .scale(yScale)
    //   .ticks(5)
    //   .tickSize(-width, 0, 0)
    //   .tickFormat('');

    // chart.append('g')
    //   .call(yGridlines)
    //   .classed('gridline', true);
  }

  drawChart() {
    const width = 1200;
    const height = 500;

    const el = new Element('div');
    const svg = d3.select(el)
      .append('svg')
      .attr('id', 'chart')
      .attr('width', width)
      .attr('height', height);

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40,
    };

    const chart = svg.append('g')
      .classed('display', true)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // console.log(height);
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    this.plot(chart, chartWidth, chartHeight);

    return el.toReact();
  }

  render() {
    return this.drawChart();
  }
}

export default BarChart;
