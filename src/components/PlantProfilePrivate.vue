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
				style="  "
			/>
			<div class="image-container">
				<img
					@touchstart="startSwipe"
					@touchend="endSwipe"
					class="plant-image"
					:src="plant.imageSource"
					:alt="plant.title"
				/>
				<IconLeft
					class="left-icon direction-icon"
					@click="previousPlant"
				/>
				<IconRight
					class="right-icon direction-icon"
					@click="nextPlant"
				/>
				<div
					v-if="plant.actions.includes('water')"
					class="water-icon"
					@click="() => performAction('water', 'watered')"
					:style="{
						left: `${plant.actions.indexOf('water') * 3}rem`,
					}"
				>
					<IconWater class="inner-icon" />
				</div>
				<div
					v-if="plant.actions.includes('repot')"
					class="pot-icon"
					@click="() => performAction('repot', 'repotted')"
					:style="{
						left: `${plant.actions.indexOf('repot') * 3}rem`,
					}"
				>
					<IconFlowerPot class="inner-icon" />
				</div>
				<div
					v-if="plant.actions.includes('fertilize')"
					class="mushroom-icon"
					@click="() => performAction('fertilize', 'fertilized')"
					:style="{
						left: `${plant.actions.indexOf('fertilize') * 3}rem`,
					}"
				>
					<IconMushroom class="inner-icon" />
				</div>
			</div>

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
					@delete="confirmThenDeletePlant"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";
import { getSinglePlant, getPlantData } from "../composables/mockPlantData";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import ImageGallery from "./ImageGallery.vue";
import PlantProfilePrivateSettings from "./PlantProfilePrivateSettings.vue";
import PlantProfileBiography from "./PlantProfileBiography.vue";
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import IconWater from "./Icons/IconWater.vue";
import IconMushroom from "./Icons/IconMushroom.vue";
import IconFlowerPot from "./Icons/IconFlowerPot.vue";
import IconLeft from "./Icons/IconLeft.vue";
import IconRight from "./Icons/IconRight.vue";

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
		IconWater,
		IconMushroom,
		IconFlowerPot,
		IconLeft,
		IconRight,
	},
	setup() {
		const activeTab = ref("PlantProfilePrivateSettings");
		const route = useRoute();
		const router = useRouter();
		const id = ref(route.params.id);
		const width = ref();

		const store = useStore();
		const plant = ref(store.getters["plants/one"](id.value));
		const plants = ref(store.getters["plants/all"]);
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

		const performAction = (type, verb) => {
			if (confirm(`Have you ${verb} your plant?`)) {
				plant.value.actions = plant.value.actions.filter(
					(action) => action != type
				);
			}
		};

		const updatePlant = () => {
			store.commit("plants/update", plant);
		};

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
			performAction,
			previousPlant,
			nextPlant,
			confirmThenDeletePlant,
		};
	},
};
</script>

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

.direction-icon {
	position: absolute;
	top: 50%;
	height: 5rem;
	width: 5rem;
	transform: translate(-20%, -50%);
	cursor: pointer;
}

.left-icon {
	left: 0;
	transform: translate(-20%, -50%);
}

.right-icon {
	right: 0;
	transform: translate(10%, -50%);
}

.water-icon,
.pot-icon,
.mushroom-icon {
	position: absolute;
	border-radius: 50%;
	top: 0;
	height: 3rem;
	width: 3rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-content: center;
}

.water-icon {
	background-color: #136e9e;
	left: 0;
}
.pot-icon {
	background-color: #bf763c;
	left: 4rem;
}
.mushroom-icon {
	background-color: #bf763c;
	left: 8rem;
}

.inner-icon {
	height: 3rem;
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

@media (min-width: 851px) {
	.direction-icon {
		display: none;
	}
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
