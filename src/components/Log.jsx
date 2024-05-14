export default function Log({gameturns}) {
    return (
        <ol id = 'log'>
            {gameturns.map( (turns) => (
            <li key = { `${turns.square.row}${turns.square.col}`}>{turns.player} selected ({turns.square.row},{turns.square.col})</li>))}
        </ol>
    );

}