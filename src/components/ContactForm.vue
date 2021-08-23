<template>
	<div class="contact-container">
		<form class="form" v-on:submit.stop.prevent="onSubmit">
			<h1 class="contact-title">Send us a message!</h1>
			<!-- label with hidden class for use with accessibility readers. -->
			<label class="hidden" for="name">Email address:</label>
			<input
				id="name"
				class="input-box desktop-side"
				placeholder="Name:"
				type="text"
				v-model="userName"
			/>
			<label class="hidden" for="email">Email address:</label>
			<input
				id="email"
				class="input-box desktop-side"
				placeholder="Email:"
				type="email"
				v-model="userEmail"
			/>
			<label class="hidden" for="message">Message:</label>
			<textarea
				class="input-box"
				id="message"
				placeholder="Enter a message..."
				type="text"
				v-model="userMessage"
			></textarea>
			<input class="button" type="submit" />
			<input class="button" type="reset" />
		</form>
	</div>
</template>

<script>
export default {
	name: "ContactForm",
	data() {
		return {
			userName: "",
			userEmail: "",
			userMessage: "",
		};
	},
	methods: {
		onSubmit() {
			alert(`Thank you ${this.userName}! We will get in touch shortly.`);
		},
	},
};
</script>

<style scoped>
h1 {
	color: #3f463d;
}

.contact-title {
	box-sizing: border-box;
	width: 100%;
	text-align: center;
	display: block;
	text-transform: lowercase;
	font-weight: normal;
	margin: 0.7rem;
	padding: 0.7rem;
}
.contact-container {
	width: 100%;
	display: flex;
	justify-content: center;
	position: relative;
	z-index: 5;
}

.form {
	width: 50%;
	max-width: 800px;
	min-width: 400px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

.input-box {
	box-sizing: border-box;
	width: 100%;
	border-radius: 10px;
	border: 4px solid #3d6b56;
	margin: 0.5rem;
	font-family: fell, serif;
	font-size: 1rem;
	padding: 0.5rem;
	background-color: rgba(255, 255, 255, 0.4);
}

.input-box:focus {
	outline: none;
	border: 4px solid #bf763c;
}

.input-box:invalid {
	border: 4px solid darkred;
}

.button {
	height: 2rem;
	width: 30%;
	display: block;
	float: right;
	border-radius: 5px;
	background-color: #3d6b56;
	color: #dce0d1;
	font-family: fell, serif;
	font-size: 1rem;
	margin-left: 1rem;
	text-transform: lowercase;
	cursor: pointer;
}

.button:hover {
	color: #dce0d1;
	background-color: #bf763c;
	height: 2.1rem;
	width: 35%;
}

@media (min-width: 800px) {
	.desktop-side {
		width: 46%;
	}
}
</style>
