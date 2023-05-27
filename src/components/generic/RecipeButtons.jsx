import { React, useState } from 'react'
import deleteIcon from '../../icons/deleteIcon.svg'
import shareIcon from '../../icons/shareIcon.svg'
import editIcon from '../../icons/editIcon.svg'
import { useNavigate } from 'react-router-dom'
import { ref, remove } from 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { DeleteConfirmationPopup } from './DeleteConfirmationPopup'

export const RecipeButtons = (recipeId) => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const [showPopup, setShowPopup] = useState(false)

    const deleteRecipeFromDB = () => {
        const recipeRef = ref(database, `users/${user?.uid}/recipes/${recipeId.recipeId}`)
        remove(recipeRef)
            .then(() => {
                navigate('/my-recipes')
            })
            .catch((error) => {
                console.error('Error deleting recipe:', error)
            })
    }
    const handleDelete = () => {
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
    }

    return(
        <div className="edit-buttons-container">
            {showPopup &&
                <DeleteConfirmationPopup
                    title="Confirm Delete"
                    onClick={deleteRecipeFromDB}
                    onClose={handleClosePopup}>
                        Do you really want to delete this recipe?
                </DeleteConfirmationPopup>}
            <button className='recipe-delete' onClick={handleDelete}>
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
