import { createStore } from "vuex"
import axiosClient from "../axios"

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem("TOKEN"),
            data: {},
        },
        currentSurvey: {
            loading: false,
            data: {

            }
        },
        surveys: {
            loading:false,
            data:{

            }
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"]
    },

    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post(`/register`, user)
                .then(({ data }) => {
                    commit("setUser", data);
                    return data;
                })
        },
        login({ commit }, user) {
            return axiosClient.post(`/login`, user)
                .then(({ data }) => {
                    commit("setUser", data);
                    return data;
                })
        },
        logout({ commit }) {
            return axiosClient.post(`/logout`)
                .then(response => {
                    commit('logout');
                    return response;
                })
        },
        saveSurvey({ commit }, survey) {
            delete survey.image_url;

            let response;
            if (survey.id) {
                response = axiosClient
                    .put(`/survey/${survey.id}`, survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data);
                        return res;
                    })

            } else {
                response = axiosClient.post(`/survey`, survey)
                    .then((res) => {
                        commit("setCurrentSurvey", res.data);
                        return res;
                    })
            }

            return response;
        },
        getSurvey({ commit }, id) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient.get(`/survey/${id}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                })
        },
        getSurveys({ commit }) {
            commit("setSurveysLoading", true);
            return axiosClient.get(`/survey`)
                .then((res) => {
                    commit("setSurveys", res.data);
                    commit("setSurveysLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setSurveysLoading", false);
                    throw err;
                })
        },
        deleteSurvey({ }, id) {
            return axiosClient.delete(`/survey/${id}`)
                .then((res) => {
                    return res;
                })
                .catch((err) => {
                    throw err;
                })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem("TOKEN");
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem("TOKEN", userData.token);
        },
        setCurrentSurvey: (state, survey) => {
            state.currentSurvey.data = survey.data;
        },
        setCurrentSurveyLoading: (state, loading) => {
            state.currentSurvey.loading = loading;
        },
        setSurveysLoading: (state, loading) => {
            state.surveys.loading = loading;
        },
        setSurveys: (state, surveys) => {
            //debugger;
            state.surveys.data = surveys.data;
        },
    },
    modules: {}
})

export default store;