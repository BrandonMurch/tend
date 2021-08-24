<template>
	<div class="hide-div">
		<div
			v-for="link in links"
			:key="link.text"
			:class="{ linkContainer: dropDown }"
		>
			<RouterLink
				class="navigation-link"
				:class="{ activeLink: isActive(link.name), dropDown: dropDown }"
				:to="link.url"
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
