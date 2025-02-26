// src/theme/typography.ts
export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: "none" as "none", // Type assertion to fix the error
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
  },
  overline: {
    fontSize: "0.625rem",
    fontWeight: 400,
    letterSpacing: "0.08em",
    lineHeight: 2.66,
    textTransform: "uppercase" as "uppercase", // Type assertion to fix the error
  },
};
