<template>
	<div class="gallery-container">
		<ImageGallery :images="plants" />
	</div>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import { getPlantData } from "../composables/mockPlantData";
import { ref } from "vue";

export default {
	name: "MyPlants",
	components: { ImageGallery },
	setup() {
		const plants = ref([]);

		const getImageData = () => {
			// New array to trigger watch updates.
			plants.value = [...plants.value, ...getPlantData()];
		};

		getImageData();

		return {
			plants,
		};
	},
};
</script>

<style scoped>
.gallery-container {
	width: 50vw;
	height: 100vh;
	float: right;
}
</style>
