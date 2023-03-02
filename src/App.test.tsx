import { render } from '@testing-library/react';
import App from './App';

describe('サイトタイトル', () => {
  test('名前が「Simple Markdown Editor」になっているか', () => {
    render(<App />);
  });
});
