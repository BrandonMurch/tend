<template>
	<NotificationShape
		:position="position"
		:isOpen="isOpen"
		@toggleOpen="$emit('toggleOpen')"
		colour="#3d6b56"
	>
		<template v-slot:content>
			<div class="text-container">
				<h1 class="title">Tip Of The Day</h1>
				<p class="tip">{{ getTipOfTheDay() }}</p>
			</div>
		</template>
		<template v-slot:icon>
			<IconLightBulb class="notification-icon" />
		</template>
	</NotificationShape>
</template>

<script>
import NotificationShape from "./NotificationShape.vue";
import IconLightBulb from "./IconLightBulb.vue";
import { getTipOfTheDay } from "../composables/mockTipOfTheDay";
export default {
	name: "TipOfTheDay",
	components: {
		IconLightBulb,
		NotificationShape,
	},
	props: {
		isOpen: Boolean,
		position: Number,
	},
	emits: ["toggleOpen"],
	setup() {
		return {
			getTipOfTheDay,
		};
	},
};
</script>

<style scoped>
.notification-icon {
	color: #dce0d1;
	margin-left: 1rem;
	height: 3rem;
}

.text-container {
	width: 80%;
	padding: 10%;
}

.title {
	text-align: center;
	margin-top: 0;
	color: #dce0d1;
}

.tip {
	margin: 4px;
	color: #dce0d1;
}

@media (max-width: 850px) {
	.notification-icon {
		margin-left: 0;
	}
}
</style>
