import re

with open('public/images/danieli-corus-logo.svg', 'r') as f:
    svg = f.read()

# Replace fill="#231F20" with fill="currentColor"
svg_currentColor = re.sub(r'fill="#231F20"', 'fill="currentColor"', svg)

with open('public/images/danieli-corus-logo.svg', 'w') as f:
    f.write(svg_currentColor)

# Also create white version
svg_white = re.sub(r'fill="currentColor"', 'fill="#FFFFFF"', svg_currentColor)
with open('public/images/danieli-corus-logo-white.svg', 'w') as f:
    f.write(svg_white)

print('Updated danieli-corus-logo.svg to currentColor and created danieli-corus-logo-white.svg')
