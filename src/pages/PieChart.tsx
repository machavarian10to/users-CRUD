import { Pie } from '@ant-design/plots';

type PieChartProps = {
  cityData: { type: string; value: number }[];
};

const PieChart = ({ cityData }: PieChartProps): JSX.Element => {
  const config = {
    appendPadding: 10,
    data: cityData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    style: {
      width: '50%',
      margin: 'auto',
    },
  };

  return (
    <Pie {...config} />
  )
}

export default PieChart