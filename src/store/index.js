import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)

// 创建VueX对象
const store = new Vuex.Store({
    state: {
        isshow: false,
        fontColor: false,
        Color: '#333',
        LoadingShow: false,
        LoadingTitle: '正在加载请稍后...',
        baseURL: 'http://www.blog-api.com',
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },
    mutations: {
        // 修改token，并将token存入localStorage
        changeLogin (state, user) {
            state.Authorization = user.Authorization;
            localStorage.setItem('Authorization', user.Authorization);
        },
        updateShow(state, data) {
            state.isshow = data
        },
        updatefont(state, data) {
            state.fontColor = data
            data ? state.Color = '#fff' : state.Color = '#333'
        },
        LoadingTitleChange(state, data) {
            state.LoadingTitle = data.title;
            state.LoadingShow = data.isshow;
        }
    }
})

export default store;
