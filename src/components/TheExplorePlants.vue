<!-- SINGLETON. Uses the image gallery to display public plant profiles. When one is clicked, it opens a pop-up in PlantPublicProfile with more information. -->

<template>
	<transition name="fade">
		<PlantProfilePublic
			v-if="selectedPlant"
			@close="selectedPlant = null"
			v-bind="selectedPlant"
		/>
	</transition>

	<div class="image-gallery">
		<ImageGallery
			v-bind:images="images"
			@itemClick="(plant) => (selectedPlant = plant)"
			@moreImages="getImageData"
		/>
	</div>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
// import plantData from "../assets/json/plants.json";
import { getPlantData } from "../composables/mockPlantData";
import PlantProfilePublic from "./PlantProfilePublic.vue";

export default {
	name: "ExplorePlants",
	components: {
		ImageGallery,
		PlantProfilePublic,
	},

	data() {
		return {
			// This incremenets each time more images are loaded
			currentImageRound: 0,
			selectedPlant: null,
			images: [],
		};
	},

	methods: {
		getImageData() {
			// New array to trigger watch updates.
			this.images = [...this.images, ...getPlantData()];
		},
	},
	created() {
		this.getImageData();
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";

.image-gallery {
	display: flex;
	align-content: center;
	flex-wrap: wrap;
}
</style>
