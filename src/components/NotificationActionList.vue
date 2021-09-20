<template>
	<NotificationShape
		:position="position"
		:isOpen="isOpen"
		@toggleOpen="$emit('toggleOpen')"
		:colour="colour"
		:count="plants.length"
	>
		<template v-slot:content>
			<div class="link-container" v-for="plant of plants" :key="plant.id">
				<router-link
					class="link"
					:to="{
						name: 'private-plant',
						params: { id: plant.id },
					}"
					>{{ plant.subtitle }}</router-link
				>
			</div>
		</template>
		<template v-slot:icon>
			<slot />
		</template>
	</NotificationShape>
</template>

<script>
import NotificationShape from "./NotificationShape.vue";
export default {
	name: "NotificationAction",
	components: { NotificationShape },
	props: {
		colour: String,
		plants: Array,
		position: Number,
		isOpen: Boolean,
	},
	emits: ["toggleOpen"],
};
</script>

<style scoped>
.link {
	color: #dce0d1;
	text-decoration: none;
}

.link-container {
	width: 100%;
	display: block;
	text-align: center;
	padding: 0.5rem;
}
</style>
