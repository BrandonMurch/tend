<!-- SINGLETON. The area where users can come to learn more about plants and discuss with others. This connects to articles and questions.  -->

<template>
	<transition name="fade">
		<PopUpTextBox
			v-if="askQuestionOpen"
			buttonText="ask question"
			@close="askQuestionOpen = false"
			@add="askQuestion"
		/>
	</transition>

	<div class="learn-container">
		<Input
			type="select"
			v-model="selectedCategory"
			label="Select a
			category to learn about..."
			:options="getCategories()"
		/>

		<div class="question-container">
			<Button role="link" tabindex="0" @click="askQuestionOpen = true">
				Ask Question
			</Button>
			<Button
				role="link"
				tabindex="0"
				@click="
					$router.push({
						name: 'questions-list',
						params: { answered: 'unanswered' },
					})
				"
			>
				Answer a question
			</Button>
			<Button
				role="link"
				tabindex="0"
				@click="
					$router.push({
						name: 'questions-list',
						params: { answered: 'answered' },
					})
				"
			>
				see all answered questions
			</Button>
		</div>

		<div class="category-container">
			<transition-group name="fade">
				<CardImageSmall
					v-for="article of articles"
					:key="article.id"
					:text="article.text"
					:title="article.title"
					:subtitle="getFormattedDate(article.datetime)"
					:imageSource="article.imageSource"
					@click="
						// Go to a specific article.
						$router.push({
							name: 'articles',
							params: { id: article.id },
						})
					"
					role="link"
					tabindex="0"
				/>
			</transition-group>

			<Button
				class="load-button"
				v-if="areThereMoreArticles"
				@click="getMoreArticles"
			>
				load more
			</Button>
		</div>
	</div>
</template>

<script>
import Button from "./AppButton.vue";
import Input from "./AppInput.vue";
import PopUpTextBox from "./PopUpTextBox.vue";
import CardImageSmall from "./CardImageSmall.vue";
import { getFormattedDate } from "../composables/getFormattedDate";
import { ref, watch } from "vue";
import { useStore } from "vuex";
export default {
	name: "LearnPlants",
	components: { Button, Input, CardImageSmall, PopUpTextBox },
	setup() {
		const askQuestionOpen = ref(false);
		const store = useStore();
		const selectedCategory = ref(null);
		const numberOfArticlesDisplaying = ref(2);

		// Get categories and format them for an select element.
		const getCategories = () => {
			const options = [];
			for (let option of store.getters["learn/categories/all"]) {
				options.push({ text: option, value: option });
			}
			return options;
		};

		// See if there are more articles. Display a load more button if there are.
		const checkForMoreArticles = () =>
			store.getters["learn/articles/all"].length >
			numberOfArticlesDisplaying.value;

		const areThereMoreArticles = ref(checkForMoreArticles());

		watch(numberOfArticlesDisplaying, () => {
			areThereMoreArticles.value = checkForMoreArticles();
		});

		// Get articles based on category.
		const getRelevantArticles = () => {
			if (
				selectedCategory.value == "all" ||
				selectedCategory.value == null
			) {
				return store.getters["learn/articles/all"].slice(
					0,
					numberOfArticlesDisplaying.value
				);
			} else {
				return store.getters["learn/articles/byCategories"](
					selectedCategory.value
				).slice(0, numberOfArticlesDisplaying.value);
			}
		};

		const articles = ref(getRelevantArticles());

		// Watch for more articles or a category change and then fetch articles.
		watch(numberOfArticlesDisplaying, () => {
			articles.value = getRelevantArticles();
		});
		watch(selectedCategory, () => {
			articles.value = getRelevantArticles();
			areThereMoreArticles.value = checkForMoreArticles();
		});

		const getMoreArticles = () => {
			numberOfArticlesDisplaying.value += 5;
		};

		// Ask a question.
		const askQuestion = (questionText) => {
			store.commit("learn/questions/add", {
				text: questionText,
				category: !selectedCategory.value
					? undefined
					: selectedCategory.value,
			});
			askQuestionOpen.value = false;
		};

		return {
			selectedCategory,
			getRelevantArticles,
			getFormattedDate,
			getCategories,
			articles,
			getMoreArticles,
			areThereMoreArticles,
			askQuestionOpen,
			askQuestion,
		};
	},
};
</script>

<style scoped>
@import "../assets/css/transitionFade.css";

.learn-container {
	max-width: 800px;
	margin: auto;
	position: relative;
}

.question-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 1rem;
}

.category-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	padding: 2rem 0 5rem 0;
	max-width: 800px;
	width: 90vw;
	margin: auto;
}

.load-button {
	margin-bottom: 5rem;
}
</style>
