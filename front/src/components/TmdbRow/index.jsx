import { useEffect, useState } from 'react';
import { Box, CardMedia, CardContent, CardActions, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { MediaDetailsCard } from './components/MediaDetailsCard';
import { MovieDialogContent } from './components/MovieDialogContent';
import { getTMDBmovie, getTMDBshow } from '../../api/tmdb';
import { TVDialogContent } from './components/TVDialogContent';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useList } from '../../hooks/useList';
import { AddDeleteIconButton } from '../AddDeleteIconButton';
import { IconButtonCustom } from '../IconButtonCustom';

export const TmdbRow = ({ items, media_type }) => {
	const { userList, updateGetList } = useList();
	const [data, setData] = useState([]);
	const [currentItem, setCurrentItem] = useState({});
	const tmdbImageUrl = 'https://image.tmdb.org/t/p/w500';

	const [open, setOpen] = useState(false);
	const [openTV, setOpenTV] = useState(false);

	const handleOpen = async (e, item) => {
		e.preventDefault();
		if (!item?.id) return;
		try {
			const res = media_type === 'movie' ? await getTMDBmovie(`${item?.id}`) : await getTMDBshow(`${item?.id}`);
			setCurrentItem(res?.results ?? {});
			if (media_type === 'movie') setOpen(true);
			else setOpenTV(true);

		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setOpenTV(false);
	};

	useEffect(() => {
		if (items?.length > 0) setData(items);
	}, [items]);

	useEffect(() => {
		if (userList?.length === 0 || userList?.data === null) updateGetList();
		if (items?.length > 0) setData(items);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box sx={{
			display: 'flex', flexDirection: "row",
			pl: 5, pr: 5, maxWidth: '100%',
			overflowX: 'auto', pb: 4,
			'& > :not(style)': {
				minWidth: 220,
				height: '36rem',
				borderRadius: 4,
			},
		}}>
			{data?.length > 0 && data?.map((item) => (
				<Box key={item?.id} 
					sx={{ display: 'flex', flexDirection: 'column', width: 220, height: '100%', mr: 2 }}>
					<div >
						{
							item?.poster_path ? (
								<CardMedia
									component="img"
									image={`${tmdbImageUrl}${item.poster_path}`}
									alt={item?.title ?? ''}
									sx={{ height: '22rem' }}
								/>
							) : (
								<Box sx={{ height: '22rem', backgroundColor: grey[900] }} />
							)
						}
					</div>
					<div style={{ 
						display: 'flex', flexDirection: 'column', position: 'sticky', 
						marginTop: -80, width: '100%', backgroundColor: 'rgba(0,0,0,0.65)', 
						borderRadius: 4, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
						>
						<Typography component="h1" variant="button" color="#ffffff"
							sx={{ 
								fontSize: 16, fontWeight: 800, textAlign: 'center', 
								pt: 2, pr: 2, pl: 2, lineHeight: 1.1 }}>
							{item?.title ?? item?.name ?? 'No Title Found'}
						</Typography>
						<CardContent>
							<MediaDetailsCard item={item} />
							<Typography variant="body2" color={grey[100]}>
								<b>Overview:</b>	{item?.overview?.slice(0, 50) + '...'}
							</Typography>
						</CardContent>
						<CardActions sx={{mt: -2}}>
							<AddDeleteIconButton item={item} type={media_type} />
							<IconButtonCustom
								action={(e) => {
									handleOpen(e, item);
								}} >
								<OpenInNewIcon sx={{ color: '#ffffff' }} />
							</IconButtonCustom>
						</CardActions>
					</div>
				</Box>
			)
			)}
			{media_type === 'movie' ?
				<MovieDialogContent key={media_type ?? 'movie'} open={open} handleClose={handleClose} item={currentItem} />
				:
				<TVDialogContent key={media_type ?? 'tv'} open={openTV} handleClose={handleClose} item={currentItem} />
			}
		</Box >
	);

}