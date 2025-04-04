// import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from "./Pages/Layout.tsx";
import Home from "./Pages/Home";
import Chart from "./Pages/Chart.tsx";
import Model from "./Pages/Model.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/model" element={<Model/>}/>
            <Route path="/chart" element={<Chart/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
