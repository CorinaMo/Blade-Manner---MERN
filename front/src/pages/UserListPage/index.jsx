import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useList } from "../../hooks/useList";
import { grey } from '@mui/material/colors';
import { Box, Paper, CardMedia, Typography, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useScreen } from "../../hooks/useScreen";
import { getTMDBmovie, getTMDBshow } from "../../api/tmdb";
import { MovieDialogContent } from "../../components/TmdbRow/components/MovieDialogContent";
import { TVDialogContent } from "../../components/TmdbRow/components/TVDialogContent";
import { ListStackButton } from "./ListStackButton";
import { IconButtonCustom } from "../../components/IconButtonCustom";

const UserListPage = () => {
	const { userList, updateGetList, deleteItemUserList } = useList();
	const { isLogged } = useAuth();
	const { screen } = useScreen();
	const [currentItem, setCurrentItem] = useState({});
	const [displayedList, setDisplayedList] = useState(userList ?? []);
	const [open, setOpen] = useState(false);
	const [openTV, setOpenTV] = useState(false);
	const [currentType, setcurrentType] = useState('movie');
	const [currentTag, setcurrentTag] = useState('all');

	const handleOpen = async (e, api_id, type) => {
		e.preventDefault();
		if (!api_id) return;
		try {
			let res = {};
			if (type === 'movie') {
				res = await getTMDBmovie(api_id);
			}
			if (type === 'tv') {
				res = await getTMDBshow(`${api_id}`);
			}
			setcurrentType(type);
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

	const deleteItem = async (e, id) => {
		e.preventDefault();
		if (!isLogged) return;
		deleteItemUserList(id ?? '')
	};

	const filtered = (tag) => {
		const result = tag === 'all' ? userList : userList?.filter(item => item?.type === tag);
		return result ?? [];
	};

	const setList = (e, tag) => {
		e.preventDefault();
		setcurrentTag(tag);
		const filtered_ = filtered(tag);
		setDisplayedList(filtered_);
	};

	useEffect(() => {
		if (isLogged && userList?.length === 0) updateGetList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged, userList]);

	useEffect(() => {
		let filtered_ = [];
		if (isLogged && userList) {
			filtered_ = filtered(currentTag);
		}
		setDisplayedList(filtered_);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userList]);

	return (
		<Box sx={{
			display: 'flex', flexDirection: 'column',
			pt: screen === 'portrait' ? '6%' : '10%',
			mt: screen === 'portrait' ? 6 : 0, width: '100%', overflowX: 'hidden'
		}}>
			{isLogged ? (
				<Stack direction="row" 
					sx={{ 
						mb: 4, pl: 4, display: 'flex', width: '100%',
						height: 'fit-content', alignItems: 'center', 
						}}>
					<Typography component="div" variant="overline" fontSize={14}>
						Filter by:
					</Typography>
					<ListStackButton title="ALL" type="all" currentTag={currentTag} setList={setList} />
					<ListStackButton title="MOVIES" type="movie" currentTag={currentTag} setList={setList} />
					<ListStackButton title="TV SHOWS" type="tv" currentTag={currentTag} setList={setList} />
				</Stack>
			) : null}
			<Box
				sx={{
					display: 'flex', pt: 2,
				}}>
				<div style={{
					display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
					gap: 6, width: '100%', justifyContent: 'space-around', 
				}}>
					{
						displayedList?.length > 0 ? (
							displayedList?.map(item => {
								return (
									<Box key={'user_list-' + item?.api_id}
										sx={{
											pt: 2, display: 'flex', flexDirection: 'row', gap: 2,
										}}>
										<Box>
											{item?.image ? (
													<CardMedia
														component="img"
														image={`${item?.image}`}
														alt={item?.title ?? ''}
														sx={{ width: 120, height: '11rem' }}
													/>
												) : (
													<Box sx={{ width: 120, height: '11rem' }} />
											)}
										</Box>
										<Paper elevation={6} 
											sx={{ 
												p: 2, width: screen === 'portrait' ? '10rem' : '18rem', 
												backgroundColor: grey[900] }}>
											<Typography component="div" variant="overline" sx={{ color: '#ffffff' }}>
												{item?.type ?? 'No type found'}
											</Typography>
											<Typography component="h1" variant="h6"
												sx={{ color: '#ffffff', lineHeight: 1.15, fontSize: 17, fontWeight: 600 }}>
												{item?.title ?? 'No title found'}
											</Typography>
											<Typography component="div" variant="overline" sx={{ color: '#ffffff', lineHeight: 1.35, pt:2 }}>
												{item?.overview + '...' ?? ''}
											</Typography>
											<Stack direction="row" sx={{ width: 'fit-content', mt: 4, gap: 1 }}>
												<IconButtonCustom
													action={e => { deleteItem(e, item?.api_id) }}>
													<DeleteIcon sx={{ color: "#FFFFFF" }} />
												</IconButtonCustom>
												<IconButtonCustom
													action={(e) => { handleOpen(e, item?.api_id, item?.type) }}>
													<OpenInNewIcon sx={{ color: "#FFFFFF" }} />
												</IconButtonCustom>
											</Stack>
										</Paper>
									</Box>
								)
							})
						) : (
							<Typography component="h1" variant="h6" sx={{ color: '#ffffff', lineHeight: 1.15 }}>
								{isLogged ? 'No items found' : 'You have to be logged to have a list'}
							</Typography>
						)
					}
				</div>
			</Box>
			{currentType === 'movie' && <MovieDialogContent key="movie" open={open} handleClose={handleClose} item={currentItem} />}
			{currentType === 'tv' && <TVDialogContent key="tv" open={openTV} handleClose={handleClose} item={currentItem} />}
		</Box>
	)
};

export default UserListPage;
