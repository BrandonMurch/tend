<template>
	<div style="position: relative;">
		<div class="plants-container">
			<ImageGallery
				:images="plants"
				@itemClick="onImageClick"
				@moreImages="getImageData"
			/>
		</div>
		<div class="settings-container" :style="{ width: width }">
			<Input
				stealth
				v-model="plant.subtitle"
				style="font-size: 4rem; color: #3f463d; "
			/>

			<img
				class="plant-image"
				:src="plant.imageSource"
				:alt="plant.title"
			/>
			<keep-alive>
				<component
					:is="activeTab"
					:id="plant.id"
					:settings="plant.settings"
				/>
			</keep-alive>
		</div>
	</div>
</template>

<script>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref, computed } from "vue";
import { getSinglePlant, getPlantData } from "../composables/mockPlantData";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import ImageGallery from "./ImageGallery.vue";
import PlantProfilePrivateSettings from "./PlantProfilePrivateSettings.vue";
import Input from "./AppInput.vue";

const GALLERY_WIDTH = 330;
const SETTINGS_MARGIN = 100;

export default {
	name: "PlantProfilePublic",
	components: { ImageGallery, PlantProfilePrivateSettings, Input },
	setup() {
		const activeTab = PlantProfilePrivateSettings;
		const route = useRoute();
		const router = useRouter();
		const id = ref(route.params.id);
		const width = ref();
		const plant = computed(() => getSinglePlant(id.value));
		const plants = ref([]);

		const resizeSettings = () => {
			if (window.innerWidth > 850) {
				width.value = `${window.innerWidth -
					GALLERY_WIDTH -
					SETTINGS_MARGIN}px`;
			} else {
				width.value = `${window.innerWidth}px`;
			}
		};

		if (plant.value.settings == undefined) {
			plant.value.settings = {};
		}

		resizeSettings();

		windowSizeWatcher(resizeSettings);

		//  Handle changes between different plant ids
		onBeforeRouteUpdate((to, from, next) => {
			id.value = to.params.id;
			next();
		});

		const getImageData = () => {
			// New array to trigger watch updates.
			plants.value = [...plants.value, ...getPlantData()];
		};

		// Go to a new id using Vue-Router
		const onImageClick = (plant) => {
			router.push({ name: "private-plant", params: { id: plant.id } });
		};

		// Load first round of images
		getImageData();

		return {
			id,
			plant,
			plants,
			onImageClick,
			width,
			activeTab,
			getImageData,
		};
	},
};
</script>
console.log(id);

<style scoped>
@import "../assets/css/stealthInput.css";

.plants-container {
	width: 330px;
	height: 90vh;
	overflow-y: scroll;
	display: inline-block;
}

.plant-image {
	width: 98%;
	max-height: 80vh;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	box-shadow: 0 5px 5px grey;
}

.settings-container {
	position: absolute;
	right: 0;
	max-width: 95vw;
}

@media (min-width: 1200px) {
	.plant-image {
		width: 50%;
	}
}

@media (max-width: 850px) {
	.plants-container {
		display: none;
	}
}
</style>
