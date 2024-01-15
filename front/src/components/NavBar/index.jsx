import { useState } from 'react';
import { AppBar, Box, Button, IconButton, Menu, Toolbar, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useScreen } from '../../hooks/useScreen';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../api/auth';

export const NavBar = () => {
	const { screen } = useScreen();
	const { isLogged, updateIsLogged } = useAuth();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const navigateToAuth = () => {
		navigate('/auth');
	};

	const handleLogout = async () => {
		const res = await logout();
		if (res?.error) return;
		else updateIsLogged(false);
	};
	const navigateToHome = () => {
		navigate('/');
	};
	const navigateToMovies = () => {
		navigate('/movies');
	};
	const navigateToList = () => {
		navigate('/list');
	};


	const Group = () => {
		return (
			<Stack direction={screen === 'landscape' ? 'row' : 'column'}  >
				<Button sx={{ color: screen !== 'landscape' ? '#000000' : '#FFFFFF', textAlign: 'left' }} onClick={navigateToHome} >
					Home
				</Button>
				<Button sx={{ color: screen !== 'landscape' ? '#000000' : '#FFFFFF' }} onClick={navigateToMovies} >
					Movies/TV Shows
				</Button>
				<Button sx={{ color: screen !== 'landscape' ? '#000000' : '#FFFFFF' }} onClick={navigateToList}>
					My List
				</Button>
			</Stack>
		)
	}

	return (
		<Box sx={{ display: 'flex' }}>
			<AppBar position="fixed">
				<Toolbar
					sx={{
						display: 'flex',
						flex: 1,
						justifyContent: 'space-between'
					}}
				>
					{screen === 'portrait' && (
						<>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								className="menu"
								sx={{ pr: 2, display: 'flex' }}
								onClick={handleClick}
							>
								<MenuIcon />
							</IconButton>
						</>
					)}
					{screen === 'landscape' && (
						<div>
							<Box
								sx={{
									display: 'flex', alignItems: 'center',
								}}
							>
									<Group />
							</Box>
						</div>
					)}

					<div>
						<Button
							color="inherit"
							onClick={isLogged ? handleLogout : navigateToAuth}>
							{isLogged ? 'Log out' : 'Sign In / Up'}
						</Button>
					</div>
				</Toolbar>
			</AppBar>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<Group />
			</Menu>
		</Box >
	);
};
