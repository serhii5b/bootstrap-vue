<template>
  <b-container>
    <b-row align-v="center">
        <job-card 
        	v-for="job in displayJobs" 
        	:key="job.id"
        	:name="job.name"
          :id="job.id"></job-card>
    </b-row>
     <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(currentPage)"
    ></b-pagination>
  </b-container>
</template>

<script>
// @ is an alias to /src
import JobCard from "@/components/JobCard";
import {mapGetters} from 'vuex';

export default { 
  name: "Home",
  data(){
  	return {
  		currentPage: 1,
  		perPage: 3
  	}
  },
  components: {
    JobCard
  },
  computed: {
    ...mapGetters(['jobs', 'displayJobs', 'rows'])
  },
  methods: {
  	async fetchData(){
      await this.$store.dispatch('fetchJobs');
  	},
  	paginate(currentPage){
      this.$store.dispatch('paginate', {currentPage, perPage: this.perPage});
  	}
  },
  mounted(){
  	this.fetchData();
  }
};
</script>
