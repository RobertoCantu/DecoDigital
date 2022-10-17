export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user : AuthUser;
  login: (phone:number, password:string) => Promise<void>
  register: (nuc:string, phone:number) => Promise<void>;
  logout: () => Promise<void>;
};