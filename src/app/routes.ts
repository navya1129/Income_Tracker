import { createBrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import Root from "./components/Root";
import FinanceLoginPage from "./components/pages/FinanceLoginPage";
import FinanceDashboard from "./components/pages/FinanceDashboard";
import AddTransaction from "./components/pages/AddTransaction";
import TransactionsHistory from "./components/pages/TransactionsHistory";
import Analytics from "./components/pages/Analytics";
import BudgetManagement from "./components/pages/BudgetManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        path: "/",
        Component: Root,
        children: [
          { index: true, Component: FinanceLoginPage },
          { path: "dashboard", Component: FinanceDashboard },
          { path: "add-transaction", Component: AddTransaction },
          { path: "transactions", Component: TransactionsHistory },
          { path: "analytics", Component: Analytics },
          { path: "budgets", Component: BudgetManagement },
        ],
      },
    ],
  },
]);