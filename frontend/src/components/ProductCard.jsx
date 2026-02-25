import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  alpha,
} from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ProductCard = ({ product }) => {
  const firstVariant = product.variants[0];
  const discount = Math.round(
    ((firstVariant.mrp - firstVariant.price) / firstVariant.mrp) * 100,
  );
  return (
    <Link
      to={`/products/${product.slug}`}
      style={{
        textDecoration: "none",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid",
          borderColor: "divider",
          boxSizing: "border-box",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.1)",
            borderColor: "primary.main",
            "& .product-image": { transform: "scale(1.05)" },
            "& .view-details": { opacity: 1, transform: "translateX(0)" },
          },
        }}
      >
        {discount > 0 && (
          <Chip
            icon={<LocalOfferIcon sx={{ fontSize: 14 }} />}
            label={`${discount}% OFF`}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 1,
              bgcolor: "success.main",
              color: "white",
              fontWeight: 700,
              fontSize: "0.7rem",
              height: 24,
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
            }}
          />
        )}
        <Box
          sx={{
            width: "100%",
            height: 220,
            flexShrink: 0,
            bgcolor: alpha("#6366f1", 0.03),
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            image={firstVariant.images[0]}
            alt={product.name}
            className="product-image"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: 2.5,
              transition: "transform 0.4s ease",
            }}
          />
        </Box>
        <CardContent
          sx={{
            flex: 1,
            flexShrink: 0,
            p: "16px !important",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Chip
            label={product.brand}
            size="small"
            sx={{
              mb: 1,
              alignSelf: "flex-start",
              bgcolor: alpha("#6366f1", 0.1),
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.7rem",
              height: 22,
            }}
          />
          <Typography
            variant="body1"
            component="h2"
            sx={{
              mb: 1.5,
              fontWeight: 700,
              fontSize: "0.95rem",
              lineHeight: 1.4,
              color: "text.primary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {product.name}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="baseline"
            sx={{ mb: 1 }}
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ₹{firstVariant.price.toLocaleString("en-IN")}
            </Typography>
            {discount > 0 && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.secondary",
                  fontSize: "0.8rem",
                }}
              >
                ₹{firstVariant.mrp.toLocaleString("en-IN")}
              </Typography>
            )}
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.78rem", mb: "auto" }}
          >
            {product.variants.length} variant
            {product.variants.length > 1 ? "s" : ""} available
          </Typography>
          <Box
            className="view-details"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mt: 1,
              color: "primary.main",
              fontWeight: 600,
              fontSize: "0.85rem",
              opacity: 0,
              transform: "translateX(-8px)",
              transition: "all 0.3s ease",
            }}
          >
            View Details <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
export default ProductCard;
