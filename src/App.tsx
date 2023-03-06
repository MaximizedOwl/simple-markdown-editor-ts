import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';

function App() {
  const [str, setStr] = useState(`# Hello world
  - foo
  - buzz`);

  return (
    <div className='App'>
      <header>
        <div className='header'>
          <div className='header-title'>
            <h2>Simple Markdown Editor</h2>
          </div>
          <div className='header-menu'>
            <Stack direction='row' spacing={2}>
              <Button variant='outlined'>share</Button>
              <Button variant='outlined'>❔</Button>
              <Button variant='outlined'>🌛</Button>
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
                className='main-reactmarkdown'
                remarkPlugins={[remarkGfm]}>
                {str}
              </ReactMarkdown>
            </label>
          </div>
        </div>
      </main>
      <footer>
        <div className='footer'>
          <div className='footer-menu'>
            <Stack direction='row' spacing={2}>
              <Button variant='outlined'>to Gist</Button>
            </Stack>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
