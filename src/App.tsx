import * as React from 'react'
import { Provider } from 'react-redux'
import Main from './containers/Dictionary'
import configureStore from './store/configureStore'

const store = configureStore()

const Welcome: React.SFC<any> = (props) => {
    return (
         <Provider store={store}>
            <Main/>
         </Provider>
    );
}

export default Welcome