import './App.scss'
import React from 'react'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { StartingPage } from './components/StartingPage'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { CreateRecipe } from './components/CreateRecipe'
import { Recipe } from './components/Recipe'
import { HomeFeed } from './components/HomeFeed'
import { MyRecipes } from './components/MyRecipes'


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
        <Route path="/my-recipes/:recipeId" element={<Recipe></Recipe>} />
        <Route path="/my-recipes/" element={<MyRecipes></MyRecipes>} />
        <Route path="/edit/:recipeId" element={<CreateRecipe/>} />
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
