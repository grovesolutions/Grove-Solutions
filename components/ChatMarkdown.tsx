import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ChatMarkdownProps = {
  text: string;
  isUser?: boolean;
};

const mergeClassName = (base: string, extra?: string) =>
  extra ? `${base} ${extra}` : base;

const ChatMarkdown: React.FC<ChatMarkdownProps> = ({ text, isUser = false }) => (
  <div className={`chat-markdown ${isUser ? 'chat-markdown-user' : 'chat-markdown-model'}`}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      skipHtml
      components={{
        a: ({ node: _node, ...props }) => (
          <a
            {...props}
            target="_blank"
            rel="noreferrer"
            className={mergeClassName('chat-link', props.className)}
          />
        ),
        code: ({ node: _node, inline, className, children, ...props }) =>
          inline ? (
            <code
              {...props}
              className={mergeClassName('chat-inline-code', className)}
            >
              {children}
            </code>
          ) : (
            <pre className="chat-code-block">
              <code {...props} className={className}>
                {children}
              </code>
            </pre>
          ),
        ul: ({ node: _node, ...props }) => (
          <ul {...props} className={mergeClassName('chat-list', props.className)} />
        ),
        ol: ({ node: _node, ...props }) => (
          <ol
            {...props}
            className={mergeClassName('chat-list chat-list-ordered', props.className)}
          />
        ),
        li: ({ node: _node, ...props }) => (
          <li {...props} className={mergeClassName('chat-list-item', props.className)} />
        ),
        blockquote: ({ node: _node, ...props }) => (
          <blockquote {...props} className={mergeClassName('chat-quote', props.className)} />
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  </div>
);

export default ChatMarkdown;
