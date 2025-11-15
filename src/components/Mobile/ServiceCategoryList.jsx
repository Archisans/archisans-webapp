import { Box, Typography } from '@mui/material';

const MobServiceCategoryList = ({ img, title, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 170,
        height: 137,
        borderRadius: 1,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        border:'0.5px solid #858383ff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        mb: 1.4,
      }}
    >
      {/* Full-size Image */}
      <Box
        component="img"
        src={img}
        alt={title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Full Gradient Overlay with Title */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(204, 201, 201, 0.03), rgba(88, 87, 87, 0.42), rgba(0, 0, 0, 0.71), rgba(0, 0, 0, 1))',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pb: 1.2,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#fff',
            fontSize: '13px',
            lineHeight: 1.2,
            textAlign:'center',
            wordWrap: 'break-word',
            mb:1.2,
            px:1
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobServiceCategoryList;
