import * as React from 'react';
import { Box, Button, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from "react-router-dom";
import { useScreen } from "../../hooks/useScreen";
import { AttributionText } from "../AttributionText";

export const LandingBox = () => {
	const { screen } = useScreen();
	const navigate = useNavigate();
	const navigateToAuth = () => {
		navigate('/auth');
	};

	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				height: '100%',
				placeItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Card key={screen}
				sx={{
					display: 'flex',
					flexDirection: screen === 'landscape' ? 'row' : 'column-reverse',
					width: '100%',
					height: screen === 'landscape' ? '70%' : '100%',
					pt: '5%'
				}}
			>
				<Box>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '100%',
							placeItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography component="h1" variant="h2" fontFamily="BLADRMF_" textAlign="center" >
							Bblade Manner
						</Typography>
						<Typography variant="overline" fontSize={16} color="text.secondary" component="div">
							Sci-fi / Fantasy stuff.
						</Typography>
						<Typography variant="subtitle2" color="text.secondary" component="div">
							(MERN demo app).
						</Typography>
						<Button sx={{ mt: 4, mb: 4 }} onClick={navigateToAuth}>
							SIGN IN / SIGN UP
						</Button>
					</CardContent>
				</Box>
				<Box sx={{ position: 'relative', width: '100%' }}>
					<CardMedia
						component="img"
						sx={{ height: '100%' }}
						image="/brian-mcgowan-unsplash.jpg"
						alt="Live from space album cover"
					/>
					<AttributionText
						author="Brian McGowan"
						image="https://unsplash.com/@sushioutlaw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						credit="https://unsplash.com/photos/black-and-blue-round-fan-yjOUm3zkRD0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
					/>
				</Box>
			</Card>
		</Box>
	);
}