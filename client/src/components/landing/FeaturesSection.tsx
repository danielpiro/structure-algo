import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import ScienceIcon from "@mui/icons-material/Science";
import VerifiedIcon from "@mui/icons-material/Verified";

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        transition: "all 0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          "& .icon-wrapper": {
            transform: "rotate(10deg) scale(1.1)",
          },
        },
        borderRadius: 4,
        border: "1px solid rgba(0,0,0,0.1)",
        overflow: "visible",
        position: "relative",
      }}
    >
      <Box
        className="icon-wrapper"
        sx={{
          position: "absolute",
          top: "-35px",
          right: "30px",
          width: "70px",
          height: "70px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          boxShadow: `
            0 12px 24px rgba(0,0,0,0.2),
            inset 0 2px 6px rgba(255,255,255,0.2)
          `,
          transition: "transform 0.4s ease",
          zIndex: 1,
        }}
      >
        {icon}
      </Box>
      <CardContent
        sx={{
          pt: 6,
          pb: 4,
          px: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const FeaturesSection: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      title: "תצורה והגדרות",
      description:
        "ממשק פשוט ואינטואיטיבי לבחירת חומרים, הגדרת מידות וקביעת אילוצים. תכנון מדויק ומקצועי בכמה צעדים פשוטים.",
      icon: <BuildIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "סימולציה והדמיה",
      description:
        "צפייה בזמן אמת בהדמיית תלת-מימד של הקיר, כולל חישובים תרמיים מדויקים והתנהגות החומרים.",
      icon: <ScienceIcon sx={{ fontSize: 40 }} />,
    },
    {
      title: "אימות ותוצאות",
      description:
        "בדיקה אוטומטית של התאמה לתקן 1045, כולל המלצות לשיפור וייצוא דוחות מפורטים.",
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: 16,
        bgcolor: "background.paper",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, ${theme.palette.primary.dark}10 0%, ${theme.palette.background.paper} 100%)`,
          opacity: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            תכונות מרכזיות
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: "700px",
              mx: "auto",
              color: "text.secondary",
            }}
          >
            פלטפורמה מקיפה לתכנון וניתוח תרמי של מעטפת הבניין
          </Typography>
        </Box>

        <Grid container spacing={8} sx={{ mt: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
