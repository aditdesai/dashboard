import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import './Dashboard.css'

export default function HighCharts(props) {
    const optionsUT = {
        chart: {
            type: 'column',
            backgroundColor: '#121212'
        },
        title: {
            text: 'UT marks',
            style: { "color": "#ffffff" }
        },
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    color: '#ffffff'
                }
            }
        },
        yAxis: {
            title: {
                text: 'No of Students',
                style: { "color": "#ffffff" }
            },
            labels: {
                style: {
                    color: '#ffffff'
                }
            }
        },
        legend: {
            enabled: false
        },

        series: [
            {
                data: [
                    {
                        name: '0-7',
                        y: props.marksRangeCountUT['0-7']
                    },
                    {
                        name: '8-15',
                        y: props.marksRangeCountUT['8-15']
                    },
                    {
                        name: '16-20',
                        y: props.marksRangeCountUT['16-20']
                    },
                ]
            }
        ]
    }


    const optionsTT = {
        chart: {
            type: 'column',
            backgroundColor: '#121212'
        },
        title: {
            text: 'TT marks',
            style: { "color": "#ffffff" }
        },
        xAxis: {
            type: 'category',
            labels: {
                style: {
                    color: '#ffffff'
                }
            }
        },

        yAxis: {
            title: {
                text: 'No of Students',
                style: { "color": "#ffffff" }
            },
            labels: {
                style: {
                    color: '#ffffff'
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [
            {
                data: [
                    {
                        name: '0-39',
                        y: props.marksRangeCountTT['0-39']
                    },
                    {
                        name: '40-79',
                        y: props.marksRangeCountTT['40-79']
                    },
                    {
                        name: '80-100',
                        y: props.marksRangeCountTT['80-100']
                    },
                ]
            }
        ]
    }

    const optionsPie = {
        chart: {
          type: 'pie',
          backgroundColor: '#121212'
        },
        title: {
          text: 'Subject Wise Mark Distribution',
          style: { "color": "#ffffff" }
        },
        series: [{
          data: [{
            name: 'Physics',
            y: props.subjectWiseMarks["Physics"]
          }, {
            name: 'Chemistry',
            y: props.subjectWiseMarks["Chemistry"]
          }, {
            name: 'Maths',
            y: props.subjectWiseMarks["Maths"]
          }, {
            name: 'English',
            y: props.subjectWiseMarks["English"]
          }, {
            name: 'Computer Science',
            y: props.subjectWiseMarks["Computer Science"]
          }]
        }]
      }

    return (
        <>
            <h1> Highcharts </h1>
            <div id="highcharts" className="my-3">
                {
                    props.marksRangeCountTT['0-39'] + props.marksRangeCountTT['40-79'] + props.marksRangeCountTT['80-100'] !== 0 ?
                        <HighchartsReact highcharts={Highcharts} options={optionsTT}></HighchartsReact>
                        : ""
                }
                {
                    props.marksRangeCountUT['0-7'] + props.marksRangeCountUT['8-15'] + props.marksRangeCountUT['16-20'] !== 0 ?
                        <HighchartsReact highcharts={Highcharts} options={optionsUT}></HighchartsReact>
                        : ""
                }
                <HighchartsReact highcharts={Highcharts} options={optionsPie}></HighchartsReact>
            </div>
        </>

    )
}