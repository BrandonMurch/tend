<template>
	<div class="gallery-container">
		<ImageGallery :images="plants" @itemClick="openPlantSettings" />
	</div>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import { getPlantData } from "../composables/mockPlantData";
import { ref } from "vue";
import { useRouter } from "vue-router";

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

		const router = useRouter();
		const openPlantSettings = (selectedPlant) => {
			router.push({
				name: "private-plant",
				params: { id: selectedPlant.id },
			});
		};

		return {
			plants,
			openPlantSettings,
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

@media (max-width: 850px) {
	.gallery-container {
		width: 100%;
	}
}
</style>
