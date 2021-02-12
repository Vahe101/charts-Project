import React, { useEffect, useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { generateRandomColors, createColorsWithOpacity } from "../../shared/utils";

const CHART_COUNT = 8;

const BarChart = ({ data }) => {
    const colors = useMemo(() => generateRandomColors(CHART_COUNT), []);
    const colorsOpacity = useMemo(() => createColorsWithOpacity(colors), []);
    const [backgroundColor, setBackgroundColor] = useState(colors);
    const [colorsWithOpacity, setColorsWithOpacity] = useState(colorsOpacity);
    const [state, setState] = useState(null);
    const [options, setOptions] = useState(null);

    useEffect(() => {
        setState(getState(backgroundColor, colorsWithOpacity));
        setOptions(getOptions());
    }, [])

    const getState = (backgroundColor, colorsWithOpacity) => ({
        labels: ["Russia", "Canada", "USA", "China", "Brazil", "Australia", "India", "Others"],
        datasets: [{
            label: "Rainfall",
            backgroundColor: backgroundColor,
            hoverBackgroundColor: colorsWithOpacity,
            data: data,
        }]
    });

    const getOptions = () => ({
        title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
        },
        legend: {
            display: true,
            position: "right",
        },
        responsive: true,
    });

    const onDiagramClick = (elements) => {
        if (elements.length > 0) {
            const index = elements[0]._index;
            const randColor = generateRandomColors(1)[0];
            const randColorWithOpacity = randColor + "95";
            colors.splice(index, 1, randColor);
            colorsOpacity.splice(index, 1, randColorWithOpacity);
            setBackgroundColor([...colors]);
            setColorsWithOpacity([...colorsOpacity]);
            setState(getState(backgroundColor, colorsWithOpacity));
        }
    }

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
}

export default BarChart;
