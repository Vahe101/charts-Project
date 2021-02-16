import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Chart from "../Charts";
import Button from "../../shared/Button";
import { getUsersRequest } from "../../store/chartsData/actions";

import "./index.scss";

const chartTypes = {
    pie: 'pie',
    bar: 'bar',
};

const Connected = ({ getUsersRequest, users }) => {
    const [activeChart, setActiveChart] = useState(chartTypes.bar);

    useEffect(() => {
        getUsersRequest();
    }, []);

    const isDataExist = users.items.length > 0;

    return (
        <div className="container">
            <div className="buttonsDiv">
                <Button value="SimpleBarChart" onClick={() => setActiveChart(chartTypes.bar)} />
                <Button value="PieChart" onClick={() => setActiveChart(chartTypes.pie)} />
            </div>
            {isDataExist &&
                (<>
                    {activeChart === chartTypes.bar && (<Chart data={users.items} type={chartTypes.bar} />)}
                    {activeChart === chartTypes.pie && (<Chart data={users.items} type={chartTypes.pie} />)}
                </>)
            }
        </div>
    );
}

const mapStateToProps = () => ({ users }) => ({ users });

const mapDispatchToProps = { getUsersRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Connected);
