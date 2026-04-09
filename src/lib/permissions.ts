import type { UserRole } from '@/types';

export type Action = 'read' | 'create' | 'update' | 'delete' | 'manage';
export type Resource = 'products' | 'categories' | 'settings' | 'users' | 'developer_tools' | 'dashboard';

export interface Permission {
  action: Action;
  resource: Resource;
}

/**
 * Access Control Matrix for Role-Based Access Control (RBAC).
 * Adding new roles like 'tecnico_junior' is as easy as adding a new entry here.
 */
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  user: [
    { action: 'read', resource: 'products' },
    { action: 'read', resource: 'categories' },
    // Regular users cannot access admin resources
  ],
  admin: [
    { action: 'manage', resource: 'products' },
    { action: 'manage', resource: 'categories' },
    { action: 'manage', resource: 'settings' },
    { action: 'read', resource: 'dashboard' },
    // Admins cannot manage users or developer tools
  ],
  developer: [
    { action: 'manage', resource: 'products' },
    { action: 'manage', resource: 'categories' },
    { action: 'manage', resource: 'settings' },
    { action: 'manage', resource: 'users' },
    { action: 'manage', resource: 'developer_tools' },
    { action: 'manage', resource: 'dashboard' },
  ],
};

/**
 * Checks if a specific role has a permission for a resource and action.
 */
export function hasPermission(role: UserRole | undefined, action: Action, resource: Resource): boolean {
  if (!role) return false;
  
  const permissions = ROLE_PERMISSIONS[role] || [];
  
  // Check if they have the specific permission, or the 'manage' permission which includes all other actions
  return permissions.some(
    (p) => p.resource === resource && (p.action === action || p.action === 'manage')
  );
}

/**
 * Simpler semantic helper for route guards. 
 * Checks if a role has ANY access to a particular resource.
 */
export function canAccessAdminResource(role: UserRole | undefined, resource: Resource): boolean {
  return hasPermission(role, 'read', resource) || hasPermission(role, 'manage', resource);
}
