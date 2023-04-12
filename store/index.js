import {createWrapper} from "next-redux-wrapper";
import {applyMiddleware, createStore} from "redux";
import {reducer} from "./reducers/index";
import thunk from "redux-thunk";

const makeStore = (context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper(makeStore, {debug: true});