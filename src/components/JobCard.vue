<template>
	<div>
		<b-col>
	    	<b-card 
	    		:title="name"
	    		img-src="https://picsum.photos/600/300/?image=25"
	    		img-alt=""
	    		img-top
	    		tag="article"
	    		style="max-width: 20rem;"
	    		class="mb-2"
	    		footer="Card Footer">
	    		<b-card-text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, unde.</b-card-text>
	    		<b-button 
	    			variant="primary" 
	    			v-b-tooltip.hover 
	    			title="Apply here"
	    			v-b-modal="modalId"
	    			>Apply</b-button>

	    		<b-modal :id="modalId" title="Apply here info">
	    			<p class="my-4">Its modal {{ id }}</p>
	    		</b-modal>
	    	</b-card>
	    </b-col>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	props: ['name', 'id'],
	computed: {
		modalId(){
			return `modal-${this.id}`;
		}
	}
}

</script>
