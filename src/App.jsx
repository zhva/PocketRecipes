import './App.scss'
import React from 'react'
import { NavBar } from './components/generic/NavigationBar2'
import { Routes, Route } from 'react-router-dom'
import { StartingPage } from './components/application/StartingPage'
import { Login } from './components/application/Login'
import { Signup } from './components/application/Signup'
import { CreateRecipe } from './components/application/CreateRecipe'
import { Recipe } from './components/application/Recipe'
import { HomeFeed } from './components/application/HomeFeed'
import { MyRecipes } from './components/application/MyRecipes'
import { ProtectedRoute } from './components/generic/ProtectedRoute'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'


function App() {
  const [user, loading] = useAuthState(auth)

  if(!loading) {
    return (
      <div className="App">
      <NavBar
        startingPageRoute = {'/'}
        myRecipesRoute = {'/my-recipes'}
        feedRoute = {'/feed'}
        newRecipeRoute = {'/create-recipe'}
        createAccountRoute = {'/signup'}
        user={user}/>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feed/:recipeId" element={<Recipe />}/>
        <Route path="/feed" element={<HomeFeed />} />
        <Route path="/create-recipe" element={
          <ProtectedRoute isAllowed={user}>
            <CreateRecipe />
          </ProtectedRoute>
          }/>
        <Route path="/my-recipes/:recipeId" element={
          <ProtectedRoute isAllowed={user}>
            <Recipe />
          </ProtectedRoute>
          }/>
        <Route path="/my-recipes" element={
          <ProtectedRoute isAllowed={user}>
            <MyRecipes />
          </ProtectedRoute>
        }/>
        <Route path="/edit/:recipeId" element={
          <ProtectedRoute isAllowed={user}>
            <CreateRecipe />
          </ProtectedRoute>
        }/>
        <Route path="/share/:recipeId" element={<Recipe />} />
      </Routes>
      </div>
    )
  } else {
    return <div className='loading'>Loading...</div>
  }
}

export default  App
