import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Disc from './objects/disc';

class App extends Component {
  constructor(props){
    super(props);
    let disc1 = new Disc(3), disc2 = new Disc(2), disc3 = new Disc(1), disc0 = new Disc(0);
    this.state = {
      board: [[disc1,disc2,disc3],[],[disc2]],
      num_discs: 3,
    }
  }

  componentDidMount(){
    this.moveDisc(2, this.state.board[0], this.state.board[2])
  }

  initializeGame = () =>{
    let disc1 = new Disc(3), disc2 = new Disc(2), disc3 = new Disc(1);
    var list = [];
    list.push(disc1);
    list.push(disc2);
    list.push(disc3);
    this.setState({
      board: [...this.state.board, this.state.board[0] = list]
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
      console.log(this.state.board)
    }
  }

  renderDiscs = (list) =>{
    return(
      <div id='platform'>
        {list.map((disc,i) =>{
          return(
            <div key={i}>
            <svg>
              <rect
              x='10'
              y='10'
              width="100"
              height="50"
              
              stroke="blue"
              strokeWidth="4"
              fill="lightblue">
              </rect>
            </svg>
            </div>
            )
        })}
      </div>
    )
  }
  render() {
    return (
      <div className="App">
        <h1>Towers of Hanoi</h1>
        <div id='board'>
          <table>
          <tr>
            <td><div id='platform-container'>{this.renderDiscs(this.state.board[0])}</div></td>
            <td><div id='platform-container'>{this.renderDiscs(this.state.board[1])}</div></td>
            <td><div id='platform-container'>{this.renderDiscs(this.state.board[1])}</div></td>
          </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
