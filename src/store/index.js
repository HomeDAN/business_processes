import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        scripts: [],
        questions: []
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
        async getQuestionById (context, id) {
            try {
                return axios.get('http://localhost:3000/questions/?id=' + id);
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
        },
        async updateQuestion (context, data) {
            try {
                await axios.patch('http://localhost:3000/questions/' + data.id, data.data);
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
});
