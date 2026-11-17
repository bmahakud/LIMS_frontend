/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { AuthContext } from '../context/AuthContext';

describe('Frontend Architecture & RBAC Quality Gate', () => {
  it('renders loading state when auth context is initializing', () => {
    const mockContextValue: any = {
      user: null,
      isLoading: true,
      isAuthenticated: false,
      activeMembership: null,
      login: vi.fn(),
      logout: vi.fn(),
      setActiveMembership: vi.fn(),
      refreshUser: vi.fn(),
    };

    render(
      <AuthContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ProtectedRoute>
            <div>Protected Content</div>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Verifying Security Clearance/i)).toBeInTheDocument();
  });

  it('renders restricted access notice when user lacks required role', () => {
    const mockUser: any = {
      id: 'test-user-id',
      email: 'tech@danieli-corus.com',
      first_name: 'Tech',
      last_name: 'One',
      is_staff: false,
      is_superuser: false,
      memberships: [
        {
          id: 'mem-1',
          role: { role_type: 'LAB_TECHNICIAN', name: 'Lab Technician' },
          facility_id: 'fac-1',
          facility_name: 'RTC IJmuiden',
          is_active: true,
        },
      ],
    };

    const mockContextValue: any = {
      user: mockUser,
      isLoading: false,
      isAuthenticated: true,
      activeMembership: mockUser.memberships[0],
      login: vi.fn(),
      logout: vi.fn(),
      setActiveMembership: vi.fn(),
      refreshUser: vi.fn(),
    };

    render(
      <AuthContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ProtectedRoute requireAdmin>
            <div>Admin Secret Console</div>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Access Restricted/i)).toBeInTheDocument();
    expect(screen.queryByText('Admin Secret Console')).not.toBeInTheDocument();
  });

  it('renders children when user possesses required role', () => {
    const mockAdmin: any = {
      id: 'admin-user-id',
      email: 'superadmin@gmail.com',
      first_name: 'Super',
      last_name: 'Admin',
      is_staff: true,
      is_superuser: true,
      memberships: [
        {
          id: 'mem-admin',
          role: { role_type: 'SUPER_ADMIN', name: 'Super Admin' },
          facility_id: 'fac-1',
          facility_name: 'RTC IJmuiden',
          is_active: true,
        },
      ],
    };

    const mockContextValue: any = {
      user: mockAdmin,
      isLoading: false,
      isAuthenticated: true,
      activeMembership: mockAdmin.memberships[0],
      login: vi.fn(),
      logout: vi.fn(),
      setActiveMembership: vi.fn(),
      refreshUser: vi.fn(),
    };

    render(
      <AuthContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <ProtectedRoute requireAdmin>
            <div>Admin Secret Console</div>
          </ProtectedRoute>
        </BrowserRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Admin Secret Console')).toBeInTheDocument();
  });
});
