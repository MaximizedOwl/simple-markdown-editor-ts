import { Stack } from '@mui/material';
import Constants from '../utils/constants';

const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <div className='footer-menu'>
          <Stack direction='row' spacing={2}>
            {Constants.COPYRIGHT}
          </Stack>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
