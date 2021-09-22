/*
Description:        Checks the item to see if it is undefined. If yes, it 
                    pushes the router to a not-found page.

Parameters: 
    router          A valid vue-router instance.

    item            The item to be checked.
*/

export default (router, item) => {
    if (item == undefined) {
        router.push({ name: "not-found" });
        return false;
    } else {
        return true;
    }
}