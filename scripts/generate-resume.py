from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume.pdf"

PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN_X = 0.48 * inch
MARGIN_Y = 0.38 * inch
CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN_X

INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#526075")
ACCENT = colors.HexColor("#3759C7")
RULE = colors.HexColor("#CBD3E1")

styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=19,
    leading=20,
    textColor=INK,
)
headline_style = ParagraphStyle(
    "Headline",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.4,
    leading=10.2,
    textColor=MUTED,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=headline_style,
    alignment=TA_RIGHT,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.2,
    leading=9,
    spaceBefore=3.5,
    spaceAfter=1.5,
    textColor=ACCENT,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.45,
    leading=9.25,
    textColor=INK,
)
skills_style = ParagraphStyle(
    "Skills",
    parent=body_style,
    fontSize=7.15,
    leading=8.9,
)
role_style = ParagraphStyle(
    "Role",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=8.05,
    leading=9.2,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=body_style,
    alignment=TA_RIGHT,
    fontSize=7.15,
    textColor=MUTED,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=8,
    firstLineIndent=-6,
    bulletIndent=0,
    spaceAfter=0.4,
)


def section(title):
    return [
        Paragraph(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceAfter=2),
    ]


def role(company, title, dates, location, bullets):
    heading = Table(
        [[Paragraph(f"{title} | {company}", role_style), Paragraph(f"{dates}<br/>{location}", meta_style)]],
        colWidths=[CONTENT_WIDTH * 0.72, CONTENT_WIDTH * 0.28],
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.5),
            ]
        )
    )
    items = [heading]
    items.extend(Paragraph(f"- {bullet}", bullet_style) for bullet in bullets)
    items.append(Spacer(1, 1.2))
    return items


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.4)
    canvas.line(MARGIN_X, 0.25 * inch, PAGE_WIDTH - MARGIN_X, 0.25 * inch)
    canvas.setFont("Helvetica", 6.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(MARGIN_X, 0.13 * inch, "Jacky Feng | Software Developer")
    canvas.drawRightString(PAGE_WIDTH - MARGIN_X, 0.13 * inch, "Updated August 2026")
    canvas.restoreState()


def build_resume():
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_Y,
        bottomMargin=0.32 * inch,
        title="Jacky Feng Resume",
        author="Jacky Feng",
        subject="Software Developer Resume",
    )
    frame = Frame(
        doc.leftMargin,
        doc.bottomMargin,
        doc.width,
        doc.height,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )
    doc.addPageTemplates(PageTemplate(id="resume", frames=[frame], onPage=footer))

    header = Table(
        [[
            Paragraph("JACKY FENG", name_style),
            Paragraph(
                "Burnaby, BC | 236-965-9413 | fengjacky84@gmail.com<br/>"
                "linkedin.com/in/jiaqi-jacky-f-307210291",
                contact_style,
            ),
        ]],
        colWidths=[CONTENT_WIDTH * 0.42, CONTENT_WIDTH * 0.58],
    )
    header.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    story = [
        header,
        Paragraph("SOFTWARE DEVELOPER | FRONTEND, MOBILE & FULL STACK", headline_style),
        Spacer(1, 2),
        HRFlowable(width="100%", thickness=1.1, color=ACCENT, spaceAfter=2),
    ]
    story += section("Profile")
    story.append(
        Paragraph(
            "Software developer building scalable web, mobile, backend, and AI-assisted products. "
            "Experienced in React Native architecture, Java/Spring Boot migration, high-volume logistics interfaces, "
            "real-time 3D systems, and RAG applications.",
            body_style,
        )
    )
    story += section("Technical Skills")
    story.append(
        Paragraph(
            "<b>Languages:</b> JavaScript, TypeScript, Java, Python, SQL &nbsp; | &nbsp; "
            "<b>Frontend:</b> React, React Native, Expo, Next.js, Vue.js, Redux Toolkit, Tailwind CSS<br/>"
            "<b>Backend & AI:</b> Spring Boot, Node.js, Express.js, REST APIs, LangChain, RAG &nbsp; | &nbsp; "
            "<b>Cloud & Delivery:</b> AWS S3, Expo EAS, Jenkins, GitHub Actions, Vercel, Jest",
            skills_style,
        )
    )
    story += section("Experience")
    story += role(
        "AlphaPay",
        "Software Developer",
        "Oct 2025 - Present",
        "Richmond, BC",
        [
            "Developed a 60+ screen React Native (Expo) app for iOS and Android, managing global state and theming with Redux Toolkit and React Context.",
            "Automated TestFlight and Google Play delivery with Expo EAS and shell scripts; added in-app OTA update detection for rapid hotfixes.",
            "Led an AI-assisted PHP-to-Java/Spring Boot migration and supported merchant Open API integrations with a mock backend and internal payment sandbox.",
        ],
    )
    story += role(
        "Ulala Technologies",
        "Software Developer - Frontend / Mobile",
        "Jan 2025 - May 2025",
        "Delta, BC",
        [
            "Built responsive logistics dashboards for 100K+ records using virtual scrolling, pagination, and lazy loading.",
            "Engineered an AWS S3 upload pipeline with validation, chunking, and retry logic, reducing upload failures by 80%.",
            "Established Jenkins CI/CD, reached 95% Jest coverage, and built real-time delivery tracking with OpenLayers.",
        ],
    )
    story += role(
        "Cognizant",
        "Frontend Developer / Intern",
        "Mar 2022 - May 2023",
        "Shanghai, China",
        [
            "Rendered 100+ CAD-derived machine nodes with React and Babylon.js for an interactive digital-twin monitoring platform.",
            "Integrated Redux Toolkit, streaming APIs, and WebSockets supporting 1,000+ concurrent connections and reducing update latency by 40%+.",
            "Earlier, developed mobile-first Vue.js e-commerce modules, reusable components, and REST API integrations from Figma designs.",
        ],
    )
    story += section("Selected Project")
    story += role(
        "New York Institute of Technology - Vancouver",
        "RAG Campus Support Assistant",
        "Sep 2024 - Dec 2024",
        "Vancouver, BC",
        [
            "Deployed a LangChain-based assistant that embedded institutional documents in a vector store.",
            "Delivered accurate, around-the-clock automated responses to student inquiries.",
        ],
    )
    story += section("Education")
    education = Table(
        [[
            Paragraph("<b>Master of Science, Cybersecurity</b> | New York Institute of Technology", body_style),
            Paragraph("Sep 2023 - Dec 2024<br/>Vancouver, BC", meta_style),
        ]],
        colWidths=[CONTENT_WIDTH * 0.75, CONTENT_WIDTH * 0.25],
    )
    education.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(education)
    doc.build(story)


if __name__ == "__main__":
    build_resume()
    print(OUTPUT)
