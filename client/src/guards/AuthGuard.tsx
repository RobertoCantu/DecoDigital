import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';


// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Navigate to={'/auth/login'} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}