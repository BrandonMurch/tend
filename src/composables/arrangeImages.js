/**
 * Handles the organisation of images within the image gallery. Uses a vertical column layout. 
 */

import { ref } from 'vue';

export default () => {
    let numberOfColumns = 0;
    const imageColumns = ref([]);
    let loadedImages = 0;
    const allImagesLoaded = ref(false);
    const container = ref(null);

    // Assign each image to a column from left to right. 
    const splitImagesIntoColumns = (images) => {
        for (let i = 0; i < images.length; i++) {
            imageColumns.value[i % numberOfColumns].push(images[i]);
        }

        for (let i = 0; i < numberOfColumns; i++) {
            imageColumns.value[i].push();
        }
    };

    // Creates the number of columns based on the container width
    const initialiseColumns = () => {
        const pageMargins = 30;
        const cardWidth = 270;
        numberOfColumns = Math.floor(
            (container.value.clientWidth - pageMargins) / cardWidth
        );
        // Stop divisions by 0.
        if (numberOfColumns <= 0) {
            numberOfColumns = 1;
        }
        const columnQueue = [];
        for (let i = 0; i < numberOfColumns; i++) {
            columnQueue[i] = [];
        }

        imageColumns.value = columnQueue;
    };

    const updateColumns = (images) => {
        loadedImages = 0;

        initialiseColumns();
        splitImagesIntoColumns(images);
    };

    // Update the allImagesLoaded boolean.
    const setAllImagesLoadedIfTrue = (images) => {
        loadedImages++;
        if (loadedImages === images.length) {
            allImagesLoaded.value = true;
        }
    };

    return { container, allImagesLoaded, updateColumns, imageColumns, setAllImagesLoadedIfTrue }

}