// A group of functions that will mock a backend. These can easily be replaced with AJAX calls when a backend has been setup.


import plantData from "../assets/json/plants.json";
import { ref } from "vue";

const NUMBER_OF_PLANTS = 7;
// The number of times the data set will be repeated
const DATA_SIZE_MULTIPLER = 5;
// 


// Creates a function that will create duplicated images. 
export const plantFactory = () => {
    const currentImageRound = ref(0);

    return () => {
        const images = [];

        for (let i = 0; i < DATA_SIZE_MULTIPLER; i++) {
            for (let j = 0; j < NUMBER_OF_PLANTS; j++) {
                let copy = { ...plantData[j] };
                copy.baseId = plantData[j].id;
                copy.id = copy.id + NUMBER_OF_PLANTS * i + currentImageRound.value * DATA_SIZE_MULTIPLER * NUMBER_OF_PLANTS;
                images.push(copy);
            }
        }

        currentImageRound.value++;

        return images;
    }


};
