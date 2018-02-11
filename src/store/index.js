import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import http from '../axios'

import Local from '@/assets/script/local.js'

Vue.use(Vuex)

// 定义一个容器

let store = new Vuex.Store({
    state: {
      headLine:Local.fetch("headline").data,//头条
      fashion:Local.fetch("fashion").data,//时尚
      leavePosition:0//列表离开时的位置
    },
    mutations: {
      postHeadLine(state, data){
        state.headLine = data;
      },
      postFashion(state, data){
         state.fashion = data;
      },
      postPostion(state, data){
         state.leavePosition = data;
      }
    },
    actions: {
      headLineAction({commit}){
        http.get("headline").then((response)=>{
          commit("postHeadLine",response.data.news)
          Local.save("headline",{"data":response.data.news})
        }).catch((error)=>{
          console.log(error)
        })
        
      },
      fashionAction({commit}){
        http.get("fashion").then((response)=>{
          commit("postFashion",response.data.news)
          Local.save("fashion",{"data":response.data.news})
        }).catch((error)=>{
          console.log(error)
        })
        
      }
    }
})

export default store

