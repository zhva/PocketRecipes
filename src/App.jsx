import './App.scss'
import React from 'react'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route } from 'react-router-dom'
import { StartingPage } from './components/StartingPage'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { CreateRecipe } from './components/CreateRecipe'
import { Recipe } from './components/Recipe'
import { HomeFeed } from './components/HomeFeed'
import { MyRecipes } from './components/MyRecipes'
import { Popup } from './components/Popup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'


function App () {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/feed" element={<HomeFeed/>} />
        {user && (
          <>
            <Route path="/create-recipe" element={<CreateRecipe/>} />
            <Route path="/my-recipes/:recipeId" element={<Recipe></Recipe>} />
            <Route path="/my-recipes" element={<MyRecipes></MyRecipes>} />
          </>
        )}
        {!user && (
          <>
            <Route path="/create-recipe" element={
              <Popup
                title={'Create an account'}
                linkText={'Back to the Login page'}
                linkText2={'Don\'t have an account yet?'}>
              {'In order to use this functionality please Log in or create an account if you haven\'t done so to get full access to all features.'}
            </Popup>
            } />
            <Route path="/my-recipes/:recipeId" element={
              <Popup
                title={'Create an account'}
                linkText={'Back to the Login page'}
                linkText2={'Don\'t have an account yet?'}>
              {'In order to use this functionality please Log in or create an account if you haven\'t done so to get full access to all features.'}
            </Popup>
            } />
            <Route path="/my-recipes" element={
              <Popup
                title={'Create an account'}
                linkText={'Back to the Login page'}
                linkText2={'Don\'t have an account yet?'}>
              {'In order to use this functionality please Log in or create an account if you haven\'t done so to get full access to all features.'}
            </Popup>
            } />
          </>
        )}
        <Route path="/edit/:recipeId" element={<CreateRecipe/>} />
      </Routes>
      <NavigationBar
        startingPageRoute = {'/'}
        myRecipesRoute = {'/my-recipes'}
        feedRoute = {'/feed'}
        newRecipeRoute = {'/create-recipe'}/>
    </div>
  )
}

export default App
