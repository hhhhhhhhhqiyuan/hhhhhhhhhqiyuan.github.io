# Nikki Fu Portfolio Content Framework

This document is the working framework for turning Nikki's mixed identity into a clear portfolio website.

The goal is not to make one beautiful page at a time. The goal is to build a repeatable content system:

1. Start with the big positioning framework.
2. Define the content framework for each section or project.
3. Use AI to draft content from that framework.
4. Curate and edit the content.
5. Fill it into webpages.

## 1. Big Framework

### Positioning

Nikki is not presenting as only a visual designer, marketer, or coder.

The portfolio should present a hybrid commercial role:

> Integrated marketing systems for commerce brands, combining independent sites, Amazon listings, social content, EDM, AI visuals, and AI coding.

### Core Identity

- Chinese name: 付奇缘
- English name: Nikki Fu
- Tone: professional, smart, commercial, future-facing, technically magical
- Visual direction: technology lab + bright commercial clarity
- Reference feeling: Apple / B&O, but warmer and more commerce-oriented

### Audience

- Recruiters hiring for visual, e-commerce, brand, marketing, or AI-related roles
- Commercial clients looking for website, campaign, listing, EDM, or AI visual support
- People who need someone who can connect strategy, visuals, channels, and execution

## 2. Site Framework

### Homepage

Purpose:

- Explain who Nikki is in one fast impression.
- Show the integrated marketing + AI coding positioning.
- Lead people into selected projects.
- Make the mixed identity feel intentional, not scattered.

Suggested homepage sections:

1. Hero
   - Name
   - Positioning sentence
   - Short Chinese self-introduction
   - Two actions: view work / contact or play interaction

2. Capability System
   - Independent Sites
   - Amazon & Listings
   - Social & EDM
   - AI Visuals & Coding

3. Selected Work
   - 3-6 featured projects
   - Each card should represent one capability layer

4. Interactive Signature
   - Mini tool, game, or AI coding demo
   - Shows technical imagination without distracting from work

5. Contact
   - Simple, direct, commercial

### Work Archive

Purpose:

- Store all projects without forcing everything onto the homepage.
- Let the portfolio grow beyond three projects.

Suggested filters/categories:

- Independent Sites
- Amazon / Listing
- Social / EDM
- AI Visuals
- AI Coding
- Integrated Campaign

## 3. Content Pillars

Each portfolio item should belong to at least one pillar.

### Pillar 1: Independent Sites

What it proves:

- E-commerce structure
- Landing page thinking
- Product storytelling
- Conversion-aware visual design

Content examples:

- Shopify homepage
- Product detail page
- Landing page
- Campaign page
- Collection page

### Pillar 2: Amazon & Listings

What it proves:

- Marketplace selling logic
- Product feature hierarchy
- Image sequence strategy
- Comparison, trust, and proof content

Content examples:

- Amazon main image direction
- A+ content
- Listing image sequence
- Infographic module
- Product comparison chart

### Pillar 3: Social & EDM

What it proves:

- Campaign adaptation across channels
- Content rhythm
- Visual consistency
- Message-to-format translation

Content examples:

- Email campaign
- Social post system
- Launch content calendar
- Paid ad visual set
- Seasonal campaign assets

### Pillar 4: AI Visuals & Coding

What it proves:

- AI-assisted production
- Visual exploration speed
- Prompt-to-system thinking
- Coded prototypes and tools

Content examples:

- AI image campaign
- Prompt exploration board
- Visual style system
- Interactive prototype
- Internal workflow tool
- Small AI-coded website or mini app

## 4. Project Content Framework

Each project page should answer the same questions, even if the visual layout changes.

### Basic Project Fields

- Project name
- Year
- Category
- Role
- Channel
- Tools
- Live link, if available
- Assets folder

### Project Story Structure

1. One-line positioning
   - What is this project in one sentence?

2. Context
   - What brand, product, campaign, or business situation is this for?

3. Goal
   - What did the project need to achieve?
   - Examples: explain product, improve conversion, support launch, create trust, adapt campaign across channels.

4. Audience
   - Who is the content for?
   - What do they need to understand or feel?

5. Strategy
   - What is the core idea?
   - How does the content move people from attention to understanding to action?

6. System
   - What parts were created?
   - Examples: homepage, PDP, Amazon listing images, EDM, social posts, AI visuals, prototype.

7. Visual Logic
   - What makes the design work?
   - Examples: layout hierarchy, image direction, color, typography, product scale, contrast, rhythm.

8. Commercial Logic
   - How does it sell?
   - Examples: CTA, proof, benefit hierarchy, variant selection, feature education, channel fit.

9. AI / Technical Layer
   - Was AI used?
   - Was code used?
   - Did it speed up exploration, generate assets, build a tool, or create a live page?

10. Outcome / Value
   - What does this project prove about Nikki?
   - If exact performance data is unavailable, state the capability clearly.

## 5. Page Layout Framework

Each project page can use this order:

1. Hero
   - Big claim
   - Project summary
   - One strong visual

2. Signal Bar
   - Role
   - Channel
   - Output

3. Strategy Section
   - Business context
   - Goal
   - Audience

4. Visual / Content System Section
   - Main images
   - What the viewer should notice

5. Channel Modules
   - Site / Amazon / Social / EDM / AI coding, depending on project

6. Commercial Flow
   - Attention
   - Explain
   - Guide
   - Convert

7. Gallery
   - Final assets or screenshots

8. Case Notes
   - What this project demonstrates

## 6. AI Content Workflow

Use this workflow for every project.

### Step 1: Collect Raw Material

Put assets into:

`assets/projects/[project-number]/`

Suggested files:

- `cover.jpg`
- `detail-01.jpg`
- `detail-02.jpg`
- `mobile.jpg`
- `process.jpg`
- `notes.md`

### Step 2: Fill The Project Brief

Use this mini brief:

```text
Project name:
Brand/product:
Channel:
My role:
Main assets available:
Business goal:
Audience:
What I want this project to prove:
Any real results or constraints:
```

### Step 3: Ask AI For Content

Prompt:

```text
You are helping me write a portfolio case study for Nikki Fu.

My positioning:
Integrated marketing systems for commerce brands, combining independent sites,
Amazon listings, social content, EDM, AI visuals, and AI coding.

Use this project brief:
[paste brief]

Write:
1. One-line project positioning
2. Hero summary
3. Goal
4. Audience
5. Strategy
6. Visual logic
7. Commercial logic
8. AI or technical layer
9. Three short case study notes

Tone:
Professional, smart, commercial, future-facing, not too inflated.
```

### Step 4: Edit

Editing rules:

- Remove empty buzzwords.
- Keep claims concrete.
- If there is no data, do not pretend there is data.
- Use "this project demonstrates" when talking about capability.
- Use business verbs: attract, explain, guide, convert, scale, systemize.

### Step 5: Fill Webpage

After content is edited:

- Add project entry to `data/projects.js`
- Create or update `projects/[slug].html`
- Put images in `assets/projects/[project-number]/`
- Link from homepage or archive

## 7. Project Template

Copy this for each new project:

```text
# Project Content Draft

Project name:
Project category:
Year:
Role:
Channel:
Tools:

One-line positioning:

Context:

Goal:

Audience:

Strategy:

System / deliverables:

Visual logic:

Commercial logic:

AI / technical layer:

Outcome / what it proves:

Assets:
- cover:
- detail 01:
- detail 02:
- mobile:
- process:
```

## 8. How To Decide If A Project Belongs

Include a project if it proves at least one of these:

- I can design a commercial visual system.
- I can connect visual direction to marketing channels.
- I can think through e-commerce conversion.
- I can create content for independent sites, Amazon, social, or EDM.
- I can use AI to accelerate or expand production.
- I can use coding to make a tool, interaction, prototype, or webpage.

The strongest projects prove two or more at the same time.
