import { Box, Radio, Typography, Chip } from '@mui/material';

const EmiPlanCard = ({ plan, selected, onSelect }) => {
  return (
    <Box
      onClick={onSelect}
      sx={{
        border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0',
        borderRadius: 2,
        p: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        bgcolor: selected ? '#f0f7ff' : '#fff',
        '&:hover': {
          borderColor: '#1976d2',
          boxShadow: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Radio
          checked={selected}
          sx={{ mt: -0.5 }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ₹{plan.monthlyAmount.toLocaleString('en-IN')}/month
            </Typography>
            {plan.interestRate === 0 && (
              <Chip label="0% Interest" size="small" color="success" sx={{ fontWeight: 600 }} />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Tenure: <strong>{plan.tenure} months</strong>
            </Typography>
            {plan.interestRate > 0 && (
              <Typography variant="body2" color="text.secondary">
                Interest: <strong>{plan.interestRate}%</strong>
              </Typography>
            )}
          </Box>

          {plan.cashback && (
            <Box sx={{ mt: 1 }}>
              <Chip 
                label={`Cashback: ₹${plan.cashbackAmount.toLocaleString('en-IN')}`}
                size="small"
                sx={{ bgcolor: '#fff3e0', color: '#e65100', fontWeight: 600 }}
              />
            </Box>
          )}

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            Total: ₹{(plan.monthlyAmount * plan.tenure).toLocaleString('en-IN')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EmiPlanCard;
