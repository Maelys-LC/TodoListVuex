import Vuex from 'vuex'
import Vue from 'vue'
import 'es6-promise/auto'

Vue.use(Vuex)



export default new Vuex.Store ({
    state: {
        todo: []
    },
    mutations: {
        ADD(state, element) {            
           state.todo.push(element);           
        },
        PUT(state, id) {
            for (let element of state.todo) {
                if (element.id === id) {
                    element.todo = !element.todo
                }
            }
        },
        DELETE(state, id) {
            for (let element of state.todo) {
                if (element.id === id) {
                    let index = state.todo.indexOf(element);
                    state.todo.splice(index, 1);
                }
            }
        },
        UPDATE(state, value) {
            state.todo = value;
        }
    },
    actions: {
        ADD(context, element) {
            if (element.name && element.author && element.id >= 0 && element.createdAt && element.todo === true || element.todo === false) {
                context.commit("ADD", element)
            }            
        },
        PUT(context, id) {
            context.commit("PUT", id)
        },
        DELETE(context, id) {
            context.commit("DELETE", id)
        },
        UPDATE(context, value) {
            context.commit("UPDATE", value)
        }
    },
    getters: {
        todoFiltered(state) {
            return function(whatToDisplay) {
                if (whatToDisplay === "done") {
                    return state.todo.filter(element => !element.todo)
                } else if (whatToDisplay === "todo") {
                    return state.todo.filter(element => element.todo)
                } else if (whatToDisplay === "all") {
                    return state.todo;
                }
            }
        }      
    }
})