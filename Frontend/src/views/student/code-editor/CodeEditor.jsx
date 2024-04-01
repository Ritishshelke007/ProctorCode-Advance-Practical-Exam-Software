import React, { useEffect, useState, useCallback } from "react";
import OutputWindow from "./components/OutputWindow";
import Problem from "./components/Problem";
import LanguageSelector from "./components/LanguageSelector";
import EditorWindow from "./components/EditorWindow";
import SplitterLayout from "react-splitter-layout-react-v18";
import "react-splitter-layout-react-v18/lib/index.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Modal from "../../../components/Modal/Modal";
import { setMonitoringData } from "../../../features/monitoring-data/monitorDataSlice";

const CodeEditor = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [activity, setActivity] = useState("");
  const examId = useSelector((state) => state.currentExamData.examId);
  const studentId = useSelector((state) => state.authData.user.student._id);
  const [problemStatement, setProblemStatement] = useState("");
  const [tabChanges, setTabChanges] = useState(0);
  // const handleTabChange = () => {
  //   //     setActivity("tabChangeCount");
  //   //     setOpen(true);
  //   console.log("Tab Change Detected");
  // };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/exam/get-monitoring-data/${examId}/${studentId}`
      )
      .then(({ data }) => {
        console.log(data);
        setProblemStatement(data.problemStatement);
        dispatch(setMonitoringData(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const handleTabChange = () => {
      if (document.hidden) {
        setActivity("tabChangeCount");
        setOpen(true);
        axios
          .post(
            `http://localhost:3000/monitor/update-count/${examId}/${studentId}`,
            {
              activity: "tabChangeCount",
            }
          )
          .then(({ data }) => {
            dispatch(setMonitoringData(data.studentData));
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    document.addEventListener("visibilitychange", handleTabChange);

    return () => {
      document.removeEventListener("visibilitychange", handleTabChange);
    };
  }, [tabChanges]);

  // useEffect(() => {
  //   // axios
  //   //   .get(
  //   //     "http://localhost:3000/exam/get-monitoring-data/591882/66014e8c1bd97b754386d08c"
  //   //   )
  //   //   .then(({ data }) => {
  //   //     console.log(data);
  //   //     setProblemStatement(data);
  //   //     dispatch(setMonitoringData(data));
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });

  //   setExamId("591882");
  //   setStudentId("66014e8c1bd97b754386d08c");

  //   const handleTabChange = () => {
  //     setActivity("tabChangeCount");
  //     setOpen(true);
  //   };

  //   document.addEventListener("visibilitychange", handleTabChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleTabChange);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (activity === "tabChangeCount" && examId && studentId) {
  //     axios
  //       .post(
  //         `http://localhost:3000/monitor/update-count/${examId}/${studentId}`,
  //         {
  //           activity: "tabChangeCount",
  //         }
  //       )
  //       .then(({ data }) => {
  //         console.log(data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [activity, examId, studentId]);

  // const toggleFullscreen = () => {
  //   const docElement = document.documentElement;
  //   if (!isFullscreen) {
  //     if (docElement.requestFullscreen) {
  //       docElement.requestFullscreen();
  //     } else if (docElement.webkitRequestFullscreen) {
  //       /* Safari */
  //       docElement.webkitRequestFullscreen();
  //     } else if (docElement.msRequestFullscreen) {
  //       /* IE11 */
  //       docElement.msRequestFullscreen();
  //     }
  //   }
  //   setIsFullscreen(true);
  // };

  return (
    <>
      <Modal activity={activity} open={open} onClose={() => setOpen(false)}>
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
      </Modal>

      <div id="main">
        <SplitterLayout primaryIndex={1} secondaryInitialSize={350}>
          <Problem />

          <SplitterLayout secondaryInitialSize={300}>
            <SplitterLayout vertical>
              <EditorWindow id="editor-container" />
              <OutputWindow />
            </SplitterLayout>
          </SplitterLayout>
        </SplitterLayout>
      </div>
    </>
  );
};

export default CodeEditor;
