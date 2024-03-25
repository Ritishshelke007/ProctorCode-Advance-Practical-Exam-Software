import { useState } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "./layouts/auth";
import Home from "./pages/auth/Home";
import AdminLayout from "./layouts/admin";
import RootLayout from "./layouts/rootLayout";
import StudentLayout from "./layouts/student";
import SignIn from "./pages/auth/Signin";
import StudentSignUp from "./pages/auth/StudentSignUp";
import FacultySignUp from "./pages/auth/FacultySignUp";
import FacultySignIn from "./pages/auth/FacultySignIn";
import ExamDashboard from "./views/admin/Dashboard";
import AddCourse from "./views/admin/AddCourse";
import CreateExam from "./views/admin/CreateExam";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin/login" element={<FacultySignIn />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<ExamDashboard />} />
          <Route path="/admin/add-course" element={<AddCourse />} />
          <Route path="/admin/create-exam" element={<CreateExam />} />
        </Route>
        <Route path="/student/signup" element={<StudentSignUp />} />
        <Route path="/admin/signup" element={<FacultySignUp />} />
      </Route>

      <Route path="/admin" element={<AuthLayout />}></Route>

      <Route path="/student" element={<AdminLayout />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
