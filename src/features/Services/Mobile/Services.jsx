import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MobHeading from "@/components/Mobile/mobileHeading";
import MobServiceCategoryList from "@/components/Mobile/mobServiceCategoryList";

const Services = ({ services, title }) => {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    if (slug) {
      navigate("/workers/" + slug);
    }
  };

  return (
    <Box sx={{ pb: 1 }}>
      <MobHeading Heading={title} />
      <Grid container gap={0.5} mt={1} justifyContent="space-evenly">
        {services.map((item, index) => (
          <Grid item key={index}>
            <MobServiceCategoryList
              title={item?.title}
              img={item?.imageUrl}
              onClick={() => handleClick(item?.slug)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
