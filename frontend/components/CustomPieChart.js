import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import CustomPieChartLabel from './CustomPieChartLabel';


export default class Example extends PureComponent {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <ResponsiveContainer width="100%" height={250}>
                <PieChart width={this.props.width} height={this.props.height}>
                    <Pie  data={this.props.data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={70}
                        label={<CustomPieChartLabel centerText={this.props.centerText} />}>
                        {this.props.data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>  
        );
    }
}

