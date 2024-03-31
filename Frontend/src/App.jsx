import { useState } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  createRoutesFromElements,
  Routes,
} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";
import RootLayout from "./layouts/rootLayout";
import SignIn from "./pages/auth/Signin";
import StudentSignUp from "./pages/auth/StudentSignUp";
import FacultySignUp from "./pages/auth/FacultySignUp";
import FacultySignIn from "./pages/auth/FacultySignIn";
import ExamDashboard from "./views/admin/dashboard/Dashboard";
import AddCourse from "./views/admin/add-course/AddCourse";
import CreateExam from "./views/admin/create-exam/CreateExam";
import UserContextProvider from "./contexts/UserContextProvider";
import Courses from "./views/admin/courses/Courses";
import MonitorExam from "./views/admin/monitor-exam/MonitorExam";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route path="/" element={<AuthLayout />}>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/signup" element={<StudentSignUp />} />
//         <Route path="/admin/login" element={<FacultySignIn />} />
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route path="/admin/dashboard" element={<ExamDashboard />} />
//           <Route path="/admin/add-course" element={<AddCourse />} />
//           <Route path="/admin/create-exam" element={<CreateExam />} />
//         </Route>
//         <Route path="/student/signup" element={<StudentSignUp />} />
//         <Route path="/admin/signup" element={<FacultySignUp />} />
//       </Route>

//       <Route path="/admin" element={<AuthLayout />}></Route>

//       <Route path="/student" element={<AdminLayout />} />
//     </Route>
//   )
// );

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<StudentSignUp />} />
        <Route path="/admin" element={<FacultySignIn />} />
        <Route path="/admin/signup" element={<FacultySignUp />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<ExamDashboard />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/create-exam" element={<CreateExam />} />
          <Route
            path="/admin/dashboard/exam/:examcode"
            element={<MonitorExam />}
          />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
