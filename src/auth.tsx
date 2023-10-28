// import { ReactElement, createContext, useContext, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocalStorage } from './useLocalStorage';

// type AuthContextType = {
//   user: any;
//   login: (data: any) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({ children }: { children: ReactElement }) => {
//   const [user, setUser] = useLocalStorage('user', null);
//   const navigate = useNavigate();

//   // call this function when you want to authenticate the user
//   const login = async (data: any) => {
//     setUser(data);
//     navigate('/tasks');
//   };

//   // call this function to sign out logged in user
//   const logout = () => {
//     setUser(null);
//     navigate('/login', { replace: true });
//   };

//   const value = useMemo(
//     () => ({
//       user,
//       login,
//       logout,
//     }),
//     [user],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
