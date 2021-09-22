<!--  -->

<!--
Description: 		Creates navigation links based on the array passed in by 
					NavigationBar. Different styles are applied on desktop vs. mobile.
Props: 
	links			a list of link objects. They must include a vue-router 	
					name, a url, and a dispay text.

	dropDown		Boolean. Whether the links are for the drop down menu or 					the desktop menu.
-->

<template>
	<div class="hide-div">
		<div
			v-for="link of links"
			:key="link.text"
			:class="{ linkContainer: dropDown }"
		>
			<RouterLink
				class="navigation-link"
				:class="{ activeLink: isActive(link.name), dropDown: dropDown }"
				:to="link.url"
				@click="$emit('close')"
			>
				{{ link.text }}
			</RouterLink>
		</div>
	</div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
	name: "NavigationLinks",
	components: { RouterLink },
	props: { links: Array, dropDown: Boolean },
	methods: {
		isActive(linkName) {
			return linkName == this.$route.name;
		},
	},
};
</script>

<style scoped>
.linkContainer {
	height: 4.1rem;
}

.navigation-link {
	float: right;
	color: #b87d4b;
	text-decoration: none;
	margin: 2rem 1rem;
	font-size: 1.5rem;
}

.activeLink {
	text-decoration: underline;
}

.dropDown {
	width: 100%;
	text-align: center;
	border-bottom: 2px solid grey;
	margin: 0;
	padding: 1rem 0;
}

.navigation-link:hover {
	font-weight: bold;
}

.hide-div {
	display: inline;
}
</style>
