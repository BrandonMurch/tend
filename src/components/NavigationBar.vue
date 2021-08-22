<template>
	<nav class="navigation-bar">
		<MainLogo />

		<!-- Mobile Navigation -->
		<MenuIcon
			class="menu-icon"
			:isOpen="menuOpen"
			@click="menuOpen = !menuOpen"
		/>
		<SearchIcon
			:isOpen="searchOpen"
			@click="searchOpen = !searchOpen"
			:size="'large'"
		/>
		<DropDown class="drop-down" :isOpen="menuOpen">
			<template v-slot:inside>
				<NavigationLinks
					v-if="isMobile"
					:links="links"
					:dropDown="true"
					:activeComponent="activeComponent"
					@update:activeComponent="updateActiveComponent"
				/>
			</template>
		</DropDown>

		<!-- Desktop Navigation -->
		<div class="large-navigation">
			<SearchIcon
				:isOpen="searchOpen"
				@click="searchOpen = !searchOpen"
			/>
			<NavigationLinks
				v-if="!isMobile"
				:dropDown="false"
				:links="links"
				:activeComponent="activeComponent"
				@update:activeComponent="updateActiveComponent"
			/>
		</div>
		<SearchBar :isOpen="searchOpen" @close="searchOpen = false" />
	</nav>
</template>

<script>
import DropDown from "./DropDown.vue";
import MainLogo from "./MainLogo.vue";
import MenuIcon from "./MenuIcon.vue";
import SearchIcon from "./SearchIcon.vue";
import SearchBar from "./SearchIcon.vue";
import NavigationLinks from "./NavigationLinks.vue";

export default {
	name: "NavigationBar",
	components: {
		DropDown,
		MainLogo,
		MenuIcon,
		NavigationLinks,
		SearchIcon,
		SearchBar,
	},
	props: { activeComponent: String },
	data() {
		return {
			menuOpen: false,
			isMobile: window.innerWidth < 800,
			links: [
				{ text: "contact", url: "#" },
				{ text: "learn", url: "#" },
				{ text: "explore", url: "#" },
				{ text: "my plants", url: "#" },
			],
			searchOpen: false,
		};
	},
	methods: {
		updateIsMobile() {
			this.isMobile = window.innerWidth < 800;
		},
		updateActiveComponent(target) {
			this.$emit("update:activeComponent", target);
		},
	},
	created() {
		window.addEventListener("resize", this.updateIsMobile);
	},
	unmounted() {
		window.removeEventListener("resize", this.updateIsMobile);
	},
};
</script>

<style scoped>
.navigation-bar {
	position: relative;
	min-height: 2rem;
}

@media (min-width: 800px) {
	.drop-down,
	.menu-icon {
		display: none;
	}

	.large-navigation {
		display: inline;
	}
}

@media (max-width: 799px) {
	.large-navigation {
		display: none;
	}
}
</style>
