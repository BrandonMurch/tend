<template>
	<SlideFadeTransition>
		<PlantProfilePublic
			v-if="selectedPlant"
			@close="selectedPlant = null"
			v-bind="selectedPlant"
		/>
	</SlideFadeTransition>

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
import plantData from "../assets/json/plants.json";
import PlantProfilePublic from "./PlantProfilePublic.vue";
import SlideFadeTransition from "./SlideFadeTransition.vue";

export default {
	name: "ExplorePlants",
	created() {
		this.getImageData();
	},
	methods: {
		getImageData() {
			// Duplicate examples to fill the screen into images array.
			const images = [];

			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 7; j++) {
					let copy = { ...plantData[j] };
					copy.id = copy.id + 7 * i + this.currentImageRound * 7 * 5;
					images.push(copy);
				}
			}

			// New array to trigger watch updates.
			this.images = [...this.images, ...images];
		},
	},
	data() {
		return {
			currentImageRound: 0,
			selectedPlant: null,
			images: [],
		};
	},
	components: {
		ImageGallery,
		PlantProfilePublic,
		SlideFadeTransition,
	},
};
</script>

<style scoped>
.image-gallery {
	display: flex;
	align-content: center;
	flex-wrap: wrap;
}
</style>
