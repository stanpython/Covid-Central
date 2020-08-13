/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import './CountryChart.css';
// import data from '../data';

class StateBarChartCases extends Component {
  plot(chart, width, height) {
    const { data } = this.props;
    // create scales!
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.state))
      .range([0, width]);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.positive)])
      .range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

    const u = chart.selectAll('.bar')
      .data(data);

    u
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', (d) => xScale(d.state))
      .attr('y', (d) => yScale(d.positive))
      .attr('height', (d) => (height - yScale(d.positive)))
      .attr('width', (d) => xScale.bandwidth())

      // .attr("fill", "#69b3a2")
      .style('fill', (d, i) => colorScale(i));

    chart.selectAll('.bar-label')
      .data(data)
      .enter()
      .append('text')
      .classed('bar-label', true)
      .attr('x', (d) => xScale(d.state) + xScale.bandwidth() / 2)
      .attr('dx', 0)
      .attr('y', (d) => yScale(d.positive))
      .attr('dy', -6)
      .style('font-size', '14px')
      .text((d) => Number(d.positive).toLocaleString());

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
      .attr('x', (width / 2.5))
      .attr('y', 0 - (60 / 3))
      .style('text-anchor', 'start')
      .style('font-size', '22px')
      .style('text-decoration', 'underline')
      .text('Total Active Cases by State');

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

export default StateBarChartCases;
