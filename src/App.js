import React, { Component } from 'react';
import './App.css';
import Disc from './objects/disc';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: [[],[],[]],
      num_discs: 3,
      moves: 0,
    }
  }

  componentDidMount(){
    this.initializeGame();
    // this.moveDisc(2, this.state.board[0], this.state.board[2]);
    // this.moveDisc(1, this.state.board[0], this.state.board[1]);
    // this.moveDisc(0, this.state.board[2], this.state.board[1]);
    // this.moveDisc(0, this.state.board[0], this.state.board[2]);
    // this.moveDisc(1, this.state.board[1], this.state.board[0]);
    // this.moveDisc(0, this.state.board[1], this.state.board[2]);
    // this.moveDisc(0, this.state.board[0], this.state.board[2]);
  }

  initializeGame = () =>{
    let disc1 = new Disc(3), disc2 = new Disc(2), disc3 = new Disc(1);
    var list = [...this.state.board];
    list[0].push(disc1);
    list[0].push(disc2);
    list[0].push(disc3);
    this.setState({
      board: list,
      input: '',
    })
  };

  moveDisc = (disc_index, p1, p2) =>{
    //disc_index is the index of the disc we're moving from the p1
    // p1 is the list of discs contiaining  the disc we want to move
    // p2 is the destination platform of the disc we're moving

    // Check if we can move the disc. ie no other disc is on top
    if( p1[disc_index + 1] != null)
      console.log("can't move disc");
    else{
      console.log('movable');
      // Check the disc size of the platform we're moving too

      // No discs on platform
      var disc = p1[disc_index];
      if(p2.length === 0){
        p2.push(p1.pop())
      //At least one disc on platform, commpare sizes if the moving piece is bigger then can't move else move it
      }else{
        if(disc.size > p2[p2.length - 1].size){
          console.log('Disc too big to move')
        }else{
          p2.push(p1.pop());
        }
      }
    }
    console.log(this.state.board)

  }

  renderDiscs = (list) =>{
    console.log(list)
    var copy = list.slice().reverse()
    return(
      <div id='platform'>
        {copy.map((disc,i) =>{
          return(
            <div key={i} id='disc' style={{width: disc.size * 100}}>
            </div>
            )
        })}
      </div>
    )
  }

  inputChange = (event) =>{
    this.setState({
      input: event.target.value
    })
  }

  execute = () =>{
    let arr = this.state.input.split(" ");
    let board = this.state.board;
    console.log(arr);
    this.moveDisc(arr[0], board[arr[1]], board[arr[2]]);
    this.setState({
      input: ''
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Towers of Hanoi</h1>
        <div id='board'>
            <table>
              <tbody>
              <tr>
                <td>{this.renderDiscs(this.state.board[0])}</td>
                <td>{this.renderDiscs(this.state.board[1])}</td>
                <td>{this.renderDiscs(this.state.board[2])}</td>
              </tr>
              <tr>
                <td><div style={{width:'400px', height: '25px', backgroundColor: 'black'}}/></td>
                <td><div style={{width:'400px', height: '25px', backgroundColor: 'black'}}/></td>
                <td><div style={{width:'400px', height: '25px', backgroundColor: 'black'}}/></td>
              </tr>
              </tbody>
            </table>
        </div>
        <br/>
        <h3>Input Commands</h3>
        <textarea style={{width: '300px'}} type='text' onChange={this.inputChange}/>
        <input type='submit' value='Submit' onClick={() => this.execute()}/>
      </div>
    );
  }
}

export default App;
