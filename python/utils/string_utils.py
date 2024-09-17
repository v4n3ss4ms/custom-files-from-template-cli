# utils/string_utils.py

import re

def to_kebab_case(s: str) -> str:
    return re.sub(r'^-+|-+$', '', re.sub(r'[^a-z0-9]+', '-', s.strip().lower()))

def to_camel_case(s: str) -> str:
    s = re.sub(r'[^a-z0-9]+(.)', lambda m: m.group(1).upper(), s.strip().lower())
    return s[0].lower() + s[1:] if s else s

def to_pascal_case(s: str) -> str:
    s = re.sub(r'[^a-z0-9]+(.)', lambda m: m.group(1).upper(), s.strip().lower())
    return s[0].upper() + s[1:] if s else s

def to_snake_case(s: str) -> str:
    return re.sub(r'^_+|_+$', '', re.sub(r'[^a-z0-9]+', '_', s.strip().lower()))
