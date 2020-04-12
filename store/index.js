import Vue from 'vue'
import Vuex from 'vuex'
import card from './modules/card.js'
import path from './modules/path.js'
import user from './modules/user.js'

Vue.use(Vuex)
export default new Vuex.Store({
	modules:{
		card,
		path,
		user
	}
})