import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false);
	const navigate = useNavigate();

	const getUserVerified = async () => {
		const verify = await verifyUser();

		if (verify) setIsLogged(verify === true ? verify : false);
		else setIsLogged(false);
};

	const updateIsLogged = (bool) => {
		setIsLogged(bool);
		if (!bool) navigate('/');
	};

	useEffect(() => {
		getUserVerified();
	}, []);

	const authContextValue = {
		isLogged,
		updateIsLogged,
		getUserVerified
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
