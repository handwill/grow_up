import {  defineComponent, reactive } from "vue";
// import App from "./App.vue";
// const img = require('./assets/logo.png') //eslint-disable
export default defineComponent({
    setup(){

        const state = reactive({
            name:'jocky'
        })
         
        return ()=>{
            return <div id="app">
                {/* <img src={img} alt=""/> */}
            </div>
        }
    }
})