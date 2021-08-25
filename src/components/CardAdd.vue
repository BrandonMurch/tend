<!-- A version of CardImage that allows the user to add a new object (usually a new plant profile) -->

<template>
	<!-- 
        Wait until image is loaded before loading borders, overlay and text.
        https://www.geeksforgeeks.org/how-to-check-an-image-is-loaded-or-not-in-vuejs/
    -->
	<div class="imageContainer">
		<svg
			class="image"
			xmlns="http://www.w3.org/2000/svg"
			height="48px"
			viewBox="0 0 24 24"
			width="48px"
			fill="#000000"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path
				d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
			/>
		</svg>
	</div>
</template>

<script>
export default {
	name: "CardAdd",
};
</script>

<style scoped>
.imageContainer {
	position: relative;
	width: 250px;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	box-shadow: 0 5px 5px grey;
	margin-bottom: 1rem;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-content: center;
}

.image {
	width: 100%;
	/* 
        There was a small gap that was appearing at the bottom of my images. It seems that the browser treats an image as text. So I used vertical-align to stop this, as discussed here:

        https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom 
        */
	vertical-align: middle;
}
</style>
