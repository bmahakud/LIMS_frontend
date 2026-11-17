import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { IndustrialLayout } from './components/layout/IndustrialLayout';
import { IndustrialHome } from './pages/industrial/IndustrialHome';
import { AboutLab } from './pages/industrial/AboutLab';
import { CapabilitiesPage } from './pages/industrial/CapabilitiesPage';
import { ProcessPage } from './pages/industrial/ProcessPage';
import { EquipmentPage } from './pages/industrial/EquipmentPage';
import { QualityPage } from './pages/industrial/QualityPage';
import { ContactPage } from './pages/industrial/ContactPage';
import { LabPortalLogin } from './pages/industrial/LabPortalLogin';
import { LabDashboard } from './pages/LabDashboard';

// Step 4 & 6 Private LIMS Workflows
import { SampleRegistryPage } from './pages/lims/SampleRegistryPage';
import { RegisterSamplePage } from './pages/lims/RegisterSamplePage';
import { SampleDetailPage } from './pages/lims/SampleDetailPage';
import { SampleReceiptPage } from './pages/lims/SampleReceiptPage';
import { TestChecklistPage } from './pages/lims/TestChecklistPage';
import { WorkOrdersPage } from './pages/lims/WorkOrdersPage';
import { VendorRegistryPage } from './pages/lims/VendorRegistryPage';
import { ProjectsMaterialsPage } from './pages/lims/ProjectsMaterialsPage';
import { ReportsListPage } from './pages/lims/ReportsListPage';
import { UserManagementPage } from './pages/lims/UserManagementPage';
import { UserCreatePage } from './pages/lims/UserCreatePage';
import { UserDetailPage } from './pages/lims/UserDetailPage';
import { UserEditPage } from './pages/lims/UserEditPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Full-Screen Dedicated LIMS Portal Login */}
          <Route path="/concepts/industrial/login" element={<LabPortalLogin />} />
          <Route path="/login" element={<Navigate to="/concepts/industrial/login" replace />} />

          {/* Protected LIMS Private Laboratory Routes */}
          <Route
            path="/lims/dashboard"
            element={
              <ProtectedRoute>
                <LabDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/samples"
            element={
              <ProtectedRoute>
                <SampleRegistryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/samples/new"
            element={
              <ProtectedRoute>
                <RegisterSamplePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/samples/:id"
            element={
              <ProtectedRoute>
                <SampleDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/receipt"
            element={
              <ProtectedRoute>
                <SampleReceiptPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/tests"
            element={
              <ProtectedRoute>
                <TestChecklistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/work-orders"
            element={
              <ProtectedRoute>
                <WorkOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/vendors"
            element={
              <ProtectedRoute>
                <VendorRegistryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/projects"
            element={
              <ProtectedRoute>
                <ProjectsMaterialsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/reports"
            element={
              <ProtectedRoute>
                <ReportsListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/users"
            element={<Navigate to="/lims/admin/users" replace />}
          />
          <Route
            path="/lims/admin/users"
            element={
              <ProtectedRoute requireAdmin>
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/admin/users/new"
            element={
              <ProtectedRoute requireAdmin>
                <UserCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/admin/users/:id"
            element={
              <ProtectedRoute requireAdmin>
                <UserDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lims/admin/users/:id/edit"
            element={
              <ProtectedRoute requireAdmin>
                <UserEditPage />
              </ProtectedRoute>
            }
          />

          {/* Main Public Application Routes */}
          <Route path="/concepts/industrial" element={<IndustrialLayout />}>
            <Route index element={<IndustrialHome />} />
            <Route path="about" element={<AboutLab />} />
            <Route path="capabilities" element={<CapabilitiesPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="equipment" element={<EquipmentPage />} />
            <Route path="quality" element={<QualityPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Root and /concepts Redirects */}
          <Route path="/" element={<Navigate to="/concepts/industrial" replace />} />
          <Route path="/concepts" element={<Navigate to="/concepts/industrial" replace />} />

          {/* Fallback Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/concepts/industrial" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
};

export default App;
