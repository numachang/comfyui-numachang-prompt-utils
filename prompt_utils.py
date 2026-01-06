import re

class StringFormatter:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
                "remove_comments": ("BOOLEAN", {"default": True}),
                "remove_newlines": ("BOOLEAN", {"default": True}),
                "fix_commas": ("BOOLEAN", {"default": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "process"
    CATEGORY = "utils/string"

    def process(self, text, remove_comments, remove_newlines, fix_commas):
        # 1. Remove comments
        if remove_comments:
            lines = text.split('\n')
            new_lines = []
            for line in lines:
                # Remove // comments
                if '//' in line:
                    line = line.split('//')[0]
                # Remove # comments
                if '#' in line:
                    line = line.split('#')[0]
                new_lines.append(line)
            text = '\n'.join(new_lines)

        # 2. Fix commas (ensure space after comma)
        if fix_commas:
            # Replace comma followed by non-space with comma+space
            # But exclude comma at end of string
            text = re.sub(r',(?=[^\s])', ', ', text)

        # 3. Remove newlines
        if remove_newlines:
            # Replace newlines with space
            text = text.replace('\n', ' ')
            # Collapse multiple spaces
            text = re.sub(r'\s+', ' ', text)
        
        # Cleanup
        text = text.strip()
        
        return (text,)
