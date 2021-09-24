<!--
Description: 	The private profile page for a plant. Will allow the user to 
				change settings, and perform actions. Gets its information through the url path, and the vuex store.
-->

<template>
	<!-- Don't load the component if the id in the URL is not valid. -->
	<div
		v-if="validId"
		style="position: relative; display:flex; justify-content: center;"
	>
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
				@blur="updateName"
			/>
			<div class="image-container">
				<CardImageSwipeWrapper
					:imageSource="plant.imageSource"
					:actions="plant.actions"
					@performAction="performAction"
					@swipeLeft="previousPlant"
					@swipeRight="nextPlant"
				/>
			</div>

			<div class="mode-toggle-container">
				<Button @click="activeTab = 'PlantProfilePrivateSettings'">
					Private
				</Button>
				<Button @click="activeTab = 'PlantProfileBiography'">
					Public
				</Button>
			</div>

			<!-- Toggles between the public and private settings with the buttons above. -->
			<div class="settings">
				<component
					:is="activeTab"
					v-bind="getProps"
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
					@delete="confirmThenDeletePlant"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import ImageGallery from "./ImageGallery.vue";
import PlantProfilePrivateSettings from "./PlantProfilePrivateSettings.vue";
import PlantProfileBiography from "./PlantProfileBiography.vue";
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import CardImageSwipeWrapper from "./CardImageSwipeWrapper.vue";
import checkForValidId from "../composables/checkForValidId.js";

const GALLERY_WIDTH = 330;
const SETTINGS_MARGIN = 80;

export default {
	name: "PlantProfilePrivate",
	components: {
		ImageGallery,
		PlantProfilePrivateSettings,
		Input,
		Button,
		PlantProfileBiography,
		CardImageSwipeWrapper,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();

		//  Get the plant information from the store.
		const id = ref(route.params.id);
		const store = useStore();
		const plant = ref(store.getters["plants/one"](id.value));

		// Check to ensure the ID is valid.
		const validId = ref(checkForValidId(router, plant.value));
		if (!validId.value) {
			return;
		}

		const activeTab = ref("PlantProfilePrivateSettings");
		const plants = ref(store.getters["plants/all"]);

		//  Create props for the dynamic components.
		const getProps = computed(() => {
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
			return {};
		});

		// Dynamically assign the width of the settings based on the width of the gallery.
		const width = ref();
		const resizeSettings = () => {
			if (window.innerWidth > 850) {
				width.value = `${window.innerWidth -
					GALLERY_WIDTH -
					SETTINGS_MARGIN}px`;
			} else {
				width.value = `${window.innerWidth - window.innerWidth / 10}px`;
			}
		};
		resizeSettings();
		windowSizeWatcher(resizeSettings);

		//  Handle changes between different plant ids in the URL
		onBeforeRouteUpdate((to, from, next) => {
			plant.value = store.getters["plants/one"](to.params.id);
			validId.value = checkForValidId(router, plant.value);
			next();
		});

		// Get all plants from the store, and the images to place in the gallery.
		const getImageData = () => {
			// New array to trigger watch updates.
			plants.value = [...plants.value, ...store.getters["plants/all"]];
		};
		// Go to a new id using Vue-Router
		const onImageClick = (plant) => {
			router.push({ name: "private-plant", params: { id: plant.id } });
		};

		// For mobile users, switch to the previous/next plant.
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

		// Water, fertilize or repot a plant.
		const performAction = (action) => {
			plant.value.actions = plant.value.actions.filter(
				(currentAction) => currentAction != action
			);
		};

		// Update a plant in the store.
		const updatePlant = (updatedPlant) => {
			store.commit("plants/update", updatedPlant);
			plants.value = [...store.getters["plants/all"]];
		};

		// First confirm, then delete the plant.
		const confirmThenDeletePlant = () => {
			if (
				confirm(`Are you sure you want to delete ${plant.value.title}`)
			) {
				store.commit("plants/delete", plant.value.id);
				router.push({ name: "my-plants" });
			}
		};

		// Load first round of images
		getImageData();

		const updateName = () => {
			store.commit("plants/update", plant.value);
		};

		return {
			id,
			plant,
			updateName,
			plants,
			onImageClick,
			width,
			activeTab,
			getImageData,
			getProps,
			updatePlant,
			performAction,
			previousPlant,
			nextPlant,
			confirmThenDeletePlant,
			validId,
		};
	},
};
</script>

<style scoped>
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

.image-container {
	position: relative;
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
	font-size: 4rem;
	color: #3f463d;
	padding-bottom: 1rem;
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
