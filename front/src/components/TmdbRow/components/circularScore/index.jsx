import { Box, CircularProgress, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

export const CircularScore = ({ value, percent }) => {
	return (
		<Box sx={{ position: 'relative'}}>
			<CircularProgress
				sx={{ color: green[400]}}
				variant="determinate" value={percent ?? 0}
			 />
			<Box
				sx={{
					top: 0, left: 0, bottom: 0, right: 0,
					position: 'absolute', display: 'flex',
					alignItems: 'center', justifyContent: 'center',
				}}
			>
				<Typography variant="h6" component="div" fontSize={16} color="#ffffff" >
					{value?.toFixed(1) ?? '-'}
				</Typography>
			</Box>
		</Box>
	);
};
