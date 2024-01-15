import { Box, Stack, Typography } from "@mui/material";
import { CircularScore } from "../circularScore";
import { grey } from "@mui/material/colors";

export const MediaDetailsCard = ({ item }) => {

	return (
		<Stack direction="row"
			sx={{
				display: 'flex', justifyContent: 'space-between',
				placeItems: 'flex-end',
			}} >
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography variant="h6" fontSize={18} sx={{ textTransform: 'uppercase', color: '#ffffff' }} >
					{item?.adults ? 'yes' : 'no'}
				</Typography>
				<Typography variant="overline" fontSize={10} color={grey[100]} sx={{ pb: 0.5 }}>
					Adults only
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography variant="h6" fontSize={18} sx={{ textTransform: 'uppercase', color: '#ffffff' }} >
					{item?.original_language ?? '-'}
				</Typography>
				<Typography variant="overline" color={grey[100]}>
					Lang
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<CircularScore value={item?.vote_average} percent={parseFloat(item?.vote_average) * 10 ?? 0} />
				<Typography variant="overline" color={grey[100]}>
					score
				</Typography>
			</Box>
		</Stack>
	)
};