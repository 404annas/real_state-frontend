import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { isTokenExpired, getTimeUntilExpiration } from '../utils/jwt';
import { toast } from 'sonner';

// Hook to handle session expiration
export const useSessionExpiration = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (token) {
      // Check if token is already expired
      if (isTokenExpired(token)) {
        dispatch(logout());
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }

      // Calculate time until expiration
      const timeUntilExpiration = getTimeUntilExpiration(token);

      // If expiration is within 5 minutes, warn the user
      if (timeUntilExpiration > 0 && timeUntilExpiration <= 5 * 60 * 1000) {
        // Warn user that session will expire soon
        toast.warning("Your session will expire soon. Please save your work.");
        
        // Logout when token expires
        timeoutRef.current = setTimeout(() => {
          dispatch(logout());
          toast.error("Session expired. Please log in again.");
          window.location.href = "/login";
        }, timeUntilExpiration);
      } else if (timeUntilExpiration > 0) {
        // Logout when token expires (with 1 minute buffer)
        const bufferTime = 60000; // 1 minute
        const logoutTime = Math.max(0, timeUntilExpiration - bufferTime);
        
        timeoutRef.current = setTimeout(() => {
          // Show warning before logout
          toast.warning("Your session has expired. Please log in again.");
          dispatch(logout());
          window.location.href = "/login";
        }, logoutTime);
      } else {
        // Token is already expired
        dispatch(logout());
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    }

    // Clean up on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [token, dispatch]);
};

// Component to wrap around the app to handle session expiration
export const SessionExpirationHandler = ({ children }) => {
  useSessionExpiration();
  return children;
};