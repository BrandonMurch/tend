/*
    Stops multiple requests from being called. For example, waits
    until the user is finished resizing the screen before calling 
    the function. 

    https://www.freecodecamp.org/news/javascript-debounce-example/
*/


export function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}