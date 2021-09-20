<template>
	<div style="position: relative; display:flex; justify-content: center;">
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
				class="name-input"
				v-model="plant.subtitle"
				style="font-size: 4rem; color: #3f463d; "
			/>
			<img
				@touchstart="startSwipe"
				@touchend="endSwipe"
				class="plant-image"
				:src="plant.imageSource"
				:alt="plant.title"
			/>

			<div class="mode-toggle-container">
				<Button @click="activeTab = 'PlantProfilePrivateSettings'">
					Private
				</Button>
				<Button @click="activeTab = 'PlantProfileBiography'">
					Public
				</Button>
			</div>
			<div class="settings">
				<component
					:is="activeTab"
					v-bind="getProps()"
					@update:settings="
						(settings) => {
							plant.settings = settings;
							updatePlant(plant);
						}
					"
					@update:biography="
						(biography) => {
							plant.text = biography;
							updatePlant(plant);
						}
					"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
import { getSinglePlant, getPlantData } from "../composables/mockPlantData";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import ImageGallery from "./ImageGallery.vue";
import PlantProfilePrivateSettings from "./PlantProfilePrivateSettings.vue";
import PlantProfileBiography from "./PlantProfileBiography.vue";
import { updatePlant } from "../composables/mockPlantData";
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";

const GALLERY_WIDTH = 330;
const SETTINGS_MARGIN = 80;

export default {
	name: "PlantProfilePublic",
	components: {
		ImageGallery,
		PlantProfilePrivateSettings,
		Input,
		Button,
		PlantProfileBiography,
	},
	setup() {
		const activeTab = ref("PlantProfilePrivateSettings");
		const route = useRoute();
		const router = useRouter();
		const id = ref(route.params.id);
		const width = ref();
		const plant = ref(getSinglePlant(id.value));
		const plants = ref([]);
		let swipeStart = 0;

		const getProps = () => {
			if (activeTab.value == "PlantProfilePrivateSettings") {
				return {
					id: plant.value.id,
					settings: plant.value.settings,
				};
			} else if (activeTab.value == "PlantProfileBiography") {
				return {
					biography: plant.value.text,
				};
			}
		};

		const resizeSettings = () => {
			if (window.innerWidth > 850) {
				width.value = `${window.innerWidth -
					GALLERY_WIDTH -
					SETTINGS_MARGIN}px`;
			} else {
				width.value = `${window.innerWidth - window.innerWidth / 10}px`;
			}
		};

		if (plant.value.settings == undefined) {
			plant.value.settings = {};
		}

		resizeSettings();

		windowSizeWatcher(resizeSettings);

		//  Handle changes between different plant ids
		onBeforeRouteUpdate((to, from, next) => {
			plant.value = getSinglePlant(to.params.id);
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

		const previousPlant = () => {
			if (plant.value.id != plants.value[0].id) {
				router.push({
					name: "private-plant",
					params: { id: plant.value.id - 1 },
				});
			}
		};
		const nextPlant = () => {
			if (plant.value.id != plants.value[plants.value.length - 1].id) {
				router.push({
					name: "private-plant",
					params: { id: plant.value.id + 1 },
				});
			}
		};

		const startSwipe = (event) => {
			swipeStart = event.changedTouches[0].clientX;
		};

		const endSwipe = (event) => {
			let swipeDifference = swipeStart - event.changedTouches[0].clientX;
			if (swipeDifference < -70) {
				previousPlant();
			} else if (swipeDifference > 70) {
				nextPlant();
			}
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
			getProps,
			updatePlant,
			startSwipe,
			endSwipe,
		};
	},
};
</script>
console.log(id);

<style scoped>
@import "../assets/css/stealthInput.css";

.mode-toggle-container {
	width: 100%;
	display: flex;
	justify-content: center;
}

.plants-container {
	width: 330px;
	height: 90vh;
	overflow-y: scroll;
	overflow-x: hidden;
	margin-left: 20px;
	border-radius: 20px;
	box-shadow: -10px 0 10px -5px grey;

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
	position: relative;
	float: right;
	max-width: 95vw;
	margin-right: 2.5vw;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.name-input {
	width: 100%;
}

.settings {
	width: 90%;
	margin: 10%;
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
