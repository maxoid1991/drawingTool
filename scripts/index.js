import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from "react-redux";


import { store } from "./store/store";
import { updateStore } from './actionCreators/actionCreator';
import DrawTool from './components/app';


const App = () => (
    <Provider store={store}>
        <DrawTool />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

