import Vue from "vue";
import Vuex from "vuex";

import initialState from "../assets/data.json";
import {createUniqueId, generateCurrentTimestamp} from "../utils";

Vue.use(Vuex);

//From data.json
const initialTodos = initialState.todos.map((todo) =>
{
    return {
        ...todo,
        id: createUniqueId(),
        created: generateCurrentTimestamp(),
    };
});

export default new Vuex.Store({
state: {
    ...initialState,
    todos: initialTodos,
},
/*Normally used when multiple components need to 
derive state based on stored state*/
getters:{},

//Used when state changes in Vuex Store
mutations : {
    UPDATE_TODO(state, updatedTodo)
    {
        const todos = [...state.todos];
        const index = todos.findIndex((todo) =>
            todo.id === updatedTodo.id);
        todos[index] = 
        {
            /*Spread syntax, takes iterable(arrays), 
             expands it into individual elements*/
            ...todos[index],
            ...updatedTodo, 
            lastUpdated: generateCurrentTimestamp(),
        };
        state.todos = todos;
    },

    ADD_TODO(state, previousTodo)
    {
        const todos = [...state.todos];
        const index =  todos.findIndex((todo) => todo.id === previousTodo.id);
        const headEnd = [...todos].slice(0, index + 1);
        const tailEnd = [...todos].slice(0, index + 1);
        const newTodo = {
            id: createUniqueId(),
            title : "",
            done: false,
            created: generateCurrentTimestamp(),
            lastUpdated: "--",
        };
        state.todos = [...headEnd, newTodo,...tailEnd];

    },
    DELETE_TODO(state, todoToBeDeleted)
    {
        const todos = [...state.todos];
        const index = todos.findIndex((todo) => todo.id === todoToBeDeleted.id);

        todos.splice(index, 1);
        state.todos = todos;
    },
},
//Actions commit mutations, commits keyword commits mutation, which changes state
actions:
{
    addTodo({commit}, previousTodo)
    {
        commit("ADD_TODO", previousTodo);
    },
    deleteTodo({ commit }, todoToBeDeleted) 
    {
        commit("DELETE_TODO", todoToBeDeleted);
    },
      updateTodo({ commit }, updatedTodo) 
      {
        commit("UPDATE_TODO", updatedTodo);
      },
},

//Store can be divided into modules, if required,
//scaling application
modules:{},


})


