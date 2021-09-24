<!--
Description: Called via a url. Verifies that the species exists and dispalys the infromation accordingly.

Species Data Structure:
	name 				Name of species.
	waterConsumption	Level of water consumption.
	light				Preferred light level.
	text				Description of species.
	imageSource			URL of species picture.
-->

<template>
	<div v-if="validId" class="container">
		<img :src="species.imageSource" alt="title" class="image" />
		<h1>{{ species.name }}</h1>
		<h3>
			<IconWater class="icon" /> Water Consumption:
			{{ species.waterConsumption }}
		</h3>
		<h3>
			<IconTemperature class="icon" /> Temperature: {{ species.light }}
		</h3>
		<h3><IconSun class="icon" />Light: {{ species.light }}</h3>
		<p>{{ species.text }}</p>
		<div class="comment-container">
			<CardListWithTextbox
				:values="species.comments"
				@add="addComment"
				buttonText="Add Comment"
			/>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import IconWater from "./Icons/IconWater.vue";
import IconTemperature from "./Icons/IconTemperature.vue";
import IconSun from "./Icons/IconSun.vue";
import checkForValidId from "../composables/checkForValidId";
import CardListWithTextbox from "./CardListWithTextbox.vue";

export default {
	name: "SpeciesView",
	components: { IconWater, IconTemperature, IconSun, CardListWithTextbox },
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const species = ref(
			store.getters["learn/species/one"](route.params.name)
		);

		const validId = ref(checkForValidId(router, species.value));

		onBeforeRouteUpdate((to, from, next) => {
			species.value = store.getters["learn/species/one"](to.params.name);
			validId.value = checkForValidId(router, species.value);
			next();
		});

		const addComment = (commentText) => {
			store.dispatch("learn/species/addComment", {
				name: route.params.name,
				text: commentText,
			});
			species.value = store.getters["learn/species/one"](
				route.params.name
			);
		};

		return { species, validId, addComment };
	},
};
</script>

<style scoped>
.container {
	position: relative;
	width: 90vw;
	margin: 0 auto 5vh auto;
	max-width: 1000px;
}

.icon {
	height: 2rem;
	margin-right: 1rem;
}

.image {
	float: left;
	max-width: 33%;
	margin: 0 2rem 2rem 1rem;
}

.comment-container {
	width: 80vw;
	max-width: 1000px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
}

@media (max-width: 600px) {
	.image {
		width: 98%;
		max-width: none;
		margin: auto;
		float: none;
	}
	h1,
	h3 {
		display: block;
		width: 100%;
		text-align: center;
	}
	.container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
}
</style>
