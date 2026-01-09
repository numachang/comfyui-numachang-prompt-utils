# ComfyUI Numachang Prompt Utils

A collection of utility nodes for ComfyUI to assist with prompt engineering and string manipulation.
プロンプト作成を便利にするComfyUI用カスタムノード集です。

---

# 🇺🇸 English Documentation

## Nodes

### 1. String with Comments
A text input node that allows you to use comments and automatically formats your prompt string.

**Category**: `Numachang`

**Features:**
*   **Comments**: Use `//` or `#` to comment out parts of your text. `//` removes text until the next comma or end of line. `#` removes text until the end of line.
*   **Remove Newlines**: Converts multiline text into a single line string.
*   **Fix Commas**: Automatically adds a space after every comma if missing (e.g., `word1,word2` -> `word1, word2`).

**Example:**

*Input:*
```text
1girl, //smiling, blue hair, // hair color
long hair
```

*Output:*
```text
1girl, blue hair, long hair
```

---

### 2. Simple String Concatenator
A dynamic node for joining multiple strings together.

**Category**: `Numachang`

**Features:**
*   **Dynamic Inputs**: Start with `text_1`. As you connect nodes or type text, new input slots (`text_2`, `text_3`...) will automatically appear. Unused slots are hidden.
*   **Mixed Input**: You can either type directly into the text widget or connect a string output from another node.
*   **Deduplication**: Automatically removes the delimiter character from the connect text if it duplicates.

**Parameters:**
*   **delimiter**: The character used to join strings (default: `,`). Use `\n` for newlines.

**Example:**

*Inputs:*
*   `delimiter`: `,`
*   `text_1`: `apple,` (Typed manually)
*   `text_2`: `banana` (Connected from another node)
*   `text_3`: `cherry`

*Output:*
```text
apple, banana, cherry
```
*(Note how the trailing comma in "apple," was handled correctly)*

---

# 🇯🇵 日本語ドキュメント

## 収録ノード

### 1. String with Comments (コメント機能付)
コメントアウト機能や自動整形機能がついた、高機能なテキスト入力ノードです。

**カテゴリ**: `Numachang`

**主な機能:**
*   **コメントアウト**: `//` は次のカンマか改行までを削除します。`#` は行末までを削除します。プロンプトのメモ書きに便利です。
*   **改行削除**: テキストボックス内で改行しても、出力時はスペース区切りの1行に変換されます。
*   **カンマ整形**: カンマの後にスペースがない場合、自動的にスペースを挿入します。

**使用例:**

*入力:*
```text
1girl, //smiling, blue hair, // 髪色
long hair
```

*出力:*
```text
1girl, blue hair, long hair
```

---

### 2. Simple String Concatenator (簡易文字列結合)
複数の文字列を順番に結合するノードです。

**カテゴリ**: `Numachang`

**主な機能:**
*   **可変入力**: 最初は `text_1` だけですが、入力すると自動的に `text_2`、`text_3`... と増えていきます。使っていない入力欄は自動的に隠れます。
*   **ハイブリッド入力**: テキストボックスに直接入力することも、他のノードをつなぐことも可能です。
*   **重複削除**: テキストの末尾に区切り文字（カンマなど）が既に入っている場合、結合時に重複しないよう自動調整します。

**パラメーター:**
*   **delimiter**: 結合に使う文字です（デフォルト: `,`）。改行したい場合は `\n` と入力してください。

**使用例:**

*入力設定:*
*   `delimiter`: `,`
*   `text_1`: `apple,` (手入力)
*   `text_2`: `banana` (別ノードから接続)
*   `text_3`: `cherry`

*出力:*
```text
apple, banana, cherry
```
*("apple," の末尾にあったカンマが重複せず、綺麗に結合されます)*
