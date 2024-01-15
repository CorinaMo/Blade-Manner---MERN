import { Box, CardMedia, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useList } from "../../../hooks/useList";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ButtonGroup } from '@mui/material';
import { IconButton } from '@mui/material';
import { getTMDBmovie, getTMDBshow } from "../../../api/tmdb";
import { MovieDialogContent } from "../../../components/TmdbRow/components/MovieDialogContent";
import { TVDialogContent } from "../../../components/TmdbRow/components/TVDialogContent";
import { useAuth } from "../../../hooks/useAuth";
import { AddDeleteIconButton } from "../../../components/AddDeleteIconButton";
import { IconButtonCustom } from "../../../components/IconButtonCustom";

export const SimpleCard = ({ item }) => {
	const tmdbImageUrl = process.env.REACT_APP_TMDB_IMAGE_URL ?? '';
	const { api_id, title, image, type } = item;
	const { isLogged } = useAuth();
	const { userList, updateGetList } = useList();
	const [currentItem, setCurrentItem] = useState({});
	const [open, setOpen] = useState(false);
	const [openTV, setOpenTV] = useState(false);

	const handleOpen = async () => {
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

	useEffect(() => {
		if (isLogged && userList?.length === 0) updateGetList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged, userList]);

	return (
		<>
			<Paper elevation={6} sx={{ display: 'flex', flexDirection: 'column', width: 220, backgroundColor: grey[900], pt: 1 }}>
				<Box>
					{
						image ? (
							<CardMedia
								component="img"
								image={`${tmdbImageUrl}${image}`}
								alt={title ?? ''}
								sx={{ width: 220, height: '22rem' }}
							/>
						) : (
							<Box sx={{ backgroundColor: grey[900] }} />
						)
					}
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, pr: 2, pl: 2, }}>
					<Typography variant="h6" color="#FFFFFF" sx={{ fontSize: 16, lineHeight: 1.1 }}>
						{title ?? 'No title found'}
					</Typography>
					<ButtonGroup sx={{gap:1, mt:2, mb: 2}}>
						<AddDeleteIconButton item={item} type={type} />
						<IconButtonCustom
							action={handleOpen}>
							<OpenInNewIcon sx={{ color: "#FFFFFF" }} />
						</IconButtonCustom>
					</ButtonGroup>
				</Box>
			</Paper>
			{type === 'movie' && <MovieDialogContent key="movie" open={open} handleClose={handleClose} item={currentItem} />}
			{type === 'tv' && <TVDialogContent key="tv" open={openTV} handleClose={handleClose} item={currentItem} />}
		</>
	)
};