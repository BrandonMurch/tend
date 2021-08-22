<template>
	<PopUp
		v-if="selectedPlant"
		@close="selectedPlant = null"
		v-bind="selectedPlant"
	/>
	<div class="image-gallery">
		<ImageGallery
			v-bind:images="getImageData()"
			@itemClick="(plant) => (selectedPlant = plant)"
		/>
	</div>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import plantData from "../assets/json/plants.json";
import PopUp from "./PopUp.vue";

export default {
	name: "ExplorePlants",
	methods: {
		getImageData() {
			// Duplicate examples to fill the screen into images array.
			const images = [];
			for (let i = 0; i < 5; i++) {
				for (let j = 0; j < 6; j++) {
					let copy = { ...plantData[j] };
					copy.id = copy.id + 7 * i;
					images.push(copy);
				}
			}
			return images;
		},
	},
	data() {
		return {
			selectedPlant: null,
		};
	},
	components: {
		ImageGallery,
		PopUp,
	},
};
</script>

<style>
.image-gallery {
	display: flex;
	align-content: center;
}
</style>
