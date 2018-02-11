<template>
  <div id="app">
  	<transition mode="in-out" :name="names">
  			<router-view></router-view>
  	</transition>
  </div>
</template>

<script>
import http from './axios'
import {css} from '@/assets/script/m.Tween.js'

export default {
  name: 'app',
  watch:{
  	$route(to,from){
  		if(to.name=='Article' || to.name=='User'){
  			this.names="right"
  		}
  		if(to.name=="Home"){
  			this.names="left"
  		}
  	}
  },
  data(){
  	return{
  		names:"right"
  	}
  },
  created(){
  	this.$common.preventDefault()
  	this.$common.basicRem(15)
  }
}
</script>
