from PIL import Image
import os

# Open the original logo
logo = Image.open('../frontend/public/stm-logo-final.png').convert("RGBA")

# Create a 1024x1024 canvas for icon-foreground (transparent)
bg_transparent = Image.new("RGBA", (1024, 1024), (255, 255, 255, 0))

# Create a 1024x1024 canvas for icon-background (#0B4D3A)
brand_color = (11, 77, 58, 255)
bg_solid = Image.new("RGBA", (1024, 1024), brand_color)

# Safe area is a circle of diameter 682px in the center of the 1024x1024 canvas.
# Target width is 85% of safe area width to be large but safe.
# 682 * 0.85 = 580px
target_w = 580
target_h = int(logo.height * (target_w / logo.width))

logo_resized = logo.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Paste logo into center
offset_x = (1024 - target_w) // 2
offset_y = (1024 - target_h) // 2

bg_transparent.paste(logo_resized, (offset_x, offset_y), logo_resized)

# Create the legacy generic icon.png which has brand color background + logo
icon_generic = Image.new("RGBA", (1024, 1024), brand_color)
icon_generic.paste(logo_resized, (offset_x, offset_y), logo_resized)

# Save the assets
os.makedirs('assets', exist_ok=True)
bg_transparent.save('assets/icon-foreground.png')
bg_solid.save('assets/icon-background.png')
icon_generic.save('assets/icon.png')

print("Created 1024x1024 padded icon canvases with brand background successfully.")
