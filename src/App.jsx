import './App.scss'
import React from 'react'
import { NavigationBar } from './components/generic/NavigationBar'
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
  const [user] = useAuthState(auth)

  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<StartingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
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
    </Routes>
      <NavigationBar
        startingPageRoute={'/'}
        myRecipesRoute={'/my-recipes'}
        feedRoute={'/feed'}
        newRecipeRoute={'/create-recipe'}
      />
    </div>
  )
}

export default  App
