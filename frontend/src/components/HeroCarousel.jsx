import { useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const slides = [
  {
    badge: "🎉 Zero Down Payment Available",
    headline: "Buy Premium Smartphones",
    highlight: "on Flexible EMI",
    sub: "EMI plans backed by mutual funds. No hidden charges. 0% interest options available.",
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    radial:
      "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 55%)",
  },
  {
    badge: "⚡ No-Cost EMI on Top Brands",
    headline: "Samsung, Apple, OnePlus",
    highlight: "All in One Place",
    sub: "Explore the latest flagship phones with exclusive discounts and cashback on every EMI plan.",
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    radial:
      "radial-gradient(circle at 80% 30%, rgba(25.5,255,255,0.12) 0%, transparent 55%)",
  },
  {
    badge: "🔒 100% Secure Payments",
    headline: "Upgrade Your Phone Today",
    highlight: "Pay in Easy Instalments",
    sub: "Flexible 3, 6, and 12-month plans. Choose what works for you with full transparency.",
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    radial:
      "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.12) 0%, transparent 55%)",
  },
];
const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, []);
  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);
  const slide = slides[active];
  return (
    <Box
      sx={{
        background: slide.bg,
        transition: "background 0.7s ease",
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 360, sm: 420, md: 460 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: slide.radial,
          transition: "background 0.7s ease",
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 6, sm: 7, md: 8 }, position: "relative" }}
      >
        <Box
          sx={{
            maxWidth: 820,
            mx: "auto",
            textAlign: "center",
            px: { xs: 2, sm: 0 },
            animation: "fadeSlide 0.55s ease",
            "@keyframes fadeSlide": {
              from: { opacity: 0, transform: "translateY(18px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
          key={active}
        >
          <Box
            sx={{
              display: "inline-block",
              mb: { xs: 2, sm: 3 },
              px: 2,
              py: 0.75,
              borderRadius: "999px",
              bgcolor: "rgba(255,255,255,0.18)",
              color: "white",
              fontWeight: 600,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            {slide.badge}
          </Box>
          <Typography
            variant="h1"
            sx={{
              color: "white",
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.5rem" },
              textShadow: "0 2px 20px rgba(0,0,0,0.18)",
              lineHeight: 1.2,
              fontWeight: 800,
            }}
          >
            {slide.headline}
            <br />
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {slide.highlight}
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: { xs: 3, sm: 4 },
              fontWeight: 400,
              lineHeight: 1.6,
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.2rem" },
              px: { xs: 1, sm: 0 },
            }}
          >
            {slide.sub}
          </Typography>
        </Box>
        <IconButton
          onClick={prev}
          sx={{
            position: "absolute",
            left: { xs: 4, sm: 16 },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={next}
          sx={{
            position: "absolute",
            right: { xs: 4, sm: 16 },
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { bgcolor: "rgba(255,255,255,0.35)" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          pb: 3,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setActive(i)}
            sx={{
              width: i === active ? 24 : 8,
              height: 8,
              borderRadius: "999px",
              bgcolor: i === active ? "white" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
export default HeroCarousel;
