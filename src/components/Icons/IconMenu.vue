<!-- Component to store the menu icon and handles sizing. -->

<template>
	<div class="container">
		<CloseIcon :isOpen="isOpen">
			<img class="icon" src="@/assets/images/MenuIcon.svg" />
		</CloseIcon>
	</div>
</template>

<script>
import CloseIcon from "./IconClose.vue";

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
