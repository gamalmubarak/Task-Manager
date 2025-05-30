import { describe, it, expect, beforeEach, vi } from 'vitest';
import Auth from './auth';

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when not logged in', () => {
    expect(Auth.loggedIn()).toBe(false);
  });

  it('returns true when token is present', () => {
    localStorage.setItem('id_token', 'token');
    expect(Auth.loggedIn()).toBe(true);
  });

  it('can login and logout', () => {
    // Mock window.location.assign to prevent navigation
    const assignMock = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { assign: assignMock },
      writable: true,
    });

    Auth.login('token');
    expect(localStorage.getItem('id_token')).toBe('token');
    expect(assignMock).toHaveBeenCalled();

    Auth.logout();
    expect(localStorage.getItem('id_token')).toBeNull();
    expect(assignMock).toHaveBeenCalled();
  });
});