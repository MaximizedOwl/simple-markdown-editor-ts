import { Textarea } from '@mui/joy';
import { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { StrContext } from '../providers/StrProvider';

const Main = () => {
  const { str, setStr } = useContext(StrContext);

  return (
    <main>
      <div className='main'>
        <div className='main-input'>
          <Textarea
            placeholder='# type something'
            maxRows={20}
            size='lg'
            variant='outlined'
            name='writingContent'
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
  );
};

export default Main;
