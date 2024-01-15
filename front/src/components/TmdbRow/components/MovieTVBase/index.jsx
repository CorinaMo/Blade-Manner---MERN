import { Box, Link, Rating, Typography } from "@mui/material";

import { YoutubeViewer } from "../YoutubeViewer";
import { MediaDetailsCardButtons } from "../MediaDetailsCardButtons";

export const MovieTVBase = ({ children, item, add }) => {
	const tmdbImageUrl = 'https://image.tmdb.org/t/p/original';
	const {
		id,
		title,
		name,
		original_title,
		original_name,
		number_of_seasons,
		number_of_episodes,
		seasons,
		// next_episode_to_air,
		origin_country,
		overview,
		tagline,
		status,
		vote_average,
		videos,
		// images,
		original_language,
		poster_path,
		backdrop_path,
		adult,
		genres,
		// homepage,
		first_air_date,
		last_air_date,
		release_date,
	} = item;

	return (
		<Box title={title ?? name ?? ''} >
			{
				(title ?? name)?.length > 0 && (
					<Box sx={{
						width: '100%',
						height: '100%',
					}}>
						<Box
							sx={{
								width: '100%',
								height: 'fit-content',
								position: 'relative',
								backgroundImage: `url(${tmdbImageUrl + (backdrop_path ?? poster_path)})` ?? '',
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
							}}>
							<Box sx={{
								display: 'flex',
								flexDirection: 'column',
								flexWrap: 'wrap',
								left: 0,
								top: 0,
								p: 4,
								backgroundColor: 'rgba(0,0,0,0.65)',
							}}>

								<Typography component="h1" variant="h2" sx={{ color: '#ffffff' }} >
									{title ?? name ?? '-'}
								</Typography>
								<Box>
									<Typography variant="overline" sx={{ color: '#ffffff' }} >
										{`"${tagline}"` ?? ''}
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
										gap: 2,
										pt: 2,
										alignItems: 'center',
									}} >
									<Rating
										disabled
										name="simple-controlled"
										value={typeof vote_average === 'number' ? (vote_average / 2) : 0}
										sx={{ opacity: 1 }}
									/>
									<Typography variant="body1" sx={{ color: '#ffffff' }} >
										{(vote_average)?.toFixed(1) ?? '-'} {' '}from <Link sx={{ color: '#ffffff' }} href="https://www.themoviedb.org/">{' '}TMDB</Link>
									</Typography>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										flexWrap: 'wrap',
										gap: 2,
										pt: 2,
										alignItems: 'center',
									}} >
									<Typography variant="body1" sx={{ color: '#ffffff' }} >
										<b>Original Language:</b>
										<span style={{ textTransform: 'uppercase' }}>
											{` ${original_language}` ?? '-'}
										</span>
									</Typography>
									{origin_country ? (
										<Typography variant="body1" sx={{ color: '#ffffff' }} >
											<b>Country:</b>
											<span style={{ textTransform: 'uppercase' }}>
												{origin_country}
											</span>
										</Typography>
									) : null}
								</Box>
								<Typography variant="body1" sx={{ color: '#ffffff' }} >
									<b>Adults Only:</b>{adult ? ' YES' : ' NO'}
								</Typography>
								<Typography variant="body1" sx={{ color: '#ffffff' }} >
									<b>Status:{' '}</b>{`${status} (${(release_date ?? first_air_date)?.slice(0, 4)}${last_air_date ? ' - ' + last_air_date?.slice(0, 4) : ''})` ?? 'Not info'}
								</Typography>
								<Typography variant="body1" sx={{ color: '#ffffff' }} >
									{seasons && <><b>Nº Seasons:</b> {number_of_seasons ?? '-'}{'  '} <b style={{ paddingLeft: 10 }}>Nº Episodes:</b> {number_of_episodes ?? '-'}</>}
								</Typography>
								<Box sx={{ pt: 4, }}>
									<Typography variant="body1" sx={{ color: '#ffffff' }} >
										<b>Original Title:{' '}</b>{original_title ?? original_name ?? '-'}
									</Typography>
								</Box>
								<Box sx={{ pt: 1, }}>
									<Typography variant="body1" sx={{ color: '#ffffff', maxWidth: 560, textOverflow: 'inherit' }} >
										<b>Overview:{' '}</b> {overview ?? '-'}
									</Typography>
								</Box>
								<Box sx={{ pt: 1, }}>
									<Typography variant="body1" sx={{ color: '#ffffff', maxWidth: 560, textOverflow: 'inherit' }} >
										<b>Genres:{' '}</b>
										<Typography variant="overline">{(
											genres?.map(genre => {
												return ` ${genre?.name} | `;
											})
										) ?? '-'}
										</Typography>
									</Typography>
								</Box>
								<MediaDetailsCardButtons key={'item-' + (id ?? '')} item={item} add={add} />
							</Box>
						</Box>
						<Box sx={{
							display: 'flex',
							width: '100%',
							left: 0,
							height: 'fit-content',
							alignItems: 'center',
							backgroundColor: '#000000',
							pt: 6, pb: 6,
						}}>
							<YoutubeViewer key={videos?.results[0]?.key} id={videos?.results[0]?.key} name={videos?.results[0]?.name} />
						</Box>
						{children}
					</Box>
				)
			}
		</Box >
	)
};