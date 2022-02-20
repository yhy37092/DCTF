import React from 'react'
import {Route, Routes} from 'react-router-dom'
import {Container, Stack} from 'react-bootstrap'
import {Drizzle, generateStore} from '@drizzle/store'
import {DrizzleContext} from '@drizzle/react-plugin'

import options from './drizzle/drizzleOptions'
import Home from './containers/Home'
import SystemAdmin from './containers/SystemAdmin'
import ContestAdmin from './containers/ContestAdmin'
import Contest from './containers/Contest'
import NoMatch from './components/NoMatch'
import Review from './containers/Review'
import {Default} from './components/Navbars'

import './App.css'

const drizzleStore = generateStore(options)
const drizzle = new Drizzle(options, drizzleStore)

function App() {

    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const {drizzle, drizzleState, initialized} = drizzleContext

                    if (!initialized) return <p>Loading...</p>

                    return (
                        <Container>
                            <Stack gap={4}>
                                <Default/>
                                <Routes>
                                    <Route exact path='/' element={<Home/>}/>
                                    <Route path='SystemAdmin/*' element={<SystemAdmin drizzle={drizzle}
                                                                                    drizzleState={drizzleState}/>}/>
                                    <Route path='ContestAdmin/*' element={<ContestAdmin drizzle={drizzle}
                                                                                        drizzleState={drizzleState}/>}/>
                                    <Route path='Contests/*'
                                           element={<Contest drizzle={drizzle} drizzleState={drizzleState}/>}/>
                                    <Route path='Review/*'
                                           element={<Review drizzle={drizzle} drizzleState={drizzleState}/>}/>
                                    <Route path='*' element={<NoMatch />} />
                                </Routes>
                            </Stack>
                        </Container>
                    )
                }}
            </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    )
}

export default App