import { useState, useEffect, useRef } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase"
import axios from "axios"
import Select from 'react-select';
import Plotly from './Plotly'
import HighCharts from "./Highcharts";
import NivoCharts from "./Nivo";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const [schoolId, setSchoolId] = useState("")

    const [cls, setCls] = useState([])
    const [section, setSection] = useState([])
    const [studentId, setStudentId] = useState([])
    const [subject, setSubject] = useState([])
    const [examType, setExamType] = useState([])

    let url = "http://127.0.0.1:5000/?"

    const [studentData, setStudentData] = useState([])
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    const refVar = useRef();

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }

        if (user) {
            url = "http://127.0.0.1:5000/getschoolid?email=" + user.email
            console.log(url)
            axios.get(url)
                .then((res) => {
                    setSchoolId(res.data.schoolId)
                    localStorage.setItem("schoolName", res.data.name)
                })

        }
    }, [user])

    useEffect(() => {

        console.log("http://127.0.0.1:5000/?schoolId=" + schoolId)
        axios.get("http://127.0.0.1:5000/?schoolId=" + schoolId)
            .then((res) => {
                setStudentData(res.data.marks)
            })

    }, [schoolId])

    
    async function apiCall(event) {
        try {
            event.preventDefault()

            url = "http://127.0.0.1:5000/?"
            if (schoolId)
                url += "schoolId=" + schoolId + "&"
            if (cls.length !== 0) {
                url += "class="
                let classes = ""
                for (let ele of cls)
                    classes += ele.value + ","
                classes = classes.substring(0, classes.length - 1)
                url += classes + "&"
            }
            if (section.length !== 0) {
                url += "section="
                let sections = ""
                for (let ele of section)
                    sections += ele.value + ","
                sections = sections.substring(0, sections.length - 1)
                url += sections + "&"
            }
            if (studentId.length !== 0) {
                url += "studentId="
                let studentIds = ""
                for (let ele of studentId)
                    studentIds += ele.value + ","
                studentIds = studentIds.substring(0, studentIds.length - 1)
                url += studentIds + "&"
            }
            if (subject.length !== 0) {
                url += "subject="
                let subjects = ""
                for (let ele of subject)
                    subjects += ele.value.replaceAll(' ', '') + ","
                subjects = subjects.substring(0, subjects.length - 1)
                url += subjects + "&"
            }

            if (examType.length !== 0) {
                url += "examType="
                let examTypes = ""
                for (let ele of examType)
                    examTypes += ele.value + ","
                examTypes = examTypes.substring(0, examTypes.length - 1)
                url += examTypes + "&"
            }

            url = url.substring(0, url.length - 1)
            console.log(url)

            const response = await axios.get(url)
            setStudentData(response.data.marks)
        }
        catch (error) {
            console.log(error)
        }
    }

    const dropdownStyles = {
        control: (base) => ({
            ...base,
            background: "#212529"
        }),
        menuList: styles => ({
            ...styles,
            background: '#212529',
            color: "white"
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            background: isFocused
                ? '#121212'
                : isSelected
                    ? '#212529'
                    : undefined,
        }),

        singleValue: provided => ({
            ...provided,
            color: 'white'
        })
    }





    const examtypes = studentData.map(ele => ele[2])
    const subjects = studentData.map(ele => ele[1])
    const marks = studentData.map(ele => ele[3])

    const subjectWiseMarks = {
        "Physics": marks.filter((ele, index) => subjects[index] === "Physics").reduce((a, b) => a + b, 0),
        "Chemistry": marks.filter((ele, index) => subjects[index] === "Chemistry").reduce((a, b) => a + b, 0),
        "Maths": marks.filter((ele, index) => subjects[index] === "Maths").reduce((a, b) => a + b, 0),
        "English": marks.filter((ele, index) => subjects[index] === "English").reduce((a, b) => a + b, 0),
        "Computer Science": marks.filter((ele, index) => subjects[index] === "Computer Science").reduce((a, b) => a + b, 0),
    }


    const marksRangeCountUT = {
        "0-7": marks.filter((ele, index) => examtypes[index].includes("UT") && ele >= 0 && ele < 8).length,
        "8-15": marks.filter((ele, index) => examtypes[index].includes("UT") && ele >= 8 && ele < 16).length,
        "16-20": marks.filter((ele, index) => examtypes[index].includes("UT") && ele >= 16 && ele <= 20).length,
    }


    const marksRangeCountTT = {
        "0-39": marks.filter((ele, index) => examtypes[index].includes("TT") && ele >= 0 && ele < 40).length,
        "40-79": marks.filter((ele, index) => examtypes[index].includes("TT") && ele >= 40 && ele < 80).length,
        "80-100": marks.filter((ele, index) => examtypes[index].includes("TT") && ele >= 80 && ele <= 100).length,
    }

    return (
        <>
            <div className="flexbox w-100 mt-5">

                <div className="flex-item mb-3 mx-3">
                    <Select
                        isMulti
                        options={[{ value: "9", label: "9" }, { value: "10", label: "10" }, { value: "11", label: "11" }, { value: "12", label: "12" }]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={dropdownStyles}
                        placeholder="Class"
                        onChange={(e) => setCls(e)}
                    />
                </div>

                <div className="flex-item mb-3 mx-3">
                    <Select
                        isMulti
                        options={[{ value: "A", label: "A" }, { value: "B", label: "B" }, { value: "C", label: "C" }, { value: "D", label: "D" }]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={dropdownStyles}
                        placeholder="Section"
                        onChange={(e) => setSection(e)}
                    />
                </div>

                <div className="flex-item mb-3 mx-3">
                    <Select
                        isMulti
                        options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "100", label: "100" },
                            { value: "765", label: "765" }]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={dropdownStyles}
                        placeholder="Student ID"
                        onChange={(e) => setStudentId(e)}
                    />
                </div>

                <div className="flex-item mb-3 mx-3">
                    <Select
                        isMulti
                        options={[
                            { value: "UT-1", label: "UT-1" },
                            { value: "UT-2", label: "UT-2" },
                            { value: "UT-3", label: "UT-3" },
                            { value: "UT-4", label: "UT-4" },
                            { value: "TT-1", label: "TT-1" },
                            { value: "TT-2", label: "TT-2" }
                        ]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={dropdownStyles}
                        placeholder="Exam Type"
                        onChange={(e) => setExamType(e)}
                    />
                </div>

                <div className="flex-item mb-3 mx-3">
                    <Select
                        isMulti
                        options={[
                            { value: "Maths", label: "Maths" },
                            { value: "Physics", label: "Physics" },
                            { value: "Chemistry", label: "Chemistry" },
                            { value: "Computer Science", label: "Computer Science" },
                            { value: "English", label: "English" }
                        ]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={dropdownStyles}
                        placeholder="Subject"
                        onChange={(e) => setSubject(e)}
                    />
                </div>
            </div>

            <div className="text-center">
                <button type="submit" className="btn btn-outline-primary my-3 mx-2" onClick={apiCall}>Apply Filters</button>
                

            </div>

            {studentData.length !== 0 ?
                <div ref={refVar} id="page">
                    <HighCharts marksRangeCountTT={marksRangeCountTT} marksRangeCountUT={marksRangeCountUT} subjectWiseMarks={subjectWiseMarks} />
                    <Plotly marksRangeCountTT={marksRangeCountTT} marksRangeCountUT={marksRangeCountUT} subjectWiseMarks={subjectWiseMarks} />
                    <NivoCharts marksRangeCountTT={marksRangeCountTT} marksRangeCountUT={marksRangeCountUT} subjectWiseMarks={subjectWiseMarks} />
                </div>

                : ""}

        </>
    )
}