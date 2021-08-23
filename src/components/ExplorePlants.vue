<template>
	<transition name="fade">
		<PopUp
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
import PopUp from "./PopUp.vue";

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
		PopUp,
	},
};
</script>

<style>
.image-gallery {
	display: flex;
	align-content: center;
	flex-wrap: wrap;
}

.fade-enter-active {
	transition: all 0.5s !important;
}
.fade-leave-active {
	transition: all 0.2s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	transform: translateX(10px);
	opacity: 0 !important;
}

.fade-enter-to,
.v-leave-from {
	opacity: 1 !important;
}
</style>
