namespace Constants {
  /* 
    Common
  */
  export const Developing: string = 'Unavailable, in development.';

  /* 
    header
  */
  export const SITE_TITLE: string = 'Simple Markdown Editor';

  /* 
    main
  */
  /* Markdown Textbox */
  export const INIT_TEXTBOX_STR: string = `# Hello world
  - foo
  - buzz

\`\`\`ts
const greeting = () => {
  let greet: string = "Hello world.";
  console.log(greet);
}
\`\`\``;
  /* Menu */
  export const MENU_USAGE: string = 'Usage';
  export const MENU_SWITCH_THEME: string = 'Switch Theme';
  export const MENU_SHARE: string = 'Share';
  export const MENU_POST_GIST: string = 'Post Gist';

  /* Dialog */
  export const DIALOG_POST_GIST_TITLE: string = 'Post to your Gist';
  export const URL_USAGE: string =
    'https://github.com/MaximizedOwl/simple-markdown-editor-ts#readme';
  export const SIGNOUT_SUCCESS: string = 'サインアウト しました';
  export const SIGNIN_SUCCESS: string = 'サインイン しました';
  // export const ERROR_MESSAGE: string = ...
  export const POST_SUCCESS: string = 'Success! 投稿先: ';
  export const HAS_NOT_SIGNIN_GITHUB: string = 'Please SignIn with GitHub.';
  export const BUTTON_SIGNIN_GITHUB: string = 'Sign In GitHub';
  export const BUTTON_SIGNOUT_GITHUB: string = 'Sign Out GitHub';

  /* 
    footer
  */
  export const COPYRIGHT: string = 'Copyright © 2023 maximizedowl';
}

export default Constants;
