/**
 * Secure API Client with Cookie-Based Session Credentials & CSRF Management
 */

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000';

function getCookie(name: string): string | null {
  if (!document.cookie) return null;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.substring(0, name.length + 1) === name + '=') {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

export interface RoleInfo {
  id: string;
  role_type: string;
  name: string;
  description: string;
  can_sign_certificates: boolean;
  can_verify_results: boolean;
  can_input_results: boolean;
  can_manage_samples: boolean;
  can_manage_storage: boolean;
  can_manage_facility: boolean;
}

export interface MembershipInfo {
  id: string;
  organization_id: string;
  organization_name: string;
  facility_id: string | null;
  facility_name: string | null;
  facility_code: string | null;
  laboratory_area_name: string | null;
  laboratory_area_code: string | null;
  role: RoleInfo;
  is_primary: boolean;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  job_title: string;
  is_active: boolean;
  date_joined: string;
  memberships: MembershipInfo[];
  csrfToken?: string;
}

export interface UserRecord {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  job_title: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login: string | null;
  primary_role: RoleInfo | null;
  primary_facility: {
    id: string;
    name: string;
    code: string;
  } | null;
  memberships: MembershipInfo[];
}

export interface CreateUserInput {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  job_title?: string;
  phone_number?: string;
  role_id?: string;
  role_type?: string;
  organization_id?: string;
  facility_id?: string;
  is_active?: boolean;
}

export interface UpdateUserInput {
  first_name?: string;
  last_name?: string;
  job_title?: string;
  phone_number?: string;
  is_active?: boolean;
}

export interface AuditHistoryEvent {
  id: string;
  timestamp: string;
  actor_email: string;
  action: string;
  summary: string;
  changes: Record<string, any>;
  ip_address: string | null;
}

export interface UserPermittedScope {
  user_id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  roles: { id: string; role_type: string; name: string; is_primary: boolean }[];
  facilities: { id: string; name: string; code: string; is_primary: boolean }[];
  capabilities: {
    can_sign_certificates: boolean;
    can_verify_results: boolean;
    can_input_results: boolean;
    can_manage_samples: boolean;
    can_manage_storage: boolean;
    can_manage_facility: boolean;
    is_superadmin: boolean;
  };
}


export interface AssignMembershipInput {
  role_id: string;
  organization_id?: string;
  facility_id?: string;
  laboratory_area_id?: string;
  is_primary?: boolean;
  approval_justification?: string;
}

export interface AreaMeta {
  id: string;
  code: string;
  name: string;
}

export interface FacilityMeta {
  id: string;
  code: string;
  name: string;
  city: string;
  is_primary: boolean;
  areas: AreaMeta[];
}

export interface OrganizationMeta {
  id: string;
  name: string;
  org_type: string;
  country: string;
  facilities: FacilityMeta[];
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

let cachedCsrfToken: string | null = null;

export const apiClient = {
  async getCsrfToken(): Promise<string> {
    const cookieToken = getCookie('csrftoken');
    if (cookieToken) {
      cachedCsrfToken = cookieToken;
      return cookieToken;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/csrf/`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        cachedCsrfToken = data.csrfToken || getCookie('csrftoken');
        return cachedCsrfToken || '';
      }
    } catch {
      // Ignore network errors on passive fetch
    }
    return cachedCsrfToken || '';
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const headers = new Headers(options.headers || {});

    // Ensure JSON format
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    headers.set('Accept', 'application/json');

    // Add CSRF token for unsafe HTTP methods
    const method = (options.method || 'GET').toUpperCase();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      const csrf = getCookie('csrftoken') || cachedCsrfToken || (await this.getCsrfToken());
      if (csrf) {
        headers.set('X-CSRFToken', csrf);
      }
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Essential for session cookies (dc_lims_sessionid)
    });

    if (response.status === 204) {
      return {} as T;
    }

    let responseData: any;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      const errorMsg =
        responseData && typeof responseData === 'object' && responseData.detail
          ? responseData.detail
          : typeof responseData === 'string' && responseData.length < 200
          ? responseData
          : `Request failed with status ${response.status}`;
      throw new ApiError(response.status, errorMsg, responseData);
    }

    return responseData as T;
  },

  // Auth Endpoints
  async login(email: string, password: string): Promise<UserProfile> {
    // Ensure we have a fresh CSRF cookie prior to posting credentials
    await this.getCsrfToken();
    const data = await this.request<UserProfile>('/api/v1/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.csrfToken) {
      cachedCsrfToken = data.csrfToken;
    }
    return data;
  },

  async logout(): Promise<void> {
    await this.request('/api/v1/auth/logout/', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    cachedCsrfToken = null;
  },

  async getCurrentUser(): Promise<UserProfile> {
    return this.request<UserProfile>('/api/v1/auth/me/');
  },

  // Communications / Inquiry Endpoint
  async submitInquiry(inquiryData: {
    name: string;
    organization: string;
    email: string;
    phone?: string;
    sampleType?: string;
    timeline?: string;
    message: string;
    testRequirements?: string[];
  }): Promise<{ id: string; detail: string; created_at: string }> {
    return this.request('/api/v1/communications/inquiries/', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  // Enterprise User Management & RBAC Endpoints
  async getUsers(params?: { search?: string; role?: string; is_active?: boolean | string }): Promise<UserRecord[]> {
    const query = new URLSearchParams();
    if (params?.search) query.set('search', params.search);
    if (params?.role) query.set('role', params.role);
    if (params?.is_active !== undefined) query.set('is_active', String(params.is_active));
    const qs = query.toString();
    return this.request<UserRecord[]>(`/api/v1/auth/users/${qs ? `?${qs}` : ''}`);
  },

  async getUser(id: string): Promise<UserRecord> {
    return this.request<UserRecord>(`/api/v1/auth/users/${id}/`);
  },

  async createUser(data: CreateUserInput): Promise<UserRecord> {
    return this.request<UserRecord>('/api/v1/auth/users/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateUser(id: string, data: UpdateUserInput): Promise<UserRecord> {
    return this.request<UserRecord>(`/api/v1/auth/users/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async resetUserPassword(id: string, newPassword: string): Promise<{ detail: string }> {
    return this.request<{ detail: string }>(`/api/v1/auth/users/${id}/reset-password/`, {
      method: 'POST',
      body: JSON.stringify({ new_password: newPassword }),
    });
  },

  async assignUserMembership(id: string, data: AssignMembershipInput): Promise<MembershipInfo> {
    return this.request<MembershipInfo>(`/api/v1/auth/users/${id}/memberships/`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async revokeUserMembership(userId: string, membershipId: string): Promise<{ detail: string }> {
    return this.request<{ detail: string }>(`/api/v1/auth/users/${userId}/memberships/${membershipId}/`, {
      method: 'DELETE',
    });
  },

  async activateUser(id: string): Promise<UserRecord> {
    return this.request<UserRecord>(`/api/v1/admin/users/${id}/activate/`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },

  async deactivateUser(id: string): Promise<UserRecord> {
    return this.request<UserRecord>(`/api/v1/admin/users/${id}/deactivate/`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },

  async getUserAuditHistory(id: string): Promise<{ events: AuditHistoryEvent[] }> {
    return this.request<{ events: AuditHistoryEvent[] }>(`/api/v1/admin/users/${id}/history/`);
  },

  async inviteUser(id: string): Promise<{ delivered: boolean; channel: string; message: string }> {
    return this.request<{ delivered: boolean; channel: string; message: string }>(`/api/v1/admin/users/${id}/invite/`, {
      method: 'POST',
      body: JSON.stringify({}),
    });
  },

  async getCurrentUserScope(): Promise<UserPermittedScope> {
    return this.request<UserPermittedScope>('/api/v1/auth/me/scope/');
  },

  async getRoles(): Promise<RoleInfo[]> {
    return this.request<RoleInfo[]>('/api/v1/auth/roles/');
  },

  async getFacilities(): Promise<{ organizations: OrganizationMeta[] }> {
    return this.request<{ organizations: OrganizationMeta[] }>('/api/v1/auth/facilities/');
  },
};
