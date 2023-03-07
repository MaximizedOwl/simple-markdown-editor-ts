import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import Textarea from '@mui/joy/Textarea';
import { ListItemIcon, ListItemText, Menu, MenuList } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './App.css';

function App() {
  // Textbox
  const [str, setStr] = useState(`# Hello world
  - foo
  - buzz

\`\`\`js
const sayHello = () => {
  console.log('Hello World.')
}
\`\`\``);

  // Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className='App'>
      <header>
        <div className='header'>
          <div className='header-title'>
            <h2>Simple Markdown Editor</h2>
          </div>
          <div className='header-menu'>
            <Stack direction='row' spacing={2}>
              <Button
                onClick={handleClickMenu}
                variant='outlined'
                id='header-button-menu'
                aria-controls={isOpen ? 'header-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={isOpen ? 'true' : undefined}>
                <MenuIcon />
              </Button>
              <Menu
                onClose={handleCloseMenu}
                open={isOpen}
                id='header-menu'
                anchorEl={anchorEl}
                MenuListProps={{ 'aria-labelledby': 'header-button' }}>
                <MenuList>
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText>Usage</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText>Swich Theme</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <ShareIcon />
                    </ListItemIcon>
                    <ListItemText>Share</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </div>
        </div>
      </header>
      <main>
        <div className='main'>
          <div className='main-input'>
            <Textarea
              placeholder='# type something'
              maxRows={20}
              size='lg'
              variant='outlined'
              name='postContent'
              className='textarea-input'
              value={str}
              onChange={(e) => setStr(e.target.value)}
              sx={{
                minWidth: '40vw',
                minHeight: '70vh',
                maxWidth: '40vw',
                maxHeight: '70vh',
              }}
            />
          </div>
          <div className='main-output'>
            <label id='label-output'>
              <ReactMarkdown
                children={str}
                className='main-reactmarkdown'
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, style, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={dark}
                        language={match[1]}
                        PreTag='div'
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </label>
          </div>
        </div>
      </main>
      <footer>
        <div className='footer'>
          <div className='footer-menu'>
            <Stack direction='row' spacing={2}>
              <Button variant='outlined'>
                <GitHubIcon />
                to Gist
              </Button>
            </Stack>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
