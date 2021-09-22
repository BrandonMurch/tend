<!--
Description:  	Lists all relevant questions using CardText components. 
-->

<template>
	<div class="question-container">
		<transition-group name="fade">
			<CardText
				v-for="question of questions"
				:key="question.id"
				:text="question.text"
				:title="question.user"
				:subtitle="getFormattedDate(question.datetime)"
				@click="
					$router.push({
						name: 'question',
						params: { answered: 'answered', id: question.id },
					})
				"
				role="link"
				tabindex="0"
			/>
		</transition-group>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import CardText from "./CardText.vue";
import { getFormattedDate } from "../composables/getFormattedDate";
export default {
	name: "QuestionsViewList",
	components: { CardText },
	setup() {
		const store = useStore();
		const route = useRoute();
		const questions = ref(
			route.params.answered == "answered"
				? store.getters["learn/questions/answered"]
				: store.getters["learn/questions/unanswered"]
		);

		return { questions, getFormattedDate };
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";
.question-container {
	position: relative;
	width: 90vw;
	max-width: 800px;
	margin: auto;
}
</style>
