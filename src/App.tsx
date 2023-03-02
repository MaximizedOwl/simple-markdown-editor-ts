import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';

function App() {
  const [str, setStr] = useState('');

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <h1>Simple Markdown Editor</h1>
        </div>
      </header>
      <main>
        <div className='main-content'>
          <div className='input'>
            <textarea
              name='postContent'
              id='textarea-input'
              value={str}
              onChange={(e) => setStr(e.target.value)}
            />
          </div>
          <div className='output'>
            <label id='label-output'>
              <ReactMarkdown
                className='reactmarkdown'
                remarkPlugins={[remarkGfm]}>
                {str}
              </ReactMarkdown>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;
