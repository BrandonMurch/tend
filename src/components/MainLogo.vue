<template>
	<div style="display: inline">
		<img class="logo-image" src="../assets/images/logo.svg" alt="logo" />
		<h1 class="logo-text">tend</h1>
	</div>
</template>

<script>
export default {
	name: "MainLogo",
};
</script>

<style scoped>
.logo-image {
	height: 5rem;
}
.logo-text {
	display: inline;
	color: #bf763c;
	font-size: 4rem;
	position: relative;
	top: -1rem;
	cursor: default;
}
</style>
