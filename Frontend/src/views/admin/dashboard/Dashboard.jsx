import React from "react";
import ExamCard from "../../../components/ExamCard/ExamCard";
import axios from "axios";
import { useEffect, useState } from "react";
import UserContext from "../../../contexts/UserContext";

const ExamDashboard = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  let { user, setUser } = React.useContext(UserContext);

  console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:3000/exam/get-exams")
      .then((res) => {
        setExams(res.data.exams);
        setLoading(false);
        console.log(exams);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <>
                <ExamCard
                  courseName={exam.course}
                  secretCode={exam.examCode}
                  examDateTime={exam.examDate + " " + exam.examTime}
                  year={exam.year}
                  division={exam.division}
                  status={"Starts on " + exam.examDate + " " + exam.examTime}
                />
              </>
            );
          })}
          {/* <ExamCard
            courseName="Data Structures And Algorithms"
            courseCode="123456"
            secretCode="856584"
            examDateTime="24/03/2024 12:00 PM"
            year="TY BTECH"
            division="A"
            status="Starts on 24/03/2024 2:00 PM"
          />
          <ExamCard
            courseName="DSA"
            courseCode="CS-101"
            secretCode="748596"
            examDateTime="12/04/2023 12:00 PM"
            year="TY BTECH"
            division="A"
            status="Starts on 12/04/2023 12:00 PM"
          />
          <ExamCard
            courseName="Computer Networks"
            courseCode="CS-102"
            secretCode="856584"
            examDateTime="12/04/2023 12:00 PM"
            year="TY BTECH"
            division="A"
            status="Starts on 13/04/2023 2:00 PM"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;
