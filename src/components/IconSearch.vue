<!-- Wrapper for the search icon. Has a small, or large size. -->

<template>
	<div
		class="container"
		:class="{ small: size == 'small', large: size == 'large' }"
	>
		<CloseIcon :isOpen="isOpen">
			<svg
				class="icon"
				xmlns="http://www.w3.org/2000/svg"
				height="48px"
				viewBox="0 0 24 24"
				width="48px"
			>
				<path
					d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
				/>
			</svg>
		</CloseIcon>
	</div>
</template>

<script>
import CloseIcon from "./IconClose.vue";
export default {
	name: "SearchIcon",
	components: { CloseIcon },
	props: {
		isOpen: Boolean,
		size: {
			default: "large",
			type: String,
			validator: (value) => {
				return ["small", "large"].includes(value);
			},
		},
	},
};
</script>

<style scoped>
.small {
	height: 2rem;
	width: 2rem;
	margin-right: 2rem;
	margin-top: 2rem;
}

.large {
	height: 4rem;
	width: 4rem;
	margin-right: 1rem;
	margin-top: 1rem;
}

.container {
	float: right;
}

.icon {
	height: 100%;
	width: 100%;
	cursor: pointer;
	fill: #bf763c;
}
</style>
