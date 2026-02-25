import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Chip,
  Divider,
  Stack,
  Paper,
  alpha,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import VariantSelector from "../components/VariantSelector";
import StorageSelector from "../components/StorageSelector";
import EmiPlanCard from "../components/EmiPlanCard";
import Breadcrumbs from "../components/Breadcrumbs";
import { getProductBySlug } from "../api";
import { useCart } from "../context/CartContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import StarIcon from "@mui/icons-material/Star";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import FlashOnIcon from "@mui/icons-material/FlashOn";
const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const emiSectionRef = useRef(null);
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
  const handlePrevImage = useCallback(() => {
    if (!selectedVariant) return;
    setCurrentImage(
      (prev) =>
        (prev - 1 + selectedVariant.images.length) %
        selectedVariant.images.length,
    );
  }, [selectedVariant]);
  const handleNextImage = useCallback(() => {
    if (!selectedVariant) return;
    setCurrentImage((prev) => (prev + 1) % selectedVariant.images.length);
  }, [selectedVariant]);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrevImage();
      if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrevImage, handleNextImage]);
  const handleProceed = () => {
    alert(
      `Proceeding with ${selectedVariant.variantName} - ${selectedPlan.tenure} months EMI plan`,
    );
  };
  const handleAddToCart = () => {
    addItem(product, selectedVariant);
    setSnackOpen(true);
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
  const saving = selectedVariant.mrp - selectedVariant.price;
  const emiAmount = selectedPlan
    ? Math.round(selectedVariant.price / selectedPlan.tenure)
    : null;
  return (
    <>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Box
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            px: { xs: 2, md: 4 },
            py: 1.5,
          }}
        >
          <Breadcrumbs items={[{ label: product.name }]} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: "calc(100vh - 56px)",
            maxWidth: 1400,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              position: { md: "sticky" },
              top: 0,
              height: { md: "100vh" },
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRight: "1px solid",
              borderColor: "divider",
              p: { xs: 2, md: 4 },
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                width: "100%",
                maxWidth: 520,
              }}
            >
              {selectedVariant.images.length > 1 && (
                <Stack direction="column" spacing={1.5} sx={{ flexShrink: 0 }}>
                  {selectedVariant.images.map((img, idx) => (
                    <Paper
                      key={idx}
                      elevation={0}
                      onClick={() => setCurrentImage(idx)}
                      sx={{
                        width: 64,
                        height: 64,
                        border: "2px solid",
                        borderColor:
                          currentImage === idx ? "primary.main" : "divider",
                        borderRadius: 2,
                        p: 0.75,
                        cursor: "pointer",
                        bgcolor: "background.default",
                        transition: "all 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": { borderColor: "primary.main" },
                      }}
                    >
                      <img
                        src={img}
                        alt={`view ${idx + 1}`}
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
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "background.default",
                  height: { xs: 300, sm: 400, md: 480 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {selectedVariant.images.length > 1 && (
                  <>
                    <IconButton
                      onClick={handlePrevImage}
                      size="small"
                      sx={{
                        position: "absolute",
                        left: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "rgba(255,255,255,0.85)",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "white" },
                        zIndex: 1,
                      }}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleNextImage}
                      size="small"
                      sx={{
                        position: "absolute",
                        right: 8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "rgba(255,255,255,0.85)",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "white" },
                        zIndex: 1,
                      }}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </>
                )}
                <img
                  src={selectedVariant.images[currentImage]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "opacity 0.3s ease",
                  }}
                />
              </Paper>
            </Box>
            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
              {[
                {
                  icon: <LocalShippingIcon sx={{ fontSize: 18 }} />,
                  label: "Free Delivery",
                },
                {
                  icon: <VerifiedUserIcon sx={{ fontSize: 18 }} />,
                  label: "1 Yr Warranty",
                },
                {
                  icon: <CachedIcon sx={{ fontSize: 18 }} />,
                  label: "7-Day Return",
                },
              ].map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: alpha("#6366f1", 0.08),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "primary.main",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              overflowY: "auto",
              p: { xs: 2, sm: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Chip
              label={product.brand}
              size="small"
              sx={{
                mb: 1.5,
                alignSelf: "flex-start",
                bgcolor: alpha("#6366f1", 0.1),
                color: "primary.main",
                fontWeight: 700,
                fontSize: "0.75rem",
              }}
            />
            <Typography
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.3rem", sm: "1.55rem", md: "1.75rem" },
                lineHeight: 1.3,
                color: "text.primary",
                mb: 1.5,
              }}
            >
              {product.name}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.5}
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "#166534",
                  px: 1,
                  py: 0.3,
                  borderRadius: "6px",
                }}
              >
                <Typography
                  sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}
                >
                  4.2
                </Typography>
                <StarIcon sx={{ fontSize: 14, color: "#fbbf24" }} />
              </Box>
              <Typography sx={{ fontSize: "0.85rem", color: "text.secondary" }}>
                14 Ratings &amp; 4 Reviews
              </Typography>
            </Stack>
            <Divider sx={{ mb: 2.5 }} />
            <Box sx={{ mb: 2.5 }}>
              <Stack
                direction="row"
                alignItems="baseline"
                spacing={1.5}
                sx={{ mb: 0.5 }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "1.75rem", md: "2.1rem" },
                    fontWeight: 800,
                    color: "text.primary",
                    letterSpacing: "-0.5px",
                  }}
                >
                  ₹{selectedVariant.price.toLocaleString("en-IN")}
                </Typography>
                {discount > 0 && (
                  <Chip
                    label={`${discount}% OFF`}
                    size="small"
                    sx={{
                      bgcolor: alpha("#ef4444", 0.1),
                      color: "#dc2626",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  />
                )}
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    color: "text.secondary",
                    textDecoration: "line-through",
                  }}
                >
                  MRP ₹{selectedVariant.mrp.toLocaleString("en-IN")}
                </Typography>
                {discount > 0 && (
                  <Typography
                    sx={{
                      fontSize: "0.9rem",
                      color: "success.main",
                      fontWeight: 600,
                    }}
                  >
                    Save ₹{saving.toLocaleString("en-IN")}
                  </Typography>
                )}
              </Stack>
              <Typography
                sx={{ fontSize: "0.8rem", color: "text.secondary", mt: 0.25 }}
              >
                Incl. all taxes
              </Typography>
              {emiAmount && (
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.75,
                    mt: 1,
                    bgcolor: alpha("#6366f1", 0.07),
                    border: "1px solid",
                    borderColor: alpha("#6366f1", 0.2),
                    borderRadius: "8px",
                    px: 1.5,
                    py: 0.5,
                  }}
                >
                  <CreditCardIcon
                    sx={{ fontSize: 15, color: "primary.main" }}
                  />
                  <Typography
                    sx={{ fontSize: "0.82rem", color: "primary.main" }}
                  >
                    Or ₹{emiAmount.toLocaleString("en-IN")}/mo* &nbsp;
                    <Box
                      onClick={() => {
                        const offset = 100;

                        const element = emiSectionRef.current;
                        if (!element) return;

                        const y =
                          element.getBoundingClientRect().top +
                          window.pageYOffset -
                          offset;

                        window.scrollTo({
                          top: y,
                          behavior: "smooth",
                        });
                      }}
                      component="span"
                      sx={{
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      EMI Options
                    </Box>
                  </Typography>
                </Box>
              )}
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Box sx={{ mb: 2 }}>
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={handleVariantChange}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <StorageSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={handleVariantChange}
              />
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Box sx={{ mb: 2.5 }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 1.5 }}
              >
                <FlashOnIcon sx={{ color: "#f59e0b", fontSize: 18 }} />
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "text.primary",
                  }}
                >
                  Super Savings (3 OFFERS)
                </Typography>
              </Stack>
              <Stack spacing={1.5}>
                {[
                  {
                    icon: "🏦",
                    title: "HDFC Bank",
                    desc: "Instant discount ₹3,000 & 6 months No-cost EMI on HDFC Bank Credit Card.",
                  },
                  {
                    icon: "💳",
                    title: "NeuCoins",
                    desc: "Get up to 10% NeuCoins on select products with Tata NeuHDFC Credit Card.",
                  },
                  {
                    icon: "🌙",
                    title: "Midnight Deals",
                    desc: "Get 6.5% off (offer auto applied at cart) on midnight purchases.",
                  },
                ].map((offer) => (
                  <Box
                    key={offer.title}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: "10px",
                      bgcolor: "background.paper",
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "border-color 0.2s",
                      "&:hover": { borderColor: "primary.main" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.2rem",
                        flexShrink: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {offer.icon}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "text.primary",
                          mb: 0.25,
                        }}
                      >
                        {offer.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.78rem",
                          color: "text.secondary",
                          lineHeight: 1.4,
                        }}
                      >
                        {offer.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Divider sx={{ mb: 2.5 }} />
            <Box sx={{ mb: 3 }} ref={emiSectionRef}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ mb: 2 }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "text.primary",
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
                    fontSize: "0.7rem",
                  }}
                />
              </Stack>
              <Stack spacing={1.5}>
                {product.emiPlans.map((plan, idx) => (
                  <EmiPlanCard
                    key={idx}
                    plan={plan}
                    selected={selectedPlan === plan}
                    onSelect={() => setSelectedPlan(plan)}
                  />
                ))}
              </Stack>
            </Box>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleAddToCart}
              startIcon={<ShoppingCartIcon />}
              sx={{
                py: 1.75,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "12px",
                borderColor: "primary.main",
                color: "primary.main",
                mb: 1.5,
                "&:hover": {
                  bgcolor: "rgba(99,102,241,0.06)",
                  borderColor: "primary.dark",
                },
              }}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleProceed}
              startIcon={<CheckCircleIcon />}
              sx={{
                py: 1.75,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 8px 24px rgba(99,102,241,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  boxShadow: "0 12px 32px rgba(99,102,241,0.5)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.25s ease",
              }}
            >
              Proceed with {selectedPlan?.tenure} Month EMI
            </Button>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 1.5,
                textAlign: "center",
                color: "text.secondary",
                fontSize: "0.78rem",
              }}
            >
              🔒 100% Secure Payment &nbsp;•&nbsp; No Hidden Charges
              &nbsp;•&nbsp; Easy Returns
            </Typography>
            <Box sx={{ pb: 4 }} />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Added to cart!
        </Alert>
      </Snackbar>
    </>
  );
};
export default ProductDetail;
