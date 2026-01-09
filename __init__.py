from .prompt_utils import StringFormatter, StringConcatenate

NODE_CLASS_MAPPINGS = {
    "StringFormatter": StringFormatter,
    "NumachangStringConcatenate": StringConcatenate
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "StringFormatter": "String with Comments",
    "NumachangStringConcatenate": "Simple String Concatenator"
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
