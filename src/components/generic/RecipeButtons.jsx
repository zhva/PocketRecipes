import { React, useState } from 'react'
import deleteIcon from '../../icons/deleteIcon.svg'
import shareIcon from '../../icons/shareIcon.svg'
import editIcon from '../../icons/editIcon.svg'
import saveIcon from '../../icons/saveIcon.svg'
import { useNavigate } from 'react-router-dom'
import { ref, remove, push, set} from 'firebase/database'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, database } from '../../firebase'
import { DeleteConfirmationPopup } from './DeleteConfirmationPopup'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Popup } from './Popup'
import clipboardCopy from 'clipboard-copy'

export const RecipeButtons = ({recipeId, path}) => {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const [showPopup, setShowPopup] = useState(false)
    const recipeFeedRef = ref(database, `feed/recipes/${recipeId}`)
    const recipeRef = user?.uid ? ref(database, `users/${user.uid}/recipes/${recipeId}`) : null
    const [recipe, loading] = useObjectVal(recipeRef)
    const [recipeFeed, loadingFeed] = useObjectVal(recipeFeedRef)
    const [showSavePopup, setShowSavePopup] = useState(false)
    const [showSharePopup, setShowSharePopup] = useState(false)


    const deleteRecipeFromDB = () => {

        remove(recipeRef)
            .then(() => {
                navigate('/my-recipes')
            })
            .catch((error) => {
                alert(`An error occurred while deleteing the recipe: ${error}`)
            })
    }

    const handleSave = async () => {
        const newRecipeRef = user?.uid ? ref(database, `users/${user.uid}/recipes`) : null

        if(!loadingFeed && recipeFeed) {
            const recipeData = {
                imageLink: recipeFeed.imageLink,
                timestamp: new Date().getTime(),
                values: {
                    ...recipeFeed.values,
                    visibility: false
                }
            }

            try {
                await push(newRecipeRef, recipeData)
            } catch (error) {
                alert(`An error occurred while saving the recipe to your recipe list: ${error}`)
            }
            setShowSavePopup(true)
        }
    }

    const handleDelete = () => {
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
    }

    const handleCloseSavePopup = () => {
        setShowSavePopup(false)
    }

    const handleShare = async () => {
        let shareRecipeId = recipeId
        let url = window.location.href

        // if the recipe is from 'my-recipes' path then save it to the shared in Firebase
        if(path === 'my-recipes') {
            const sharedRecipesRef = ref(database, `shared/recipes`)
            const newSharedRecipeRef = push(sharedRecipesRef)
            shareRecipeId = newSharedRecipeRef.key

            if(!loading && recipe) {
                const recipeData = {
                    imageLink: recipe.imageLink,
                    timestamp: new Date().getTime(),
                    values: {
                        ...recipe.values
                    }
                }

                try {
                    await set(newSharedRecipeRef, recipeData)
                } catch (error) {
                    alert(`An error occurred while sharing the recipe: ${error}`)
                }
            }
                    // create shareable URL
            url = window.location.origin + '/share/' + shareRecipeId
        }

        // copy URL to clipboard
        clipboardCopy(url)

        // display the share popup
        setShowSharePopup(true)
    }

    const handleCloseSharePopup = () => {
        setShowSharePopup(false)
    }


    return(
        <>
        {showPopup &&
            <DeleteConfirmationPopup
                title='Delete Recipe'
                onClick={deleteRecipeFromDB}
                onClose={handleClosePopup}>
                    Do you really want to delete this recipe?
            </DeleteConfirmationPopup>
        }
        {showSavePopup &&
            <Popup
                title='Recipe Saved'
                linkText='Go to My Recipes'
                redirectLink='/my-recipes'
                linkText2='Go to Discover recipes'
                redirectLink2='/feed'
                onClose={handleCloseSavePopup}>
                    The recipe has been saved to your recipes.
            </Popup>
        }
        {showSharePopup &&
            <Popup
                title='Share Recipe'
                linkText='Go to My Recipes'
                redirectLink='/my-recipes'
                linkText2='Go to Discover recipes'
                redirectLink2='/feed'
                onClose={handleCloseSharePopup}>
                    The link has been copied to your clipboard. You are now able to share the recipe link.
            </Popup>
        }
        <div className={`edit-buttons-container ${path === 'feed' ? 'feed-buttons-container' : ''}`}>
            {path === 'my-recipes' && (
                <button
                    type='button'
                    className='recipe-delete'
                    onClick={handleDelete}>
                    <img src={deleteIcon} alt='Delete'></img>
                </button>
            )}
            {path === 'feed' && user &&(
                <button
                    type='button'
                    className='recipe-save'
                    onClick={handleSave}>
                    <img src={saveIcon} alt='Save to my recipes'></img>
                </button>
            )}
            {path !== 'share' && (
                <button
                    type='button'
                    className="share-button"
                    onClick={handleShare}>
                    <img src={shareIcon} alt="Share"></img>
                </button>
            )}
            {path === 'my-recipes' && (
                <button
                    type='button'
                    className="edit-button"
                    onClick={() => {navigate(`/edit/${recipeId}`)}}>
                    <img src={editIcon} alt='Edit'></img>
                </button>
            )}
        </div>
        </>

    )
}
