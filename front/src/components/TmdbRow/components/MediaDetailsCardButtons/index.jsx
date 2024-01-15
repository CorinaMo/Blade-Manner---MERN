import { ButtonGroup, Tooltip } from "@mui/material";
import TheatersIcon from '@mui/icons-material/Theaters';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import DeleteIcon from "@mui/icons-material/Delete";

import { goTo } from "../../../../utils";
import { useList } from "../../../../hooks/useList";
import { deleteListItem } from "../../../../api/userlist";
import { useAuth } from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { BaseButtonFullDialog } from "../../../BaseButtonFullDialog";

export const MediaDetailsCardButtons = ({ item, add }) => {
	const { updateGetList, getIsSaved } = useList();
	const { isLogged } = useAuth();
	const [isSaved, setIsSaved] = useState(false);

	const goHomePage = () => {
		if (item?.homepage && item?.homepage !== null) goTo(item.homepage);
	};

	const saveMovie = async (e) => {
		e?.preventDefault();
		await add(item).then(() => setIsSaved(true));
	};

	const deleteMovie = async (e) => {
		e?.preventDefault();
		if (!isLogged) return;
		try {
			const ok = await deleteListItem(item?.id ?? '');
			if (ok) {
				setIsSaved(false);
				updateGetList();
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (item?.id && getIsSaved(item?.id)) {
			setIsSaved(true);
		} else {
			setIsSaved(false);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [item]);


	return (
		<ButtonGroup variant="text" sx={{ display: 'flex', flexDirection: 'row', pt: 4 }} >
			<Tooltip title={!item?.homepage || item?.homepage === null ? 'There\'s no URL linked to this movie' : ''} placement="bottom">
				<>
				<BaseButtonFullDialog
					icon={<TheatersIcon size="large" sx={{ color: '#ffffff' }} />}
					text="Movie Home"
					action={goHomePage}
				/>
				</>
			</Tooltip>
			{
				!isSaved ? (
					<Tooltip title={!isLogged ? 'You have to sign to use this feature' : ''} placement="bottom">
						<>
						<BaseButtonFullDialog
							icon={<BookmarkAddIcon size="large" sx={{ color: '#ffffff' }} />}
							text="Add to List"
							action={saveMovie}
						/>
						</>
					</Tooltip>
				) : (
					<BaseButtonFullDialog
							icon={<DeleteIcon size="large" sx={{ color: '#ffffff' }} />}
							text="Delete from List"
							action={deleteMovie}
						/>
				)
			}
		</ButtonGroup>
	)
};