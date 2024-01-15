import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useScreen } from '../../../../hooks/useScreen';
import { useList } from '../../../../hooks/useList';

export const Gallery = ({ itemData, title }) => {
	const tmdbImageUrl500 = 'https://image.tmdb.org/t/p/w500';
	const { screen } = useScreen();
	const { userList } = useList();

	return (
		<Box sx={{ maxWidth: '100%', overflowY: 'scroll' }}>
			<ImageList variant="masonry"
				cols={screen === 'landscape' ? 3 : 2}
				gap={screen === 'landscape' ? 8 : 2}>
				{itemData?.backdrops?.length > 0 && itemData?.backdrops?.map((item, i) => (
					<ImageListItem
						key={item?.file_path ?? `img-${i}`}
						sx={{
							'&:hover': {
								transform: 'scale(1.5)',
								zIndex: 1,
								overflowY: 'visible',	
							}
						}}
					>
						<img
							srcSet={`${tmdbImageUrl500 + item?.file_path}`}
							src={`${tmdbImageUrl500 + item?.file_path}`}
							alt={title}
							loading="lazy"
						/>
					</ImageListItem>
				))}
			</ImageList>
		</Box>
	);
};
