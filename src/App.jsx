import './App.scss'
import React from 'react'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { StartingPage } from './components/StartingPage'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { CreateRecipe } from './components/CreateRecipe'
import { MyRecipes } from './components/MyRecipes'
import { HomeFeed } from './components/HomeFeed'
import { RecipeButtons } from './components/RecipeButtons'
import { Recipe } from './components/Recipe'



function App () {
  const navigate = useNavigate()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/feed" element={<HomeFeed/>} />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route path="/my-recipes" element={<MyRecipes/>} />
        <Route path="/recipeButtons" element={<RecipeButtons/>} />
        <Route path="/recipe" element={<Recipe/>} />
      </Routes>
      <NavigationBar
        redirectToStartingPage = {() => navigate('/')}
        redirectToMyRecipes = {() => navigate('/my-recipes')}
        redirectToFeed = {() => navigate('/feed')}
        redirectToNewRecipe = {() => navigate('/create-recipe')}/>
    </div>
  )
}

export default App
