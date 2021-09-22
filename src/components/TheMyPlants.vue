<template>
	<NotificationBar :plants="plants" ref="notificationArea" />

	<div
		class="gallery-container"
		v-if="galleryWidth"
		:style="{ width: galleryWidth }"
	>
		<ImageGallery
			:images="plants"
			@itemClick="openPlantSettings"
			includeActions
			@performAction="performPlantAction"
		>
			<CardAdd @click="addPlant" class="add-card" />
		</ImageGallery>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import ImageGallery from "./ImageGallery.vue";
import NotificationBar from "./NotificationBar.vue";
import CardAdd from "./CardAdd.vue";
import windowSizeWatcher from "../composables/windowSizeWatcher";
import { debounce } from "../helpers/debounce.js";

export default {
	name: "MyPlants",
	components: {
		ImageGallery,
		NotificationBar,
		CardAdd,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const notificationArea = ref(null);
		const galleryWidth = ref();

		const plants = ref(store.getters["plants/all"]);

		const addPlant = () => {
			const newPlantName = prompt("Enter a new plant name: ");
			if (newPlantName) {
				store.commit("plants/add");
				plants.value = [...store.getters["plants/all"]];
				router.push({
					name: "private-plant",
					params: { id: store.getters["plants/latest"].id },
				});
			}
		};

		const openPlantSettings = (selectedPlant) => {
			router.push({
				name: "private-plant",
				params: { id: selectedPlant.id },
			});
		};

		const performPlantAction = ({ id, action: performedAction }) => {
			const selectedPlant = store.getters["plants/one"](id);
			selectedPlant.actions = selectedPlant.actions.filter(
				(action) => action != performedAction
			);

			store.commit("plants/update", selectedPlant);
			plants.value = [...store.getters["plants/all"]];
		};

		const readjustGalleryArea = debounce(() => {
			if (window.innerWidth >= 850) {
				galleryWidth.value =
					window.innerWidth -
					notificationArea.value.$el.clientWidth -
					40 +
					"px";
			} else {
				galleryWidth.value = window.innerWidth - 70 + "px";
			}
		});

		onMounted(() => {
			readjustGalleryArea();
		});

		windowSizeWatcher(readjustGalleryArea);

		return {
			plants,
			openPlantSettings,
			addPlant,
			performPlantAction,
			notificationArea,
			galleryWidth,
		};
	},
};
</script>

<style scoped>
.notification-container {
	width: 30vw;
	max-width: 600px;
	height: min-content;
	float: left;
	position: relative;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.gallery-container {
	width: 45vw;
	height: 100vh;
	float: right;
}

.add-card {
	height: 10rem;
}
@media (max-width: 850px) {
	.gallery-container,
	.notification-container {
		width: 100%;
		max-width: none;
	}
	.gallery-container {
		height: 100%;
		margin: auto;
		float: none;
		position: relative;
		top: 6rem;
	}

	.notification-icon {
		margin-left: 15%;
	}
}
</style>
