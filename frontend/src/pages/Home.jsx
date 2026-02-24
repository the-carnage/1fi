import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Stack,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SecurityIcon from "@mui/icons-material/Security";

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low")
        return a.variants[0].price - b.variants[0].price;
      if (sortBy === "price-high")
        return b.variants[0].price - a.variants[0].price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

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

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ py: { xs: 6, sm: 8, md: 12 }, position: "relative" }}
        >
          <Box
            sx={{
              maxWidth: 800,
              mx: "auto",
              textAlign: "center",
              px: { xs: 2, sm: 0 },
            }}
          >
            <Chip
              label="🎉 Zero Down Payment Available"
              sx={{
                mb: { xs: 2, sm: 3 },
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontWeight: 600,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            />
            <Typography
              variant="h1"
              sx={{
                color: "white",
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                lineHeight: 1.2,
              }}
            >
              Buy Premium Smartphones
              <br />
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                on Flexible EMI
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.9)",
                mb: { xs: 3, sm: 4 },
                fontWeight: 400,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.25rem" },
                px: { xs: 1, sm: 0 },
              }}
            >
              EMI plans backed by mutual funds. No hidden charges. 0% interest
              options available.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              sx={{ mb: 2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "white",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <LocalOfferIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                <Typography
                  variant="body1"
                  fontWeight={600}
                  fontSize={{ xs: "0.9rem", sm: "1rem" }}
                >
                  Best Prices
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "white",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <TrendingUpIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                <Typography
                  variant="body1"
                  fontWeight={600}
                  fontSize={{ xs: "0.9rem", sm: "1rem" }}
                >
                  Flexible Plans
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "white",
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                <SecurityIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                <Typography
                  variant="body1"
                  fontWeight={600}
                  fontSize={{ xs: "0.9rem", sm: "1rem" }}
                >
                  100% Secure
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Products Section */}
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
      >
        <Box sx={{ mb: { xs: 4, sm: 5, md: 6 }, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Featured Smartphones
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              px: { xs: 2, sm: 0 },
            }}
          >
            Choose from our curated collection of premium devices
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Smartphones">Smartphones</MenuItem>
              <MenuItem value="Women's Dresses">Women's Dresses</MenuItem>
              <MenuItem value="Shoes">Shoes</MenuItem>
              <MenuItem value="Watches">Watches</MenuItem>
              <MenuItem value="Jewellery">Jewellery</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              sx={{ bgcolor: "white" }}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="name">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3} alignItems="stretch">
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id} sx={{ display: "flex" }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          py: { xs: 4, sm: 6, md: 8 },
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 64, sm: 80 },
                    height: { xs: 64, sm: 80 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
                  }}
                >
                  <LocalOfferIcon
                    sx={{ fontSize: { xs: 32, sm: 40 }, color: "white" }}
                  />
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    Best Prices
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
                  >
                    Get the best deals on premium smartphones with exclusive
                    discounts
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 64, sm: 80 },
                    height: { xs: 64, sm: 80 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 8px 24px rgba(240, 147, 251, 0.3)",
                  }}
                >
                  <TrendingUpIcon
                    sx={{ fontSize: { xs: 32, sm: 40 }, color: "white" }}
                  />
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    Flexible EMI
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
                  >
                    Choose from multiple EMI plans backed by mutual funds
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: { xs: 64, sm: 80 },
                    height: { xs: 64, sm: 80 },
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 8px 24px rgba(79, 172, 254, 0.3)",
                  }}
                >
                  <SecurityIcon
                    sx={{ fontSize: { xs: 32, sm: 40 }, color: "white" }}
                  />
                </Box>
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      fontSize: { xs: "1.25rem", sm: "1.5rem" },
                    }}
                  >
                    100% Secure
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
                  >
                    Safe and secure transactions with complete data protection
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
