import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import './Nivo.css'

export default function NivoCharts(props) {
    const nivoTheme = {
        "background": "#121212",
        "text": {
            "fontSize": 11,
            "fill": "#ffffff",

        },
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#ffffff",
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": "#ffffff",
                }
            },
            "ticks": {
                "text": {
                    "fontSize": 11,
                    "fill": "#ffffff",
                }
            }
        }
    }
    const nivoDataTT = [
        {
            range: '0-39',
            count: props.marksRangeCountTT['0-39']
        },
        {
            range: '40-79',
            count: props.marksRangeCountTT['40-79']
        },
        {
            range: '80-100',
            count: props.marksRangeCountTT['80-100']
        }
    ]

    const nivoDataUT = [
        {
            range: '0-7',
            count: props.marksRangeCountUT['0-7']
        },
        {
            range: '8-15',
            count: props.marksRangeCountUT['8-15']
        },
        {
            range: '16-20',
            count: props.marksRangeCountUT['16-20']
        }
    ]

    const pieData = [
        {
            "id": "Physics",
            "label": "Physics",
            "value": props.subjectWiseMarks["Physics"],
            "color": "hsl(163, 70%, 50%)"
        },
        {
            "id": "Chemistry",
            "label": "Chemistry",
            "value": props.subjectWiseMarks["Chemistry"],
            "color": "hsl(38, 70%, 50%)"
        },
        {
            "id": "Maths",
            "label": "Maths",
            "value": props.subjectWiseMarks["Maths"],
            "color": "hsl(353, 70%, 50%)"
        },
        {
            "id": "English",
            "label": "English",
            "value": props.subjectWiseMarks["English"],
            "color": "hsl(90, 70%, 50%)"
        },
        {
            "id": "Computer Science",
            "label": "Computer Science",
            "value": props.subjectWiseMarks["Computer Science"],
            "color": "hsl(339, 70%, 50%)"
        }
    ]

    return (
        <>
            <div id="nivo" className="my-3">
                {
                    props.marksRangeCountTT['0-39'] + props.marksRangeCountTT['40-79'] + props.marksRangeCountTT['80-100'] !== 0 ?
                        <ResponsiveBar
                            data={nivoDataTT}
                            keys={["count"]}
                            indexBy="range"
                            width={400}
                            height={400}
                            margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
                            padding={0.3}
                            theme={nivoTheme}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'range',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'count',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}

                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                        : ""
                }
                {
                    props.marksRangeCountUT['0-7'] + props.marksRangeCountUT['8-15'] + props.marksRangeCountUT['16-20'] !== 0 ?
                        <ResponsiveBar
                            data={nivoDataUT}
                            keys={["count"]}
                            indexBy="range"
                            width={400}
                            height={400}
                            margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
                            padding={0.3}
                            theme={nivoTheme}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'range',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'count',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}

                            animate={true}
                            motionStiffness={90}
                            motionDamping={15}
                        />
                        : ""
                }


                <ResponsivePie
                    data={pieData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    width={500}
                    height={500}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    arcLinkLabelsTextColor="#ffffff"
                />


            </div>
        </>
    )
}