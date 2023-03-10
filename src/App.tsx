import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import Textarea from '@mui/joy/Textarea';

import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Octokit } from '@octokit/core';
import {
  Auth,
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './App.css';
import './firebaseApp';

interface GistFormInput {
  fileName: string;
  description: string;
  secret: boolean;
  postContent: string;
}

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
  const isOpen: boolean = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickUsage = () => {
    // Usageのページ表示
    let usageUrl: string =
      'https://github.com/MaximizedOwl/simple-markdown-editor-ts#readme';
    window.open(usageUrl);

    // メニューを閉じる処理
    handleCloseMenu();
  };

  /* 
    Firebase認証関連
  */
  const [token, setToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);

  // GitHub OAuth Provider ObjectのInstanceを作成
  useEffect(() => {
    if (provider === null) {
      const newProvider = new GithubAuthProvider();
      newProvider.addScope('gist');
      setProvider(newProvider);
    }
  }, [provider]);

  // Firebase Appに対するAuth instanceを取得
  useEffect(() => {
    if (provider !== null && auth === null) {
      setAuth(getAuth());
      console.log(auth);
    }
  }, [auth, provider]);

  // ポップアップによるサインインを実施し、成功したらアクセストークンを取得する
  useEffect(() => {
    if (provider !== null && auth !== null && token === null) {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
          setToken(credential.accessToken);
          console.log('token: ' + credential.accessToken);
        }
        console.log(result.user);
      });
    }
  }, [auth, provider, token]);

  /* 
    Gistに投稿する処理
  */
  const handleClickPostGist: SubmitHandler<GistFormInput> = async (data) => {
    const octokit = new Octokit({
      auth: token,
    });

    await octokit.request('POST /gists', {
      description: data.description,
      public: !data.secret,
      files: {
        [data.fileName]: {
          content: data.postContent,
        },
      },
    });

    // GistPostDialogを閉じる処理
    handleClose();

    // メニューを閉じる処理
    handleCloseMenu();
  };

  const [openGistDialog, setOpenGistDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenGistDialog(true);
  };

  const handleClose = () => {
    setOpenGistDialog(false);
  };

  const { register, handleSubmit } = useForm<GistFormInput>();

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
                  <MenuItem onClick={handleClickUsage}>
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
                  <MenuItem onClick={() => handleClickOpen()}>
                    <ListItemIcon>
                      <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText>Post Gist</ListItemText>
                  </MenuItem>
                  <Dialog
                    open={openGistDialog}
                    onClose={handleClose}
                    aria-labelledby='edit-apartment'>
                    <DialogTitle id='edit-apartment'>
                      Post to your Gist
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please input file name and description.
                      </DialogContentText>
                      <FormGroup>
                        <TextField
                          autoFocus
                          margin='dense'
                          id='file-name'
                          label='file name'
                          type='text'
                          fullWidth
                          required
                          {...register('fileName')}
                        />
                        <TextField
                          autoFocus
                          margin='dense'
                          id='description'
                          label='description'
                          type='text'
                          fullWidth
                          {...register('description')}
                        />
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label='Secret'
                          {...register('secret')}
                        />
                        <Textarea
                          readOnly
                          placeholder='# type something'
                          maxRows={15}
                          size='lg'
                          variant='outlined'
                          className='dialog-textarea'
                          value={str}
                          sx={{
                            minWidth: '35vw',
                            maxWidth: '35vw',
                          }}
                          {...register('postContent')}
                        />
                      </FormGroup>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color='secondary'>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit(handleClickPostGist)}
                        color='primary'>
                        Post
                      </Button>
                    </DialogActions>
                  </Dialog>
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
      <footer>
        <div className='footer'>
          <div className='footer-menu'>
            <Stack direction='row' spacing={2}>
              Copyright © 2023 maximizedowl
            </Stack>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
