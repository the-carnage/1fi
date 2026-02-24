import { Box, Typography, Tooltip, alpha } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  const uniqueColors = [...new Map(variants.map(v => [v.color, v])).values()];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Color: <Box component="span" sx={{ color: 'primary.main' }}>{selectedVariant.color}</Box>
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {uniqueColors.map((variant) => {
          const isSelected = selectedVariant.color === variant.color;
          return (
            <Tooltip title={variant.color} key={variant.color} arrow>
              <Box
                onClick={() => onSelect(variant)}
                sx={{
                  position: 'relative',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: variant.colorHex,
                  border: '3px solid',
                  borderColor: isSelected ? 'primary.main' : alpha('#000', 0.1),
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: isSelected
                    ? '0 4px 12px rgba(99, 102, 241, 0.4)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'scale(1.15)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                  },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isSelected && (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)',
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 16, color: 'white' }} />
                  </Box>
                )}
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default VariantSelector;
