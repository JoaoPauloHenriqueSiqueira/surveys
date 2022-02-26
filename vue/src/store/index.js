import { createStore } from "vuex"
import axiosClient from "../axios"

const tmpSurveys = [
    {
        id: 1,
        title: "dddd de titulo para a aula",
        slug: "exemplo-de-titulo-para-a-aula",
        status: "draft",
        image: "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
        description: "adsadasd",
        created_at: "2022-12-28",
        updated_at: "2022-12-28",
        expire_date: "2022-12-28",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From wich country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "asdjiasodjiaasdasdasdasdaas", text: "USA"
                        },
                        {
                            uuid: "asdsaddasdasasasasqwewqeqwe", text: "Georgia"
                        },
                        {
                            uuid: "asaassdccccwwwqqqqqqqweqwew", text: "India"
                        },
                    ]
                }
            },
            {
                id: 2,
                type: "checkbox",
                question: "From ?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "asdjiasodjiaasdasdasdasdaas", text: "USA"
                        },
                        {
                            uuid: "asdsaddasdasasasasqwewqeqwe", text: "Georgia"
                        },
                        {
                            uuid: "asaassdccccwwwqqqqqqqweqwew", text: "India"
                        },
                    ]
                }
            }
        ],
    },
    {
        id: 2,
        title: "ASdasdasd de titulo para a aula",
        slug: "exemplo-de-titulo-para-a-aula",
        status: "draft",
        image: "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
        description: "adsadasd",
        created_at: "2022-12-28",
        updated_at: "2022-12-28",
        expire_date: "2022-12-28",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From wich country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "asdjiasodjiaasdasdasdasdaas", text: "USA"
                        },
                        {
                            uuid: "asdsaddasdasasasasqwewqeqwe", text: "Georgia"
                        },
                        {
                            uuid: "asaassdccccwwwqqqqqqqweqwew", text: "India"
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 3,
        title: "dsdaasddasdas aasdla",
        slug: "exemplo-de-titulo-para-a-aula",
        status: "draft",
        image: "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
        description: "adsadasd",
        created_at: "2022-12-28",
        updated_at: "2022-12-28",
        expire_date: "2022-12-28",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From wich country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "asdjiasodjiaasdasdasdasdaas", text: "USA"
                        },
                        {
                            uuid: "asdsaddasdasasasasqwewqeqwe", text: "Georgia"
                        },
                        {
                            uuid: "asaassdccccwwwqqqqqqqweqwew", text: "India"
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 4,
        title: "Exempdasa",
        slug: "exemplo-de-titulo-para-a-aula",
        status: "draft",
        image: "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
        description: "adsadasd",
        created_at: "2022-12-28",
        updated_at: "2022-12-28",
        expire_date: "2022-12-28",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From wich country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "asdjiasodjiaasdasdasdasdaas", text: "USA"
                        },
                        {
                            uuid: "asdsaddasdasasasasqwewqeqwe", text: "Georgia"
                        },
                        {
                            uuid: "asaassdccccwwwqqqqqqqweqwew", text: "India"
                        },
                    ]
                }
            }
        ]
    },
    {
        id: 5,
        title: "Exemplo de titulo para a aula '1",
        slug: "exemplo-de-titulo-para-a-aula",
        status: "draft",
        image: "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
        description: "adsadasd",
        created_at: "2022-12-28",
        updated_at: "2022-12-28",
        expire_date: "2022-12-28",
        questions: [
            {
                id: 1,
                type: "select",
                question: "From wich country are you?",
                description: null,
                data: {
                    options: [
                        {
                            uuid: "asdjiasodjiaasdasdasdasdaas", text: "USA"
                        },
                        {
                            uuid: "asdsaddasdasasasasqwewqeqwe", text: "Georgia"
                        },
                        {
                            uuid: "asaassdccccwwwqqqqqqqweqwew", text: "India"
                        },
                    ]
                }
            }
        ]
    }
];

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
        surveys: [...tmpSurveys],
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
    },
    modules: {}
})

export default store;