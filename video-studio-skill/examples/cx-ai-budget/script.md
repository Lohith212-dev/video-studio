# Script — A Strategy Without a Budget Is a Wish

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

