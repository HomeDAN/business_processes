import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        scripts: [],
        currentScriptId: 0,
        questions: [],
        questionsInCurrentScript: [],
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
        currentScriptId (state) {
            return state.currentScriptId;
        },
        questionsInCurrentScript (state) {
            return state.questionsInCurrentScript;
        }
    },
    mutations: {
        setScriptsList (state, scripts) {
            state.scripts = scripts;
        },
        addItemScripts (state, script) {
            state.scripts.push(script);
        },
        addQuestion (state, question) {
            state.questions.push(question);
        },
        setAnswerStatuses (state, answerStatuses) {
            state.answerStatuses = answerStatuses;
        },
        addAnswerStatus (state, status) {
            state.answerStatuses.push(status);
        },
        setAnswersList (state, answers) {
            state.answers = answers;
        },
        setCurrentScriptId (state, id) {
            state.currentScriptId = id;
        },
        setQuestionsInCurrentScriptInState (state, questions) {
            state.questionsInCurrentScript = questions;
        }
    },
    actions: {
        /* creators */
        async createScript (context, name) {
            try {
                const scriptData = {name: name, questions: []};
                let script = await axios.post('http://localhost:3000/scripts', scriptData);
                context.commit('addItemScripts', script.data);
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async createQuestion (context, data) {
            try {
                let script = await axios.post('http://localhost:3000/questions', data);
                context.commit('addQuestion', script.data);

                return script;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async createAnswer (context, data) {
            return axios.post('http://localhost:3000/answers', data);
        },
        async createAnswerStatus (context, data) {
            try {
                let created = await axios.post('http://localhost:3000/answer_statuses', data);
                context.commit('addAnswerStatus', created.data);

                return created.status;
            } catch (error) {
                console.error(error);
                return error;
            }
        },

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
        async getAnswersOfQuestionById (context, id) {
            try {
                let answer = {};
                let answers = [];

                let question = await axios.get('http://localhost:3000/questions/?id=' + id);

                for (let answerId of question.data[0].answers) {
                    answer = await axios.get('http://localhost:3000/answers/?id=' + answerId);
                    answers.push(answer.data[0]);
                }

                return answers;
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
        async getAnswerStatysById (context, id) {
            return axios.get('http://localhost:3000/answer_statuses/?id=' + id);
        },

        /* updaters */
        async updateScript (context, data) {
            return axios.patch('http://localhost:3000/scripts/' + data.id, data.data);
        },
        async updateQuestion (context, data) {
            return axios.patch('http://localhost:3000/questions/' + data.id, data.data);
        },
        async updateAnswer (context, data) {
            return axios.patch('http://localhost:3000/answers/' + data.id, data.data);
        },
        async updateAnswerStatus (context, data) {
            return axios.patch('http://localhost:3000/answer_statuses/' + data.id, data.data);
        },

        /* setters */
        setCurrentScriptId (context, id) {
            context.commit('setCurrentScriptId', id);
        },
        // todo this._actions переписать, как-то нужно по другому обращаться к экшонам. нужно узнать как.
        async setQuestionsInCurrentScript (context) {
            let script = await this._actions.getScriptById[0](this.getters.currentScriptId);
            let curScript = script.data[0];

            let question = {};
            let questions = [];

            for (let questionId of curScript.questions) {
                question = await this._actions.getQuestionById[0](questionId);
                questions.push(question.data[0]);
            }

            context.commit('setQuestionsInCurrentScriptInState', questions);
        }
    }
});
