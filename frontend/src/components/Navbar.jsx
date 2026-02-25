import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useCart } from "../context/CartContext";
const Navbar = ({ searchQuery, onSearchChange }) => {
  const { totalCount, setOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById("products-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      } else {
        const element = document.getElementById("products-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
              }}
            >
              <ShoppingBagIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.5rem",
              }}
            >
              1Fi
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              mx: 4,
            }}
          >
            <TextField
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              size="small"
              sx={{
                width: "100%",
                maxWidth: 500,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: 2,
                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                color: "text.primary",
                "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" },
              }}
            >
              <Badge badgeContent={totalCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{
                ml: 1,
                color: "text.primary",
                "&:hover": { bgcolor: "rgba(99, 102, 241, 0.08)" },
              }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
