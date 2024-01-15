import { Button } from "@mui/material";

export const ListStackButton = ({ currentTag, type, setList, title }) => {
	return (
		<Button
			sx={{
				fontWeight: currentTag === type ? 800 : 600,
				borderBottomWidth: currentTag === type ? 2 : 0, borderBottomColor: '#000000',
				fontSize: currentTag === type ? 18 : 14,
			}}
			onClick={e => {
				setList(e, type);
			}} >
			{title}
		</Button>
	)
};