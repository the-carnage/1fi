import { Box, Typography, Chip } from '@mui/material';

const StorageSelector = ({ variants, selectedVariant, onSelect }) => {
  const uniqueStorages = [...new Map(variants.map(v => [v.storage, v])).values()];

  if (uniqueStorages.length <= 1) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
        Storage: {selectedVariant.storage}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {uniqueStorages.map((variant) => (
          <Chip
            key={variant.storage}
            label={variant.storage}
            onClick={() => onSelect(variant)}
            variant={selectedVariant.storage === variant.storage ? 'filled' : 'outlined'}
            color={selectedVariant.storage === variant.storage ? 'primary' : 'default'}
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: selectedVariant.storage === variant.storage ? 'primary.main' : 'action.hover',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StorageSelector;
