import Vue from 'vue'
import App from './App.vue'

new Vue({
    el: '#app',
    render: h => h(App)
    /*
    render (createElement) {
       return createElement(App)
    },
    */
    //render: (h) => h(App)
})