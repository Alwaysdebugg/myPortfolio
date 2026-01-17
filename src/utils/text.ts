// 简单的词形归一化（词干提取简化版）
export function normalizeWord(word: string): string {
  // 去除常见的英文词形变化
  // 处理 -ing 形式
  if (word.endsWith("ing") && word.length > 5) {
    const stem = word.slice(0, -3);
    if (stem.endsWith("e")) return stem.slice(0, -1); // developing -> develop
    return stem; // working -> work
  }

  // 处理 -ed 形式
  if (word.endsWith("ed") && word.length > 4) {
    const stem = word.slice(0, -2);
    if (stem.endsWith("i")) return stem.slice(0, -1) + "y"; // tried -> try
    if (stem.endsWith("e")) return stem; // developed -> develop
    return stem;
  }

  // 处理 -tion/-sion 形式
  if (word.endsWith("tion") || word.endsWith("sion")) {
    return word.slice(0, -4) + (word.endsWith("tion") ? "t" : "s");
  }

  // 处理复数形式（简化版）
  if (word.endsWith("ies") && word.length > 4) {
    return word.slice(0, -3) + "y"; // companies -> company
  }
  if (word.endsWith("es") && word.length > 3) {
    const stem = word.slice(0, -2);
    // 如果去掉 es 后以 s, x, z, ch, sh 结尾，通常单数也是这个形式
    if (stem.match(/[sxzchsh]$/)) return stem;
    return stem;
  }
  if (word.endsWith("s") && word.length > 2 && !word.endsWith("ss")) {
    return word.slice(0, -1); // skills -> skill
  }

  // 处理 -er/-or 形式（比较级或名词后缀）
  if ((word.endsWith("er") || word.endsWith("or")) && word.length > 4) {
    // 只处理明显的情况，避免过度匹配
    if (word.endsWith("developer")) return "develop";
    if (word.endsWith("designer")) return "design";
  }

  return word;
}

// 多语言分词：提取英文单词和中文词汇
export function tokenizeText(text: string): string[] {
  const tokens: string[] = [];

  // 匹配中文字符（包括中文标点，但保留为单独的token）
  const chinesePattern = /[\u4e00-\u9fa5]+/g;
  const chineseMatches = text.match(chinesePattern);
  if (chineseMatches) {
    tokens.push(...chineseMatches);
  }

  // 匹配英文单词（使用单词边界）
  // \w+ 匹配字母、数字、下划线，但我们需要过滤掉纯数字
  const englishPattern = /\b[a-zA-Z][a-zA-Z0-9]*\b/g;
  const englishMatches = text.match(englishPattern);
  if (englishMatches) {
    tokens.push(...englishMatches.map((w) => w.toLowerCase()));
  }

  return tokens.filter((token) => token.length > 0);
}

// 使用正则分词，去除标点并保留有效词
export function extractWords(text: string): string[] {
  // 先转换为小写
  const lowerText = text.toLowerCase();
  // 使用 tokenizeText 进行多语言分词
  const tokens = tokenizeText(lowerText);
  // 对英文词进行词形归一化
  return tokens
    .map((token) => {
      // 判断是否为中文（Unicode范围）
      const isChinese = /[\u4e00-\u9fa5]/.test(token);
      return isChinese ? token : normalizeWord(token);
    })
    .filter((word) => word.length > 0);
}

// 使用单词边界匹配检查词是否在文本中
export function wordExistsInText(word: string, text: string): boolean {
  // 中文字符直接使用 includes（中文没有明确的单词边界）
  if (/[\u4e00-\u9fa5]/.test(word)) {
    return text.includes(word);
  }

  // 英文单词使用单词边界匹配
  // 使用正则的 \b 确保完整单词匹配，避免部分匹配
  const regex = new RegExp(
    `\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
    "i"
  );
  return regex.test(text);
}
