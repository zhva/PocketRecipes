import { React } from 'react'
import deleteIcon from '../icons/deleteIcon.svg'
import shareIcon from '../icons/shareIcon.svg'
import editIcon from '../icons/editIcon.svg'
import { useNavigate } from 'react-router-dom'
import { ref, remove } from 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../firebase'

export const RecipeButtons = (recipeId) => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)

    const deleteRecipe = () => {
        const recipeRef = ref(database, `users/${user?.uid}/recipes/${recipeId.recipeId}`)
        remove(recipeRef)
            .then(() => {
                navigate('/my-recipes')
            })
            .catch((error) => {
                console.error('Error deleting recipe:', error)
            })

    }
    return(
        <div className="edit-buttons-container">
            <button onClick={() => {deleteRecipe()}}>
                <img src={deleteIcon}></img>
            </button>
            <button>
                <img src={shareIcon} onClick={() => {}}></img>
            </button>
            <button onClick={() => {navigate(`/edit/${recipeId.recipeId}`)}}>
                <img className="edit-button" src={editIcon}></img>
            </button>
        </div>
    )
}
