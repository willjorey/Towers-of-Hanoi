import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Disc from './objects/disc';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      first: [],
      second: [],
      third: [],
      num_discs: 3,
    }
  }

  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () =>{
    let disc1 = new Disc(3), disc2 = new Disc(2), disc3 = new Disc(1);
    this.state.first.push(disc1);
    this.state.first.push(disc2);
    this.state.first.push(disc3);

    console.log(this.state.first);
  }
  render() {
    return (
      <div className="App">
        <h1>Towers of Hanoi</h1>
      </div>
    );
  }
}

export default App;
