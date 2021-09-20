<template>
	<NotificationBar :plants="plants" />

	<div class="gallery-container">
		<ImageGallery :images="plants" @itemClick="openPlantSettings">
			<CardAdd @click="addPlant" class="add-card" />
		</ImageGallery>
	</div>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import NotificationBar from "./NotificationBar.vue";
import CardAdd from "./CardAdd.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getMessages } from "../composables/mockMessages";
import { useStore } from "vuex";

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

		const plants = ref(store.getters["plants/all"]);

		const addPlant = () => {
			store.commit("plants/add", prompt("Enter a new plant name: "));
			plants.value = [...store.getters["plants/all"]];
		};

		const openPlantSettings = (selectedPlant) => {
			router.push({
				name: "private-plant",
				params: { id: selectedPlant.id },
			});
		};

		return {
			plants,
			openPlantSettings,
			getMessages,
			addPlant,
		};
	},
};
</script>

<style scoped>
.notification-container {
	width: 45vw;
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
	margin-top: 5rem;
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
	}

	.notification-icon {
		margin-left: 15%;
	}
}
</style>
