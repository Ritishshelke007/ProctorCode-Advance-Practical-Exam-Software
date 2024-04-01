import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../../components/Modal/Modal";
import { setCode } from "../../../../features/result/resultSlice";
import EndExamModal from "../../../../components/Modal/EndExam";

const Problem = ({ ps }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState("");
  const student = useSelector((state) => state.authData.user.student);
  const monitoringData = useSelector((state) => state.monitoringData.monitor);
  const allotedProblemStatement = ps;
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const { examCode } = useParams();
  console.log(monitoringData.problemStatement);
  const code = useSelector((state) => state.codeEditorData.code);

  const handleEndExam = () => {
    setOpen(true);
    setActivity("endExam");

    dispatch(setCode(code));
  };

  return (
    <div className="p-4 relative h-full">
      <EndExamModal
        activity={activity}
        open={open}
        onClose={() => setOpen(false)}
      >
        {/* Content of your modal */}
        <div className="text-center w-full h-52 z-50 flex justify-center items-center flex-col gap-10">
          <div className="mx-auto my-4 w-full">
            <h3 className="text-lg font-black text-gray-800">
              Tab Change Detected
            </h3>
            <p className="text-md text-gray-700 font-semibold">
              Tab change activity will be notified to faculty
            </p>
          </div>

          <button
            className="text-white bg-blueSecondary p-3 rounded-lg w-full"
            //  onClick={handleClick}
          >
            Enter Fullscreen
          </button>
        </div>
      </EndExamModal>
      <div>
        <p className="font-semibold">PRN : {student.prn}</p>
        <p className="font-semibold">Name: {student.name}</p>
      </div>
      <p className="font-semibold mt-10">Alloted Problem Statement : </p>

      <p className="mt-5">{monitoringData.problemStatement}</p>

      <button
        className="absolute bottom-5 rounded-lg font-semibold p-4 bg-blueSecondary text-white"
        onClick={handleEndExam}
      >
        End Exam
      </button>
    </div>
  );
};

export default Problem;
