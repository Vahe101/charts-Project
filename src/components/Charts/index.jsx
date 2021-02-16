import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { generateRandomColors, createColorsWithOpacity } from "../../shared/utils";

const CHART_COUNT = 8;

const Chart = ({ type, data }) => {
    const [backgroundColor, setBackgroundColor] = useState([]);
    const [prevBackgroundColor, setPrevBackgroundColor] = useState();
    const [colorsWithOpacity, setColorsWithOpacity] = useState([]);
    const [prevColorsWithOpacity, setPrevColorsWithOpacity] = useState();
    const [state, setState] = useState();
    const [options, setOptions] = useState();
    const [index, setIndex] = useState();

    useEffect(() => {
        if (backgroundColor.length !== data.length) {
            const colors = generateRandomColors(CHART_COUNT);
            backgroundColor.push(...colors);
            setBackgroundColor([...backgroundColor]);
        }
    }, [backgroundColor]);

    useEffect(() => {
        if (colorsWithOpacity.length !== data.length) {
            const colorsOpacity = createColorsWithOpacity(backgroundColor);
            colorsWithOpacity.push(...colorsOpacity);
            setColorsWithOpacity([...colorsWithOpacity]);
        }
    }, [colorsWithOpacity]);


    useEffect(() => {
        setState(getState(backgroundColor, colorsWithOpacity));
        setOptions(getOptions());
    }, []);


    const getState = (backgroundColor, colorsWithOpacity) => ({
        labels: [
            "Russia",
            "Canada",
            "USA",
            "China",
            "Brazil",
            "Australia",
            "India",
            "Others"
        ],
        datasets: [{
            label: "Rainfall",
            backgroundColor: backgroundColor,
            hoverBackgroundColor: colorsWithOpacity,
            data: data,
        }],
    });

    const getOptions = () => ({
        title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20
        },
        legend: {
            display: true,
            position: "right"
        },
        responsive: true,
    });

    const diagramClickHelper = (index, changeColor) => {
        debugger
        setIndex(index);
        setPrevBackgroundColor(backgroundColor.splice(index, 1, changeColor));
        setPrevColorsWithOpacity(colorsWithOpacity.splice(index, 1, changeColor));
        setBackgroundColor([...backgroundColor]);
        setColorsWithOpacity([...colorsWithOpacity]);
        setState(getState(backgroundColor, colorsWithOpacity));
    };

    const onDiagramClick = (elements) => {
        debugger
        const color = "#000000";
        if (elements.length > 0 && index >= 0) {
            backgroundColor.splice(index, 1, prevBackgroundColor);
            colorsWithOpacity.splice(index, 1, prevColorsWithOpacity);
            diagramClickHelper(elements[0]._index, color);
        }
        else if (elements.length > 0 && !index) {
            diagramClickHelper(elements[0]._index, color);
        }
        else if (elements.length === 0) {
            backgroundColor.splice(index, 1, prevBackgroundColor);
            colorsWithOpacity.splice(index, 1, prevColorsWithOpacity);
            setBackgroundColor([...backgroundColor]);
            setColorsWithOpacity([...colorsWithOpacity]);
            setState(getState(backgroundColor, colorsWithOpacity));
        }
    }

    switch (type) {
        case "bar":
            return (
                <div>
                    <Bar
                        type="bar"
                        data={state}
                        options={options}
                        onElementsClick={onDiagramClick}
                    />
                </div>
            );
        case "pie":
            return (
                <div>
                    <Pie
                        type="pie"
                        data={state}
                        options={options}
                        onElementsClick={onDiagramClick}
                    />
                </div>
            );
    }
};

export default Chart;
