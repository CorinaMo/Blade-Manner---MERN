import { Box } from '@mui/material';
import { useScreen } from '../../../../hooks/useScreen';
import { useEffect } from 'react';
import ReactPlayer from 'react-player/lazy'

export const YoutubeViewer = ({ id, name }) => {
	const { screen, dimensions } = useScreen();

	useEffect(() => {
		if (id && id !== null) {

		}
	}, [id]);

	return (
		<Box sx={{ 
			display: 'flex', flexDirection: 'column', width: '100%', 
			justifyContent: 'center', p: screen === 'portrait' ? 0 : 2 
			}} >
			{id && id !== null && (
				<ReactPlayer
					videoid={id}
					controls
					muted
					width={screen === 'portrait' ? dimensions[0] : dimensions[0] * 0.75}
					height={screen === 'landscape' ? dimensions[0] * 0.4 : dimensions[0] * 0.75}
					style={{
						display: 'flex', alignSelf: 'center',
					}}
					url={`https://www.youtube.com/embed/${id}`} />
			)}
		</Box>
	);
}
