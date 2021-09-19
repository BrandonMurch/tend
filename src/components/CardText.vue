<!-- Presents text with a title inside a card -->

<template>
	<div class="container">
		<h1>{{ title }}</h1>
		<p>{{ text }}</p>
	</div>
</template>

<script>
export default {
	name: "CardText",
	props: {
		text: String,
		title: String,
	},
};
</script>

<style scoped>
.container {
	position: relative;
	width: 98%;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	box-shadow: 0 5px 5px grey;
	margin-bottom: 1rem;
	overflow: hidden;
}
</style>
