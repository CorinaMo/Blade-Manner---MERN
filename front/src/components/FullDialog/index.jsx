import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

export const FullScreenDialog = ({ open, close, title, children }) => {
	const handleClose = () => {
		close();
	}

	return (
		<Dialog
			fullScreen
			open={open ?? false}
			onClose={handleClose}
		>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			{children}
		</Dialog>
	);
};
