<!--
Description: 	The navigation bar for the website. On desktop it runs across 
				the top, on mobile it will be a drop down.
-->

<template>
	<nav class="navigation-bar">
		<MainLogo />

		<!-- Mobile Navigation -->
		<div class="mobile-navigation">
			<MenuIcon :isOpen="menuOpen" @click="toggleMenu" />
			<SearchIcon :isOpen="searchOpen" @click="toggleSearch" />
			<DropDown class="drop-down" :isOpen="menuOpen" insetShadow>
				<template v-slot:inside>
					<NavigationLinks
						@close="menuOpen = false"
						:links="reverseLinks"
						:dropDown="true"
					/>
				</template>
			</DropDown>
		</div>

		<!-- Desktop Navigation -->
		<div class="desktop-navigation">
			<div class="search-desktop" @click="toggleSearch">
				<CloseIcon :isOpen="searchOpen">
					<a class="search-text" @click="toggleSearch"> search </a>
				</CloseIcon>
			</div>
			<NavigationLinks :dropDown="false" :links="links" />
		</div>
		<SearchBar :isOpen="searchOpen" @close="searchOpen = false" />
	</nav>
</template>

<script>
import DropDown from "./DropDown.vue";
import MainLogo from "./MainLogo.vue";
import MenuIcon from "./Icons/IconMenu.vue";
import CloseIcon from "./Icons/IconClose.vue";
import SearchIcon from "./Icons/IconSearch.vue";
import SearchBar from "./SearchBar.vue";
import NavigationLinks from "./NavigationBarLinks.vue";

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
	data() {
		return {
			menuOpen: false,
			isMobile: false,
			links: [
				{ text: "logout", url: "/logout", name: "logout" },
				{ text: "contact", url: "/contact", name: "contact" },
				{ text: "learn", url: "/learn", name: "learn" },
				{ text: "explore", url: "/explore", name: "explore" },
				{ text: "my plants", url: "/my-plants", name: "my-plants" },
			],
			searchOpen: false,
		};
	},
	computed: {
		// Reverse the order of links for the drop down menu. So links normally on the right, will be at the bottom.
		reverseLinks: function() {
			return [...this.links].reverse();
		},
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
			this.isMobile = window.innerWidth < 850;
		},
	},
	created() {
		window.addEventListener("resize", this.updateIsMobile);
		this.updateIsMobile();
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
	left: 2%;
	width: 98%;
}

.search-text {
	color: #b87d4b;
	font-size: 1.5rem;
	float: right;
}

.search-desktop {
	width: 4rem;
	height: 2rem;
	margin: 2rem 3rem 2rem 1rem;
	float: right;
}

.search-desktop:hover {
	font-weight: bold;
}

.search-text:hover {
	font-weight: bold;
}

@media (min-width: 850px) {
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

@media (max-width: 849px) {
	.desktop-navigation {
		display: none;
	}

	.mobile-navigation {
		display: inline;
	}
}

@media (max-width: 350px) {
	/* Two row navigation bar
		Logo on top, icons underneath. */
	.mobile-navigation {
		display: inline-block;
		width: 12rem;
	}

	.navigation-bar {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
}
</style>
