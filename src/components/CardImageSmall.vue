<!--
Description: 			Presents text with a title inside a card. A small image 
						will appear on the left hand side of the card.

Props: 
	deletable			Optional prop. If present, the card can be deleted.
	
	title				Title of the card
	
	subtitle			Subtitle of the card

	text				Main text

	imageSource			Image URL

-->

<template>
	<div class="container">
		<div class="image-container">
			<img :src="imageSource" alt="title" class="image" />
		</div>
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
	max-height: 10rem;
	cursor: pointer;
}

.text-container {
	width: 70%;
	float: right;
}

/* container to allow the image to be placed properly aligning the right edge with the division between image and text. Use position: absolute in child and right: 0. */
.image-container {
	position: relative;
	width: 25%;
	overflow: hidden;
	height: 100%;
	display: inline-block;
}

.image {
	position: absolute;
	min-width: 110%;
	height: 100%;
	bottom: 0;
	right: 0;
	border-radius: 20px 0 0 20px;
}

.trash-icon {
	position: absolute;
	top: -5px;
	right: 5px;
	transition: 0.5s;
	cursor: pointer;
}

.trash-icon:hover {
	transform: scale(1.1);
}
</style>
