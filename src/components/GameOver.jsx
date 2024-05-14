export default function GameOver({winner,restartGameHandler}) {
    let displayText =  <p>Its a draw!</p>
    if (winner)  {
        displayText = <p>{winner} won!</p>
        }
    return (
        <div id = 'game-over'>
    <h2>Game Over!</h2>
    {displayText}
    <button onClick={restartGameHandler}>Restart Game</button>
    </div>
);
}