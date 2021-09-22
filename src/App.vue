<!-- Base Component. Contains the navigation bar, and the router view. The router will handle which major section components to display based on the url path. -->

<template>
	<div class="application-container">
		<div class="application-background"></div>
		<NavigationBar v-if="$route.path != '/'" />
		<RouterView> </RouterView>
	</div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import { computed } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "vuex";

export default {
	name: "App",
	components: {
		NavigationBar,
		RouterView,
	},
	setup() {
		const store = useStore();

		return {
			// Watch store for changes is logged in status.
			isLoggedIn: computed(() => store.getters["user/isLoggedIn"]),
		};
	},
};
</script>

<style scoped>
.application-container {
	width: 100%;
	min-height: 98vh;
	overflow-x: hidden;
	position: absolute;
	left: 0;
}
.application-background {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background-color: #dce0d1;
}
</style>
