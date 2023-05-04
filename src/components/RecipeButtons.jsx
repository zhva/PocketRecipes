import { React } from 'react'
import deleteIcon from '../icons/deleteIcon.svg'
import shareIcon from '../icons/shareIcon.svg'
import editIcon from '../icons/editIcon.svg'

export const RecipeButtons = (props) => {
    return(
        <div className="edit-buttons-container">
            <button>
                <img className="edit-button" src={deleteIcon} onClick={() => {}}></img>
            </button>
            <button>
                <img src={shareIcon} onClick={() => {}}></img>
            </button>
            <button>
                <img src={editIcon} onClick={() => {}}></img>
            </button>
        </div>
    )
}