import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  alpha,
  Paper,
} from "@mui/material";
import VariantSelector from "../components/VariantSelector";
import StorageSelector from "../components/StorageSelector";
import EmiPlanCard from "../components/EmiPlanCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { getProductBySlug } from "../api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setSelectedPlan(data.emiPlans[0]);
      } catch (err) {
        setError("Product not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCurrentImage(0);
  };

  const handleProceed = () => {
    alert(
      `Proceeding with ${selectedVariant.variantName} - ${selectedPlan.tenure} months EMI plan`,
    );
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={48} thickness={4} />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  const discount = Math.round(
    ((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100,
  );

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Breadcrumbs items={[{ label: product.name }]} />

        <Grid container spacing={4}>
          {/* Left Half - Thumbnail strip + Main image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: 80,
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              {/* Vertical thumbnail strip */}
              {selectedVariant.images.length > 1 && (
                <Stack
                  direction="column"
                  spacing={1.5}
                  sx={{ flexShrink: 0 }}
                >
                  {selectedVariant.images.map((img, idx) => (
                    <Paper
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      elevation={0}
                      sx={{
                        width: 72,
                        height: 72,
                        border: "2px solid",
                        borderColor:
                          currentImage === idx ? "primary.main" : "divider",
                        borderRadius: 2,
                        p: 0.75,
                        cursor: "pointer",
                        bgcolor: "background.paper",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.main",
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Paper>
                  ))}
                </Stack>
              )}

              {/* Main image */}
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  height: 500,
                  minHeight: 500,
                  maxHeight: 500,
                  overflow: "hidden",
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={selectedVariant.images[currentImage]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Paper>
            </Box>
          </Grid>

          {/* Right Half - Product Details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%" }}>
              <Chip
                label={product.brand}
                sx={{
                  mb: 2,
                  bgcolor: alpha("#6366f1", 0.1),
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              />

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {product.name}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: { xs: 3, md: 4 },
                  lineHeight: 1.7,
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                }}
              >
                {product.description}
              </Typography>

              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={handleVariantChange}
              />

              <StorageSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={handleVariantChange}
              />

              <Divider sx={{ my: 4 }} />

              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  mb: { xs: 3, md: 4 },
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2 }}
                  alignItems={{ xs: "flex-start", sm: "baseline" }}
                  sx={{ mb: 1 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: "white",
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                    }}
                  >
                    ₹{selectedVariant.price.toLocaleString("en-IN")}
                  </Typography>
                  {discount > 0 && (
                    <Chip
                      label={`${discount}% OFF`}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        fontWeight: 700,
                        backdropFilter: "blur(10px)",
                      }}
                    />
                  )}
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 0.5, sm: 2 }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      color: "rgba(255, 255, 255, 0.7)",
                      fontWeight: 500,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    MRP: ₹{selectedVariant.mrp.toLocaleString("en-IN")}
                  </Typography>
                  {discount > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#fbbf24",
                        fontWeight: 700,
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      You save ₹
                      {(
                        selectedVariant.mrp - selectedVariant.price
                      ).toLocaleString("en-IN")}
                    </Typography>
                  )}
                </Stack>
              </Paper>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.5, sm: 2 }}
                sx={{ mb: { xs: 3, md: 4 } }}
                useFlexGap
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocalShippingIcon
                    sx={{ color: "primary.main", fontSize: { xs: 20, sm: 24 } }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={{ xs: "0.875rem", sm: "0.95rem" }}
                  >
                    Free Delivery
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <VerifiedUserIcon
                    sx={{ color: "primary.main", fontSize: { xs: 20, sm: 24 } }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={{ xs: "0.875rem", sm: "0.95rem" }}
                  >
                    1 Year Warranty
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CachedIcon
                    sx={{ color: "primary.main", fontSize: { xs: 20, sm: 24 } }}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={{ xs: "0.875rem", sm: "0.95rem" }}
                  >
                    7 Days Return
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ width: "100%" }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2 }}
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  sx={{ mb: 3 }}
                  useFlexGap
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    Choose Your EMI Plan
                  </Typography>
                  <Chip
                    label="Backed by Mutual Funds"
                    size="small"
                    sx={{
                      bgcolor: alpha("#10b981", 0.1),
                      color: "success.main",
                      fontWeight: 600,
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                    }}
                  />
                </Stack>

                <Stack
                  spacing={{ xs: 2, sm: 3 }}
                  sx={{ mb: { xs: 3, md: 4 }, width: "100%" }}
                >
                  {product.emiPlans.map((plan, idx) => (
                    <EmiPlanCard
                      key={idx}
                      plan={plan}
                      selected={selectedPlan === plan}
                      onSelect={() => setSelectedPlan(plan)}
                    />
                  ))}
                </Stack>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleProceed}
                  startIcon={<CheckCircleIcon />}
                  sx={{
                    py: { xs: 1.5, sm: 2 },
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    fontWeight: 700,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    boxShadow: "0 8px 24px rgba(99, 102, 241, 0.4)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                      boxShadow: "0 12px 32px rgba(99, 102, 241, 0.5)",
                      transform: "translateY(-2px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Proceed with {selectedPlan.tenure} Month EMI
                </Button>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mt: 2,
                    textAlign: "center",
                    fontSize: { xs: "0.75rem", sm: "0.85rem" },
                    px: 1,
                  }}
                >
                  🔒 100% Secure Payment • No Hidden Charges • Easy Returns
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
