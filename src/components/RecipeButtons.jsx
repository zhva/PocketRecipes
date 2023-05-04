import { React } from 'react'
import deleteIcon from '../icons/deleteIcon.svg'
import shareIcon from '../icons/shareIcon.svg'
import editIcon from '../icons/editIcon.svg'
import { useNavigate } from 'react-router-dom'

export const RecipeButtons = (recipeId) => {
    const navigate = useNavigate()
    console.log({recipeId})
    console.log({params: recipeId.params})
    console.log({recipeId: recipeId.recipeId})
    return(
        <div className="edit-buttons-container">
            <button>
                <img className="edit-button" src={deleteIcon} onClick={() => {}}></img>
            </button>
            <button>
                <img src={shareIcon} onClick={() => {}}></img>
            </button>
            <button>
                <img src={editIcon} onClick={() => {navigate(`/edit/${recipeId.recipeId}`)}}></img>
            </button>
        </div>
    )
}