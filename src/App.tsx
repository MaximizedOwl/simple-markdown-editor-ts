import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import Textarea from '@mui/joy/Textarea';
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';

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
    GitHunログイン関連
  */
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const hangleClickSign = async () => {
    const auth = getAuth();

    if (isSignedIn) {
      // サインアウト
      await signOut(auth)
        .then(() => {
          // Sign-out successful.
          setIsSignedIn(false);
          alert('サインアウト完了');
        })
        .catch((error) => {
          // An error happened.
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...

          alert(`Error! errorCode; ${error}}, errorMessage: ${errorMessage}`);
        });
    } else {
      // サインイン

      const provider = new GithubAuthProvider();
      provider.addScope('gist');

      await signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          if (credential && credential.accessToken) {
            setToken(credential.accessToken);
            console.log('token: ' + credential.accessToken);
          }

          // The signed-in user info.
          const user = result.user;
          console.log(user);
          setIsSignedIn(true);
          alert('サインイン完了');

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
          alert(
            `Error! errorCode; ${errorCode}}, errorMessage: ${errorMessage}`
          );
        });
    }
  };

  /* 
    Gistに投稿する処理
  */
  const handleClickPostGist: SubmitHandler<GistFormInput> = async (data) => {
    if (isSignedIn) {
      const octokit = new Octokit({
        auth: token,
      });

      try {
        const result = await octokit.request('POST /gists', {
          description: data.description,
          public: !data.secret,
          files: {
            [data.fileName]: {
              content: data.postContent,
            },
          },
        });

        console.log(
          `Success! Status: ${result.status}. Rate limit remaining: ${result.headers['x-ratelimit-remaining']}`
        );
        alert(
          `Success! Status: ${result.status}. Rate limit remaining: ${result.headers['x-ratelimit-remaining']}`
        );
      } catch (error: any) {
        console.log(
          `Error! Status: ${error.status}. Rate limit remaining: ${error.headers['x-ratelimit-remaining']}. Message: ${error.response.data.message}`
        );

        alert(
          `Error! Status: ${error.status}. Rate limit remaining: ${error.headers['x-ratelimit-remaining']}. Message: ${error.response.data.message}`
        );
      }

      // GistPostDialogを閉じる処理
      handleCloseGistPostDialog();

      // メニューを閉じる処理
      handleCloseMenu();
    } else {
      alert('Please SignIn with GitHub.');
    }
  };

  const [openGistDialog, setOpenGistDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenGistDialog(true);
  };

  const handleCloseGistPostDialog = () => {
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
                    onClose={handleCloseGistPostDialog}
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
                      <Button
                        onClick={() => hangleClickSign()}
                        color='primary'
                        sx={{
                          positon: 'left',
                        }}>
                        {isSignedIn ? 'Sign Out GitHub' : 'Sign In GitHub'}
                      </Button>
                      <Button
                        onClick={handleCloseGistPostDialog}
                        color='secondary'>
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
