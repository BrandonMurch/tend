<template>
	<div class="logo-container">
		<img class="logo-image" src="../assets/images/logo3.svg" alt="logo" />
		<h1 class="logo-text">tend</h1>
	</div>
</template>

<script>
export default {
	name: "MainLogo",
};
</script>

<style scoped>
.logo-container {
	display: inline;
	position: relative;
	left: 20px;
}

.logo-image {
	height: 5rem;
}
.logo-text {
	display: inline;
	color: #b87d4b;
	font-size: 4rem;
	position: relative;
	left: -10px;
	top: -1rem;
	cursor: default;
	font-weight: normal;
	text-shadow: 2px 2px 2px grey;
}
</style>
