import { React, useState } from 'react'
import deleteIcon from '../../icons/deleteIcon.svg'
import shareIcon from '../../icons/shareIcon.svg'
import editIcon from '../../icons/editIcon.svg'
import saveIcon from '../../icons/saveIcon.svg'
import { useNavigate } from 'react-router-dom'
import { ref, remove, push } from 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { DeleteConfirmationPopup } from './DeleteConfirmationPopup'
import { useObjectVal } from 'react-firebase-hooks/database'

export const RecipeButtons = ({recipeId, path}) => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const [showPopup, setShowPopup] = useState(false)
    const recipeFeedRef = ref(database, `feed/recipes/${recipeId}`)
    const [recipe, loading] = useObjectVal(recipeFeedRef)

    const deleteRecipeFromDB = () => {
        const recipeRef = ref(database, `users/${user?.uid}/recipes/${recipeId}`)
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

    const handleSave = async () => {
        const recipesRef = user?.uid ? ref(database, `users/${user.uid}/recipes`) : null

        if(!loading && recipe) {
            const recipeData = {
                imageLink: recipe.imageLink,
                timestamp: new Date().getTime(),
                values: {
                    ...recipe.values,
                    visibility: false
                }
            }
            console.log({recipeData})

            try {
                await push(recipesRef, recipeData)

            } catch (error) {
                console.log(error)
            }
        }

    }

    return(
        <div className={`edit-buttons-container ${path === 'feed' ? 'feed-buttons-container' : ''}`}>
            {showPopup &&
                <DeleteConfirmationPopup
                    title="Confirm Delete"
                    onClick={deleteRecipeFromDB}
                    onClose={handleClosePopup}>
                        Do you really want to delete this recipe?
                </DeleteConfirmationPopup>}
            {path === 'my-recipes' && (
                <button type="button" className='recipe-delete' onClick={handleDelete}>
                    <img src={deleteIcon} alt="Delete"></img>
                </button>
            )}
            {path === 'feed' && (
                <button type="button" className='recipe-save' onClick={handleSave}>
                    <img src={saveIcon} alt="Save to my recipes"></img>
                </button>
            )}
            <button type="button" onClick={() => {}}>
                <img src={shareIcon} alt="Share"></img>
            </button>
            {path === 'my-recipes' && (
                <button type="button" className="edit-button" onClick={() => {navigate(`/edit/${recipeId}`)}}>
                    <img src={editIcon} alt="Edit"></img>
                </button>
            )}
        </div>

    )
}
