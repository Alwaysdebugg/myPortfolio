import React from 'react';

interface MarkdownProps {
  content: string;
  className?: string;
}

export function parseMarkdown(content: string): React.ReactElement {
  // 简单的Markdown解析器 - 支持常见语法
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let currentIndex = 0;
  let elementKey = 0; // 独立的 key 计数器

  while (currentIndex < lines.length) {
    const line = lines[currentIndex];
    
    // 代码块处理
    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3);
      currentIndex++;
      const codeLines: string[] = [];
      
      while (currentIndex < lines.length && !lines[currentIndex].trim().startsWith('```')) {
        codeLines.push(lines[currentIndex]);
        currentIndex++;
      }
      
      elements.push(
        <div key={elementKey++} className="my-6">
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code className={`language-${language}`}>
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      );
      currentIndex++;
      continue;
    }
    
    // 标题处理
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={elementKey++} className="text-4xl font-bold text-white mb-6 mt-8">
          {line.slice(2)}
        </h1>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h2 key={elementKey++} className="text-3xl font-bold text-white mb-4 mt-6">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={elementKey++} className="text-2xl font-bold text-white mb-3 mt-5">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={elementKey++} className="text-xl font-bold text-white mb-2 mt-4">
          {line.slice(5)}
        </h4>
      );
    }
    // 图片处理
    else if (line.match(/!\[.*\]\(.*\)/)) {
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, alt, src] = match;
        elements.push(
          <div key={elementKey++} className="my-6">
            <img 
              src={src} 
              alt={alt} 
              className="rounded-lg max-w-full h-auto mx-auto shadow-lg"
            />
          </div>
        );
      }
    }
    // 链接处理
    else if (line.includes('[') && line.includes('](')) {
      const processedLine = line.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-blue-400 hover:text-blue-300 underline transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
      );
      elements.push(
        <p 
          key={elementKey++} 
          className="text-gray-300 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    }
    // 列表处理
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [line.slice(2)];
      currentIndex++;
      
      while (currentIndex < lines.length && (lines[currentIndex].startsWith('- ') || lines[currentIndex].startsWith('* '))) {
        listItems.push(lines[currentIndex].slice(2));
        currentIndex++;
      }
      
      elements.push(
        <ul key={elementKey++} className="list-disc list-inside text-gray-300 mb-4 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      );
      currentIndex--;
    }
    // 引用处理
    else if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={elementKey++} className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-gray-800/50 rounded-r-lg">
          <p className="text-gray-300 italic">{line.slice(2)}</p>
        </blockquote>
      );
    }
    // 普通段落
    else if (line.trim() !== '') {
      // 处理粗体和斜体
      let processedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic text-gray-200">$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm">$1</code>');
      
      elements.push(
        <p 
          key={elementKey++} 
          className="text-gray-300 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    }
    // 空行
    else {
      elements.push(<br key={elementKey++} />);
    }
    
    currentIndex++;
  }

  return <div className="markdown-content">{elements}</div>;
}

export const MarkdownRenderer: React.FC<MarkdownProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {parseMarkdown(content)}
    </div>
  );
};