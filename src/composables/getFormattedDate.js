export default () => {
    const date = new Date();
    const string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return string;
}