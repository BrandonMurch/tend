<!--
Description: 	Contains the user settings within a drop down shape. Interacts 
				with the store directly.

Props: 		
	Position	Integer. Used to offset the notification bar within the mobile
				menu.

	isOpen		Boolean value, whether or not the menu is open.

Emits:
	toggleOpen	Toggle the menu open or close.
-->

<template>
	<NotificationShape
		:position="position"
		:isOpen="isOpen"
		@toggleOpen="$emit('toggleOpen')"
		colour="#666666"
	>
		<template v-slot:content>
			<div class="text-container">
				<h3 class="title">Username:</h3>
				<Input stealth v-model="name" class="input" />
				<Button class="save-button" @click="saveName"> Save </Button>
			</div>
		</template>
		<template v-slot:icon>
			<IconGear class="notification-icon" />
		</template>
	</NotificationShape>
</template>

<script>
import Input from "./AppInput.vue";
import Button from "./AppButton.vue";
import NotificationShape from "./NotificationShape.vue";
import IconGear from "./Icons/IconGear.vue";
import { ref } from "vue";
import { useStore } from "vuex";
export default {
	name: "TipOfTheDay",
	components: {
		IconGear,
		NotificationShape,
		Input,
		Button,
	},
	props: {
		isOpen: Boolean,
		position: Number,
	},
	emits: ["toggleOpen"],
	setup() {
		const store = useStore();
		const name = ref(store.getters["user/name"]);
		const saveName = () => {
			store.commit("user/logIn", name.value);
		};
		return { name, saveName };
	},
};
</script>

<style scoped>
.notification-icon {
	color: #dce0d1;
	margin-left: 1rem;
	height: 3rem;
}

.text-container {
	width: 80%;
	padding: 10%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.title {
	color: #dce0d1;
	text-align: center;
	margin: 0;
}

.input {
	margin: auto;
	text-align: center;
	color: #dce0d1;
	text-align: center;
	margin-bottom: 1rem;
	width: 100%;
}
.save-button {
	margin: auto;
}

@media (max-width: 850px) {
	.notification-icon {
		margin-left: 0;
	}
}
</style>
