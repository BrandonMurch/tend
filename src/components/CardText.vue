<!-- Presents text with a title inside a card -->

<template>
	<div class="container">
		<IconTrash class="trash-icon" @click="$emit('delete')" />
		<h1>{{ title }}</h1>
		<h4>{{ subtitle }}</h4>
		<p>{{ text }}</p>
	</div>
</template>

<script>
import IconTrash from "./Icons/IconTrash";
export default {
	name: "CardText",
	components: { IconTrash },
	props: {
		text: String,
		title: String,
		subtitle: {
			default: "",
			type: String,
		},
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
	padding: 10px;
}
.trash-icon {
	position: absolute;
	top: -5px;
	right: 5px;
	/* color:  */
	transition: 0.5s;
	cursor: pointer;
}

.trash-icon:hover {
	transform: scale(1.1);
}
</style>
