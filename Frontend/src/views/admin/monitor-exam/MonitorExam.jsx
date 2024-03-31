import React, { useState, useEffect, useMemo } from "react";
import Card from "../../../components/Card/Card";
import CardMenu from "../../../components/CardMenu/CardMenu";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";

const MonitorExam = () => {
  const [data, setData] = useState([]);

  const { examcode } = useParams();
  console.log(examcode);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "studentName",
      },
      {
        Header: "PRN",
        accessor: "studentPrn",
      },
      {
        Header: "Start Time",
        accessor: "startTime",
      },
      {
        Header: "Tab Change",
        accessor: "tabChangeCount",
      },
      {
        Header: "Copy Paste",
        accessor: "copyPasteCount",
      },
      {
        Header: "Hardware Detected",
        accessor: "hardwareDetectedCount",
      },
      {
        Header: "No Face",
        accessor: "noFaceDetectedCount",
      },
      {
        Header: "Submission Status",
        accessor: "submissionStatus",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:3000/exam/get-exam-by-code/${examcode}`)
      .then((res) => {
        console.log(res.data.exam.monitoringData);
        setData(res.data.exam.monitoringData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Card extra={"w-full mt-12 h-full p-4 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Students appearing for the exam
        </div>
        <CardMenu />
      </div>

      <div className="mt-8 h-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    className="border-b border-gray-200 pr-10 pb-[10px] text-start dark:!border-navy-700"
                  >
                    <p className="text-xs tracking-wide text-gray-600">
                      {column.render("Header")}
                    </p>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr className="my-2" {...row.getRowProps} key={index}>
                  {row.cells.map((cell) => {
                    let data = "";
                    if (cell.column.Header === "Start Time") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value || "Not Started"}
                        </p>
                      );
                    } else if (cell.column.Header === "Submission Status") {
                      data = (
                        <div className="flex items-center gap-1">
                          <div className={`rounded-full text-xl`}>
                            {cell.value === true ? (
                              <MdCheckCircle className="text-green-500" />
                            ) : (
                              <MdCancel className="text-red-500" />
                            )}
                          </div>
                          <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {cell.value === true ? "Submitted" : "Pending"}
                          </p>
                        </div>
                      );
                    } else {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="text-sm font-bold text-navy-700 dark:text-white pt-5"
                        key={index}
                      >
                        {data}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MonitorExam;
