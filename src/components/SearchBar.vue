// Search autocomplete inspired from
https://www.w3schools.com/howto/howto_js_autocomplete.asp

<template>
	<div style="display: inline;">
		<!-- Create pop up if a plant has been selected through the search bar. -->
		<!-- TODO: Can this be extracted to make search bar more reusable? -->
		<PopUp
			v-if="searchResultForPopUp"
			v-bind="searchResultForPopUp"
			@close="searchResultForPopUp = null"
		/>
		<DropDown :isOpen="isOpen">
			<template v-slot:inside>
				<div class="search-container" ref="searchbar">
					<!-- Search bar -->
					<input
						class="search-input"
						type="text"
						placeholder="search for a plant species (example: monstera deliciosa)"
						v-model="searchTerm"
					/>
					<div class="suggestion-box">
						<!-- Populated with suggestions for autocomplete -->
						<h3
							v-for="suggestion in suggestions"
							:key="suggestion"
							class="suggestion-text"
							:class="{
								suggestionFocus: isFocusedSuggestion(
									suggestion
								),
							}"
							@click="() => submitSearch(suggestion)"
						>
							{{ suggestion }}
						</h3>
					</div>
				</div>
			</template>
		</DropDown>
	</div>
</template>

<script>
import DropDown from "./DropDown.vue";
import PopUp from "./PopUp.vue";

import plantData from "../assets/json/plants.json";

export default {
	name: "SearchBar",
	components: { DropDown, PopUp },
	props: { isOpen: Boolean },
	watch: {
		isOpen: function(value) {
			if (!value) {
				this.close();
			}
		},
	},
	data() {
		return {
			searchTerm: "",
			searchOptions: plantData.map((plant) => plant.title.toLowerCase()),
			suggestions: [],
			focusedIndex: -1,
			focusedSuggestion: "",
			searchResultForPopUp: undefined,
		};
	},
	methods: {
		close() {
			this.suggestions = [];
			this.focusedIndex = -1;
			this.focusedSuggestion = "";
			this.searchTerm = "";
			this.$emit("close");
		},
		handleKeyUp(event) {
			if (this.suggestions.length === 0) {
				this.getSuggestions();
			}
			switch (event.key) {
				// Submit search
				case "Enter":
					if (this.focusedSuggestion === "") {
						this.submitSearch(this.searchTerm);
					} else {
						this.submitSearch(this.focusedSuggestion);
					}
					break;
				case "Escape":
					this.close();
					break;
				case "ArrowDown":
					// Shift to the focused suggestion below the current.
					if (this.focusedIndex < this.suggestions.length - 1) {
						this.focusedIndex++;
						this.focusedSuggestion = this.suggestions[
							this.focusedIndex
						];
					}
					break;
				case "ArrowUp":
					// Shift to the focused suggestion above the current.
					if (this.focusedIndex > 0) {
						this.focusedIndex--;
						this.focusedSuggestion = this.suggestions[
							this.focusedIndex
						];
						// Unfocus suggestions if the current suggestion is on top.
					} else if (this.focusedIndex == 0) {
						this.focusedIndex = -1;
						this.focusedSuggestion = "";
					}
					break;
				default:
					// Letter has been typed. Regenerate suggestions.
					this.focusedIndex = -1;
					this.focusedSuggestion = "";
					this.getSuggestions();
			}
		},
		isFocusedSuggestion(suggestion) {
			return this.focusedSuggestion == suggestion;
		},
		getSuggestions() {
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
			const regexPattern = new RegExp(
				"^" + this.searchTerm.toLowerCase() + ".*$"
			);
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
			this.suggestions = this.searchOptions.filter((option) =>
				regexPattern.test(option.toLowerCase())
			);
		},
		submitSearch(input) {
			this.close();
			const searchResult = plantData.find(
				(plant) => plant.title.toLowerCase() == input
			);
			if (searchResult) {
				this.searchResultForPopUp = searchResult;
			} else {
				alert("Your search could not be found.");
			}
		},
	},
	created() {
		window.addEventListener("keyup", this.handleKeyUp);
	},
	unmounted() {
		window.addEventListener("keyup", this.handleKeyUp);
	},
};
</script>

<style scoped>
.suggestion {
	cursor: pointer;
	display: flex;
}

.suggestion-text {
	cursor: pointer;
	width: fit-content;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
	font-weight: normal;
}

.suggestion-text:hover,
.suggestionFocus {
	font-weight: bold;
}

.search-container {
	width: 100%;
	display: block;
}

.search-input {
	position: relative;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.05);
	border: none;
	height: 2rem;
	text-align: center;
	color: #3f463d;
	font-family: fell, serif;
	font-size: 2rem;
	padding: 1rem;
	border-bottom: 2px solid gray;
}
</style>
