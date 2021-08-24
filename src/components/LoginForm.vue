<template>
	<div class="login-container">
		<form
			class="form"
			id="loginForm"
			:class="{ submitted: hasSubmitted }"
			@submit.stop.prevent="onSubmit"
			@reset="resetForm"
		>
			<Input
				v-for="input in getInputs()"
				:key="input.label"
				:label="input.label"
				:type="input.type"
				:validation="input.validation"
				required
				v-model="formData[input.dataName]"
			/>

			<label for="rememberMe">Remember me:</label>
			<input
				id="rememberMe"
				type="checkbox"
				v-model="formData.rememberMe"
				:true-value="true"
				:false-value="false"
			/>

			<div class="button-container">
				<Button
					class="button"
					:type="'submit'"
					:form="'loginForm'"
					@click="hasSubmitted = true"
				>
					submit
				</Button>
				<Button class="button" :type="'reset'" :form="'loginForm'">
					reset
				</Button>
				<Button class="button" type="button" @click="toggleRegister">
					{{ register ? "Login" : "register" }}
				</Button>
			</div>
		</form>
	</div>
</template>

<script>
import Button from "./AppButton.vue";
import Input from "./AppInput.vue";
import { ref } from "@vue/reactivity";

const getDefaultForm = () => {
	return {
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
		rememberMe: false,
	};
};

const inputs = [
	{
		label: "Email",
		type: "email",
		dataName: "email",
		appearsIn: ["login", "register"],
	},
	{
		label: "Username",
		type: "text",
		dataName: "username",
		appearsIn: ["register"],
	},

	{
		label: "Password",
		type: "password",
		dataName: "password",
		appearsIn: ["login", "register"],
		validation: {
			minlength: 8,
			maxlength: 30,
		},
	},
	{
		label: "Confirm Password",
		type: "password",
		dataName: "confirmPassword",
		appearsIn: ["register"],
		validation: {
			minlength: 8,
			maxlength: 30,
		},
	},
];

export default {
	name: "LogInForm",
	components: { Button, Input },
	setup() {
		const register = ref(false);
		const hasSubmitted = ref(false);
		let formData = getDefaultForm();

		const getInputs = () => {
			return inputs.filter((input) =>
				input.appearsIn.includes(register.value ? "register" : "login")
			);
		};

		// Check that all fields contain some text, disregard confirm password and username if only loggin in.
		const areAllFieldsNotNull = () => {
			for (let input in inputs) {
				if (
					formData[input.data] == "" &&
					(register || !input.appearsIn.includes("register"))
				) {
					return false;
				}
			}
			return true;
		};

		// Set HTML5 custom error message on relevent password fields
		const setPasswordError = (error) => {
			document.getElementById("Password").setCustomValidity(error);
			if (register.value) {
				document
					.getElementById("Confirm Password")
					.setCustomValidity(error);
			}
		};

		const doPasswordsMatch = () => {
			if (
				register.value &&
				formData.password != formData.confirmPassword
			) {
				setPasswordError("Password and Confirm Password must match.");
				return false;
			}
			// Clear password error.
			setPasswordError("");
			return true;
		};

		const resetForm = () => {
			hasSubmitted.value = false;
			setPasswordError("");
			formData = getDefaultForm();
		};

		const onSubmit = (event) => {
			hasSubmitted.value = true;
			if (
				event.target.checkValidity() &&
				areAllFieldsNotNull() &&
				doPasswordsMatch()
			) {
				console.log("Logged in");
				event.target.reset();
			}
		};

		const toggleRegister = () => {
			resetForm();
			register.value = !register.value;
		};

		return {
			getInputs,
			register,
			formData,
			hasSubmitted,
			onSubmit,
			toggleRegister,
			resetForm,
		};
	},
	methods: {},
};
</script>

<style scoped>
.form {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.button-container {
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

@media (max-width: 800px) {
	.button {
		width: 60%;
	}
}

.errorMessage {
	color: #3f463d;
	width: 100%;
	text-align: center;
	margin: 0;
}

.login-container {
	padding: 3rem;
	border: 3px solid #b87d4b;
	border-radius: 20px;
	min-width: 200px;
}

.checkboxLabel {
	color: #3f463d;
}
</style>
