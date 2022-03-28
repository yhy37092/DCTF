import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import './i18n'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/easymde/dist/easymde.min'
import '../node_modules/easymde/dist/easymde.min.css'

import App from './App'
import configureStore from './store/configureStore'

let {store, persistor} = configureStore()

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
)
