import React, { Component } from 'react';
import './App.css';
import Disc from './objects/disc';

class App extends Component {
  constructor(props){
    super(props);
    this.initial_discs = 2;
    this.state = {
      board: [[],[],[]],
      num_discs: 3,
      moves: 0,
      error: '',
    }
  }

  componentDidMount(){
    this.initializeGame();
  };
  
  initializeGame = () =>{
    var list = [[],[],[]];
    for ( let i = 0; i < this.initial_discs; i++){
      list[0].push(new Disc(this.initial_discs - i));
    }
    this.setState({
      board: list,
      input: '',
      moves: 0,
      num_discs: this.initial_discs,
    }, );
  };

  moveDisc = (p1, p2) =>{
    // p1 is the list of discs contiaining  the disc we want to move
    // p2 is the destination platform of the disc we're moving

    if (p1.length !== 0 ){
    // No discs on platform
      if(p2.length === 0){
        p2.push(p1.pop())
      //At least one disc on platform, commpare sizes if the moving piece is bigger then can't move else move it
      }else{
        var disc = p1[p1.length - 1]
        if(disc.size > p2[p2.length - 1].size){
          this.setState({
            error:'Disc too big to move'
          });
        }else{
          p2.push(p1.pop());
        }
      }
    }
    this.setState({
      board: this.state.board
    })
  }

  solveTowers = (num, source, aux, dest)=>{
    if (num === 1){
      this.moveDisc(source,dest);
      return;
    }else{
      this.solveTowers(num - 1, source, dest, aux);
      this.solveTowers(num - 1, aux, source, dest);
    }
    console.log(this.state.board)
  }

  renderDiscs = (list) =>{
    var copy = list.slice().reverse();
    return(
      <div id='platform'>
        {copy.map((disc,i) =>{
          return(
            <div id='disc-container' key={i}>
              <div  id='disc' style={{backgroundColor: 'lightblue' , width: disc.size * 75}}/>
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
    if (arr[1]!== undefined && arr[0] !== undefined){
      let p1 = board[arr[0] - 1];
      let p2 = board[arr[1] - 1]
      this.moveDisc(p1 , p2);
      this.setState({
        moves: this.state.moves + 1,
      })
    }

  }

  increment = () =>{
    var list = [...this.state.board[0]];
    list.reverse();
    list.push(new Disc(this.state.num_discs + 1));
    list.reverse();
    var b1 = [list,[],[]];
    this.setState({
      num_discs: this.state.num_discs + 1,
      board: b1
    })
  }

  decrement = () =>{
    var discs = this.state.num_discs;
    var list = this.state.board[0];
    list = list.slice(1)
    var b1 = [list,[],[]];
    if ( discs - 1 !== 0 ){
      this.setState({
        num_discs: discs - 1,
        board: b1
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Towers of Hanoi</h1>
        <p>Move all the discs from Platform 1 to Platform 3 in the same order as they started in.</p>
        <div style={{width:'500px', marginLeft:'37%'}}>
          <h4>Rules</h4>
          <ul style={{listStyleType: 'square'}}>
            <li>A disc cannot be placed on top of a smaller disc</li>
            <li>You can only move the top disc on a given platform</li>
          </ul>
        </div>

        <div id='board'>
        <div>
          <p style={{display: 'inline', padding: '15px', fontSize: '30px'}}>Number of Discs: {this.state.num_discs}</p>
          <button style={{display: 'inline'}} onClick={this.increment}>+</button>
          <button style={{display: 'inline'}} onClick={this.decrement}>-</button>
          <p style={{marginLeft: '30px', padding: '20px' ,display: 'inline', fontSize: '30px'}}>Move Counter: {this.state.moves} </p>
        </div>
            <table>
              <tbody>
              <tr id='one' style={{height: '300px'}}>
                <td>{this.renderDiscs(this.state.board[0])}</td>
                <td>{this.renderDiscs(this.state.board[1])}</td>
                <td>{this.renderDiscs(this.state.board[2])}</td>
              </tr>
              <tr>
                <td><div style={{width:'400px', height: '25px', backgroundColor: 'black'}}/></td>
                <td><div style={{width:'400px', height: '25px', backgroundColor: 'black'}}/></td>
                <td><div style={{width:'400px', height: '25px', backgroundColor: 'black'}}/></td>
              </tr>
              <tr>
                <td>Platform 1</td>
                <td>Platform 2</td>
                <td>Platform 3</td>
              </tr>
              </tbody>
            </table>
        </div>
        <br/>
        <button style={{marginTop: '20px'}}onClick={this.initializeGame}>New Game</button>
        <button style={{marginTop: '20px'}}onClick={() => this.solveTowers(this.state.num_discs, this.state.board[0],this.state.board[1],this.state.board[2])}>Solve</button>
        
        <br/>
        <h3>Input Commands</h3>
        <p>To move a disc from Platform 1 to Platform 2, enter in the text area: <b style={{fontSize: '20px'}}>'1 2'</b>  then submit</p>
        <div>
          <textarea style={{ height: '20px', width: '300px'}} type='text' onChange={this.inputChange}/>
          <input type='submit' value='Submit' onClick={() => this.execute()}/>
        </div>
        <br/>
        <h2 style={{color: 'red'}}>{this.state.error}</h2>
        </div>
    );
  }
}

export default App;
