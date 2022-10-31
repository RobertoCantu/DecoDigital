import { Suspense, lazy } from "react";
import {
	Navigate,
	useRoutes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import DashboardLayout from "../layout/";
import Login from "../pages/authentication/Login";
import ClientGrid from "../components/client_info/ClientGrid";
import Sidebar from "../layout/Sidebar";
//import Logout from '../components/authentication/login/Logout';
import Register from "../pages/authentication/Register";
import RegisterCode from "../pages/authentication/RegisterCode";
import RegisterPassword from "../pages/authentication/RegisterPassword";
import AccountGrid from "../components/client_account/AccountGrid";
import ProductList from "../pages/Products/ProductList";

import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
// import LoadingScreen from '../components/LoadingScreen';

// const Loadable = (Component: React.ElementType) => (props: any) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { pathname } = useLocation();
//   const isDashboard = pathname.includes('/dashboard');

//   return (
//     <Suspense
//       fallback={
//         <LoadingScreen
//           sx={{
//             ...(!isDashboard && {
//               top: 0,
//               left: 0,
//               width: 1,
//               zIndex: 9999,
//               position: 'fixed'
//             })
//           }}
//         />
//       }
//     >
//       <Component {...props} />
//     </Suspense>
//   );
// };

export default function Router() {
	return useRoutes([
		{
			path: "auth",
			children: [
				{
					path: "login",
					element: (
						<GuestGuard>
							<Login />
						</GuestGuard>
					),
				},
				{
					path: "register",
					element: (
						<GuestGuard>
							<Register />
						</GuestGuard>
					),
				},
				{
					path: "register/code",
					element: (
						//<GuestGuard>
						<RegisterCode />
						//</GuestGuard>
					),
				},
				{
					path: "register/password",
					element: (
						//<GuestGuard>
						<RegisterPassword />
						//</GuestGuard>
					),
				},
				// {
				//   path: 'logout',
				//   element: <Logout/>
				// },
			],
		},
		{
			path: "dashboard",
			element: (
				// <AuthGuard>
				<DashboardLayout />
				// </AuthGuard>
			),
			children: [
				{
					path: "client_info",
					element: <ClientGrid />,
				},
				{
					path: "client_account",
					element: <AccountGrid />,
				},
				{
					path: "products",
					element: <ProductList />,
				},
			],
		},
		{ path: "/", element: <Navigate to="/auth/login" replace /> },

		// // Dashboard Routes
		// {
		//   path: 'dashboard',
		//   element: (
		//     <AuthGuard>
		//       <DashboardLayout />
		//     </AuthGuard>
		//   ),
		//   children: [
		//     { path: '/dashboard', element: <HomePage /> },
		//   ]
		// },
		// { path: '/', element: <Navigate to="/auth/login" replace /> }
	]);
}

// // Authentication
// const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
