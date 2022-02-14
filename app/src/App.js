import React from 'react';
import {Drizzle, generateStore} from "@drizzle/store";
import {DrizzleContext} from "@drizzle/react-plugin";

import Banner from "./components/Navbar/HeaderBar";
import Route from "./components/router/route";
import "./App.css"

import options from "./drizzle/drizzleOptions";

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

function App() {

    return (
        <DrizzleContext.Provider drizzle={drizzle}>
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const {drizzle, drizzleState, initialized} = drizzleContext;

                    if (!initialized) return <p>Loading...</p>;

                    return (
                        <>
                            <Banner/>
                            <Route drizzle={drizzle} drizzleState={drizzleState}/>
                        </>
                    )
                }}
            </DrizzleContext.Consumer>
        </DrizzleContext.Provider>
    );
}

export default App;
