import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
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
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Products Section */}
      <Container
        id="products-section"
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
        {filteredProducts.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              bgcolor: "background.paper",
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No product is found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or filter to find what you're looking
              for.
            </Typography>
          </Box>
        )}
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
