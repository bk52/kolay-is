import React from "react";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  const {
    cx,
    cy,
    midAngle,
    outerRadius,
    fill,
    payload,
    unit,
    value,
    centerText
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g>
      <text x={cx} y={cy} textAnchor="middle" fill={centerText.fill} >
        {centerText.title}
      </text>
      <text x={cx} y={cy} dy={24} textAnchor="middle" fill={centerText.fill} style={{fontSize:"20"}}>
        {centerText.value + centerText.unit}
      </text>

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        style={{ fontWeight: "bold" }}
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill={fill}
        style={{fontSize:"12"}}
      >       
        {payload.name }      
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill={fill}
        style={{fontSize:"14"}}
      >
        {value + " " + unit}
      </text>
    </g>
  );
};

const CustomPieChartLabel = React.memo(renderCustomizedLabel);

export default CustomPieChartLabel;
