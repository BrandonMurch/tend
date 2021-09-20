<template>
	<div class="notification-container">
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
			:position="1"
			@toggleOpen="() => changeActiveTab(1)"
			:isOpen="activeTab == 1"
		/>
		<TipOfTheDay
			:position="0"
			:isOpen="activeTab == 0"
			@toggleOpen="() => changeActiveTab(0)"
		/>
	</div>
</template>

<script>
import TipOfTheDay from "./TipOfTheDay.vue";
import IconWater from "./Icons/IconWater.vue";
import IconMushroom from "./Icons/IconMushroom.vue";
import IconFlowerPot from "./Icons/IconFlowerPot.vue";
import NotificationActionList from "./NotificationActionList.vue";
import MessageNotifications from "./MessageNotifications.vue";
import { ref } from "vue";

export default {
	name: "NotificationBar",
	components: {
		NotificationActionList,
		MessageNotifications,
		IconWater,
		IconMushroom,
		IconFlowerPot,
		TipOfTheDay,
	},
	props: {
		plants: Array,
	},
	setup(props) {
		const activeTab = ref(-1);

		const changeActiveTab = (position) => {
			if (activeTab.value == position) {
				activeTab.value = -1;
			} else {
				activeTab.value = position;
			}
		};

		const plantsForActions = (actionString) => {
			const actionNeeded = [];
			for (let plant of props.plants) {
				if (plant.actions.includes(actionString)) {
					actionNeeded.push(plant);
				}
			}
			return actionNeeded;
		};
		return { changeActiveTab, activeTab, plantsForActions };
	},
};
</script>

<style scoped>
.notification-icon {
	height: 3rem;
	fill: #dce0d1;
	color: #dce0d1;
	margin-left: 1rem;
}
</style>
