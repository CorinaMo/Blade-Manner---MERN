import { useState } from 'react';
import { Box, Paper, InputBase, IconButton, Fade, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form'
import { getTMDBmovie, getTMDBshow, searchTMDBmovie, searchTMDBtv } from '../../api/tmdb';
import { MovieDialogContent } from '../TmdbRow/components/MovieDialogContent';
import { TVDialogContent } from '../TmdbRow/components/TVDialogContent';
import { useScreen } from '../../hooks/useScreen';

export const SearchBox = ({ type }) => {
	const { register, handleSubmit } = useForm();
	const { screen } = useScreen();
	const [currentSearchList, setCurrentSearchList] = useState([]);

	const [open, setOpen] = useState(false);
	const [openTV, setOpenTV] = useState(false);
	const [currentItem, setCurrentItem] = useState({});

	const onSubmit = handleSubmit(async (data) => {
		if (!data?.query) return;
		let search = [];
		if (type === 'movie') {
			const res = await searchTMDBmovie(1, data?.query);
			if (res?.results) {
				search = res.results?.map(result => {
					return { title: result?.title ?? '', api_id: result?.id ?? '' };
				})
			}
		}
			if (type === 'tv') {
				const res = await searchTMDBtv(1, data?.query);
				if (res?.results) {
					search = res.results?.map(result => {
						return { title: result?.name ?? '', api_id: result?.id ?? '' };
					})
				}
			}
		setCurrentSearchList(search);
		// console.log('search: ', search);
	});

	const handleOpen = async (e, api_id) => {
		e.preventDefault();
		if (!api_id) return;
		try {
			let res = {};
			if (type === 'movie') {
				res = await getTMDBmovie(api_id);
			}
			if (type === 'tv') {
				res = await getTMDBshow(api_id);
			}
			setCurrentItem(res?.results ?? {});

			if (type === 'movie') setOpen(true);
			if (type === 'tv') setOpenTV(true);

		} catch (error) {
			console.error(error);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setOpenTV(false);
	};

	const handleCloseSearch = () => {
		setCurrentSearchList([]);
	};

	return (
		<>
			<Paper
				sx={{ 
					p: 2, display: 'flex', flexDirection: 'column', 
					alignItems: 'center', width: screen === 'landscape' ? '24rem' : '80vw', 
					height: 30, borderRadius: 20 
				}}>
				<form onSubmit={onSubmit}
					style={{ 
						display: 'flex', width: '100%', height: 'inherit', justifyContent: 'space-between' 
						}}>
					<InputBase
						placeholder="Search Item"
						{...register('query', { required: true })}
					/>
					<IconButton type="submit" sx={{ p: 1 }} aria-label="search">
						<SearchIcon />
					</IconButton>
				</form>
				<Fade in={currentSearchList?.length > 0}
					sx={{
						display: 'flex', flexDirection: 'column', mt: 2, width: '100%',
						backgroundColor: '#ffffff', zIndex: 2, minHeight: 400, overflowY: 'scroll'
					}}>
					<List sx={{ maxHeight: '100%', overflowY: 'auto', }} >
						<Box sx={{ display: 'flex', width: screen === 'landscape' ? '22rem' : '72vw', p: 1, ml: 1, 
							height: 'fit-content', position: 'fixed', zIndex: 2, justifyContent: 'flex-end' }}>
						<IconButton 
							onClick={handleCloseSearch}
							sx={{ ml: 1, backgroundColor: red[500], 
								color: '#ffffff', }} >
							<CloseIcon />
						</IconButton>
						</Box>
						<Box sx={{pt: 5}}>
						{currentSearchList?.map((item, index) => {
							return (
								<ListItem key={item?.id || index} disablePadding>
									<ListItemButton component="button" onClick={e => { handleOpen(e, item?.api_id) }}>
										<ListItemText primary={item?.title} />
									</ListItemButton>
								</ListItem>
							)
						})}
						</Box>
					</List>
				</Fade>
			</Paper>
			{type === 'movie' && <MovieDialogContent key="movie" open={open} handleClose={handleClose} item={currentItem} />}
			{type === 'tv' && <TVDialogContent key="tv" open={openTV} handleClose={handleClose} item={currentItem} />}
		</>
	);
}