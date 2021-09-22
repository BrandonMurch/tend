<!--
Description: Displays a single question, with all responses. Also includes a textbox for replies.  
-->

<template>
	<div class="question-container">
		<CardListWithTextbox
			buttonText="save response"
			:values="[question, ...question.responses]"
			@add="addResponse"
		/>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import CardListWithTextbox from "./CardListWithTextbox.vue";
import { getFormattedDate } from "../composables/getFormattedDate";
export default {
	name: "QuestionsViewSingle",
	components: { CardListWithTextbox },
	setup() {
		const store = useStore();
		const route = useRoute();
		const question = ref(
			store.getters["learn/questions/one"](route.params.id)
		);

		const addResponse = (text) => {
			store.commit("learn/questions/addResponse", {
				text,
				questionId: question.value.id,
			});
			question.value = store.getters["learn/questions/one"](
				route.params.id
			);
		};

		return { question, getFormattedDate, addResponse };
	},
};
</script>

<style scoped>
.question-container {
	position: relative;
	margin: auto;
	max-width: 700px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
</style>
