# ComfyUI Prompt Utilities

A collection of utility nodes for ComfyUI to help with prompt engineering.

## Nodes

### String Formatter
An enhanced string node that allows for cleaner prompt management.

**Features:**
- **Source code style comments**: Support for `//` and `#` to comment out parts of the prompt.
- **Remove Newlines**: Automatically joins lines into a single line string, useful for keeping prompts organized in the UI but clean in the output.
- **Auto Comma Spacing**: Ensures every comma is followed by a space.

**Usage:**
1. Add "String Formatter (Prompt Utils)" node.
2. Write your prompt with multiple lines and comments.
3. Connect output to CLIP Text Encode or other string inputs.
