<template>
	<transition name="expand">
		<slot />
	</transition>
</template>

<script>
export default {
	name: "ExpandTransition",
	data() {
		return {};
	},
};
</script>

<style scoped>
.expand-enter-active {
	transition: all 0.5s !important;
}
.expand-leave-active {
	transition: all 0.2s;
}
.expand-enter-from,
.expand-leave-to {
	transform: translateX(10px);
	opacity: 0 !important;
}

.expand-enter-to,
.expand-leave-from {
	opacity: 1 !important;
}
</style>
