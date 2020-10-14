import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        scripts: []
    },
    getters: {
        scriptsList (state) {
            return state.scripts;
        }
    },
    mutations: {
        setScriptsList (state, scripts) {
            state.scripts = scripts;
        },
        addItemScripts (state, script) {
            state.scripts.push(script);
        }
    },
    actions: {
        async getScripts (context) {
            try {
                const scripts = await axios.get('http://localhost:3000/scripts');
                context.commit('setScriptsList', scripts.data);
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async getScriptById (context, id) {
            try {
                return axios.get('http://localhost:3000/scripts/?id=' + id);
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async getStepById (context, id) {
            try {
                return axios.get('http://localhost:3000/steps/?id=' + id);
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async createScript (context, name) {
            try {
                const script = {name: name};

                await axios.post('http://localhost:3000/scripts', script);

                context.commit('addItemScripts', script);
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
});
