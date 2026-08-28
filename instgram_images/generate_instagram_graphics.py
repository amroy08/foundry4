import os
import urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageColor

# Directories
BASE_DIR = "/Users/amroy/Desktop/foundry4"
LOGO_PATH = os.path.join(BASE_DIR, "public/images/logo.png")
POST_DIR = os.path.join(BASE_DIR, "instgram_images/post")
STORY_DIR = os.path.join(BASE_DIR, "instgram_images/stories")

os.makedirs(POST_DIR, exist_ok=True)
os.makedirs(STORY_DIR, exist_ok=True)

# Font Paths
FONT_BOLD_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_SEMI_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

print("Using standard system typography...")

def draw_gradient_back(draw, width, height, color1, color2):
    # Draw linear gradient from top-left to bottom-right
    for y in range(height):
        ratio = y / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

def draw_radial_glow(img, cx, cy, radius, color):
    # Draw a soft glowing orb
    mask = Image.new("L", (img.width, img.height), 0)
    draw_mask = ImageDraw.Draw(mask)
    for r in range(radius, 0, -2):
        alpha = int(color[3] * (1 - r/radius))
        draw_mask.ellipse([cx - r, cy - r, cx + r, cy + r], fill=alpha)
    
    glow_color = Image.new("RGBA", (img.width, img.height), color[:3] + (255,))
    img_glow = Image.composite(glow_color, img.convert("RGBA"), mask)
    return img_glow

def add_noise(img, opacity=0.03):
    # Adds subtle tech texture noise
    import random
    width, height = img.size
    noise = Image.new("RGBA", (width, height), (0,0,0,0))
    pixels = noise.load()
    for x in range(width):
        for y in range(height):
            if random.random() < 0.2:
                val = random.randint(180, 255)
                pixels[x, y] = (val, val, val, int(255 * opacity))
    return Image.alpha_composite(img.convert("RGBA"), noise)

def draw_rounded_card(draw, x, y, w, h, radius, fill, outline=None, outline_width=1):
    draw.rounded_rectangle([x, y, x + w, y + h], radius=radius, fill=fill, outline=outline, width=outline_width)

def draw_logo(img, x, y, size=70):
    if os.path.exists(LOGO_PATH):
        try:
            logo = Image.open(LOGO_PATH).convert("RGBA")
            logo.thumbnail((size, size), Image.Resampling.LANCZOS)
            # Create drop shadow
            shadow = logo.split()[3].filter(ImageFilter.GaussianBlur(5))
            shadow_img = Image.new("RGBA", logo.size, (108, 62, 255, 120))
            shadow_img.putalpha(shadow)
            img.paste(shadow_img, (x + 2, y + 4), shadow_img)
            img.paste(logo, (x, y), logo)
        except Exception as e:
            print("Logo paste error:", e)

# ══════════════════════════════════════════════════════════
# GENERATE POSTS (1080x1080)
# ══════════════════════════════════════════════════════════
def make_post(filename, service_name, badge_text, headline, bullets, accent_color, tag_line):
    # Standard dimensions
    w, h = 1080, 1080
    img = Image.new("RGBA", (w, h))
    draw = ImageDraw.Draw(img)

    # Gradients
    navy_dark = (6, 11, 24)
    navy_mid = (13, 27, 62)
    draw_gradient_back(draw, w, h, navy_dark, navy_mid)

    # Soft glowing radial orbs
    img = draw_radial_glow(img, 900, 200, 350, accent_color + (60,))
    img = draw_radial_glow(img, 150, 900, 250, (37, 99, 235, 40))
    draw = ImageDraw.Draw(img)

    # Tech grid texture overlay
    grid_gap = 48
    for gx in range(0, w, grid_gap):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 10))
    for gy in range(0, h, grid_gap):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 10))

    # Rainbow left side border accent
    for i in range(8):
        draw.line([(i, 0), (i, h)], fill=accent_color)

    # Fonts
    title_font = ImageFont.truetype(FONT_BOLD_PATH, 54)
    sub_font = ImageFont.truetype(FONT_SEMI_PATH, 28)
    body_font = ImageFont.truetype(FONT_REG_PATH, 22)
    badge_font = ImageFont.truetype(FONT_BOLD_PATH, 16)
    footer_font = ImageFont.truetype(FONT_SEMI_PATH, 18)

    # 1. Header (Logo + Wordmark)
    draw_logo(img, 70, 70, size=80)
    draw.text((165, 80), "Foundry", font=ImageFont.truetype(FONT_BOLD_PATH, 34), fill=(255,255,255))
    # Grab size for positioning the '4'
    w_foundry = draw.textlength("Foundry", font=ImageFont.truetype(FONT_BOLD_PATH, 34))
    draw.text((165 + w_foundry + 2, 80), "4", font=ImageFont.truetype(FONT_BOLD_PATH, 34), fill=accent_color)
    draw.text((165, 122), "DIGITAL AGENCY", font=ImageFont.truetype(FONT_SEMI_PATH, 11), fill=(148, 163, 184), spacing=3)

    # 2. Pill Badge (Service category)
    badge_w = draw.textlength(badge_text.upper(), font=badge_font) + 32
    draw_rounded_card(draw, 70, 200, badge_w, 36, 18, fill=accent_color + (30,), outline=accent_color, outline_width=2)
    draw.text((86, 208), badge_text.upper(), font=badge_font, fill=(255, 255, 255))

    # 3. Main Bold Headline
    # Let's wrap headline text
    words = headline.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        test_line = " ".join(current_line)
        if draw.textlength(test_line, font=title_font) > 850:
            current_line.pop()
            lines.append(" ".join(current_line))
            current_line = [word]
    lines.append(" ".join(current_line))

    y_text = 270
    for line in lines:
        draw.text((70, y_text), line, font=title_font, fill=(255, 255, 255))
        y_text += 68

    # 4. Service Bullet Cards (2 columns or 1 clean stacked list)
    y_card = y_text + 40
    card_w = 440
    card_h = 135
    radius = 16
    
    # 4 bullets displayed as 2x2 grid
    for idx, bullet in enumerate(bullets[:4]):
        row = idx // 2
        col = idx % 2
        cx = 70 + (col * (card_w + 30))
        cy = y_card + (row * (card_h + 20))
        
        # Rounded background card
        draw_rounded_card(draw, cx, cy, card_w, card_h, radius, fill=(255, 255, 255, 8), outline=(255, 255, 255, 15))
        # accent indicator
        draw.rounded_rectangle([cx, cy, cx + 6, cy + card_h], radius=3, fill=accent_color)
        
        # Split text into title and desc
        parts = bullet.split(": ")
        if len(parts) == 2:
            btitle, bdesc = parts[0], parts[1]
            draw.text((cx + 25, cy + 22), btitle, font=sub_font, fill=(255, 255, 255))
            
            # wrap desc
            desc_words = bdesc.split()
            desc_lines = []
            desc_curr = []
            for dw in desc_words:
                desc_curr.append(dw)
                if draw.textlength(" ".join(desc_curr), font=body_font) > 380:
                    desc_curr.pop()
                    desc_lines.append(" ".join(desc_curr))
                    desc_curr = [dw]
            desc_lines.append(" ".join(desc_curr))
            
            dy = cy + 62
            for dl in desc_lines[:2]:
                draw.text((cx + 25, dy), dl, font=body_font, fill=(148, 163, 184))
                dy += 28
        else:
            draw.text((cx + 25, cy + 45), bullet, font=sub_font, fill=(255, 255, 255))

    # 5. Footer strip
    draw.line([(70, 930), (w - 70, 930)], fill=(255,255,255,15), width=2)
    
    # Left footer details
    draw.text((70, 955), "✉  info@foundry4.in", font=footer_font, fill=(148, 163, 184))
    draw.text((70, 995), "📞 +91 8433568078", font=footer_font, fill=(148, 163, 184))
    
    # Right footer URL tag
    url_w = draw.textlength("VISIT FOUNDRY4.IN", font=badge_font) + 36
    draw_rounded_card(draw, w - 70 - url_w, 960, url_w, 42, 21, fill=accent_color, outline=None)
    draw.text((w - 70 - url_w + 18, 972), "VISIT FOUNDRY4.IN", font=badge_font, fill=(255, 255, 255))

    # Textures & Save
    img = add_noise(img, opacity=0.035)
    out_path = os.path.join(POST_DIR, filename)
    img.save(out_path, "PNG")
    print(f"Created Instagram Post: {out_path}")

# ══════════════════════════════════════════════════════════
# GENERATE STORIES (1080x1920)
# ══════════════════════════════════════════════════════════
def make_story(filename, service_name, badge_text, headline, subhead, bullets, accent_color):
    w, h = 1080, 1920
    img = Image.new("RGBA", (w, h))
    draw = ImageDraw.Draw(img)

    # Gradients
    navy_dark = (6, 11, 24)
    navy_mid = (19, 10, 42) if "Creative" in service_name else (13, 27, 62)
    draw_gradient_back(draw, w, h, navy_dark, navy_mid)

    # soft glowing orbs
    img = draw_radial_glow(img, w//2, 400, 500, accent_color + (50,))
    img = draw_radial_glow(img, w - 100, 1400, 400, (37, 99, 235, 40))
    draw = ImageDraw.Draw(img)

    # tech grid texture
    grid_gap = 60
    for gx in range(0, w, grid_gap):
        draw.line([(gx, 0), (gx, h)], fill=(255, 255, 255, 8))
    for gy in range(0, h, grid_gap):
        draw.line([(0, gy), (w, gy)], fill=(255, 255, 255, 8))

    # accent left border
    for i in range(10):
        draw.line([(i, 0), (i, h)], fill=accent_color)

    # Fonts
    title_font = ImageFont.truetype(FONT_BOLD_PATH, 68)
    sub_font = ImageFont.truetype(FONT_SEMI_PATH, 32)
    body_font = ImageFont.truetype(FONT_REG_PATH, 24)
    badge_font = ImageFont.truetype(FONT_BOLD_PATH, 18)
    footer_font = ImageFont.truetype(FONT_SEMI_PATH, 22)

    # 1. Top Logo Header
    draw_logo(img, 90, 120, size=90)
    draw.text((200, 132), "Foundry", font=ImageFont.truetype(FONT_BOLD_PATH, 42), fill=(255,255,255))
    w_foundry = draw.textlength("Foundry", font=ImageFont.truetype(FONT_BOLD_PATH, 42))
    draw.text((200 + w_foundry + 2, 132), "4", font=ImageFont.truetype(FONT_BOLD_PATH, 42), fill=accent_color)
    draw.text((200, 184), "DIGITAL AGENCY", font=ImageFont.truetype(FONT_SEMI_PATH, 13), fill=(148, 163, 184), spacing=4)

    # 2. Pill Badge
    badge_w = draw.textlength(badge_text.upper(), font=badge_font) + 36
    draw_rounded_card(draw, 90, 270, badge_w, 42, 21, fill=accent_color + (30,), outline=accent_color, outline_width=2)
    draw.text((108, 280), badge_text.upper(), font=badge_font, fill=(255, 255, 255))

    # 3. Bold Headline
    words = headline.split()
    lines = []
    current_line = []
    for word in words:
        current_line.append(word)
        test_line = " ".join(current_line)
        if draw.textlength(test_line, font=title_font) > 850:
            current_line.pop()
            lines.append(" ".join(current_line))
            current_line = [word]
    lines.append(" ".join(current_line))

    y_text = 360
    for line in lines:
        draw.text((90, y_text), line, font=title_font, fill=(255, 255, 255))
        y_text += 80

    # Subhead description
    draw.text((90, y_text + 20), subhead, font=sub_font, fill=accent_color)

    # 4. Long list of service cards
    y_card = y_text + 110
    card_w = 900
    card_h = 160
    
    for idx, bullet in enumerate(bullets[:5]):
        cy = y_card + (idx * (card_h + 30))
        
        # background card
        draw_rounded_card(draw, 90, cy, card_w, card_h, 20, fill=(255, 255, 255, 8), outline=(255, 255, 255, 12))
        # accent color side block
        draw.rounded_rectangle([90, cy, 98, cy + card_h], radius=4, fill=accent_color)
        
        parts = bullet.split(": ")
        if len(parts) == 2:
            btitle, bdesc = parts[0], parts[1]
            draw.text((90 + 35, cy + 26), btitle, font=sub_font, fill=(255, 255, 255))
            
            # Wrap desc text
            desc_words = bdesc.split()
            desc_lines = []
            desc_curr = []
            for dw in desc_words:
                desc_curr.append(dw)
                if draw.textlength(" ".join(desc_curr), font=body_font) > 800:
                    desc_curr.pop()
                    desc_lines.append(" ".join(desc_curr))
                    desc_curr = [dw]
            desc_lines.append(" ".join(desc_curr))
            
            dy = cy + 78
            for dl in desc_lines[:2]:
                draw.text((90 + 35, dy), dl, font=body_font, fill=(148, 163, 184))
                dy += 32
        else:
            draw.text((90 + 35, cy + 60), bullet, font=sub_font, fill=(255, 255, 255))

    # 5. Footer Branding and CTA swipe up
    draw.line([(90, 1690), (w - 90, 1690)], fill=(255,255,255,15), width=2)
    
    draw.text((90, 1725), "🌐  foundry4.in", font=footer_font, fill=(148, 163, 184))
    draw.text((90, 1775), "📞  +91 8433568078", font=footer_font, fill=(148, 163, 184))
    
    # Swipe up indicator
    swipe_x = w // 2
    draw.polygon([(swipe_x - 15, 1835), (swipe_x, 1820), (swipe_x + 15, 1835)], fill=accent_color)
    draw.text((swipe_x - 70, 1850), "SWIPE UP TO VISIT", font=badge_font, fill=(255, 255, 255))

    # Texture & Save
    img = add_noise(img, opacity=0.035)
    out_path = os.path.join(STORY_DIR, filename)
    img.save(out_path, "PNG")
    print(f"Created Instagram Story: {out_path}")

# ══════════════════════════════════════════════════════════
# RUN COMPILATION
# ══════════════════════════════════════════════════════════

# 1. Post 1: Software & Web
make_post(
    filename="post_software_web.png",
    service_name="Software & Web",
    badge_text="Custom Tech Development",
    headline="We Build Enterprise Software & Custom Websites",
    bullets=[
        "Custom Websites: Stunning responsive layout & SEO-first pages.",
        "ERP & CRM Systems: Full client ledger, stock control, invoice management.",
        "Mobile App Dev: High performance Android & iOS apps build to scale.",
        "SaaS Platforms: Multi-tenant cloud applications tailored to your business."
    ],
    accent_color=(37, 99, 235), # Electric Blue
    tag_line="Custom Built. Scalable. Fast."
)

# 2. Post 2: Creative & Digital Marketing
make_post(
    filename="post_creative_marketing.png",
    service_name="Creative & Marketing",
    badge_text="Creative Design & Media",
    headline="High-Impact Branding & Performance Campaigns",
    bullets=[
        "Graphic & Logo Design: Premium visual assets that capture your brand.",
        "Meta & Google Ads: Leads, views, & conversions that drive profits.",
        "Video Editing & Reels: Motion graphics & content optimized for social.",
        "Social Media Growth: Comprehensive platform strategies to boost sales."
    ],
    accent_color=(124, 58, 237), # Vibrant Purple
    tag_line="Sleek Design. Measurable Growth."
)

# 3. Post 3: Data & BI
make_post(
    filename="post_data_bi.png",
    service_name="Data Analysis & BI",
    badge_text="Data & BI Dashboards",
    headline="Turn Raw Data Into Actionable Business Intelligence",
    bullets=[
        "Power BI Dashboards: Interactive tracking of sales, expenses & KPIs.",
        "Data Transformation: Cleansing raw business spreadsheets into insights.",
        "Excel Automation: Say goodbye to manually repeating daily calculations.",
        "Decision Intelligence: Optimize logistics, fees, & metrics dynamically."
    ],
    accent_color=(15, 118, 110), # Dark Teal
    tag_line="See Your Metrics in Real Time."
)

# 4. Post 4: AI & WhatsApp Automation
make_post(
    filename="post_ai_automation.png",
    service_name="AI & Automation",
    badge_text="AI Automation Solutions",
    headline="Reduce 80% Manual Operations with Custom AI",
    bullets=[
        "AI Chatbots: Integrate smart customer support directly in website.",
        "WhatsApp Automation: Send automated payment receipts and reminders.",
        "Workflow Automation: Connect apps automatically to execute routines.",
        "Smart Lead Follow-Up: Engage new inquiries instantly 24/7."
    ],
    accent_color=(236, 72, 153), # Neon Pink
    tag_line="Work Smarter. Save Hours Daily."
)

# 5. Post 5: General Overview
make_post(
    filename="post_brand_overview.png",
    service_name="General Agency",
    badge_text="Digital Agency Mumbai",
    headline="Technology. Creativity. Data & Marketing.",
    bullets=[
        "Web & App Dev: Custom built SaaS platforms & responsive business sites.",
        "Design & Editing: Logos, posters, reels editing, and print design.",
        "Power BI Dashboards: Business tracking & executive data insights.",
        "AI & WhatsApp API: Automate reminders, invoice alerts, and chatbots."
    ],
    accent_color=(79, 70, 229), # Indigo
    tag_line="Your Complete Growth Partner."
)

# ════════════ STORIES ════════════

# 1. Story 1: Custom Software
make_story(
    filename="story_software_web.png",
    service_name="Software Development",
    badge_text="Web & Software Solutions",
    headline="Custom Tech Built For Your Operations",
    subhead="From single landing pages to complete business ERP systems.",
    bullets=[
        "Custom Software: Web tools customized to match your internal workflow.",
        "School ERP: Track classes, student attendance, ledger accounts, & fees.",
        "Ecommerce Platforms: Fully custom checkouts, payment gateway API.",
        "API Integrations: Sync CRM databases, shipping labels, and accounting."
    ],
    accent_color=(37, 99, 235)
)

# 2. Story 2: Creative & Design
make_story(
    filename="story_creative_marketing.png",
    service_name="Creative & Design",
    badge_text="Creative Media & Ads",
    headline="Stunning Visual Media That Wins Sales",
    subhead="Professional UX design, video editing & campaign setups.",
    bullets=[
        "Creative Graphic Design: High res posters, booklets, branding.",
        "Performance PPC Ads: Highly targeted Google & Meta lead ads setup.",
        "Video Reels Editing: Smooth transitions, subtitles, sound design.",
        "Branding & Style: Identity guidelines that elevate corporate presence."
    ],
    accent_color=(124, 58, 237)
)

# 3. Story 3: Data & BI
make_story(
    filename="story_data_ai.png",
    service_name="Data & AI Solutions",
    badge_text="Business Intelligence & AI",
    headline="Decisions Made Faster with Data & AI",
    subhead="Smart Power BI dashboards combined with WhatsApp automations.",
    bullets=[
        "Power BI Dashboards: Executive summaries, interactive charts.",
        "Spreadsheet Automation: Remove manual inputs, clean database records.",
        "WhatsApp Automation: Daily alerts, automated alerts for dues.",
        "AI Website Chatbots: Capture customer leads & answer support FAQs."
    ],
    accent_color=(15, 118, 110)
)

print("All Instagram graphic assets successfully generated!")
