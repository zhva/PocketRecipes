import './App.scss'
import React from 'react'
import { NavigationBar } from './components/NavigationBar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { StartingPage } from './components/StartingPage'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { CreateRecipe } from './components/CreateRecipe'

function App () {
  const navigate = useNavigate()
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/feed" element={''} />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route path="/my-recipes" element={''} />
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
