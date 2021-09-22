<!--
Description: 		Contains buttons to press for certain actions. So far 
                    there                is "water", "repot" and "fertilize".

Props: 				
	actions			Possible actions from this image card. These will be 
					displayed in the form of a clickable icon. So far there is 
					"water", "repot" and "fertilize".
Emits: 
	performAction 	When an action button is called. Will return the action type
-->

<template>
	<div>
		<div
			v-if="actions.includes('water')"
			class="water-icon"
			@click="() => performAction('water', 'watered')"
			:style="{
				left: `${actions.indexOf('water') * 3}rem`,
			}"
		>
			<IconWater class="inner-icon" />
		</div>
		<div
			v-if="actions.includes('repot')"
			class="pot-icon"
			@click="() => performAction('repot', 'repotted')"
			:style="{
				left: `${actions.indexOf('repot') * 3}rem`,
			}"
		>
			<IconFlowerPot class="inner-icon" />
		</div>
		<div
			v-if="actions.includes('fertilize')"
			class="mushroom-icon"
			@click="() => performAction('fertilize', 'fertilized')"
			:style="{
				left: `${actions.indexOf('fertilize') * 3}rem`,
			}"
		>
			<IconMushroom class="inner-icon" />
		</div>
	</div>
</template>

<script>
import IconWater from "./Icons/IconWater.vue";
import IconMushroom from "./Icons/IconMushroom.vue";
import IconFlowerPot from "./Icons/IconFlowerPot.vue";
export default {
	name: "IconBarAction",
	components: { IconWater, IconMushroom, IconFlowerPot },
	props: {
		actions: Array,
	},
	emits: ["performAction"],
	setup(prop, { emit }) {
		const performAction = (type, verb) => {
			if (confirm(`Have you ${verb} your plant?`)) {
				emit("performAction", type);
			}
		};
		return { performAction };
	},
};
</script>

<style scoped>
.water-icon,
.pot-icon,
.mushroom-icon {
	position: absolute;
	border-radius: 50%;
	top: 0;
	height: 3rem;
	width: 3rem;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-content: center;
}

.water-icon {
	background-color: #136e9e;
	left: 0;
}
.pot-icon {
	background-color: #bf763c;
	left: 4rem;
}
.mushroom-icon {
	background-color: #3d6b56;
	left: 8rem;
}

.inner-icon {
	height: 3rem;
}
</style>
