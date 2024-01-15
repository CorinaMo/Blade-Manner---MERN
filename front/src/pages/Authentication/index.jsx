import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form'
import { login, signup } from '../../api/auth';
import { useAuth } from '../../hooks/useAuth';
import { AttributionText } from '../../components/AttributionText';
import { useNavigate } from 'react-router-dom';
import { Alert, Collapse } from '@mui/material';

const Authentication = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const { register, handleSubmit } = useForm();
	const { updateIsLogged } = useAuth();
	const [openAlertSuccess, setAlertSuccess] = useState(false);
	const [openAlertError, setAlertError,] = useState(false);
	const [currentError, setCurrentError] = useState('');

	const displayAlert = (tag, error) => {
		if (tag === 'success') {
			setAlertSuccess(true);
			setTimeout(() => {
				setAlertSuccess(false);
			}, 3000);
		} else {
			setCurrentError(error ?? '');
			setAlertError(true);
			setTimeout(() => {
				setAlertError(false);
				setCurrentError('');
			}, 3000);
		}
	};

	const onSubmit = handleSubmit(async (data) => {
		// console.log('onSubmit data: ', data);
		if (isLogin) {
			if (!data.email || !data.password) {
				return;
			}
			try {
				const resp = await login(data);
				if (resp === true) {
					updateIsLogged(true);
					setTimeout(() => {
						navigate('/list');
					}, 1000);
				}
				if (resp?.error) {
					displayAlert('error', resp.error);
					return;
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			if (!data.email || !data.password || !data.username) {
				return;
			}
			try {
				const res = await signup(data)
				if (res?.error) {
					displayAlert('error', res.error);
					return;
				} else {
					displayAlert('success', false);
					setIsLogin(true);
				}
			} catch (error) {
				console.error(error);
			}
		}
	});

	return (
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: 'url(/simon-unsplash.jpg)',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<AttributionText
					author="Simon zhu"
					image="https://unsplash.com/@smnzhu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
					credit="https://unsplash.com/photos/time-lapse-photo-of-high-rise-buildings-GtO__3-f2xA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
				/>
			</Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign {isLogin ? ' In' : ' Up'}
					</Typography>
					<form noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
						{!isLogin && (
							<TextField
								margin="normal"
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoFocus
								{...register('username', { required: true })}
							/>
						)}
						<TextField
							margin="normal"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							{...register('email', { required: true })}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							{...register('password', { required: true })}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							{isLogin ? 'Sign In' : 'Sign Up'}
						</Button>
						<Box>
							<Button onClick={() => { setIsLogin(!isLogin) }} sx={{ border: 'none', backgroundColor: 'transparent' }}>
								{isLogin ? "Don't have an account? Sign Up" : "Do you have an account? Sign In"}
							</Button>
						</Box>
					</form>
					<Collapse in={openAlertSuccess}>
						<Alert severity='success' sx={{ width: '100%' }}>
							<span style={{ fontSize: 14, textAlign: 'left' }}>
								You have successfully signed in! You can now log in.
							</span>
						</Alert>
					</Collapse>
					<Collapse in={openAlertError}>
						<Alert severity='error' sx={{ width: '100%' }}>
							<span style={{ fontSize: 14, textAlign: 'left' }}>
								Error:{' '} {currentError}
							</span>
						</Alert>
					</Collapse>
				</Box>
			</Grid>
		</Grid>
	);
};
export default Authentication;