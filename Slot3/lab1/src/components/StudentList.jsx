import React from 'react';
import Student from './Student';
import studentData from '../data/studentData';

function StudentList() {
    return (
        <div className="row">
            {studentData.map((student) => (
                <div key={student.id} className="col-md-6 col-lg-4 mb-4">
                    <Student student={student} />
                </div>
            ))}
        </div>
    );
}

export default StudentList;