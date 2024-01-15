import { Box, Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SimpleCard } from "./SimpleCard";
import { useAuth } from "../../hooks/useAuth";
import { useList } from "../../hooks/useList";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SearchBox } from "../../components/SearchBox";
import { callByType } from '../../utils/tmdb'

const LoadMore = () => {
	const location = useLocation();
	const queries = new URLSearchParams(location?.search);
	const type = queries?.get('type') ?? '';
	const { isLogged } = useAuth();
	const { userList, updateGetList, filterItemByType } = useList();

	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	let [totalPages, setTotalPages] = useState(0);

	const getData = async () => {
		if (currentPage >= totalPages && currentPage !== 0) return;
		const page = currentPage + 1;
		let results = [];

		const response = await callByType(type, page);

		if (response?.totalPages) setTotalPages(response?.totalPages ?? 0);
		if (response?.results && response?.results?.length > 0) {
			results = response?.results ?? [];
		}
		
		const newData = results?.map(element => {
			const newItem = filterItemByType(element, type);
			return newItem ?? {};
		}) ?? [];

		setCurrentPage(page);

		if (data?.length > 0) setData(data => [...data, ...newData]);
		else setData(newData);
		return data;
	};

	const init = async () => {
		if (userList?.length === 0 && isLogged) await updateGetList();
		if (type) {
			getData();
		}
	};

	useEffect(() => {
		init();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box sx={{ backgroundColor: grey[900], pt: 14, width: '100%', minHeight: '100vh', overflowY: 'auto', }}>
			<Box sx={{ display: 'flex', justifyContent: 'center', pb: 8, }}>
				<SearchBox type={type ?? 'movie'} />
			</Box>
			<Box sx={{
				display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
				justifyContent: 'center', gap: 2,

			}}>
				{
					data?.length > 0 && data?.map((item, index) => {
						return (
							<Box key={'simple-card-item-' + index}>
								<SimpleCard item={item} />
							</Box>
						)
					})
				}
			</Box>
			<Box sx={{ display: 'flex', pt: 8, pb: 10, width: '100%', justifyContent: 'center' }}>
				<Button onClick={getData}>
					<ArrowDropDownIcon sx={{ color: '#ffffff', }} />
					<Typography variant="button" sx={{ color: '#ffffff', fontsize: 18 }}>
						Load More
					</Typography>
				</Button>
			</Box>
		</Box>
	)
};

export default LoadMore;