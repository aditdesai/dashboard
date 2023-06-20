from flask import Flask, jsonify, request
import mysql.connector

app = Flask(__name__)

@app.route('/', methods=['GET'])
def getMarksData():
    schoolId = request.args.get('schoolId').split(',')[0] if request.args.get('schoolId') else None
    studentId = request.args.get('studentId').split(',') if request.args.get('studentId') else None
    subject = request.args.get('subject').split(',') if request.args.get('subject') else None
    examType = request.args.get('examType').split(',') if request.args.get('examType') else None
    cls = request.args.get('class').split(',') if request.args.get('class') else None
    section = request.args.get('section').split(',') if request.args.get('section') else None

    if not schoolId:
        schoolId = "0"

    db = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="Adit@2002",
        database="sapta"
    )

    cursor = db.cursor()

    sql = "SELECT * FROM marks WHERE stu_id IN (SELECT stu_id FROM students"
    if schoolId or cls or section or studentId:
        sql += " WHERE"
        
        sql += " school_id = " + schoolId
        

        if cls:
            if len(cls) == 1:
                sql += " AND class = " + cls[0]
            else:
                sql += " AND class IN " + str(tuple(cls))
            
            if section:
                if len(section) == 1:
                    sql += " AND section = '" + section[0] + "'"
                else:
                    sql += " AND section IN " + str(tuple(section))
        
        if studentId:
            if len(studentId) == 1:
                sql += " AND stu_id = " + studentId[0]
            else:
                sql += " AND stu_id IN " + str(tuple(studentId))

    sql += ")"
    if subject:
        if len(subject) == 1:
            sql += " AND subject = '" + subject[0] + "'"
        else:
            sql += " AND subject IN " + str(tuple(subject))
    if examType:
        if len(examType) == 1:
            sql += " AND exam_type = '" + examType[0] + "'"
        else:
            sql += " AND exam_type IN " + str(tuple(examType))
    
    print(sql)
    cursor.execute(sql)
    data = cursor.fetchall()

    response = jsonify({'marks' : data})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/getschoolid', methods=['GET'])
def getSchoolID():
    db = mysql.connector.connect(
        host="localhost",
        port=3307,
        user="root",
        password="Adit@2002",
        database="sapta"
    )

    cursor = db.cursor()

    email = request.args.get('email')
    print(email)
    domain = email[email.index('@') + 1 :]
    sql = "SELECT school_id, name FROM schools WHERE domain = '" + domain + "'" 

    cursor.execute(sql)

    data = cursor.fetchone()


    response = jsonify({'schoolId' : data[0], 'name' : data[1]})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5000)