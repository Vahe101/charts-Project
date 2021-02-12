export const generateRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const element = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(element);
    };
    return colors;
};


export const createColorsWithOpacity = (colorsArray) => {
    const colors = [];
    for (let i = 0; i < colorsArray.length; i++) {
        const colorWithOpacity = colorsArray[i] + "95";
        colors.push(colorWithOpacity);
    };
    return colors;
};