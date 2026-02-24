import { Box, Typography, Chip, Stack } from '@mui/material';

const StorageSelector = ({ variants, selectedVariant, onSelect }) => {
  const uniqueStorages = [...new Map(variants.map(v => [v.storage, v])).values()];

  if (uniqueStorages.length <= 1) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Storage
      </Typography>
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {uniqueStorages.map((variant) => {
          const isSelected = selectedVariant.storage === variant.storage;
          return (
            <Chip
              key={variant.storage}
              label={variant.storage}
              onClick={() => onSelect(variant)}
              sx={{
                px: 2,
                py: 3,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                bgcolor: isSelected ? 'primary.main' : 'background.paper',
                color: isSelected ? 'white' : 'text.primary',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                },
                ...(isSelected && {
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                }),
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default StorageSelector;
