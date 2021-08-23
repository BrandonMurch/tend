<template>
	<nav class="navigation-bar">
		<MainLogo />

		<!-- Mobile Navigation -->
		<div class="mobile-navigation">
			<MenuIcon :isOpen="menuOpen" @click="toggleMenu" />
			<SearchIcon
				:isOpen="searchOpen"
				@click="toggleSearch"
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
		</div>

		<!-- Desktop Navigation -->
		<div class="desktop-navigation" @click="toggleSearch">
			<div class="search-desktop">
				<CloseIcon :isOpen="searchOpen">
					<a class="search-text" @click="toggleSearch"> search </a>
				</CloseIcon>
			</div>
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
import CloseIcon from "./CloseIcon.vue";
import SearchIcon from "./SearchIcon.vue";
import SearchBar from "./SearchBar.vue";
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
		CloseIcon,
	},
	props: { activeComponent: String },
	data() {
		return {
			menuOpen: false,
			isMobile: window.innerWidth < 800,
			links: [
				{ text: "contact", url: "/contact", name: "contact" },
				{ text: "learn", url: "/learn", name: "learn" },
				{ text: "explore", url: "/explore", name: "explore" },
				{ text: "my plants", url: "/my-plants", name: "my-plants" },
			],
			searchOpen: false,
		};
	},
	methods: {
		toggleSearch() {
			this.menuOpen = false;
			this.searchOpen = !this.searchOpen;
		},
		toggleMenu() {
			this.searchOpen = false;
			this.menuOpen = !this.menuOpen;
		},
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

.search-text {
	color: #b87d4b;
	font-size: 1.5rem;
	float: right;
}

.search-desktop {
	width: 4rem;
	height: 2rem;
	margin: 2rem 2rem 2rem 1rem;
	float: right;
}

.search-text:hover {
	font-weight: bold;
}

@media (min-width: 800px) {
	.mobile-navigation {
		display: none;
	}

	.desktop-navigation {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		display: inline;
	}
}

@media (max-width: 799px) {
	.desktop-navigation {
		display: none;
	}

	.mobile-navigation {
		display: inline;
	}
}
</style>
