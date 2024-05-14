import { useState } from "react";

export default function Player({initialName,symbol,isActive,onSelectSave}) {
    const [isEditing,setIsEditing] = useState(false)
    const [playerName,setPlayerName] = useState(initialName)

    let editButtonText = <p>Edit</p>
    let editablePlayerName = <span className = "player-name">{playerName}</span>


    if (isEditing) {
        editButtonText = <p>Save</p>
        editablePlayerName = <input type= 'text' required value = {playerName} onChange = {handleChange}/>
    }
function handleEdit(){
    setIsEditing((editing) => !editing)
    if (isEditing) {
        onSelectSave(playerName,symbol)
    }
}

function handleChange(event) {
  setPlayerName(event.target.value)
}
    return (
        <li className = { isActive? 'active' : undefined }> 
            <span className = "player">
                {editablePlayerName}
            <span className = "player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}> {editButtonText}</button>
        </li>
    );
}