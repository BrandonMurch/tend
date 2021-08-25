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
import plantData from "../assets/json/plants.json";
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
		// Duplicate examples to fill the screen into images array.
		getDataStub() {
			const images = [];

			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 7; j++) {
					let copy = { ...plantData[j] };
					copy.id = copy.id + 7 * i + this.currentImageRound * 7 * 5;
					images.push(copy);
				}
			}

			return images;
		},

		getImageData() {
			// New array to trigger watch updates.
			this.images = [...this.images, ...this.getDataStub()];
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
