import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StudentExamCard from "../../../components/ExamCard/StudentExamCard";

const Home = () => {
  const [exams, setExams] = useState([]);
  const student = useSelector((state) => state.authData.user.student);
  console.log(student);

  useEffect(() => {
    const getExams = async () => {
      try {
        axios
          .post("http://localhost:3000/exam/get-exam-by-student", {
            year: student.year,
            division: student.division,
            batch: student.batch,
          })
          .then((response) => {
            console.log(response.data.exams);
            setExams(response.data.exams);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getExams();
  }, []);

  return (
    <div className="mt-3 grid h-full  gap-5 ">
      <div className="h-fit w-full ">
        {/* Recenlty Added setion */}
        <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            Scheduled Exams
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {exams.map((exam, index) => {
            return (
              <div key={index}>
                <StudentExamCard
                  courseName={exam.course}
                  examDateTime={exam.examDate + " " + exam.examTime}
                  examDuration={exam.examDuration}
                  year={exam.year}
                  division={exam.division}
                  batch={exam.batch}
                  status={"Starts on " + exam.examDate + " " + exam.examTime}
                  examCode={exam.examCode}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
