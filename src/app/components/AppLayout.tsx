import { Outlet } from 'react-router';
import { FinanceProvider } from '../context/FinanceContext';

export default function AppLayout() {
  return (
    <FinanceProvider>
      <Outlet />
    </FinanceProvider>
  );
}
