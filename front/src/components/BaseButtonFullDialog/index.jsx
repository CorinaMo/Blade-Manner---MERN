import { Button, Stack, Typography } from "@mui/material";

export const BaseButtonFullDialog = ({text, icon, action}) => {
    return (
        <Button sx={{
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.3)',
            }
        }}
            onClick={action} >
            <Stack direction="row">
                {icon}
                <Typography variant="button" sx={{ color: '#ffffff' }} >
                {text}
                </Typography>
            </Stack>
        </Button>
    )
};