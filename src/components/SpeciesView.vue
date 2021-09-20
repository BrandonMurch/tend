<template>
	<div class="container">
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
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import IconWater from "./Icons/IconWater.vue";
import IconTemperature from "./Icons/IconTemperature.vue";
import IconSun from "./Icons/IconSun.vue";
export default {
	name: "SpeciesView",
	components: { IconWater, IconTemperature, IconSun },
	setup() {
		const store = useStore();
		const route = useRoute();
		const species = ref(
			store.getters["learn/species/one"](route.params.name)
		);

		console.log(species.value);

		return { species };
	},
};
</script>

<style scoped>
.container {
	position: relative;
	width: 90vw;
	margin: 0 4vw 5vh 4vw;
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
