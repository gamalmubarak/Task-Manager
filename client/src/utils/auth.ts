import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }


  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token 
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
     // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
     if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
      // If the token is expired, return true indicating that it is expired.
      return true;
    }
    // If the token is not expired, return false.
  } catch (err) {
    return false;
  }
  
}

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');

  
  }
}

export default new AuthService();
