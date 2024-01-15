import { Link, Typography } from "@mui/material";

export const AttributionText = ({ image, credit, author }) => {
	return (
		<Typography
			sx={{ position: 'absolute', bottom: 4, pl: 4, pr: 4, color: '#FFFFFF', fontSize: 12, backgroundColor: '#000000'}}
			component="div"
			variant="button">
			Photo by{' '}
			<Link
				color="#FFFFFF"
				href={image}>
				{author}</Link>
			{' '}on{' '}
			<Link
				color="#FFFFFF"
				href={credit} >
				Unsplash
			</Link>
		</Typography>
	)
};
