import { Box, Radio, Typography, Chip, Stack, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const EmiPlanCard = ({ plan, selected, onSelect }) => {
  return (
    <Box
      onClick={onSelect}
      sx={{
        position: 'relative',
        border: '2px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        borderRadius: 3,
        p: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        bgcolor: selected ? alpha('#6366f1', 0.04) : 'background.paper',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: selected ? '0 8px 24px rgba(99, 102, 241, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.08)',
          transform: 'translateY(-2px)',
        },
        ...(selected && {
          boxShadow: '0 8px 24px rgba(99, 102, 241, 0.2)',
        }),
      }}
    >
      {selected && (
        <Box
          sx={{
            position: 'absolute',
            top: -1,
            right: -1,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: '0 10px 0 10px',
            px: 1.5,
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" fontWeight={700}>
            Selected
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Radio
          checked={selected}
          sx={{
            mt: -0.5,
            color: 'divider',
            '&.Mui-checked': {
              color: 'primary.main',
            },
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>
              /month
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label={`${plan.tenure} Months`}
              size="small"
              sx={{
                bgcolor: alpha('#6366f1', 0.1),
                color: 'primary.main',
                fontWeight: 600,
              }}
            />
            {plan.interestRate === 0 ? (
              <Chip
                label="0% Interest"
                size="small"
                sx={{
                  bgcolor: alpha('#10b981', 0.1),
                  color: 'success.main',
                  fontWeight: 600,
                }}
              />
            ) : (
              <Chip
                label={`${plan.interestRate}% Interest`}
                size="small"
                sx={{
                  bgcolor: alpha('#f59e0b', 0.1),
                  color: '#d97706',
                  fontWeight: 600,
                }}
              />
            )}
          </Stack>

          {plan.cashback && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha('#10b981', 0.08),
                border: '1px solid',
                borderColor: alpha('#10b981', 0.2),
                mb: 2,
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 20, color: 'success.main' }} />
              <Typography variant="body2" fontWeight={700} color="success.main">
                Cashback: ₹{plan.cashbackAmount.toLocaleString('en-IN')}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Total Amount
              </Typography>
              <Typography variant="h6" fontWeight={700} color="text.primary">
                ₹{(plan.monthlyAmount * plan.tenure).toLocaleString('en-IN')}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmiPlanCard;
