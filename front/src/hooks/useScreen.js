import { useState, useMemo, useEffect } from 'react';

export const useScreen = () => {
	const [screen, setScreen] = useState('landscape');
	const [dimensions, setDimensions] = useState([0, 0]);

	const updateDimensions = () => {
		const x = window?.innerWidth ?? 0;
		const y = window?.innerHeight ?? 0;
		setDimensions([x, y]);
	};

	const getMode = () => {
		if (window?.matchMedia("(orientation: portrait)")?.matches) {
			setScreen('portrait');
		} else if (window?.matchMedia("(orientation: landscape)")?.matches) {
			setScreen('landscape');
		} else {
			setScreen('landscape');
		}
		updateDimensions();
	};

	useEffect(() => {
		getMode();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleResize = (e) => {
			e.preventDefault();
			if (e.target.innerWidth > e.target.innerHeight) {
				setScreen('landscape');
			} else {
				setScreen('portrait');
			}
			updateDimensions();
		};

		window.addEventListener('orientationchange', handleResize);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('orientationchange', handleResize);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const screenFunctions = useMemo(() => ({
		screen,
		dimensions
	}), [screen, dimensions]);

	return screenFunctions;
};
