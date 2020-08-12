import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';
import "core-js/stable";
import "regenerator-runtime/runtime";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 50;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 40;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      global: [],
    };
  }

  async componentDidMount() {
    const response = await fetch('https://coronavirus-19-api.herokuapp.com/all')
    const json = await response.json();
    this.setState({ global: json })
    console.log('data has been received');
    console.log(this.state.global)
  };

  componentDidUpdate() {
    // this.resetArray();
  }


  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          // const pTagsStyle = pTags[barOneIdx].style;
          arrayBars[barOneIdx].innerHTML = `${newHeight}`;
          // pTagsStyle.transform = [{rotate: '90deg'}]
          barOneStyle.height = `${newHeight}px`;
          // console.log(pTags)
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  heapSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  bubbleSort() {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;
    const pstyle = {
      fontSize: "12",
      transform: "rotate(90deg)"
    }

    return (
      <>
        
        <div className='buttons'>
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms (BROKEN)</button>
        </div>
       
      <div className='outer-container'>
      <GlobalCovid data={this.state.global}/>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}>{value}</div>
          ))}
        </div>
        
      </div>
      
      </>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}



const GlobalCovid = (props) => {
  const {data} = props;
  
  const cases = Number(data.cases).toLocaleString();
  const deaths = Number(data.deaths).toLocaleString();
  const recovered = Number(data.recovered).toLocaleString();
  return (
    <>
    <div className="global-container">
      <p>Global</p>
      <p>Coronavirus Cases</p>
      <p>{cases}</p>
    </div>
    <div className="global-container">
      <p>Global</p>
      <p>Deaths</p>
      <p>{deaths}</p>
    </div>
    <div className="global-container">
      <p>Global</p>
      <p>Deaths</p>
      <p>{recovered}</p>
    </div>
    </>
  )
}