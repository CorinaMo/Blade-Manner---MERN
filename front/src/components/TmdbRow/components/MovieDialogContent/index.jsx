import { Box, Link, Typography } from "@mui/material";
import { FullScreenDialog } from "../../../FullDialog";

import { Gallery } from "../Gallery";
import { MovieTVBase } from "../MovieTVBase";
import { useAuth } from "../../../../hooks/useAuth";
import { useList } from "../../../../hooks/useList";

export const MovieDialogContent = ({ open, handleClose, item }) => {
	const {
		title,
		images,
	} = item;
	const { isLogged } = useAuth();
	const {addToListByType} = useList();

	const addToList = async (item) => {
		if (!isLogged) return;
		addToListByType(item, 'movie');
	};

	return (
			<FullScreenDialog title={title ?? ''} open={open} close={handleClose}>
				<MovieTVBase item={item} add={addToList}>
					{images?.backdrops?.length > 0 ? (
						<Box>
							<Typography component="h1" variant="h3" color="text.secondary" align="center" sx={{ pt: 4, lineHeight: 1 }}>
								Gallery
							</Typography>
							<Typography component="h3" variant="h6"  fontSize={13}  color="text.secondary" align="center" >
								Data from <Link href="https://www.themoviedb.org/">{' '}TMDB</Link>
							</Typography>
							<Box>
								<Gallery key="gallery" title={title ?? ''} itemData={images} />
							</Box>
						</Box>
					) : null}
				</MovieTVBase>
			</FullScreenDialog>
	)
};
