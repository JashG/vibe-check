import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route } from "react-router-dom";
import { rootReducer } from './store/reducers/index';
import Profile from './components/Profile';
import Home from './components/Home';
import Recommendations from './components/Recommendations';

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {

  return (
    <Provider store={store}>
      <Switch>
        <Route path="/profile-test" component={Profile}/>
        <Route path="/profile/:accessToken/:refreshToken" component={Profile}/>
        <Route path="/recommendations" component={Recommendations}/>
        <Route path="/error/:msg">
          <div>Error!</div>
        </Route>
        <Route path="/" component={Home}/>
      </Switch>
    </Provider>
  );
}

export default App;
