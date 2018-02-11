import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/pages/home'
import Article from '@/pages/article'
import User from '@/pages/user'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '',
		name: 'Home',
		component: Home
	}, {
		path: '/article/:artId',
		name: 'Article',
		component: Article
	},{
		path: '/user',
		name: 'User',
		component: User
	},{
		path:"*",
		redirect: {path: '/'}
	}]
})