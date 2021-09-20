<!-- Presents text with a title inside a card -->

<template>
	<div class="container">
		<img :src="imageSource" alt="title" class="image" />
		<div class="text-container">
			<IconTrash
				v-if="deletable"
				class="trash-icon"
				@click="$emit('delete')"
			/>
			<h1>{{ title }}</h1>
			<h4>{{ subtitle }}</h4>
			<p>{{ text }}</p>
		</div>
	</div>
</template>

<script>
import IconTrash from "./Icons/IconTrash";
export default {
	name: "CardText",
	components: { IconTrash },
	props: {
		deletable: {
			type: Boolean,
			default: false,
		},
		text: String,
		title: String,
		subtitle: {
			default: "",
			type: String,
		},
		imageSource: String,
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
	max-height: 10rem;
	cursor: pointer;
}

.text-container {
	width: 70%;
	float: right;
	display: inline-block;
}

.image {
	position: relative;
	width: 25%;
	max-height: 15rem;
	top: -20px;
	left: -20px;
	border-radius: 20px 0 0 20px;
	display: inline-block;
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
