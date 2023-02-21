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
              value={str}
              rows={30}
              cols={50}
              onChange={(e) => setStr(e.target.value)}
            />
          </div>
          <div id='output' className='output'>
            <label id='label-output'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{str}</ReactMarkdown>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
