from .prompt_utils import StringFormatter

NODE_CLASS_MAPPINGS = {
    "StringFormatter": StringFormatter
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "StringFormatter": "String Formatter (Prompt Utils)"
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS"]
