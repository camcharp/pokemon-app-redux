import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

// redux
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

// components
import App from './App';
import Home from './pages/Home';
import Favourites from './pages/Favourites';

// others
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
			<Route exact path="/" component={Home} />
			<Route exact path="/fav" component={Favourites} />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
