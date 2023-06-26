import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { app } from './index';
import { createContext, useContext, useEffect, useState } from 'react';

const auth = getAuth(app);

export const AuthContext = createContext<{} | User>({});

export const useAuthContext = (): User | {} => useContext(AuthContext);

interface Props {
  children: JSX.Element;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
