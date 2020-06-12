import { createStore } from 'redux';
import { rootReducer } from '../store/reducers/index';

const store = createStore(rootReducer);

export default store;