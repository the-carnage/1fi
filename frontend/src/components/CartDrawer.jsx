import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Stack,
  Divider,
  Button,
  Badge,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    items,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
    open,
    setOpen,
  } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          color: "white",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Badge badgeContent={totalCount} color="error">
            <ShoppingCartIcon />
          </Badge>
          <Typography fontWeight={700} fontSize="1.1rem">
            Your Cart
          </Typography>
        </Stack>
        <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Items */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2 }}>
        {items.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 2,
              color: "text.secondary",
              py: 8,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 64, opacity: 0.2 }} />
            <Typography variant="body1">Your cart is empty</Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {items.map((item) => (
              <Box
                key={`${item.productId}-${item.variantId}`}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: "contain",
                    borderRadius: 1,
                    bgcolor: "#f1f5f9",
                    flexShrink: 0,
                    p: 0.5,
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography fontWeight={700} fontSize="0.9rem" noWrap>
                    {item.name}
                  </Typography>
                  <Typography fontSize="0.78rem" color="text.secondary" noWrap>
                    {item.variantName}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={0.5}
                  >
                    <Typography
                      fontWeight={800}
                      fontSize="0.95rem"
                      sx={{
                        background:
                          "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </Typography>
                    <Typography fontSize="0.78rem" color="text.secondary">
                      Qty: {item.qty}
                    </Typography>
                  </Stack>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => removeItem(item.productId, item.variantId)}
                  sx={{ alignSelf: "flex-start", color: "error.main" }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Footer */}
      {items.length > 0 && (
        <Box
          sx={{ px: 2, py: 2, borderTop: "1px solid", borderColor: "divider" }}
        >
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography fontWeight={600}>Total ({totalCount} items)</Typography>
            <Typography fontWeight={800} fontSize="1.1rem" color="primary.main">
              ₹{totalPrice.toLocaleString("en-IN")}
            </Typography>
          </Stack>
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontWeight: 700,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
              mb: 1,
            }}
            onClick={() => alert("Checkout coming soon!")}
          >
            Proceed to Checkout
          </Button>
          <Button
            variant="text"
            fullWidth
            color="error"
            size="small"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Drawer>
  );
};

export default CartDrawer;
