import React from "react";
import { select, selectAll } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { transition } from 'd3-transition';

class Axis extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.updateAxis();
  }
  renderAxis() {
    const { scale, orient, ticks } = this.props;
    const node = this.ref.current;
    let axis;

    if (orient === "bottom") {
      axis = axisBottom(scale);
    }
    if (orient === "left") {
      axis = axisLeft(scale)
        .ticks(ticks);
    }
    select(node).call(axis);
  }
  updateAxis() {
    const { scale, orient, ticks } = this.props;
    const t = transition().duration(1000)

    if (orient === "left") {
      const axis = axisLeft(scale).ticks(ticks); 
      selectAll(`.${orient}`).transition(t).call(axis)
    }
  }
  render() {
    const { orient, transform } = this.props;
    return (
      <g
        ref={this.ref}
        transform={transform}
        className={`${orient} axis`}
      />
    );
  }
}

export default Axis;
