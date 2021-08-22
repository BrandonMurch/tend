<template>
	<div class="hide-div">
		<a
			v-for="link in links"
			:key="link.text"
			class="navigation-link"
			:class="{ activeLink: isActive(link.text), dropDown: dropDown }"
			:href="link.url"
			@click="click(link.text)"
		>
			{{ link.text }}
		</a>
	</div>
</template>

<script>
export default {
	name: "NavigationLinks",
	props: { links: Array, activeComponent: String, dropDown: Boolean },
	methods: {
		isActive(linkName) {
			// Change once Vue-Router is implemented to verify using location.
			return linkName == this.activeComponent ? true : false;
		},
		click(target) {
			// Used for mocking only the contact and explore pages momentarily
			this.$emit(
				"update:activeComponent",
				target == "contact" ? "contact" : "explore"
			);
		},
	},
};
</script>

<style scoped>
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
