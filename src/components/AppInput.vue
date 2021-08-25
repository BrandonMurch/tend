<!-- 
An input component that applies common styling to all inputs. It also allows
creation of many inputs from a list. Validation can be applied to individual
inputs by putting all validation key/values into an object. Checkboxes are unable to be implemented due to issues with v-model.

https://v3.vuejs.org/guide/component-basics.html#using-v-model-on-components
-->

<template>
	<div class="inputContainer" :class="{ halfInput: size === 'half' }">
		<!-- label with hidden class for use with accessibility readers. -->
		<label class="hidden" :for="label">{{ label }}</label>

		<select
			v-if="type == 'select'"
			:id="label"
			class="inputBox"
			:value="modelValue"
			:required="required"
			v-bind="validation"
			@change="$emit('update:modelValue', $event.target.value)"
		>
			<!-- Create an option that shows the label initially but is unselectable -->
			<option value="" selected disabled>{{ label }}</option>
			<option
				v-for="option in options"
				:key="option.value"
				:value="option.value"
			>
				{{ option.text }}
			</option>
		</select>

		<textarea
			v-else-if="type === 'textarea'"
			:id="label"
			class="inputBox"
			:value="modelValue"
			:required="required"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder="label"
			v-bind="validation"
		/>

		<input
			v-else
			:id="label"
			class="inputBox"
			:value="modelValue"
			:required="required"
			@input="$emit('update:modelValue', $event.target.value)"
			:placeholder="label"
			:type="type"
			v-bind="validation"
		/>
	</div>
</template>

<script>
export default {
	name: "Input",
	emits: ["update:modelValue"],
	props: {
		modelValue: String,
		label: String,
		required: Boolean,
		options: Array,
		validation: Object,
		type: {
			default: "text",
			type: String,
		},

		size: {
			default: "full",
			type: String,
			validator: (value) => {
				return ["half", "full"].includes(value);
			},
		},
	},
	setup() {},
};
</script>

<style scoped>
.inputContainer {
	display: flex;
	justify-content: center;
	width: 100%;
}

.inputBox {
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

.inputBox:focus {
	outline: none;
	border: 4px solid #bf763c;
}

form.submitted .inputBox:invalid {
	border: 4px solid darkred;
}

@media (min-width: 800px) {
	.halfInput {
		width: 50%;
	}
}
</style>
