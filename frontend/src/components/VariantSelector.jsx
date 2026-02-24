import { Box, Typography, alpha } from '@mui/material';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  const uniqueColors = [...new Map(variants.map(v => [v.color, v])).values()];

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Brand Color: <Box component="span" sx={{ color: 'primary.main', textTransform: 'none', letterSpacing: 0 }}>{selectedVariant.color}</Box>
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {uniqueColors.map((variant) => {
          const isSelected = selectedVariant.color === variant.color;
          return (
            <Box
              key={variant.color}
              onClick={() => onSelect(variant)}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: '8px',
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                bgcolor: isSelected ? alpha('#6366f1', 0.08) : 'background.paper',
                color: isSelected ? 'primary.main' : 'text.secondary',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                },
              }}
            >
              {variant.color}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default VariantSelector;
