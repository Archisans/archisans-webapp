import { Grid, Box } from "@mui/material";
import MobHelpSupportChatBottom from "@/components/Mobile/mobHelpSupport/mobHelpSupportChatBottom";
import MobHelpSupportChatTop from "@/components/Mobile/mobHelpSupport/mobHelpSupportChatTop";
import supportchat_icon from "@/assets/Images/supportchat_icon.png";

const MobHelpSupportChat = () => {
  return (
    <Grid>
      <MobHelpSupportChatTop name="Help Center" img={supportchat_icon} />
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{ px: 2, mt: 5, mb: 8 }}
      >
        {/* Support message (left aligned) */}
        <Grid item>
          <Box
            sx={{
              maxWidth: "75%",
              bgcolor: "#f1f1f1",
              p: 1.5,
              borderRadius: 2,
              alignSelf: "flex-start",
              fontSize: 14,
            }}
          >
            Hello! How can I assist you today?
          </Box>
        </Grid>

        {/* User message (right aligned) */}
        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            sx={{
              maxWidth: "75%",
              bgcolor: "#d1e7dd",
              p: 1.5,
              borderRadius: 2,
              fontSize: 14,
            }}
          >
            I need help with my recent ticket.
          </Box>
        </Grid>

        {/* Support message */}
        <Grid item>
          <Box
            sx={{
              maxWidth: "75%",
              bgcolor: "#f1f1f1",
              p: 1.5,
              borderRadius: 2,
              alignSelf: "flex-start",
              fontSize: 14,
            }}
          >
            Sure! Can you please provide your ticket ID?
          </Box>
        </Grid>

        {/* User message */}
        <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            sx={{
              maxWidth: "75%",
              bgcolor: "#d1e7dd",
              p: 1.5,
              borderRadius: 2,
              fontSize: 14,
            }}
          >
            It's #4521.
          </Box>
        </Grid>
      </Grid>
      <MobHelpSupportChatBottom />
    </Grid>
  );
};

export default MobHelpSupportChat;
