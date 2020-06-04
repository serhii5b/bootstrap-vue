import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: [],
  	displayJobs: [],
  	currentPage: 1,
  	rows: 1,
    showSpinner: false
  },


  mutations: {
  	setJobs(state, jobs){
  		state.jobs = jobs
  	},
  	setRows(state, rows){
  		state.rows = rows
  	},
  	setDisplayJobs(state, displayJobs){
  		state.displayJobs = displayJobs
  	},

    setSpinner(state, spinner){
      state.showSpinner = spinner
    },
  },


  actions: {
  	async fetchData({commit}){
      commit('setSpinner', true);
  		return new Promise(resolve => {
  			setTimeout(async () => {
  				const res = await fetch('jobs.json');
  				const val = res.json();
  				resolve(val);
          commit('setSpinner', false);
  			}, 1000);
  		});
  	},
  	async fetchJobs({dispatch, commit}){
  		const myJson = await dispatch('fetchData');
  		commit('setJobs', myJson);
      commit('setRows', myJson.length);
      const displayJobs = myJson.slice(0, 3);
      commit('setDisplayJobs', displayJobs);
  		// commit('setRows', myJson.length);
  	},

    async paginate({commit, state}, {currentPage, perPage}){
      const start = (currentPage - 1) * perPage;
      const jobs = state.jobs.slice(start, start + 3);
      commit('setDisplayJobs', jobs);
    },
    updatePagination({commit, dispatch}, {myJson, currentPage, perPage}){
      commit('setJobs', myJson);
      commit('setRows', myJson.length);
      dispatch('paginate', {currentPage, perPage});
    },

    async search({dispatch}, {text}){
      const myJson = await this.dispatch('fetchData');
      const values = myJson.filter(val => 
        val.name.toLowerCase().includes(text.toLowerCase()));
      dispatch('updatePagination', {
        myJson: values, 
        currentPage: 1, 
        perPage: 3
      });
    }
  },


  getters: {
  	jobs(state){
  		return state.jobs
  	},
  	rows(state){
  		return state.rows
  	},
  	displayJobs(state){
  		return state.displayJobs
  	},
    showSpinner(state){
      return state.showSpinner
    }
  }
});
