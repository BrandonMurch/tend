<template>
	<div>
		<div class="application-background"></div>
		<NavigationBar
			:activeComponent="activeComponent"
			@update:activeComponent="activeComponent = $event"
		/>
		<ContactForm v-if="activeComponent == 'contact'" />
		<ExplorePlants v-if="activeComponent == 'explore'" />
	</div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import ExplorePlants from "./components/ExplorePlants.vue";
import ContactForm from "./components/ContactForm.vue";

export default {
	name: "App",
	components: {
		NavigationBar,
		ExplorePlants,
		ContactForm,
	},
	data() {
		return {
			activeComponent: "explore",
		};
	},
};
</script>

<style scoped>
.application-background {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: #d8dad4;
}
</style>
