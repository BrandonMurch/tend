<!--
Description: Used to display an article

Props: 
	imageSource			The image url.

	title				The title of the article.

	subtitle			the subtitle for the article.

	text				The main text of the article.
-->

<template>
	<div v-if="validId" class="container">
		<img :src="article.imageSource" alt="title" class="image" />
		<h1>{{ article.title }}</h1>
		<h4>{{ article.datetime }}</h4>
		<p>{{ article.text }}</p>
		<div class="comment-container">
			<CardListWithTextbox
				:values="article.comments"
				@add="addComment"
				buttonText="Add Comment"
			/>
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import checkForValidId from "../composables/checkForValidId";
import CardListWithTextbox from "./CardListWithTextbox.vue";

export default {
	name: "ArticleDisplay",
	components: { CardListWithTextbox },
	props: {
		text: String,
		title: String,
		subtitle: {
			default: "",
			type: String,
		},
		imageSource: String,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const article = ref(
			store.getters["learn/articles/one"](route.params.id)
		);

		const validId = ref(checkForValidId(router, article.value));

		onBeforeRouteUpdate((to, from, next) => {
			article.value = store.getters["learn/articles/one"](to.params.id);
			validId.value = checkForValidId(router, article.value);
			next();
		});

		const addComment = (commentText) => {
			store.dispatch("learn/articles/addComment", {
				id: route.params.id,
				text: commentText,
			});
			article.value = store.getters["learn/articles/one"](
				route.params.id
			);
		};

		return { article, validId, addComment };
	},
};
</script>

<style scoped>
.container {
	position: relative;
	width: 90vw;
	max-width: 1000px;
}

.text-container {
	width: 100%;
	display: inline-block;
}

.image {
	float: left;
	max-width: 33%;
	margin: 0 2rem 2rem 1rem;
}

.comment-container {
	width: 80vw;
	max-width: 1000px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: auto;
}
</style>
