# Markdown パーサーを react-markdown にした理由

大きく 2 つ。

1. 今回は React を使っているので React に最適化されている(であろう)ほうを使いたかった。
2. セキュリティ方面をパーサーの方でやってくれる箇所があり、安心だった。

npm trends によると、過去一年間のダウンロード数では marked が 700 万を超えるのに対し、react-markdown は 200 万に満たない。
このことから最初は一番メジャーな marked を利用することを考えた。知見が多く落ちていると考えたためだ。

しかしながら react-markdown も継続的にメンテナンスされていることやスター数からみても知見はそれなりに溜まっていそうではあった。
そして決め手となったのが上記 2 点だった。

### ドキュメント比較

**marked**

> Warning: 🚨 Marked does not sanitize the output HTML. If you are processing potentially unsafe strings, it's important to filter for possible XSS attacks. Some filtering options include DOMPurify (recommended), js-xss, sanitize-html and insane on the output HTML! 🚨

とある。
つまりセキュリティ問題に対して開発者が対応しないといけない箇所があるということだった。今回、サクッと実装したかった自分にとってはこれに対応するのが面倒に感じた。

**react-markdown**

> Use of react-markdown is secure by default. Overwriting transformLinkUri or transformImageUri to something insecure will open you up to XSS vectors. Furthermore, the remarkPlugins, rehypePlugins, and components you use may be insecure.  
> To make sure the content is completely safe, even after what plugins do, use rehype-sanitize. It lets you define your own schema of what is and isn’t allowed.

とあり、XSS 攻撃への耐性が標準搭載されている。

### 参考文献

1. https://github.com/remarkjs/react-markdown#security
2. https://marked.js.org/#usage
3. https://npmtrends.com/marked-vs-react-markdown-vs-remark

# react-markdown の実装

ドキュメントには下記のように記載がある。

```ts
import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactDom from 'react-dom';

ReactDom.render(
  <ReactMarkdown># Hello, *world*!</ReactMarkdown>,
  document.body
);
```

しかし実際は

```ts
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

...

function App() {
  const [str, setStr] = useState('');

  return (
    ...

            <label id='label-output'>
              <ReactMarkdown>{str}</ReactMarkdown>
            </label>
    ...

export default App;

```

のように、ReactMarkdown をコンポーネントに見立ててその中にテキストエリアで入力している state の変数を出力してあげるだけで良い。

**参考文献**

1. [[react-markdown]で markdown 記法テキストを html にレンダリングする。](https://floclo.net/pages/cl1lo6qju022509mmmagwkkqu)
2. [remarkjs/react-markdown](https://github.com/remarkjs/react-markdown#security)
