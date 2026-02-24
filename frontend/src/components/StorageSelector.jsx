import { Box, Typography, alpha } from '@mui/material';

const StorageSelector = ({ variants, selectedVariant, onSelect }) => {
  const uniqueStorages = [...new Map(variants.map(v => [v.storage, v])).values()];

  if (uniqueStorages.length <= 1) return null;

  return (
    <Box sx={{ mb: 2, width: '100%' }}>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.secondary', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Internal Storage
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {uniqueStorages.map((variant) => {
          const isSelected = selectedVariant.storage === variant.storage;
          return (
            <Box
              key={variant.storage}
              onClick={() => onSelect(variant)}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: '8px',
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                bgcolor: isSelected ? alpha('#6366f1', 0.08) : 'background.paper',
                color: isSelected ? 'primary.main' : 'text.secondary',
                fontWeight: 700,
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
              {variant.storage}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default StorageSelector;
