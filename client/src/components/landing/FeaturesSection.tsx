import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import ScienceIcon from "@mui/icons-material/Science";
import VerifiedIcon from "@mui/icons-material/Verified";
import SpeedIcon from "@mui/icons-material/Speed";

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, description, icon, color }) => (
  <Card
    sx={{
      height: "100%",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
      },
      overflow: "visible",
      position: "relative",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: "-30px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: color,
        color: "white",
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      }}
    >
      {icon}
    </Box>
    <CardContent sx={{ pt: 5, pb: 3, px: 3 }}>
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

const FeaturesSection: React.FC = () => {
  const theme = useTheme();

  const features = [
    {
      title: "תכנון קל ואינטואיטיבי",
      description:
        "ממשק פשוט וידידותי למשתמש המאפשר לבחור חומרים, לסדר שכבות ולהגדיר פרמטרים בקלות",
      icon: <BuildIcon fontSize="large" />,
      color: theme.palette.primary.main,
    },
    {
      title: "סימולציה בזמן אמת",
      description:
        "צפו בתוצאות החישובים התרמיים בזמן אמת כאשר אתם משנים את תצורת הקיר",
      icon: <ScienceIcon fontSize="large" />,
      color: theme.palette.info.main,
    },
    {
      title: "אימות לפי תקן 1045",
      description:
        "בדיקה אוטומטית של עמידת התכנון בדרישות התקן הישראלי לבידוד תרמי",
      icon: <VerifiedIcon fontSize="large" />,
      color: theme.palette.success.main,
    },
    {
      title: "ביצועים אופטימליים",
      description: "המלצות לשיפור הביצועים התרמיים וניתוח מקיף של מבנה הקיר",
      icon: <SpeedIcon fontSize="large" />,
      color: theme.palette.warning.main,
    },
  ];

  return (
    <Box sx={{ py: 12, bgcolor: "background.default" }}>
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

        <Grid container spacing={6} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
