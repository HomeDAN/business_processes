import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        scripts: [],
        questions: [],
        answerStatuses: [],
        answers: []
    },
    getters: {
        scriptsList (state) {
            return state.scripts;
        },
        answerStatusesList (state) {
            return state.answerStatuses;
        },
        answersList (state) {
            return state.answers;
        },
    },
    mutations: {
        setScriptsList (state, scripts) {
            state.scripts = scripts;
        },
        addItemScripts (state, script) {
            state.scripts.push(script);
        },
        setAnswerStatuses (state, answerStatuses) {
            state.answerStatuses = answerStatuses;
        },
        setAnswersList (state, answers) {
            state.answers = answers;
        },
    },
    actions: {
        /* getters */
        async getScripts (context) {
            try {
                const scripts = await axios.get('http://localhost:3000/scripts');
                context.commit('setScriptsList', scripts.data);
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async getAnswerStatuses (context) {
            try {
                const statuses = await axios.get('http://localhost:3000/answer_statuses');
                context.commit('setAnswerStatuses', statuses.data);
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async getAnswers (context) {
            try {
                const answers = await axios.get('http://localhost:3000/answers');
                context.commit('setAnswersList', answers.data);
            } catch (error) {
                console.error(error);
                return error;
            }
        },

        async getScriptById (context, id) {
            return axios.get('http://localhost:3000/scripts/?id=' + id);
        },
        async getQuestionById (context, id) {
            return axios.get('http://localhost:3000/questions/?id=' + id);
        },
        async getAnswerById (context, id) {
            return axios.get('http://localhost:3000/answers/?id=' + id);
        },

        /* creators */
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
        async createAnswer (context, data) {
            return axios.post('http://localhost:3000/answers', data);
        },

        /* updaters */
        async updateQuestion (context, data) {
            return axios.patch('http://localhost:3000/questions/' + data.id, data.data);
        },
        async updateAnswer (context, data) {
            return axios.patch('http://localhost:3000/answers/' + data.id, data.data);
        }
    }
});
