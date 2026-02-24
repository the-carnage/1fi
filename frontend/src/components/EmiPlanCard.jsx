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
        p: { xs: 2, sm: 2.5 },
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        bgcolor: selected ? alpha('#6366f1', 0.04) : 'background.paper',
        width: '100%',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px rgba(99,102,241,0.15)',
        },
        ...(selected && { boxShadow: '0 4px 16px rgba(99,102,241,0.2)' }),
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
            px: 1.25,
            py: 0.4,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 14 }} />
          <Typography variant="caption" fontWeight={700} fontSize="0.7rem">Selected</Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, width: '100%' }}>
        <Radio
          checked={selected}
          sx={{
            mt: -0.5,
            p: 0.75,
            color: 'divider',
            '&.Mui-checked': { color: 'primary.main' },
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="baseline" sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.4rem', sm: '1.6rem' },
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}
            </Typography>
            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', fontWeight: 600 }}>
              /month
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} flexWrap="wrap" useFlexGap>
            <Chip
              label={`${plan.tenure} Months`}
              size="small"
              sx={{ bgcolor: alpha('#6366f1', 0.1), color: 'primary.main', fontWeight: 600, fontSize: '0.72rem' }}
            />
            {plan.interestRate === 0 ? (
              <Chip
                label="0% Interest"
                size="small"
                sx={{ bgcolor: alpha('#10b981', 0.1), color: 'success.main', fontWeight: 600, fontSize: '0.72rem' }}
              />
            ) : (
              <Chip
                label={`${plan.interestRate}% Interest`}
                size="small"
                sx={{ bgcolor: alpha('#f59e0b', 0.1), color: '#d97706', fontWeight: 600, fontSize: '0.72rem' }}
              />
            )}
          </Stack>

          {plan.cashback && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                borderRadius: '8px',
                bgcolor: alpha('#10b981', 0.08),
                border: '1px solid',
                borderColor: alpha('#10b981', 0.2),
                mb: 1.5,
              }}
            >
              <LocalOfferIcon sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'success.main' }}>
                Cashback: ₹{plan.cashbackAmount.toLocaleString('en-IN')}
              </Typography>
            </Box>
          )}

          <Box sx={{ pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 600 }}>Total Amount</Typography>
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'text.primary' }}>
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
