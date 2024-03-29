import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Container, Stack} from 'react-bootstrap'
import {Drizzle} from '@drizzle/store'
import {drizzleReactHooks} from '@drizzle/react-plugin'
import drizzleOptions from './drizzle/drizzleOptions'
import {NavBar} from "./components";
import Home from './containers/Home'
import SystemAdmin from './containers/SystemAdmin'
import ContestAdmin from './containers/ContestAdmin'
import Contest from './containers/Contest'
import NoMatch from './components/NoMatch'

import './App.css'
import Review from "./containers/Review";

const drizzle = new Drizzle(drizzleOptions)
const {DrizzleProvider} = drizzleReactHooks

function App() {

    return (
        <Router>
            <DrizzleProvider drizzle={drizzle}>
                <drizzleReactHooks.Initializer>
                    <Container>
                        <Stack gap={4}>
                            <NavBar/>
                            <Routes>
                                <Route exact path='/' element={<Home/>}/>
                                <Route path='SystemAdmin/*' element={<SystemAdmin/>}/>
                                <Route path='ContestAdmin/*' element={<ContestAdmin/>}/>
                                <Route path='Contests/*' element={<Contest/>}/>
                                <Route path='Review/*' element={<Review/>}/>
                                <Route path='*' element={<NoMatch/>}/>
                            </Routes>
                        </Stack>
                    </Container>
                </drizzleReactHooks.Initializer>
            </DrizzleProvider>
        </Router>
    )
}

export default App