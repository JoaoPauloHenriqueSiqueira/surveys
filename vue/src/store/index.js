import { createStore } from "vuex"
import axiosClient from "../axios"

const store = createStore({
    state: {
        user: {
            token: sessionStorage.getItem("TOKEN"),
            data: {},
        },
        dashboard: {
            loading: false,
            data: {}
        },
        currentSurvey: {
            loading: false,
            data: {

            }
        },
        surveys: {
            loading: false,
            links: [],
            data: {

            }
        },
        questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
        notification: {
            show: false,
            message: null,
            type: null
        }
    },

    getters: {},
    actions: {
        getUser({ commit }) {
            
        },
        getDashboardData({ commit }) {
            commit("setDashboardLoading", true);
            return axiosClient.get(`/dashboard`)
                .then((res) => {
                    commit("setDashboardData", res.data);
                    commit("setDashboardLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setDashboardLoading", false);
                    throw err;
                });;
        },
        saveSurveyAnswer({ commit }, { surveyId, answers }) {
            return axiosClient.post(`/survey/${surveyId}/answer`, { answers });
        },
        getSurveyBySlug({ commit }, slug) {
            commit("setCurrentSurveyLoading", true);
            return axiosClient
                .get(`/survey-by-slug/${slug}`)
                .then((res) => {
                    commit("setCurrentSurvey", res.data);
                    commit("setCurrentSurveyLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentSurveyLoading", false);
                    throw err;
                });
        },
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
        getSurveys({ commit }, { url = null } = {}) {
            url = url || '/survey';
            commit("setSurveysLoading", true);
            return axiosClient.get(url)
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
        setDashboardLoading: (state, loading) => {
            state.dashboard.loading = loading;
        },
        setDashboardData: (state, data) => {
            state.dashboard.data = data;
        },
        notify: (state, { message, type }) => {
            state.notification.message = message;
            state.notification.type = type;
            state.notification.show = true;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000)
        },
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
            state.surveys.links = surveys.meta.links;
            state.surveys.data = surveys.data;
        },
    },
    modules: {}
})

export default store;