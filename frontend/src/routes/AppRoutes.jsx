import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Expenses from "../pages/expense/Expenses";
import AddExpense from "../pages/expense/AddExpense";
import EditExpense from "../pages/expense/EditExpense";
import Income from "../pages/income/Income";
import AddIncome from "../pages/income/AddIncome";
import EditIncome from "../pages/income/EditIncome";
import Budgets from "../pages/budget/Budgets";
import AddBudget from "../pages/budget/AddBudget";
import EditBudget from "../pages/budget/EditBudget"; 

import Reports from "../pages/reports/Reports";
import AISummary from "../pages/ai-summary/AISummary";
import Profile from "../pages/profile/Profile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />


        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />


          <Route
            path="/expenses"
            element={<Expenses />}
          />

          <Route
            path="/expenses/new"
            element={<AddExpense />}
          />

          <Route
            path="/expenses/:id/edit"
            element={<EditExpense />}
          />


          <Route
            path="/income"
            element={<Income />}
          />

          <Route
            path="/income/new"
            element={<AddIncome />}
          />

          <Route
            path="/income/:id/edit"
            element={<EditIncome />}
          />


          <Route
            path="/budgets"
            element={<Budgets />}
          />

          <Route
            path="/budgets/new"
            element={<AddBudget />}
          />

          <Route
            path="/budgets/:id/edit"
            element={<EditBudget />}
          />
         


          <Route
            path="/reports"
            element={<Reports />}
          />


          <Route
            path="/ai-summary"
            element={<AISummary />}
          />


          <Route
            path="/profile"
            element={<Profile />}
          />
        </Route>


        <Route
          path="*"
          element={<h1>404 - Page Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;