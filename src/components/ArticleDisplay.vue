<template>
	<div class="container">
		<img :src="article.imageSource" alt="title" class="image" />
		<h1>{{ article.title }}</h1>
		<h4>{{ article.datetime }}</h4>
		<p>{{ article.text }}</p>
	</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
	name: "ArticleDisplay",
	props: {
		deletable: {
			type: Boolean,
			default: false,
		},
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
		const article = ref(
			store.getters["learn/articles/one"](route.params.id)
		);

		console.log(article.value);

		return { article };
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
</style>
