import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUsersRequest } from "../../store/chartsData/actions";
import Button from "../../shared/Button";
import BarChart from "../BarChart";
import PieChart from "../PieChart";

import "./index.scss";

const chartTypes = {
    pie: 'pie',
    bar: 'bar',
};

const Connected = ({ getUsersRequest, users }) => {
    const [contentVerification, setContentVerification] = useState(chartTypes.bar);

    useEffect(() => {
        getUsersRequest();
    }, []);

    const isDataExist = users.items.length > 0;

    return (
        <div className="container">
            <div className="buttonsDiv">
                <Button value="SimpleBarChart" onClick={() => setContentVerification(chartTypes.bar)} />
                <Button value="PieChart" onClick={() => setContentVerification(chartTypes.pie)} />
            </div>
            {isDataExist &&
                (<>
                    {contentVerification === chartTypes.bar && (<BarChart data={users.items} />)}
                    {contentVerification === chartTypes.pie && (<PieChart data={users.items} />)}
                </>)
            }
        </div>
    );
}

const mapStateToProps = () => ({ users }) => ({ users });

const mapDispatchToProps = { getUsersRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Connected);
