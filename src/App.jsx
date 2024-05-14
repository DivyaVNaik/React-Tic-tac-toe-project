import Player from "./components/player/Player";
import {useState} from 'react'
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

const PLAYERS = {"X": "Player 1","O": "Player 2"};


// function App() {
//  import dir from "./dataString.txt"

//   const [myoutput, setMyOutput] = useState([[]])

//   function fetchData() {
//     fetch(dir)
//     .then(row => row.text())
//     .then(text => {
//         const myStr = text.replace(/[\r]/gm, '')
//         const dataArray = myStr.split('\n')
//         setMyOutput((data) => {
//         let sortedArray = createStepLadder(dataArray)
//         return  sortedArray
//         })
//     });
//   }

//   function createStepLadder(inputArray) {
//     let subArray = []
//     let step = 1
//     // sort array 
//     let myArray = inputArray.sort((input1, input2) =>  {
//         return input1.split(" ")[0] - input2.split(" ")[0] })

//     // create subarray
//     while (myArray.length > 0) {
//       subArray.push(myArray.splice(0, step));
//       step+=1
//     }
//     //return last element of subarray
//     const displayArray = subArray.reduce(
//       (accumulator, currentValue) => accumulator + (currentValue[currentValue.length-1].split(" ")[1] + " "),[],
//     );
//       return displayArray  
//   }


//   return(
//   <main>
//     <div>
//     <button  onClick={fetchData}>Show Output</button> 
//     </div>
//      <div><span>{myoutput}</span></div>
//   </main>);
  
// }



function deriveActivePlayer(gameTurn) {
  let activePlayer = 'X'
  if ( gameTurn.length > 0 && gameTurn[0].player === 'X') {
    activePlayer = 'O'
  }
  return activePlayer
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]

  for (const turn of gameTurns) {
    const {square,player} = turn
    const {row,col} = square
    gameBoard[row][col] = player;
  }
   return gameBoard
}

function deriveWinner(gameBoard,players) {
  let winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column]
    if (firstSymbol &&  
     firstSymbol === secondSymbol && 
     secondSymbol === thirdSymbol) {
     winner = players[firstSymbol]
    }
  }
  return winner
}

function App() {

const [players,setPlayers] = useState(PLAYERS)
const [gameTurns,setGameTurns] = useState([])
const gameBoard = deriveGameBoard(gameTurns)
const winner = deriveWinner(gameBoard,players)
const hasDraw = (gameTurns.length === 9 && !winner)

function handleButtonSelection(row,col) {
  setGameTurns((previousTurn) => {
      let activePlayer = deriveActivePlayer(previousTurn)
      const updatedTurn = [{square: {row:row,col:col},player:activePlayer},...previousTurn,];
      return updatedTurn
   })

}

function handleGameOver() {
 setGameTurns([])
}

function handlePlayerNameSave(name,symbol) {
   setPlayers((player) => {
    return {...player, [symbol] : name}
    }
  )
}


  return (
    <main >
      <div id = 'game-container'>
        <ol id = 'players' className='highlight-player'>
            <Player isActive = {deriveActivePlayer(gameTurns) === 'X'} onSelectSave= {handlePlayerNameSave} initialName = {PLAYERS.X}  symbol = 'X'>Player 1</Player>  
            <Player isActive = {deriveActivePlayer(gameTurns) === 'O'} onSelectSave= {handlePlayerNameSave} initialName = {PLAYERS.O}  symbol = 'O'>Player 2</Player>  
        </ol>
        { (winner || hasDraw) &&  <GameOver winner={winner} restartGameHandler = {handleGameOver} /> }

      <GameBoard onButtonSelection = {handleButtonSelection} gameBoard = {gameBoard}/>
    </div>
    <div>
    </div>
    <Log gameturns={ gameTurns}/>
    </main>
   
  );
}

export default App
