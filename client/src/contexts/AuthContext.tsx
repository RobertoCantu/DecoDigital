import {
	createContext,
	ReactNode,
	useEffect,
	useReducer,
	useState,
} from "react";
// types
import {
	AuthContextType,
	AuthUser,
	AuthState,
	ActionMap,
} from "../@types/authentication";
// utils
import axios from "../utils/axios";
// services
import {
	login as authLogin,
	register as authRegister,
} from "../services/authService";

enum Types {
	Initial = "INITIALIZE",
	Login = "LOGIN",
	Logout = "LOGOUT",
	Register = "REGISTER",
}

type JWTAuthPayload = {
	[Types.Initial]: {
		isAuthenticated: boolean;
		user: AuthUser;
	};
	[Types.Login]: {
		user: AuthUser;
	};
	[Types.Logout]: undefined;
	[Types.Register]: {
		user: AuthUser;
	};
};

export type JWTActions =
	ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
	isAuthenticated: false,
	isInitialized: false,
	user: null,
};

// Reduer function logic
const AuthReducer = (state: AuthState, action: JWTActions) => {
	switch (action.type) {
		case "INITIALIZE":
			return {
				isAuthenticated: action.payload.isAuthenticated,
				isInitialized: true,
				user: action.payload.user,
			};
		case "LOGIN":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
			};
		case "REGISTER":
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
			};
		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	useEffect(() => {
		const initialize = async () => {
			const user = window.localStorage.getItem("user");
			console.log(user);
			if (user) {
				console.log("entrooooo");
				dispatch({
					type: Types.Initial,
					payload: {
						isAuthenticated: true,
						user: JSON.parse(user),
					},
				});
			} else {
				try {
					const accessToken = window.localStorage.getItem("accessToken");

					if (accessToken) {
						const response = await axios.get("/auth/user", {
							headers: {
								Authorization: "Bearer " + accessToken,
							},
						});

						const { user } = response.data;

						dispatch({
							type: Types.Initial,
							payload: {
								isAuthenticated: true,
								user,
							},
						});
					} else {
						dispatch({
							type: Types.Initial,
							payload: {
								isAuthenticated: false,
								user: null,
							},
						});
					}
				} catch (err) {
					console.error(err);

					dispatch({
						type: Types.Initial,
						payload: {
							isAuthenticated: false,
							user: null,
						},
					});
				}
			}
		};

		initialize();
	}, []);

	const login = async (phone: string, password: string) => {
		try {
			const response: any = await authLogin(phone, password);

			const { message } = response;

			const { token, user, nuc } = message;
			// const user: any = {
			//   "name": response.name,
			//   "lastName": response.lastName,
			//   "email": response.email,
			//   "phone": response.phone,
			//   "id": response._id
			// }

			// Set JWT in local storage
			window.localStorage.setItem("accessToken", token);
			window.localStorage.setItem("user", JSON.stringify(user));
			window.localStorage.setItem("nuc", JSON.stringify(nuc));

			dispatch({
				type: Types.Login,
				payload: {
					user,
				},
			});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	const register = async (nuc: string, phone: number) => {
		try {
			const response: any = await authRegister(nuc, phone);
			const { reponse } = response;

			const token = response.token;
			const user: any = {
				name: response.name,
				lastName: response.lastName,
				email: response.email,
				phone: response.phone,
				id: response._id,
			};
			//Set Jwt in local storage
			window.localStorage.setItem("accessToken", token);
			window.localStorage.setItem("user", JSON.stringify(user));

			dispatch({
				type: Types.Register,
				payload: {
					user,
				},
			});
		} catch (error: any) {
			console.log(error);
			return Promise.reject(error);
		}
	};

	const logout = async () => {
		window.localStorage.removeItem("accessToken");
		window.localStorage.removeItem("user");

		dispatch({
			type: Types.Logout,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext, AuthProvider };
