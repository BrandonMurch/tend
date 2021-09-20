<template>
	<NotificationBar :plants="plants" />
	<!-- <div class="notification-container">
		<NotificationActionList
			@toggleOpen="() => changeActiveTab(4)"
			:position="4"
			:isOpen="activeTab == 4"
			:plants="plantsForActions('water')"
			colour="#136e9e"
		>
			<IconWater class="notification-icon" />
		</NotificationActionList>
		<NotificationActionList
			@toggleOpen="() => changeActiveTab(3)"
			:position="3"
			:isOpen="activeTab == 3"
			:plants="plantsForActions('fertilize')"
			colour="#3D6B56"
		>
			<IconMushroom class="notification-icon" />
		</NotificationActionList>
		<NotificationActionList
			@toggleOpen="() => changeActiveTab(2)"
			:position="2"
			:isOpen="activeTab == 2"
			:plants="plantsForActions('repot')"
			colour="#BF763C"
		>
			<IconFlowerPot class="notification-icon" />
		</NotificationActionList>

		<MessageNotifications
			:messages="getMessages()"
			:position="1"
			@toggleOpen="() => changeActiveTab(1)"
			:isOpen="activeTab == 1"
		/>
		<TipOfTheDay
			:position="0"
			:isOpen="activeTab == 0"
			@toggleOpen="() => changeActiveTab(0)"
		/>
	</div> -->

	<div class="gallery-container">
		<ImageGallery :images="plants" @itemClick="openPlantSettings" />
	</div>
</template>

<script>
import ImageGallery from "./ImageGallery.vue";
import NotificationBar from "./NotificationBar.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getMessages } from "../composables/mockMessages";
import { useStore } from "vuex";

export default {
	name: "MyPlants",
	components: {
		ImageGallery,
		NotificationBar,
	},
	setup() {
		const store = useStore();
		const router = useRouter();

		const plants = ref(store.getters["plants/all"]);

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
