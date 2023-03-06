import { render } from '@testing-library/react';
import App from './App';

/* 
  テストスイート
*/
describe('#1 ヘッダー', () => {
  test('#1-1 サイトのタイトルが常に「Simple Markdown Editor」になっているか', () => {
    const { container } = render(<App />);
    const headerTitle = container.getElementsByClassName('header-title');
    expect(headerTitle.item(0)?.children.item(0)?.textContent).toBe(
      'Simple Markdown Editor'
    );
  });
});
