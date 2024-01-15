import { useEffect, useState } from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { green } from '@mui/material/colors';
import { useList } from '../../hooks/useList';
import { useAuth } from '../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButtonCustom } from '../IconButtonCustom';

export const AddDeleteIconButton = ({ item, type }) => {
	const { getIsSaved, addToListByType, addToListByTypeFiltered, deleteItemUserList } = useList();
	const { isLogged } = useAuth();
	const [isSaved, setIsSaved] = useState(false);

	const addToList = async (item) => {
		if (!isLogged) return;
		if (item?.id) {
			// it has to be filtered
			await addToListByType(item, type).then(() => setIsSaved(true));
		}
		if (item?.api_id) {
			// it is already filtered
			await addToListByTypeFiltered(item);
		}
	};

	const removeFromList = async (id) => {
		await deleteItemUserList(id ?? '');
	};

	useEffect(() => {
		setIsSaved(getIsSaved(item?.id ?? item?.api_id ?? ''));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getIsSaved]);

	return (
		<Tooltip title={!isLogged ? 'You have to sign to use this feature' : ''} placement="bottom">
			<>
				{
					isSaved ? (
						<IconButtonCustom
							action={(e) => {
								e.preventDefault();
								removeFromList(item?.id ?? item?.api_id);
							}}>
							<DeleteIcon sx={{ color: '#ffffff' }} />
						</IconButtonCustom>
					) : (
						<IconButtonCustom
							action={(e) => {
								e.preventDefault();
								addToList(item);
							}}>
							<AddCircleOutlineIcon sx={{ color: '#ffffff' }} />
						</IconButtonCustom>
					)
				}
			</>
		</Tooltip>
	)
};