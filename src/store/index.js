import Vue from "vue";
import Vuex from "vuex";

import initialState from "../assets/data.json";
import {createUniqueId, generateCurrentTimestamp} from "../utils";

Vue.use(vuex);

const initialTodos = initialState.todos.map((todos) =>
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
getters:{},
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

    ADD_TODO(state, previousToDo)
    {
        const todos = [...state.todos];
        const index =  todos.findIndex((todo) => todo.id === previousTodo.id);
        const headEnd = [...todos].slice(0, index + 1);
        const tailEnd = [...todos].slice(0, index + 1);
        const newTodo = {
            id: createUniqueId();
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

        todo.splice(index, 1);
        state.todos = todos;
    },
},
actions:
{
    addToDo({commit}, previousToDo)
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
modules:{},


})


)