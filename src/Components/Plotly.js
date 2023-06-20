import Plot from "react-plotly.js"
import "./Plotly.css"

export default function Plotly(props) {
    const plot1 = [
        {
            x: Object.keys(props.marksRangeCountTT),
            y: Object.values(props.marksRangeCountTT),
            type: "bar"
        }
    ]

    const plot2 = [
        {
            x: Object.keys(props.marksRangeCountUT),
            y: Object.values(props.marksRangeCountUT),
            type: "bar"
        }
    ]

    const plot3 = [
        {
            values: Object.values(props.subjectWiseMarks),
            labels: Object.keys(props.subjectWiseMarks),
            type: "pie",
        }
    ]

    return (
        <>

            <div id="plotly" className="my-3">
                {
                    props.marksRangeCountTT['0-39'] + props.marksRangeCountTT['40-79'] + props.marksRangeCountTT['80-100'] !== 0 ?
                        <Plot data={plot1} layout={{ title: "TT data", width: "450", height: "500", font: { color: "#ffffff" }, plot_bgcolor: "#121212", paper_bgcolor: "#121212" }} />
                        : ""
                }
                {
                    props.marksRangeCountUT['0-7'] + props.marksRangeCountUT['8-15'] + props.marksRangeCountUT['16-20'] !== 0 ?
                        <Plot data={plot2} layout={{ title: "UT data", width: "450", height: "500", font: { color: "#ffffff" }, plot_bgcolor: "#121212", paper_bgcolor: "#121212" }} />
                        : ""
                }

                <Plot data={plot3} layout={{ width: 500, height: 500, title: 'Subject Wise Mark Distribution', font: { color: "#ffffff" }, plot_bgcolor: "#121212", paper_bgcolor: "#121212" }} />

            </div>
        </>
    )
}