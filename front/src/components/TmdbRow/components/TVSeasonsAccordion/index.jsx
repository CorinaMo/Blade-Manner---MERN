import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { grey } from '@mui/material/colors';
import { Divider } from '@mui/material';

export const TVSeasonsAccordion = ({ seasons }) => {

	return (
		<>
			{seasons?.length > 0 && (
				seasons?.map((season, i) => (
					<div key={season?.name} >
						<Accordion sx={{ backgroundColor: grey[900], color: '#ffffff' }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
								aria-controls="panel1a-content"
								id={"season" + i}
								sx={{ display: 'flex' }}
							>
								<Typography variant='h6' sx={{ width: '100%', textAlign: 'center' }}>
									{season?.name}{season?.air_date ? ` (${season?.air_date?.slice(0, 4)})` : ''}
								</Typography>
							</AccordionSummary>
							<AccordionDetails sx={{ pr: 6, pl: 6 }} >
								<Typography variant='overline' fontSize={14}>
									<b>Score: </b> {(season?.vote_average).toFixed(1) ?? '-'}
									<b style={{ paddingLeft: 10 }}>N. Episodes: </b>{season?.episode_count ?? '-'}
								</Typography>
								<Typography variant='body1'>
									<b>Overview: </b>{season?.overview ?? '-'}
								</Typography>
							</AccordionDetails>
						</Accordion>
						<Divider sx={{ color: '#ffffff' }} />
					</div>
				))
			)}
		</>
	)
};