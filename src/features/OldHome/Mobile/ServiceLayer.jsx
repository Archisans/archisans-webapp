import { Grid, Typography } from "@mui/material";
import { textDecoration, color } from "../../Home/Mobile/constants";
import { useNavigate } from "react-router-dom";
export const ServiceLayer = (props) => {
  const { name, path , image} = props?.data || {};
  const navigate = useNavigate();
  
  return (
    
    <Grid
      container
      direction={"column"}
      spacing={0.8}
      alignItems={"center"}
      justifyContent={"center"}
      size={4}
      sx={{
        WebkitTapHighlightColor: "transparent",
      }}
      onClick={() => navigate(path)}
      flexWrap
    >
      <Grid
        container
        size={1}
        height={"6em"}
        width={"5em"}
        sx={{ ...textDecoration.serviceLayout }}
        justifyContent={"center"}
        alignItems={"center"}
        pt={2}
      >
         <img
          src={image}
          alt={name}
          style={{
            maxWidth: "40%",
            maxHeight: "48%",
            objectFit: "contain",
          }}
        />
      </Grid>
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
      >
        <Typography sx={{ fontSize: "12px" }}>{name}</Typography>
      </Grid>
    </Grid>
  );
};
