import { Box, Typography } from '@material-ui/core';

function Header() {
  return (
    <Box mb={2} textAlign="center">
      <Box mb={1}>
        <Typography variant="h4">
          Tabela Fipe
        </Typography>
      </Box>
      <Typography variant="h6">
        Consulte o valor de um veículo de forma gratuita
      </Typography>
    </Box>
  );
}

export default Header;
