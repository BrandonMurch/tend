<template>
	<div class="container">
		<CloseIcon :isOpen="isOpen">
			<img class="icon" src="@/assets/images/MenuIcon.svg" />
		</CloseIcon>
	</div>
</template>

<script>
import CloseIcon from "./CloseIcon.vue";

export default {
	name: "MenuIcon",
	components: { CloseIcon },
	props: { isOpen: Boolean },
};
</script>

<style scoped>
.container {
	float: right;
	height: 4rem;
	width: 4rem;
	margin-right: 1rem;
	margin-top: 1rem;
}

.icon {
	height: 100%;
	width: 100%;
	cursor: pointer;
	fill: #bf763c;
}
</style>
