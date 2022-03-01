import React from "react";
import { Box } from "@mui/system";
import { Typography, Fade } from "@mui/material";


export const PageTitle = (props) => {
  const title= props.title;
    return (
      <Box className="page-title-view" sx={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
      }}>
        <Fade in={true}>
          <Typography variant="h2" color="text.primary">{title}</Typography>
        </Fade>
       </Box>
    );
}
