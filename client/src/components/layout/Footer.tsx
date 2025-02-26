import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.dark",
        py: 6,
        color: "text.light",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              תכנון תרמי
            </Typography>
            <Typography variant="body2">
              מערכת לתכנון וניתוח תרמי של מעטפת הבניין בישראל
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              קישורים מהירים
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              דף הבית
            </Link>
            <Link
              href="/designer"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              מתכנן קירות
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              אודות
            </Link>
            <Link href="#" color="inherit" display="block">
              צור קשר
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              עקבו אחרינו
            </Typography>
            <Box>
              <IconButton color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit">
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box mt={5}>
          <Typography variant="body2" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
              תכנון תרמי
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
