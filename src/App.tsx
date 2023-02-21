import { marked } from 'marked';
import { useState } from 'react';
import './App.css';

function App() {
  const [str, setStr] = useState('');

  marked.use({
    gfm: true,
  });

  const textareaChange = () => {
    // テキストエリアの内容を取得し、label'output'に出力する。
  };

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
              value={marked.parse(str)}
              rows={30}
              cols={50}
              onChange={(e) => setStr(e.target.value)}
            />
          </div>
          <div className='output'>
            <label>{str}</label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
