import { useEffect, useState } from "react";
import { getTMDBTrendingMovies, getTMDBTrendingTv } from "../../api/tmdb";
import { TmdbRow } from "../../components/TmdbRow";
import { Box, Link, Typography, Button } from "@mui/material";
import { blue } from '@mui/material/colors'
import { useAuth } from "../../hooks/useAuth";
import { getList } from "../../api/userlist";
import { useList } from "../../hooks/useList";
import { useNavigate } from "react-router-dom";
import { useScreen } from "../../hooks/useScreen";

const MoviesAndShows = () => {
	const { userList, updateUserList } = useList();
	const { isLogged } = useAuth();
	const { screen } = useScreen();
	const navigate = useNavigate();
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [trendingShows, setTrendingShows] = useState([]);

	const getTrending = async () => {
		const allMovies = await getTMDBTrendingMovies(1);
		setTrendingMovies(allMovies?.results);
		const allTV = await getTMDBTrendingTv(1);
		setTrendingShows(allTV?.results);
	};

	const getuserList = async () => {
		const data = await getList();
		updateUserList(data);
	};

	useEffect(() => {
		if (isLogged && userList?.length === 0) getuserList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLogged]);

	useEffect(() => {
		if (trendingMovies?.length === 0) {
			getTrending();
		} else {
			setTrendingMovies(trendingMovies);
		}
	}, [trendingMovies]);

	useEffect(() => {
		if (trendingShows?.length !== 0) {
			setTrendingShows(trendingShows);
		}
	}, [trendingShows]);

	return (
		<Box className="BrowseAll"
			sx={{ minWidth: '100%', pt: '12vh', overflowY: 'scroll', }}>
			<div>
				{trendingMovies?.length > 0 ? (
					<>
						<Box sx={{ 
							display: 'flex', flexDirection: screen === 'landscape' ? 'row' : 'column', 
							gap:  screen === 'landscape' ? 2 : 0, pl: 5, pr: 5 }}>
							<div>
								<Typography component="h2" variant="h5" fontFamily="BLADRMF_">
									BTrending Movies
								</Typography>
							</div>
							<div>
								<Button sx={{
									fontWeight: 600, fontSize: 14,
									color: '#ffffff', backgroundColor: blue[500],
									'&:hover': { backgroundColor: blue[800], }
								}} 
								onClick={e => {
									e.preventDefault();
									navigate('/loadmore?type=movie');
								}}
								>
									LOAD MORE +
								</Button>
							</div>
						</Box>
						<Typography variant="button" color="text.secondary" sx={{ pl: 5 }}>
							Data from{' '}
							<Link href="https://www.themoviedb.org/" >
								TheMovieDatabase
							</Link>
						</Typography>
						<div style={{ paddingTop: 10 }}>
							<TmdbRow items={trendingMovies} media_type="movie" />
						</div>
					</>
				) : null}
			</div>
			<div key={trendingShows?.length + '-trendTV'}>
				{trendingShows?.length > 0 ? (
					<>
						<Box sx={{
							display: 'flex', flexDirection: screen === 'landscape' ? 'row' : 'column', 
							gap: screen === 'landscape' ? 2 : 0, pl: 5, pr: 5, pt: 2 }}>
							<Typography component="h2" variant="h5" fontFamily="BLADRMF_">
								BTrending TV Shows
							</Typography>
							<div>
								<Button sx={{
									fontWeight: 600, fontSize: 12,
									color: '#ffffff', backgroundColor: blue[500],
									'&:hover': { backgroundColor: blue[800], }
								}}  
								onClick={e => {
									e.preventDefault();
									navigate('/loadmore?type=tv');
								}}>
									LOAD MORE +
								</Button>
							</div>
						</Box>
							<Typography variant="button" color="text.secondary" sx={{ pl: 5 }}>
								Data from{' '}
								<Link href="https://www.themoviedb.org/" >
									TheMovieDatabase
								</Link>
							</Typography>
							<div style={{ paddingTop: 10 }}>
								<TmdbRow items={trendingShows} media_type="tv" />
							</div>
						</>
				) : null}
					</div>
		</Box>
	);
};

export default MoviesAndShows;
