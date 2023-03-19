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
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Snackbar,
  TextField,
} from '@mui/material';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { Octokit } from '@octokit/core';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './App.css';
import './firebaseApp';
import Constants from './utils/constants';

interface GistFormInput {
  fileName: string;
  description: string;
  secret: boolean;
  postContent: string;
}

/* 

 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function App() {
  // Textbox
  const [str, setStr] = useState(Constants.INIT_TEXTBOX_STR);

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
    window.open(Constants.URL_USAGE);

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

          // 成功通知
          setSnackbarType('success');
          setSnackbarMessage(Constants.BUTTON_SIGNOUT_GITHUB);
          setIsOpenGistPostSnackbar(true);
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

          // 失敗通知
          setSnackbarType('error');
          setSnackbarMessage(
            `Error! errorCode; ${errorCode}}, errorMessage: ${errorMessage}`
          );
          setIsOpenGistPostSnackbar(true);
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

          // 成功通知
          setSnackbarType('success');
          setSnackbarMessage(Constants.BUTTON_SIGNIN_GITHUB);
          setIsOpenGistPostSnackbar(true);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);

          // 失敗通知
          setSnackbarType('error');
          setSnackbarMessage(
            `Error! errorCode; ${errorCode}}, errorMessage: ${errorMessage}`
          );
          setIsOpenGistPostSnackbar(true);
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

      await octokit
        .request('POST /gists', {
          description: data.description,
          public: !data.secret,
          files: {
            [data.fileName]: {
              content: data.postContent,
            },
          },
        })
        .then((result) => {
          console.log(
            `Success! Status: ${result.status}. Rate limit remaining: ${result.headers['x-ratelimit-remaining']}`
          );

          // 成功通知
          setSnackbarType('success');
          setSnackbarMessage(Constants.POST_SUCCESS + result.data.html_url);
          setIsOpenGistPostSnackbar(true);

          // GistPostDialogを閉じる処理
          handleCloseGistPostDialog();

          // メニューを閉じる処理
          handleCloseMenu();
        })
        .catch((error) => {
          console.log(
            `Error! Status: ${error.status}. Rate limit remaining: ${error.headers['x-ratelimit-remaining']}. Message: ${error.response.data.message}`
          );

          // 失敗通知
          setSnackbarType('error');
          setSnackbarMessage(
            `Error! Status: ${error.status}. Rate limit remaining: ${error.headers['x-ratelimit-remaining']}. Message: ${error.response.data.message}`
          );
          setIsOpenGistPostSnackbar(true);
        });
    } else {
      // サインインを求める警告通知
      setSnackbarType('warning');
      setSnackbarMessage(Constants.HAS_NOT_SIGNIN_GITHUB);
      setIsOpenGistPostSnackbar(true);
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

  /* 
    GistPost完了に関するSnackbar
  */
  const [isOpenGistPostSnackbar, setIsOpenGistPostSnackbar] =
    useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarType, setSnackbarType] = useState<AlertColor | undefined>();
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsOpenGistPostSnackbar(false);
  };

  return (
    <div className='App'>
      <header>
        <div className='header'>
          <div className='header-title'>
            <h2>{Constants.SITE_TITLE}</h2>
          </div>
          <div className='header-menu'>
            <Stack direction='row' spacing={2}>
              <Button
                onClick={handleClickMenu}
                id='header-button-menu'
                variant='outlined'
                aria-controls={isOpen ? 'header-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={isOpen ? 'true' : undefined}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                }}>
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
                    <ListItemText>{Constants.MENU_USAGE}</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText>{Constants.MENU_SWITCH_THEME}</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <ShareIcon />
                    </ListItemIcon>
                    <ListItemText>{Constants.MENU_SHARE}</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleClickOpen()}>
                    <ListItemIcon>
                      <GitHubIcon />
                    </ListItemIcon>
                    <ListItemText>{Constants.MENU_POST_GIST}</ListItemText>
                  </MenuItem>
                  <Dialog
                    open={openGistDialog}
                    onClose={handleCloseGistPostDialog}
                    aria-labelledby='edit-apartment'>
                    <DialogTitle id='edit-apartment'>
                      {Constants.DIALOG_POST_GIST_TITLE}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        ファイル名とファイルの説明、公開設定について入力してください。
                        GitHubにサインインしていない場合は、
                        <Link
                          target='_blank'
                          rel='noopener'
                          href='https://github.com/MaximizedOwl/simple-markdown-editor-ts#%E5%88%A9%E7%94%A8%E8%A6%8F%E7%B4%84'>
                          利用規約
                        </Link>
                        と
                        <Link
                          target='_blank'
                          rel='noopener'
                          href='https://github.com/MaximizedOwl/simple-markdown-editor-ts#%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC'>
                          プライバシ・ポリシー
                        </Link>
                        に同意した上でサインインを行ってください。
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
                        {isSignedIn
                          ? Constants.BUTTON_SIGNOUT_GITHUB
                          : Constants.BUTTON_SIGNIN_GITHUB}
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
          <Snackbar
            open={isOpenGistPostSnackbar}
            autoHideDuration={50000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Alert
              onClose={handleClose}
              severity={snackbarType}
              sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
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
              {Constants.COPYRIGHT}
            </Stack>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
