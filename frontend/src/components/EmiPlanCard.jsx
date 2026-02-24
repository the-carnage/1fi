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
        p: { xs: 2, sm: 3 },
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        bgcolor: selected ? alpha('#6366f1', 0.04) : 'background.paper',
        width: '100%',
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
            px: { xs: 1, sm: 1.5 },
            py: 0.5,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
          <Typography variant="caption" fontWeight={700} fontSize={{ xs: '0.7rem', sm: '0.75rem' }}>
            Selected
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1, sm: 2 }, width: '100%' }}>
        <Radio
          checked={selected}
          sx={{
            mt: -0.5,
            color: 'divider',
            p: { xs: 0.5, sm: 1 },
            '&.Mui-checked': {
              color: 'primary.main',
            },
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 2 }} 
            alignItems="center" 
            sx={{ mb: 2 }}
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              }}
            >
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              fontWeight={600}
              fontSize={{ xs: '0.875rem', sm: '1rem' }}
            >
              /month
            </Typography>
          </Stack>

          <Stack 
            direction="row" 
            spacing={{ xs: 1, sm: 2 }} 
            sx={{ mb: 2 }} 
            flexWrap="wrap" 
            useFlexGap
          >
            <Chip
              label={`${plan.tenure} Months`}
              size="small"
              sx={{
                bgcolor: alpha('#6366f1', 0.1),
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
                p: { xs: 1, sm: 1.5 },
                borderRadius: 2,
                bgcolor: alpha('#10b981', 0.08),
                border: '1px solid',
                borderColor: alpha('#10b981', 0.2),
                mb: 2,
              }}
            >
              <LocalOfferIcon sx={{ fontSize: { xs: 18, sm: 20 }, color: 'success.main' }} />
              <Typography 
                variant="body2" 
                fontWeight={700} 
                color="success.main"
                fontSize={{ xs: '0.8rem', sm: '0.875rem' }}
              >
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
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center"
              spacing={1}
            >
              <Typography 
                variant="body2" 
                color="text.secondary" 
                fontWeight={600}
                fontSize={{ xs: '0.8rem', sm: '0.875rem' }}
              >
                Total Amount
              </Typography>
              <Typography 
                variant="h6" 
                fontWeight={700} 
                color="text.primary"
                fontSize={{ xs: '1rem', sm: '1.25rem' }}
              >
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
