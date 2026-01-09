import re

class StringFormatter:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True, "dynamicPrompts": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "process"
    CATEGORY = "Numachang"

    def process(self, text):
        # 1. Remove comments
        # Remove // comments (until next comma or end of line)
        text = re.sub(r'//[^,\n]*,?', '', text)
        # Remove # comments (until end of line)
        text = re.sub(r'#[^\n]*', '', text)

        # 2. Fix commas (ensure space after comma)
        text = re.sub(r',(?=[^\s])', ', ', text)

        # 3. Remove newlines and collapse spaces
        text = text.replace('\n', ' ')
        text = re.sub(r'\s+', ' ', text)

        # Cleanup
        text = text.strip()

        return (text,)

class StringConcatenate:
    @classmethod
    def INPUT_TYPES(s):
        inputs = {
            "required": {
                "delimiter": ("STRING", {"default": ",", "multiline": False}),
            },
            "optional": {}
        }
        for i in range(1, 51):
            inputs["optional"][f"text_{i}"] = ("STRING", {"multiline": True, "dynamicPrompts": True})
        return inputs

    RETURN_TYPES = ("STRING",)
    FUNCTION = "concatenate"
    CATEGORY = "Numachang"

    def concatenate(self, delimiter, **kwargs):
        texts = []
        
        # Handle delimiter escape sequences
        if delimiter == "\\n":
            delimiter_str = "\n"
        else:
            delimiter_str = delimiter
            
        # Sort keys
        sorted_keys = sorted(kwargs.keys(), key=lambda k: int(k.split('_')[1]) if '_' in k and k.split('_')[1].isdigit() else 999)
        
        for key in sorted_keys:
            if key.startswith("text_") and kwargs[key]:
                val = kwargs[key]
                if isinstance(val, list):
                    val = str(val[0])
                
                val = val.strip()
                # De-duplicate delimiter properties
                # If delimiter is "," and text is "foo,", remove the trailing ","
                # to avoid "foo,,bar"
                if delimiter_str and delimiter_str.strip(): # Only if delimiter is not empty/whitespace safe?
                     # Simple strip of delimiter from right checks
                     # Actually user asked: "if same as delimiter is connected... delete one"
                     # Safe approach: strip delimiter from both ends
                     val = val.strip(delimiter_str)
                     
                if val:
                    texts.append(val)

        result = delimiter_str.join(texts)
        return (result,)

