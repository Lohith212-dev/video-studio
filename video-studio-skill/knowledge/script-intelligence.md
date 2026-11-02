# Video Script Intelligence

> A **framework-explanation module** for an agent that turns a business user's messy "mind dump"
> about a video idea into a finished, timed narration script. The facts come from the user (a call
> transcript, a deck, a dashboard, a cheat sheet). This module is the *understanding* the agent
> reasons with: how to find the one story inside dense material, how to choose the script
> framework that fits the video type, how to write words that sound right when a TTS voice reads
> them, and how to hand the script to the storyboard step and the chosen visual style.
>
> The typical user is a consultant or leader who explains AI strategy to enterprises. They are
> not a developer and not a scriptwriter. Their source material is dense, accurate and written for the
> eye (strategy decks, budget dashboards, cost-centre cheat sheets). The agent's job is to keep
> the accuracy and make it listenable.
>
> This is knowledge to be internalized, not a pipeline to be run step by step. Where a claim is
> specific, a source URL is given inline. Where something is this module's own house rule rather
> than an external finding, it says so.

---

## The completion contract

The agent produces one of exactly two things, never anything in between:

1. **A complete script document** (format below). Every beat the chosen framework requires is
   written as final narration, timed, and given its on-screen callouts. Non-blocking gaps are
   filled with stated defaults and listed under Open questions.
2. **A gap report**, when a *blocking* gap exists (see section 7). It names what is missing and
   the exact question to ask. No partial script is produced.

A draft with "[insert stat here]", a beat sheet without narration, or narration without timing is
not a valid output.

### The script document (required sections, in this order)

| # | Section | What it contains |
|---|---|---|
| 1 | **Title options** | Three titles. Each must be paid off by the hook within the first 15 seconds. Most important words first. |
| 2 | **Premise** | One sentence, ideally in And-But-Therefore form (section 3). If it cannot be written in one sentence, the story is not found yet. |
| 3 | **Video type, framework, and why** | The type (section 2), the spine framework (section 3), any devices used inside it, and two or three sentences on why this fits the material and audience. |
| 4 | **Format and length** | Long-form 16:9 or short-form 9:16. Target length in seconds, target words per minute, the resulting word budget, and where the wpm came from (style cassette or default). |
| 5 | **Audience** | Who is watching, what they already know, and what they should know or do at the end. |
| 6 | **Hook options** | Three hooks of different types (section 5b), each one to three sentences, with the one used marked. |
| 7 | **Beat sheet** | A table mapping each framework stage to beat IDs, with seconds and cumulative time. This is the skeleton a human can review in ten seconds. |
| 8 | **Script (storyboard handoff)** | The final narration as beats in the exact schema of section 8, in one fenced `yaml` block. This is the canonical script; nothing else is read by the storyboard step. |
| 9 | **Parked material** | What was deliberately left out of the narration and why. Nothing from the source silently disappears. |
| 10 | **Derived numbers** | Any number in the script that is not in the source verbatim, with its arithmetic from source numbers. |
| 11 | **Open questions** | At most three questions for the user (section 7), each with the default the script currently uses. |

---

## 1. The one governing principle

**A video is one story, told once, out loud. Every beat moves that story forward or it is cut.**

- **Spine** — the single framework whose arc the whole video rides from first word to last. One only.
- **Devices** — small techniques used *inside* the spine at specific points: an open loop, a
  But/Therefore turn, a re-hook, a signpost. Many may be used; none of them is the story.
- **Tension curve** — where the viewer is left holding a question or a problem, and where it is
  released. In video, unreleased tension is what keeps people watching; released tension is what
  makes them feel it was worth it.
- **Payoff** — the moment the main question is answered. Everything before it is setup.
- **CTA** — the one thing the viewer should do or remember at the end. One only.

Three failure modes bound every script. **None of them is about length.**

- **Mess** = two stories competing. The classic case for strategy material: the strategy deck
  read aloud, section by section. Use cases, then budget, then roadmap, then architecture, then
  accounting. Each is a story; together they are none.
- **Bare** = a spine with no tension. Facts in a row joined by "and then". The South Park test
  (section 3) catches this.
- **Unspeakable** = a good story written for the eye. Long sentences, symbols, acronyms,
  parentheses, three numbers in one breath. It reads well and sounds wrong. Section 5c fixes this.

The cure for bare is never a second story. It is a sharper "but" inside the one story.

---

## 2. What the agent must understand before choosing

### 2a. Reading the mind dump

A mind dump is spoken, unordered and incomplete. Before choosing anything, the agent extracts:

| Extract | Look for | In the worked example |
|---|---|---|
| **The thesis** | Often said in passing, not as a headline. Phrases like "any X has to...", "the point is...", "what people miss...". | "Any strategy has to be backed by numbers." |
| **The protagonist candidates** | Companies, roles, teams, a person. | A wealth manager; its customer experience function; the accounting team. |
| **The tension candidates** | A cost, a delay, a risk, a failure, a gap between plan and reality. | $12 per interaction; 60% repetitive; 24-hour waits on unusual queries. |
| **The numbers** | Every figure, with its unit and what it measures. Check units carefully. | See section 10. |
| **The artefacts** | What the user built or will show (deck, dashboard, cheat sheet). These become visuals, not narration. | Budget tracker, roadmap, cost-centre cheat sheet. |
| **The intended viewer and goal** | Usually missing. Infer, then confirm (section 7). | Not stated. |

### 2b. The signals that drive framework choice

| Signal | What it captures | If missing |
|---|---|---|
| **Video type** | What job the video does (table below). **Primary key.** | Infer from the mind dump. |
| **Audience knowledge** | How much the viewer knows about the topic. | Default: general business viewer. Knows what a budget and a customer service team are; does not know AI tooling, cost centres or capitalisation rules. |
| **Viewer goal** | Understand, decide, buy, trust, or learn to do. | Infer from type: explainer → understand; marketing → trust; tutorial → do. |
| **Format** | Long-form 16:9 or short-form 9:16. | Long-form, unless the user says short, reel, Shorts, vertical, or under a minute. |
| **Style cassette** | `styles/<id>.md` chosen for the video. Sets voice, pace and scene grammar (section 6). The style is picked at stage 2, after the first script. | Write in a neutral calm-explainer voice at 150 wpm and flag it; re-pace to the style at stage 2. |

### 2c. Video types

| Type | Job | Typical length (long / short) |
|---|---|---|
| **Explainer** | Make a concept or mechanism understood. "How does X work?" | 3-10 min / 45-60 s |
| **Data story / analysis** | Make a set of numbers mean something. "What do these figures tell us?" | 3-12 min / 30-60 s |
| **Marketing / brand** | Make the viewer feel something about a company or offer. | 1-3 min / 15-45 s |
| **Product launch / demo** | Introduce something new and prove it works. | 2-5 min / 30-60 s |
| **Thought leadership / opinion** | Argue a point of view the viewer may not share yet. | 3-10 min / 30-60 s |
| **Case study** | Show one client's situation, what was done, and the result. | 2-5 min / 45-60 s |
| **Tutorial** | Teach the viewer to do a task. | 3-15 min / 30-60 s |

Strategy material usually lands on **explainer**, **data story**, **thought leadership** or
**case study**. A strategy deck is rarely a tutorial and should not be scripted as one.

---

## 3. The frameworks, explained

Spines own the whole arc; pick one. Devices are used inside spines. Each entry says what it is,
why it works on a viewer, which video types it fits, its beats, and its tension curve.

### 3a. The base skeleton: Hook → Setup → Payoff

Every spine below sits on this. The **hook** makes a promise in the first seconds. The **setup**
gives the viewer just enough context to care about the answer. The **payoff** keeps the promise.
Setup that does not serve the payoff is cut. A payoff with no setup feels unearned. A hook with no
payoff is clickbait, and viewers leave when the opening does not match the title and thumbnail
(YouTube's own retention guidance: https://support.google.com/youtube/answer/9314415).

### 3b. Spines

#### Question-led explainer (Kurzgesagt / Vox pattern)
- **What it is:** Opens on a surprising fact or a moment in time, turns it into one clear question,
  then answers it step by step, with each answer raising the next smaller question.
- **Why it works:** A question the viewer can hold creates a knowledge gap they want closed
  (Loewenstein's information-gap account of curiosity, *Psychological Bulletin* 1994:
  https://doi.org/10.1037/0033-2909.116.1.75; summary:
  https://www.pbs.org/wgbh/nova/article/how-to-stimulate-curiosity/). The gap must be small enough
  to feel closable; total ignorance does not create curiosity.
- **Evidence in our reference set:** The Vox solar video opens "the year is 1953...", shows the
  cost collapse, then asks "so how did solar..." (`research/vox-explainer/V8Vtb0bn30M/`). The
  Kurzgesagt trees video opens on a surprising fact, then a "But...", then "How does this work?"
  (`research/kurzgesagt/pHJIhxZEoxg/`).
- **Fits:** Explainer, data story, science or technology topics.
- **Beats:** Surprising fact or scene → the question → first answer (which raises a sub-question)
  → second answer → the full picture → what it means.
- **Tension curve:** A staircase of small gaps opened and closed, with the big gap closed last.

#### Principle → Mechanism → Evidence → Implication (Ray Dalio pattern)
- **What it is:** States a principle plainly, explains the machine that makes it true, shows the
  numbers that confirm it, then says what to do about it. Dalio's *How the Economic Machine
  Works* (2013, about 30 minutes) frames the economy as "a simple machine"
  (https://www.ai-cio.com/news/dalio-how-the-economic-machine-works-in-30-minutes-and-a-cartoon/);
  the *Principles for Dealing with the Changing World Order* animation applies the same approach
  to the rise and fall of empires
  (https://www.openculture.com/2022/03/principles-for-dealing-with-the-changing-world-order-an-animated-video.html).
- **Why it works:** Senior, skeptical viewers trust a claim more when they can see the cause and
  effect behind it. Naming the principle first tells them what to look for; the mechanism makes
  the evidence legible; the implication makes it useful.
- **Order variant:** Use *principle → evidence → mechanism* when the evidence itself is the
  surprise ("costs fell 90%; here is why"). Use *principle → mechanism → evidence* when the
  numbers only mean something once the viewer knows how the parts connect. Budgets and operating
  models are almost always mechanism-first.
- **Fits:** Thought leadership, explainer of a system, data story for executives. A natural fit
  for AI strategy material.
- **Beats:** Principle → (optional) the case we will follow → mechanism in two to four named
  parts → evidence per part → implication → principles restated.
- **Tension curve:** Low and steady. Tension comes from "is this principle really true?" and is
  released by the evidence. Avoid hype; the calm is the persuasion.

#### Inverted pyramid (news-style explainer)
- **What it is:** The most important fact first, then supporting detail in descending order of
  importance (Purdue OWL:
  https://owl.purdue.edu/owl/subject_specific_writing/journalism_and_journalistic_writing/the_inverted_pyramid.html).
- **Why it works:** The viewer gets the point even if they leave at 20 seconds. Ideal where drop-off
  is steep and the news is the hook.
- **Fits:** Short-form updates, announcements, "what just happened" explainers (the Varun Mayya
  short in `research/varun-mayya/short.en-orig.vtt` opens "OpenAI just revealed it...").
- **Beats:** The news in one sentence → why it matters → how it works → context → what to watch.
- **Tension curve:** Front-loaded; the rest is earned by "but here's the interesting part".

#### Problem → Agitate → Solve (PAS)
- **What it is:** Name a problem the viewer has, make its cost felt, then present the fix
  (summary of the classic copywriting formulas: https://mailchimp.com/resources/copwriting-formulas).
- **Why it works:** Relief only lands on someone who feels the problem.
- **Fits:** Marketing, product demo, short-form ads. For enterprise audiences keep agitation
  factual (cost, delay, risk), never fearmongering.
- **Beats:** Hook → problem → agitate (what it costs, who it hurts) → the solution → proof → CTA.
- **Tension curve:** Rises early and hard; released at the solution.

#### Before → After → Bridge (BAB)
- **What it is:** Today's frustrating state, the better state, and the offer as the bridge
  (https://wordstream.com/blog/ws/2020/04/16/copywriting-formulas).
- **Why it works:** Leads with the outcome, so it feels aspirational rather than negative.
- **Fits:** Brand films, transformation stories, short case-study teasers.
- **Beats:** Before → After → Bridge → CTA.
- **Tension curve:** Released early (the after), then re-earned by showing how.

#### AIDA (Attention → Interest → Desire → Action)
- **What it is:** A funnel: grab attention, build interest, create desire, ask for action. Usually
  credited to E. St. Elmo Lewis (1898), though a 2024 study argues the evidence for that
  attribution is weak (https://www.jstage.jst.go.jp/article/jmhr/3/2/3_150/_article/-char/en).
- **Why it works:** When there is no single sharp pain, a clean descending funnel beats a forced
  story.
- **Fits:** Ads, short promos, event invitations.
- **Beats:** Attention hook → interest (what is different) → desire (proof, specifics) → action.
- **Tension curve:** A descending staircase toward the CTA.

#### Three-act product launch (Problem → Reveal → Proof → CTA)
- **What it is:** Establish what is wrong with how things are, reveal the new thing, prove it, then
  ask. Nancy Duarte's analysis of great talks, including Steve Jobs's 2007 iPhone launch, shows the
  speaker moving back and forth between "what is" and "what could be"
  (https://www.ted.com/talks/nancy_duarte_the_secret_structure_of_great_talks).
- **Why it works:** The contrast makes the status quo feel unacceptable and the new thing feel
  necessary.
- **Fits:** Product launch, feature announcement, new service offering.
- **Beats:** Status quo and its limits → the reveal (one sentence, one visual) → proof in two or
  three demonstrations → what it means for you → CTA.
- **Tension curve:** Builds to the reveal; proof sustains; CTA releases.

#### Case study: STAR (Situation → Task → Action → Result)
- **What it is:** The interview-answer structure applied to a client story. Keep situation and task
  short; spend most of the time on action and a quantified result
  (https://successworks.wisc.edu/the-basics/preparing-for-your-interview-2/the-star-method/).
- **Why it works:** It is the shape decision-makers expect from proof. Skipping the result leaves
  no payoff.
- **Fits:** Case study, client success story.
- **Beats:** Situation (who, where, what was wrong) → task (what had to be achieved) → action
  (what was done, in two to four steps) → result (numbers) → lesson.
- **Tension curve:** Set by the situation; released at the result. **Requires a real result.** If
  the result is projected, not achieved, say "expected" every time, or switch to the Dalio spine.

#### Story spine (Kenn Adams, taught at Pixar)
- **What it is:** Eight sentence starters: Once upon a time... Every day... But one day... Because
  of that... Because of that... Because of that... Until finally... And ever since then... Created
  by improv teacher Kenn Adams and taught to Pixar writers by Rebecca Stockley
  (https://www.npr.org/transcripts/nx-s1-5750619).
- **Why it works:** It forces a routine, a disruption, a causal chain and a new normal.
- **Fits:** Brand story, founder story, narrative case study. Also useful as a drafting check for
  any spine: if you cannot fill the eight lines, the causal chain is missing.
- **Tension curve:** Rises from "but one day" to "until finally".

### 3c. Devices (used inside a spine, never as the spine)

- **But / Therefore (South Park rule).** Trey Parker and Matt Stone, in a 2011 NYU class filmed
  for mtvU, said the beats of a story should be joined by "but" or "therefore", never "and then"
  (https://thehustle.co/the-storytelling-secrets-that-netted-matt-stone-and-trey-parker-600-million-dollars).
  *Use:* after drafting, read the first sentence of each beat in order. Every join should be a
  "but" (complication) or a "therefore/so" (consequence). Rewrite every "and then".
- **ABT (And, But, Therefore).** Randy Olson's one-sentence version of the same idea, built for
  scientists who list findings: "[context] AND [context], BUT [problem], THEREFORE [response]"
  (https://www.sesync.org/resources/communications-toolkit-and-therefore-statement). *Use:* the
  premise sentence in the script document, and the test that the story exists.
- **Open loop (curiosity gap).** Plant a specific question early ("by the end you'll see the one
  number that..."), pay it off later, and say so when you do ("here is the number I promised").
  Rules: no more than two loops open at once; every loop is closed before the CTA; never open a
  loop you cannot close with source material.
- **Signposting.** Say the structure out loud: "three parts", "first, second, third". This is
  Mayer's *signaling* principle for multimedia learning: cues that show the organization of the
  material help people learn
  (https://services.dartmouth.edu/TDClient/1806/Portal/KB/PrintArticle?ID=171655).
- **Re-hook.** A new question, turn or reveal placed at regular intervals so the viewer gets a
  fresh reason to stay. See section 5b.
- **Pattern interrupt.** A deliberate change of rhythm: a very short sentence after long ones, a
  direct question to the viewer, a pause, a change of visual mode. Used sparingly, it resets
  attention.

---

## 4. Choosing the framework

**Primary key: video type.** Then adjust for audience and format.

| Video type | Default spine | Alternative | Why |
|---|---|---|---|
| **Explainer** | Question-led | Dalio (when the topic is a system or model) | The viewer arrives with a question; answering it in steps matches how they learn. |
| **Data story** | Dalio, evidence-first | Question-led | Numbers need a principle to mean something; the principle tells the viewer which number matters. |
| **Marketing / brand** | BAB | PAS (sharp, known pain); Story spine (founder story) | Brand work sells a future state; BAB leads with it. |
| **Product launch / demo** | Three-act launch | AIDA (short-form) | The reveal needs a status quo to contrast against. |
| **Thought leadership** | Dalio, mechanism-first | Question-led | An opinion persuades skeptics through cause and effect, not volume. |
| **Case study** | STAR | Story spine (more narrative); Dalio (when the result is still projected) | Decision-makers expect situation, action, result. |
| **Tutorial** | Hook (show the finished result) → steps → recap | Inverted pyramid (quick tips) | YouTube's own advice for how-to videos is to show the finished product at the start (https://blog.youtube/creator-and-artist-stories/youtube-creator-playbook-tips-first-15). |
| **News / update** | Inverted pyramid | Question-led | The news is the hook; front-load it. |

Adjustments:
- **Expert audience** → shorter setup, more mechanism, fewer analogies. **General audience** → one
  analogy per mechanism, more signposting.
- **Short-form** → strip the spine to three or four beats (hook, one turn, payoff, CTA or loop).
  Question-led and inverted pyramid compress best; STAR and Dalio need ruthless cutting.
- **The style cassette never changes the spine on its own.** It changes voice, pace and scenes
  (section 6). If a style "wants" a different spine than the type, the type wins.

### Short-form vs long-form

| | Short-form (vertical 9:16, under 60 s) | Long-form (16:9, 2 min+) |
|---|---|---|
| Hook window | First 1-2 seconds; the first frame and first words together. | First 5-15 seconds; YouTube's "intro" metric is the share still watching at 30 seconds (https://support.google.com/youtube/answer/9314415). |
| Ideas | One. | One spine, up to five supporting points. |
| Pace | Fast; the Varun Mayya short in our research set runs about 234 wpm. | Style-dependent, 130-190 wpm. |
| Setup | Almost none; context arrives inside the payoff. | Enough to make the payoff matter. |
| Ending | A loop back to the first line, or one takeaway. No goodbye. | Payoff, one-line recap, one CTA, end within about 10 seconds of the payoff. |
| On-screen text | Burned-in captions plus large key numbers, inside the vertical safe area. | Key numbers and labels only. |
| Note | YouTube Shorts can be up to three minutes since 15 October 2024 (https://petapixel.com/2024/10/04/youtube-shorts-expands-video-length-to-three-minutes/), but this module treats "short-form" as under 60 seconds. | |

---

## 5. From framework to script

### 5a. Audience translation: from a dense infographic to one story

The source is usually a one-page infographic or deck that is correct and complete. A video
cannot be complete; it can only be clear. Translate in this order:

1. **Inventory.** List every claim and number from the source, with units. Nothing is cut yet.
2. **Find the thesis.** The one sentence the user believes that a viewer might not. If the user
   said it in passing, use their words.
3. **Pick one protagonist.** A company, a team, or a role (a CFO, a head of customer service).
   Not "enterprises". The viewer follows a someone. Anonymize clients by default ("a wealth
   management company").
4. **Pick one tension.** The single gap that the strategy closes: a cost, a delay, a risk, a
   mismatch between plan and reality. Write the premise in ABT form. If two tensions compete,
   choose the one the thesis answers.
5. **Cut to three to five numbers that matter.** A number earns narration only if it (a) defines
   the tension, (b) is the size of the response, or (c) is the result. Each spoken number gets its
   own sentence and its own beat or half-beat.
6. **Park the rest.** Everything else goes in *Parked material* with a reason. Parked numbers may
   still appear on screen as context (a full roadmap, a list of use cases) if they do not need to
   be read aloud.
7. **Check the arithmetic.** Before writing, multiply and divide the key numbers against each
   other. Units that differ (per interaction vs per *resolved* interaction; per year vs over the
   programme) must not be compared on screen. Contradictions go to Open questions, and the script
   avoids the contested figure until it is resolved.
8. **Translate the jargon.** "Interactions" → "customer questions". "CX" → "customer service" or
   "customer experience". "Capitalise vs expense" → "what counts as an asset and what is an
   expense". Keep the precise term on screen if the audience will meet it later.

The result is a story a general business viewer can retell in one sentence.

### 5b. Retention mechanics

**The hook (first 5-15 seconds, long-form).** Lead with the content, not a logo or a channel intro;
YouTube's guidance is that branding works best kept to about five seconds and that the opening
should make clear what the video is about
(https://blog.youtube/creator-and-artist-stories/youtube-creator-playbook-tips-first-15). Hook types,
with example lines:

| Hook type | Example line | Best for |
|---|---|---|
| **Principle / contrarian claim** | "A strategy that is not backed by numbers is not a strategy. It is a wish." | Thought leadership, Dalio style |
| **Surprising number** | "Every time this company's customers ask a question, it costs twelve dollars." | Data story |
| **Direct question** | "What does it actually cost to put AI into a customer service team?" | Explainer |
| **Scene or date (cold open)** | "The year is 1953. Bell Labs has just made the first practical solar cell." (Vox pattern) | Explainer, story |
| **News peg** | "OpenAI just revealed..." (Varun Mayya pattern) | Short-form, update |
| **Show the result** | "This is the budget tracker we'll build in the next five minutes." | Tutorial |
| **Stakes** | "Get this wrong, and the project is stopped at the first review." (only if the source supports it) | Case study, opinion |

Rules for every hook: it pays off the title within 15 seconds; it is true and sourced; it does
not start with "In this video" or "Hi, I'm".

**Title, thumbnail and hook alignment.** The title states the promise, the thumbnail shows the
tension, and the first line confirms the viewer clicked the right thing. YouTube advises titles
that match the content, with the most important words first
(https://support.google.com/youtube/answer/12340300). In the script document, each title option
must be answerable by the chosen hook.

**Open loops and payoff.** Plant one loop in the first 30 seconds, pay it off in the second half,
and announce the payoff. Close every loop.

**Re-hooks every 30-60 seconds (house rule).** Each re-hook is one of: a new question, a "but", a
reveal of a number, or a signpost ("the third part is the one most plans leave out"). In much
longer videos the same idea scales up: the leaked MrBeast production memo describes deliberate
"re-engagement" moments roughly every three minutes after the first minute, which it calls the
most important
(https://www.alexanderjarvis.com/memo-how-to-succeed-in-mrbeast-production/; reported by
https://omr.com/de/daily/mrbeast-doc-pdf-leak).

**Pattern interrupts.** One every 30-60 seconds, usually coinciding with a re-hook: a three-word
sentence after long ones, a question to the viewer, a planned pause (a beat boundary), a change of
scene type. Never two in a row.

**One idea per beat.** Mayer's *coherence* principle (cut extraneous words and visuals) and
*segmenting* principle (present material in chunks) both point the same way
(https://services.dartmouth.edu/TDClient/1806/Portal/KB/PrintArticle?ID=171655). House rule: one
beat carries one idea, one visual, and at most one spoken number group. If the narration needs
"and also", split the beat.

**On-screen text is not a transcript.** Mayer's *redundancy* principle: narration plus graphics
beats narration plus graphics plus the same words on screen. Use on-screen text for numbers,
labels and the occasional principle card, not to repeat the sentence. (Short-form captions are the
exception; they are for sound-off viewing.)

**Endings.** Pay off the main loop, restate the principle or takeaway in one line, give one CTA,
stop. Watch the "key moments" report for dips; viewers leave at the point where the video signals
it is over (https://support.google.com/youtube/answer/9314415), so do not announce the end early
("to wrap up...") and do not add a long outro.

### 5c. Writing for the ear, and for a Kokoro voice

**Words per minute.** Measured from the caption files in this repo's `research/` folder (words in
the captions divided by total runtime; music and pauses are included, so true speaking rate is a
little higher):

| Reference | Measured wpm | Use as default for |
|---|---|---|
| Kurzgesagt (`research/kurzgesagt/pHJIhxZEoxg`) | ~162 | Calm, warm explainer |
| Aevy TV long (`research/aevy-tv`) | ~163 | Conversational explainer |
| Vox explainer (two videos) | ~173-176 | Brisk journalistic explainer |
| Johnny Harris (`research/johnny-harris`) | ~176 | Narrative documentary |
| Varun Mayya long (`research/varun-mayya/long`) | ~190 | Energetic creator, long-form |
| Fireship (`research/fireship`) | ~206 | Rapid technical |
| Varun Mayya short (`research/varun-mayya/short`) | ~234 | Energetic creator, short-form |

Commonly cited averages: about 150 wpm for conversational English and 150-160 wpm for audiobook
narration (https://www.mentalfloss.com/language/how-many-words-per-minute-do-people-speak).
Defaults when no style is chosen: **slow, measured (Dalio-like): 125-135 wpm; calm explainer:
140-160 wpm; energetic creator: 170-200 wpm; short-form creator: 190-230 wpm.** The style
cassette's measured number overrides these.

**Word budget** = target seconds × wpm ÷ 60. A 3-minute video at 130 wpm is about 390 words. Write
to the budget; do not plan to "speed up the voice" to fit.

**Sentences.**
- Average 8-15 words. Hard ceiling about 20. One clause per sentence when it carries a number.
- Subject, verb, object. Put the important word at the end of the sentence, where stress falls.
- Fragments are allowed and useful for rhythm ("Scale it. Improve it. Or stop it.").
- Repeat key nouns instead of using "it" or "this" across sentences. A listener cannot scroll back.
- No parentheses, slashes, "e.g.", "i.e.", "vs.", "etc.". Say "for example", "or", "and so on".

**Numbers said aloud.** Broadcast style rounds large numbers, uses words for thousands and millions,
and spells out dollars and percent
(https://people.bethel.edu/~socsco/BCastWriting/BroadcastBasics.html). For TTS, go one step further:
**write every number in the narration as words**, because Kokoro's text front end (misaki,
https://github.com/hexgrad/misaki) does not document how it normalizes currency, ranges or
abbreviations. Keep the numerals for `numbers_to_show`.

| Source | Narration | Notes |
|---|---|---|
| $1.2M | one point two million dollars | |
| $1.161M | one point one six million dollars | Round for speech; exact figure on screen. |
| $0.7M | seven hundred thousand dollars | Do not say "zero point seven million". |
| $400k | four hundred thousand dollars | |
| 100,000 | one hundred thousand | "a hundred thousand" for a casual style. |
| 60% | sixty percent, or six in ten | "Six in ten" is easier to picture. |
| -3% | three percent under | Say the direction in words. |
| $12 → $9 | from twelve dollars to nine | |
| 24h | up to a day, or twenty-four hours | |
| 0-2 months | the first two months | |
| 12-month | twelve-month | |
| 2026 | twenty twenty-six | |
| 3-5 | three to five | |
| Q3 | the third quarter | |

**Acronyms.** Expand on first use, then prefer the plain phrase. CX → customer experience. CSAT →
customer satisfaction. ROI → return on investment. CFO → chief financial officer (or "the C F O",
spaced, if the style is casual). KPI → measure, or key metric. Common pronounced-as-letters
acronyms such as AI and CEO are usually fine, but test them once. For a name the voice
mispronounces, misaki supports a pronunciation override in Markdown link form with IPA in the
link target, for example `[Kokoro](/kˈOkəɹO/)` (https://github.com/hexgrad/misaki). Use this only
in the narration field and only when a test shows it is needed.

**Pauses and rhythm with Kokoro.** Kokoro takes plain text; there is no documented SSML or
emphasis tag support, and prosody follows punctuation
(model card: https://huggingface.co/hexgrad/Kokoro-82M; secondary guide:
https://deapi.ai/blog/kokoro-tts-guide-how-to-control-41-voices-with-nothing-but-punctuation).
- Comma = short breath. Full stop = clear pause. Question mark = rising end. Use exclamation marks
  rarely; they can sound forced.
- Colons, semicolons, em dashes and the ellipsis character are in the phoneme vocabulary
  (https://kokorog2p.readthedocs.io/en/latest/_modules/kokorog2p/punctuation.html), but their pause
  length is not documented. Prefer full stops.
- **Long, reliable pauses come from beat boundaries**, not punctuation. Each beat is synthesized
  separately and the storyboard step controls the gap. If you need a dramatic pause, end the beat.
- A paragraph break inside a beat may or may not lengthen the pause; do not rely on it.

**Emphasis.** There is no emphasis markup in the narration field. Create stress with structure:
1. End the sentence on the word ("...is not a strategy. It is a **wish**." — wish is last).
2. Isolate it as its own short sentence ("About three percent under.").
3. Repeat it ("A strategy you can measure is a strategy you can defend.").
4. Show it on screen in the same beat.
Record the intended stress word in the beat's `intent` field as `stress: <word>` so the storyboard
can highlight it.

**Calibrate before trusting the timing.** Synthesize the first two beats with the chosen voice and
speed, divide words by audio seconds, and adjust Kokoro's speed setting (or the script) until the
measured wpm matches the target. Estimates in the script are planning numbers; the TTS audio is
the truth.

### 5d. Timing

- `seconds_estimate` = words in the narration × 60 ÷ target wpm, plus 0.5 seconds for the beat
  tail, rounded to the nearest 0.5. Words are counted as whitespace-separated tokens.
- Target beat length: long-form 8-20 seconds; short-form 2-6 seconds. A long-form beat over about
  20 seconds is usually two ideas; split it. The style's Pacing section can override this range.
- The beat sheet shows cumulative time so a reviewer can see where the hook ends, where the loop is
  paid off, and where each re-hook falls.

---

## 6. The style handshake

The video's look and voice come from a style cassette, `styles/<id>.md` (template:
`styles/_TEMPLATE.md`). The script reads three of its sections:

| Cassette section | What the script takes from it |
|---|---|
| **Narration** | Voice and person (I / we / you), measured wpm, sentence shape, question habits, jargon level, structure habits (cold open, signposting, recap), and the Kokoro voice and speed. |
| **Pacing** | Typical scene length (sets the beat-length range), how long a number stays on screen (sets how many numbers one beat can carry), and typical total length. |
| **Scene grammar** | The named scene types (for example "chart build", "principle card", "map zoom"). Every `visual_idea` starts with one of these names in square brackets. Transition vocabulary for `transition_out` also comes from here. |

**Precedence.**
- Facts, numbers and the spine come from the source and the video type. The style never adds a
  claim and never changes the spine by itself.
- Voice, pace, sentence shape, hook type and scene choices come from the style. If the style says
  130 wpm, the word budget is set at 130 wpm.
- If no cassette is chosen, or the file is missing a section, use this module's defaults and say
  so in *Format and length*.
- If the style and the video type pull different ways (a hype creator style for a sober case study),
  keep the spine, adopt the voice, and note the tension in the framework rationale.

### Same idea, two styles (about 20 seconds each)

Source facts: 100,000 customer questions a year, $12 each, 60% repetitive.

**Ray Dalio style** (calm, measured, about 130 wpm, so about 43 words; principle-minded, complete
sentences, one number per sentence, simple chart builds):

> Start with today. The team answers about one hundred thousand customer questions a year. Each one
> costs about twelve dollars. Six in ten are questions it has answered before. So most of the money
> goes into work the team has already done.

(42 words, about 19.5 seconds at 130 wpm.)

**Varun Mayya style** (fast creator, measured about 190 wpm long-form and 234 wpm short-form in our
research set, so about 65-75 words; first person, conversational, "See," / "Now, imagine" /
"And just like that" transitions, a reveal line, fragments for punch):

> Okay so this wealth company was paying twelve dollars. Every single time a customer asked a
> question. Twelve dollars! And they get about a hundred thousand of these a year. Now here's the
> crazy part. Sixty percent of those questions? Repeats. Same stuff, again and again. So that's over
> seven hundred thousand dollars a year on answers they already had. And that's exactly where AI
> comes in.

(67 words, about 19.5 seconds at 205 wpm.)

What changed and why:

| | Dalio | Varun Mayya |
|---|---|---|
| Opening | Neutral signpost ("Start with today.") | Casual direct address ("Okay so...") |
| Numbers | One per sentence, rounded, no arithmetic on screen | Repeated for punch ("Twelve dollars!"), plus a derived total ($720,000 = 100,000 × 60% × $12, recorded in *Derived numbers*) |
| Sentence shape | Complete declaratives, 3-13 words | Fragments, questions, a "here's the crazy part" turn |
| Ending of the idea | A plain consequence ("So most of the money...") | A forward hook into the next beat ("And that's exactly where AI comes in.") |
| Visual grammar implied | One bar chart that builds, calm hold | Fast zooms on the number, text pop-ups, a cut on every sentence |

Both versions use only source facts. The style changed the voice; the facts and the spine did not.

---

## 7. Gap handling

A **gap** is something the script needs that the mind dump does not supply.

### Blocking gaps (stop, emit a gap report, no script)

- No discernible topic or thesis.
- The chosen spine depends on a fact that does not exist: a case study with no result, a launch with
  no product details, a data story with no numbers.
- The only available numbers contradict each other on the main claim, and no framing avoids them.

### Report-only (never fabricate)

- Statistics, benchmarks, market sizes, "studies show".
- Client names, logos, quotes, testimonials.
- Results that have not happened (projected results must be labelled "expected" or "the goal is").
- Any claim about competitors.

**Derived numbers are allowed** when they are plain arithmetic on source numbers (for example
100,000 × 60% × $12 = $720,000). Every derived number is listed under *Derived numbers* with its
arithmetic.

### Ask at most three questions; assume the rest

Ask only questions whose answer would change the words in the script. Rank candidates and ask the
top three, in this order:

1. **Contradictory or ambiguous numbers** that sit on the spine (units, per year vs total, real vs
   illustrative).
2. **Confidentiality**: may these client figures be shown publicly, and should the client be named?
3. **Goal and CTA**: what should the viewer do at the end?
4. **Audience**, if the material could serve two very different viewers.
5. **Format**, if the user gave no hint of short vs long.

Every question is written with the default the script currently uses, so the user can answer
"fine" and the script is already done.

### Defaults (use, then state)

| Missing | Default |
|---|---|
| Audience | General business viewer (managers and executives outside the specialism). |
| Format | Long-form 16:9. |
| Length | Explainer, data story, thought leadership: 3 minutes. Case study: 2 minutes. Marketing: 60-90 seconds. Short-form: 45 seconds. |
| Style | Neutral calm explainer, 150 wpm, flagged (the normal case at stage 1; re-paced at stage 2). |
| wpm | From the style cassette; else the defaults in section 5c. |
| Client identity | Anonymized by role and industry ("a wealth management company"). |
| Numbers | Rounded in speech, exact on screen. |
| CTA | A one-line takeaway, no hard sell. |
| Spelling | Match the user's source (if the source writes "centre", keep British/Indian spelling on screen). |
| Narrator person | From the style; else "we" for the explainer voice and "you" for the viewer. |

---

## 8. Storyboard handoff spec

The storyboard step reads **one fenced `yaml` block** in the *Script* section of the script
document: a list of beats, in order, using exactly these fields.

| Field | Type | Required | Rules |
|---|---|---|---|
| `beat_id` | string | yes | `B01`, `B02`, ... Zero-padded, sequential, never reused. After an edit, renumber the whole list. |
| `seconds_estimate` | number | yes | Formula in section 5d. One decimal at most. The storyboard re-times from the real TTS audio. |
| `narration` | string | yes | The exact words the TTS voice will speak. Numbers as words. No markup except a misaki pronunciation link where a test showed it is needed. No stage directions. |
| `intent` | string | yes | What the viewer should feel or understand by the end of this beat, in one sentence. Optionally ends with `stress: <word>` and the framework stage, e.g. `(stage: mechanism)`. |
| `visual_idea` | string | yes | One line. Starts with a scene type from the style's Scene grammar in square brackets, then what is shown, not how it is animated. |
| `on_screen_text` | string | yes | Short label or principle card, about six words at most. Not a repeat of the narration. Empty string if none. |
| `numbers_to_show` | list of strings | yes | Display-formatted figures with a short label, e.g. `"$12 per interaction"`. Each traces to the source or to *Derived numbers*. Empty list if none. |
| `sfx_cue` | string or null | no | One short cue (e.g. "soft tick", "low whoosh"). Defer to the style's Sound section. |
| `transition_out` | string or null | no | How this beat leaves: `cut`, `dissolve`, `push-in`, `match`, or a named transition from the style. |

Additional rules:
- Every beat has narration. Silent beats (a pause on a chart) are expressed by ending the previous
  beat and leaving the gap to the storyboard, not by an empty beat.
- One beat, one idea, one primary visual.
- Total of `seconds_estimate` is within ±10% of the target length.

Minimal example:

```yaml
- beat_id: B01
  seconds_estimate: 11.5
  narration: "Here is a principle. A strategy that is not backed by numbers, and checked against them, is not a strategy. It is a wish."
  intent: "The viewer hears the thesis and expects to see it proven. stress: wish (stage: principle)"
  visual_idea: "[principle card] The sentence builds word by word on a plain background."
  on_screen_text: "Strategy without numbers = a wish"
  numbers_to_show: []
  sfx_cue: null
  transition_out: dissolve
```

---

## 9. Is the script valid? (checks before emitting)

A script may be emitted only if all of these hold; otherwise fix it or emit a gap report.

- **One spine.** The beat sheet maps every beat to a stage of one framework.
- **The premise fits in one ABT sentence.**
- **But/Therefore pass done.** No beat-to-beat join reads "and then".
- **The hook pays off a title** within 15 seconds (long-form) or 2 seconds (short-form).
- **Every open loop is closed**, and the payoff is announced.
- **A re-hook or pattern interrupt at least every 60 seconds** (long-form).
- **Three to five spoken numbers on the spine**, each in its own sentence. Everything else is
  parked or on screen only.
- **No fabricated substance.** Every number is in the source or in *Derived numbers*. Projections
  are labelled as goals or expectations.
- **No unit mismatches** on screen or in narration.
- **Speakable.** No symbols, numerals, unexpanded acronyms, parentheses or slashes in narration.
  Sentences average under 15 words.
- **Timed.** Total within ±10% of target; no long-form beat over about 20 seconds without a reason.
- **Style applied.** wpm, voice and scene names match the cassette, or the defaults are declared.
- **Schema exact.** All required fields present, field names exact, valid YAML.
- **One CTA**, and the ending stops within about 10 seconds of the final payoff.
- **At most three open questions**, each with its current default.

---

## 10. Worked example, end to end

### Input: the mind dump (call transcript, lightly cleaned)

> "Wealth management company, customer experience function. I created a strategy for CX
> improvement: listed the business use cases, then the AI cost of these initiatives and how we'll
> spend operationally, the implementation plan, the target architecture. On the right I made a
> 12-month AI investment budget and financial tracking — any strategy has to be backed by numbers.
> If you put this budget, you track it against the plan. Then a cheat sheet for the accounting team:
> which cost goes to which cost centre."

Numbers supplied: 100,000 support interactions a year; 60% repetitive; $12 per interaction; 78%
CSAT; 24-hour response for non-standard queries. Seven AI use cases (investor service assistant,
agent-assist, classification and routing, multilingual conversational AI, personalized portfolio
insights, complaint management and sentiment, proactive communications). Five phases (Discover and
Plan 0-2 months, Pilot 3-5, Integrate 6-8, Scale 9-12, Optimize ongoing). $1.2M total = $0.7M
one-time + $0.4M recurring + $0.1M contingency. By category: Strategy and Implementation $400k (33%),
Technology and Infrastructure $350k (29%), Security, Risk and Governance $150k (13%), People and
Operations $180k (15%), Contingency $120k (10%). Expected benefits: $1.8M a year in cost savings, 30%
CX productivity gain, cost per interaction $12 → $9 after 12 months → $6 per *resolved*
interaction, ROI 50%, payback about 16 months. Monthly budget vs actual: $1.2M budget, $1.161M
actual, variance -3%. Decision gates: Scale, Improve, Stop. Accounting: five top-level cost centres,
capitalise vs expense, journal entries, monthly reporting checklist.

### Step 1: Read the mind dump

- **Thesis (said in passing):** "Any strategy has to be backed by numbers. If you put this budget,
  you track it against the plan."
- **Protagonist:** the customer service team of a wealth management company (anonymized).
- **Tension:** most of the service cost goes into repeat questions while unusual ones wait a day.
- **Artefacts that become visuals, not narration:** the use-case list, roadmap, budget split,
  tracker, cost-centre cheat sheet.

### Step 2: Check the arithmetic (section 5a, step 7)

- Category split sums to $1.2M and 100%. One-time + recurring + contingency also sums to $1.2M.
  **But** contingency is $0.1M in one split and $120k in the other. Minor; the script says "one
  hundred thousand" from the first split and the on-screen figure follows it. Listed as an
  assumption.
- **$1.8M "per year" does not fit the rest.** At $12 × 100,000, the whole service operation costs
  about $1.2M a year, so saving $1.8M a year on it is not possible. ROI 50% and a 16-month payback
  *do* reconcile if $1.8M is the total benefit over about two years: (1.8 − 1.2) ÷ 1.2 = 50%, and
  $1.2M ÷ ($1.8M ÷ 24 months) = 16 months. The script leaves $1.8M, ROI and payback out until the
  user confirms. This is open question 1.
- **$12 → $6 is a different unit** (per resolved interaction). Not compared on screen with $12 per
  interaction. Parked.
- **$1.161M actual**: real client data or the template's sample? The narration says "in the
  tracker", which is true either way, but publishing it needs confirmation. Open question 2.

### Step 3: Choose

- **Video type:** explainer (how a funded, tracked AI plan works), with data-story evidence.
- **Spine:** Dalio, *principle → mechanism → evidence → implication*, mechanism-first, because a
  budget only means something once the viewer sees the parts it pays for. The requested style is
  Dalio's, and the thesis is already a principle.
- **Devices:** one open loop ("the one number that shows whether the plan is on track", paid off in
  B10); But/Therefore joins at B04, B05 and B08; signposting "three parts / first / second /
  third"; principle recap at the end.
- **Style handshake:** cassette `styles/ray-dalio-principles.md` (assumed id; if absent, use the values
  here and flag). Narration: calm, measured, about 130 wpm, complete sentences, "you" for the
  viewer. Kokoro voice: a low, steady voice such as `am_michael`, speed calibrated to 130 wpm on B01
  and B02. Pacing: long, calm scenes of 10-16 seconds; one number group per scene. Scene grammar
  used below: principle card, character scene, simple machine, bar build, timeline, tracker
  close-up, list build.

### The script document

#### 1. Title options
1. A Strategy Without a Budget Is a Wish *(used; paid off by hook A at 0:00-0:11)*
2. Pricing an AI Plan Before Spending a Dollar
3. The Twelve-Dollar Question: Funding AI in Customer Service

#### 2. Premise
A wealth manager's service team answers a hundred thousand questions a year at twelve dollars each,
**and** six in ten are repeats, **but** an AI plan with no budget behind it is only a wish,
**therefore** the plan was built as a priced, tracked machine that can be scaled, improved or
stopped.

#### 3. Video type, framework, and why
Explainer with data-story evidence. Spine: Dalio principle → mechanism → evidence → implication.
The user's own thesis is a principle, the viewer is a skeptical business audience who needs to see
cause and effect, and the source is a system (work, cost, tracking) rather than a sequence of
events. Devices: one open loop, But/Therefore turns, signposting, principle recap.

#### 4. Format and length
Long-form 16:9. Target 180 seconds at 130 wpm (from the Dalio style brief) = about 390 words.
Actual: 391 words, 188.5 seconds estimated (+5%, within tolerance).

#### 5. Audience
General business viewers: executives and managers in financial services who are considering AI for
customer-facing teams. They know budgets and service teams; they do not know AI tooling or
capitalisation rules. At the end they should understand that an AI plan needs a priced budget, a
reserve, monthly tracking and explicit decision points.

#### 6. Hook options
- **A. Principle (used):** "Here is a principle. A strategy that is not backed by numbers, and
  checked against them, is not a strategy. It is a wish."
- **B. Surprising number:** "Every time a customer of this wealth manager asks a question, it costs
  twelve dollars. They ask a hundred thousand times a year."
- **C. Question:** "What does it really cost to bring AI into a customer service team, and how would
  you know if it was working?"

#### 7. Beat sheet

| Stage | Beats | Seconds | Ends at | Notes |
|---|---|---|---|---|
| Principle (hook) | B01 | 11.5 | 0:11.5 | Pays off title 1. |
| Case + open loop | B02 | 16.0 | 0:27.5 | Loop planted: "the one number". |
| Evidence of the problem | B03, B04 | 28.0 | 0:55.5 | "But" turn in B04. |
| Mechanism: the machine | B05 | 13.5 | 1:09 | "Therefore" turn; signpost three parts. Re-hook. |
| Mechanism part 1: the work | B06 | 14.5 | 1:23.5 | |
| Mechanism part 2: the price | B07, B08 | 23.5 | 1:47 | B08 is the pattern interrupt. |
| Mechanism part 3: tracking | B09 | 15.0 | 2:02 | Re-hook: "the part most plans leave out". |
| Evidence (payoff of loop) | B10 | 15.5 | 2:17.5 | Loop closed, announced. |
| Evidence: what it buys | B11 | 15.0 | 2:32.5 | Goals, labelled as goals. |
| Mechanism closer: accounting | B12 | 14.5 | 2:47 | |
| Implication: principles | B13 | 12.0 | 2:59 | |
| Close and CTA | B14 | 9.5 | 3:08.5 | Returns to the opening principle. |

But/Therefore read-through of beat openings: principle → *to see why* → today's numbers → *so...
but* the unusual ones wait → *therefore* the plan → first → second → *notice* (but: no reserve is
risky) → third → *here is the number* → *so* what does it buy → last piece → *so*, the
principles → close. No "and then" joins.

#### 8. Script (storyboard handoff)

```yaml
- beat_id: B01
  seconds_estimate: 11.5
  narration: "Here is a principle. A strategy that is not backed by numbers, and checked against them, is not a strategy. It is a wish."
  intent: "The viewer hears the thesis plainly and expects it to be proven. stress: wish (stage: principle)"
  visual_idea: "[principle card] The sentence builds line by line on a plain background; the word 'wish' lands last."
  on_screen_text: "Strategy without numbers = a wish"
  numbers_to_show: []
  sfx_cue: null
  transition_out: dissolve

- beat_id: B02
  seconds_estimate: 16.0
  narration: "To see why, follow one company through one year. A wealth manager's service team and its AI plan. By the end, you'll see the one number that shows whether the plan is on track."
  intent: "The viewer knows whose story this is and holds one open question: which number? (stage: case + open loop)"
  visual_idea: "[character scene] A small office labelled 'Wealth manager'; a service desk; a twelve-month calendar strip; a report with one line blurred."
  on_screen_text: "One company. One year."
  numbers_to_show: []
  sfx_cue: null
  transition_out: push-in

- beat_id: B03
  seconds_estimate: 14.5
  narration: "Start with today. The team answers about one hundred thousand customer questions a year. Each one costs about twelve dollars. And six in ten are questions it has answered before."
  intent: "The viewer grasps the size and cost of the service load, and that most of it is repetition. stress: before (stage: evidence of problem)"
  visual_idea: "[bar build] Question bubbles pile into a counter; a price tag attaches; six of ten bubbles turn the same colour."
  on_screen_text: "Customer questions, per year"
  numbers_to_show: ["100,000 per year", "$12 per interaction", "60% repetitive"]
  sfx_cue: null
  transition_out: cut

- beat_id: B04
  seconds_estimate: 13.5
  narration: "So most of the money goes into repeat work. But the unusual questions, the ones that need a person, can wait up to a day for a reply."
  intent: "The viewer feels the mismatch: money is spent on easy questions while hard ones wait. stress: day (stage: evidence of problem)"
  visual_idea: "[character scene] A tall stack of identical bubbles beside one odd-shaped bubble waiting under a clock."
  on_screen_text: "Unusual questions wait"
  numbers_to_show: ["Up to 24h response"]
  sfx_cue: "soft clock tick"
  transition_out: cut

- beat_id: B05
  seconds_estimate: 13.5
  narration: "Therefore, the plan was built like a simple machine, with three parts. What you will do. What it will cost. And how you will know it is working."
  intent: "The viewer gets a map of what is coming and a reason to keep watching. (stage: mechanism)"
  visual_idea: "[simple machine] Three gears appear one by one and mesh: Work, Cost, Tracking."
  on_screen_text: "Work · Cost · Tracking"
  numbers_to_show: []
  sfx_cue: "gear click on each part"
  transition_out: push-in

- beat_id: B06
  seconds_estimate: 14.5
  narration: "First, the work. Seven uses of AI, from an assistant that answers routine questions to tools that route each request and help agents reply faster. Five phases, over twelve months."
  intent: "The viewer sees that the plan is concrete and phased, not a vague ambition. (stage: mechanism, part 1)"
  visual_idea: "[timeline] Gear one fills the frame; seven small icons appear, then settle onto a five-segment timeline from month 0 to 12."
  on_screen_text: "Discover · Pilot · Integrate · Scale · Optimize"
  numbers_to_show: ["7 AI use cases", "5 phases", "12 months"]
  sfx_cue: null
  transition_out: match

- beat_id: B07
  seconds_estimate: 14.5
  narration: "Second, the price. One point two million dollars for the year. Seven hundred thousand, spent once, to build. Four hundred thousand, recurring, to run. And one hundred thousand, held back."
  intent: "The viewer understands the total and the three kinds of money inside it. (stage: mechanism, part 2)"
  visual_idea: "[bar build] Gear two; one bar labelled $1.2M splits into three segments, left to right."
  on_screen_text: "12-month AI budget"
  numbers_to_show: ["$1.2M total", "$0.7M one-time", "$0.4M recurring", "$0.1M contingency"]
  sfx_cue: null
  transition_out: cut

- beat_id: B08
  seconds_estimate: 9.0
  narration: "Notice that last part. A budget with no reserve assumes nothing will go wrong. That is rarely true."
  intent: "A pause that turns a line item into a principle: plans need a reserve. stress: rarely (stage: mechanism, pattern interrupt)"
  visual_idea: "[bar build] The contingency segment stays lit; the other two dim. Music drops for this beat."
  on_screen_text: "Keep a reserve"
  numbers_to_show: ["$0.1M held back"]
  sfx_cue: "music dips out"
  transition_out: match

- beat_id: B09
  seconds_estimate: 15.0
  narration: "Third, the part most plans leave out. Every month, actual spending is checked against the plan. And at fixed points, the team must choose. Scale it. Improve it. Or stop it."
  intent: "The viewer sees that tracking and explicit decisions are what make the plan real. stress: stop (stage: mechanism, part 3; re-hook)"
  visual_idea: "[tracker close-up] Gear three; twelve monthly bars, plan vs actual; the path ends at a three-way signpost."
  on_screen_text: "Scale · Improve · Stop"
  numbers_to_show: []
  sfx_cue: null
  transition_out: push-in

- beat_id: B10
  seconds_estimate: 15.5
  narration: "Here is the number I promised. In the tracker, spending comes in at one point one six million dollars, against one point two planned. About three percent under. The plan is on track."
  intent: "The open loop closes: one variance figure tells leadership the plan is under control. stress: under (stage: evidence, loop payoff)"
  visual_idea: "[tracker close-up] The blurred line from B02 sharpens: Budget, Actual, Variance. The variance cell is highlighted."
  on_screen_text: "Budget vs actual"
  numbers_to_show: ["Budget $1.2M", "Actual $1.161M", "Variance -3%"]
  sfx_cue: "soft chime"
  transition_out: cut

- beat_id: B11
  seconds_estimate: 15.0
  narration: "So what does the money buy? The goal is to cut each question's cost from twelve dollars to nine this year, and to make the team about thirty percent more productive."
  intent: "The viewer connects the spend to an expected result, clearly labelled as a goal. (stage: evidence)"
  visual_idea: "[bar build] A $12 bar shrinks to $9 over a twelve-month axis; beside it a team icon with +30%."
  on_screen_text: "Goals for year one"
  numbers_to_show: ["$12 → $9 per interaction (12 months)", "+30% productivity"]
  sfx_cue: null
  transition_out: cut

- beat_id: B12
  seconds_estimate: 14.5
  narration: "Last piece. Finance gets a simple guide: which of five cost centres each cost belongs to, and what counts as an asset or an expense. Every dollar has a home."
  intent: "The viewer sees that the plan is built to survive contact with the accounting team. (stage: mechanism, closer)"
  visual_idea: "[simple machine] Coins drop from the budget bar into five labelled boxes; two stamps: Capitalise, Expense."
  on_screen_text: "Cost-centre cheat sheet"
  numbers_to_show: ["5 cost centres"]
  sfx_cue: "coin drops, quiet"
  transition_out: dissolve

- beat_id: B13
  seconds_estimate: 12.0
  narration: "So, the principles. Price the plan before you start. Keep a reserve. Track it every month. And decide, out loud, to scale, improve, or stop."
  intent: "The viewer leaves with four portable rules. (stage: implication)"
  visual_idea: "[list build] Four principle lines appear one at a time on a plain background."
  on_screen_text: "Price it · Reserve · Track monthly · Decide"
  numbers_to_show: []
  sfx_cue: null
  transition_out: dissolve

- beat_id: B14
  seconds_estimate: 9.5
  narration: "A strategy you can measure is a strategy you can defend. Start with the budget. Then choose the tools."
  intent: "The thesis returns, now proven; one clear next step. stress: budget (stage: close and CTA)"
  visual_idea: "[principle card] The opening card returns; 'a wish' is replaced by 'defensible'; end card."
  on_screen_text: "Start with the budget"
  numbers_to_show: []
  sfx_cue: null
  transition_out: null
```

#### 9. Parked material

| Parked | Why |
|---|---|
| $1.8M expected savings, ROI 50%, payback about 16 months | Unit question (per year vs over two years); see open question 1. Ready-to-use line for B11 once confirmed: "Over two years, the plan is expected to return about one point eight million dollars. That is a fifty percent return, paid back in about sixteen months." (+29 words, about 14 seconds; trim B12 to compensate.) |
| $6 per resolved interaction | Different unit from $12 per interaction; comparing them would mislead. |
| 78% CSAT | True and useful, but a fourth number in the problem section; it would crowd B03-B04. Could appear on screen in B04 if the user wants it. |
| Category split ($400k, $350k, $150k, $180k, $120k) | Second breakdown of the same $1.2M; one split per video. Good material for a follow-up short. |
| Names of the seven use cases and five phases | Shown on screen in B06; reading seven names aloud breaks the one-idea rule. |
| Target architecture, implementation plan detail | A separate explainer; does not serve this premise. |
| Journal entries, monthly reporting checklist | Accounting detail; B12 carries the idea. |

#### 10. Derived numbers

None spoken. On screen, "$0.1M held back" (B08) restates the $0.1M contingency from the source.
Optional, not used: the plan's $1.2M budget equals one year of service cost (100,000 × $12 =
$1.2M). Use only if the user confirms the comparison is intended.

#### 11. Open questions (for the user)

1. **Is the $1.8M benefit per year, or over about two years?** ROI 50% and a 16-month payback only
   add up if it is about two years. *Current default: the figure is left out; a ready line is in
   Parked material.*
2. **Are the client figures (especially $1.161M actual spend) real, and may they be shown publicly
   with the client unnamed?** *Current default: client anonymized as "a wealth manager"; actuals
   described as "in the tracker".*
3. **What should viewers do at the end?** For example, book a call or download the budget template.
   *Current default: no hard CTA; the close is "Start with the budget. Then choose the tools."*

Assumed without asking: contingency is $0.1M (not $120k); audience is general business; style id is
`ray-dalio-principles` at 130 wpm with `am_michael`.

### Result

391 words of narration in 14 beats, estimated 188.5 seconds (about 3 minutes 9 seconds) at
130 wpm, against a 180-second target (+5%). Re-hooks and interrupts fall at about 0:56 (B05),
1:38 (B08), 1:47 (B09) and 2:02 (B10); the open loop is planted at 0:12 and paid off at 2:02.

---

*Module version 1. Scope: reading a mind dump; choosing a video type and script framework;
translating dense enterprise material into one spoken story; retention, spoken-word and Kokoro TTS
writing rules; the handshake with a style cassette; and the beat-level handoff to the storyboard
step. The agent produces either a complete, timed, schema-exact script document or a gap report.*
