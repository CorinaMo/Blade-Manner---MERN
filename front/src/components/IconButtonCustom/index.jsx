import { IconButton } from '@mui/material';
import { green } from '@mui/material/colors';

export const IconButtonCustom = ({ children, action }) => {
	return (
		<IconButton
			sx={{ 
				boxShadow: `1px 1px ${green[500]}`,
				'&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } 
			}}
			onClick={action}>
			{children}
		</IconButton>
	)
};
