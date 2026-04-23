/**
 * Persona-first structure: `common` = patterns across employers; each `companies[]` = drill-down.
 * Replace placeholders when your interview doc is ready.
 */
(function () {
  window.INTERVIEW_DATA = {
    customerFacing: {
      id: "customerFacing",
      personaSubtitle:
        "Front of house: cashiers, baristas, sales floor, guest services — high public contact, scripted service, shift-based scheduling.",
      common: {
        richBadge: "Across 8 employers",
        richTitle: "Customer-facing persona — interview playbook",
        sharedHeadline: "What all companies share",
        sharedCards: [
          {
            title: "Online application is primary",
            body: "Most use Indeed, LinkedIn, or company websites. Walk-in paper applications are still accepted at McDonald’s and some Chick-fil-A locations.",
            uxr: true,
          },
          {
            title: "At least one interview",
            body: "Every applicant has a face-to-face or virtual interview — ranging from a 10-minute manager conversation to a multi-stage process.",
            uxr: true,
          },
          {
            title: "Background check required",
            body: "All companies perform some form of background check. Chick-fil-A and McDonald’s vary by franchise location.",
            uxr: true,
          },
          {
            title: "No degree required",
            body: "Prior experience in retail or customer service is most helpful. Character and reliability matter more than credentials.",
          },
          {
            title: "Availability is central",
            body: "Shift flexibility — nights, weekends, and split shifts — is confirmed as a primary screen at every company in research sessions.",
            uxr: true,
          },
          {
            title: "Character over skills",
            body: "Soft skills — empathy, patience, teamwork — are consistently prioritized over technical ability. Chick-fil-A frames this explicitly around values.",
            uxr: true,
          },
          {
            title: "Fast turnover",
            body: "Most employees don’t stay beyond 3–6 months. Employers know this and screen for retention signals rather than long-term fit.",
          },
          {
            title: "No drug test for most",
            body: "Confirmed across research sessions: Starbucks, McDonald’s, and Chick-fil-A typically do not drug test. Whole Foods requires one before starting.",
            uxr: true,
          },
        ],
        userProfilesHeadline: "User profiles — representative participants",
        userProfiles: [
          {
            pseudonym: "Jose 1983",
            initials: "J",
            uxr: true,
            companyId: "chick-fil-a",
            role: "Kitchen + delivery",
            discovery: "Local advertisements",
            application: "Website + paper application in person",
            process: "In-person interview + 2 hr shadow shift",
            processTags: ["Shadow shift", "In-person"],
            backgroundCheck: "Yes",
            drugTest: "No",
            driversLicense: "Yes",
            timeToHire: "3–4 months",
            other: "10–12 person team; 10–12 hour shifts.",
          },
          {
            pseudonym: "Rachel",
            initials: "R",
            uxr: true,
            companyId: "starbucks",
            role: "Barista + trainer",
            discovery: "Saw a sign in the window",
            application: "Online application (described as not easy)",
            process: "In-person interview — manager + shift supervisor",
            backgroundCheck: "Yes",
            drugTest: "No",
            driversLicense: "No",
            timeToHire: "2–3 weeks",
            interviewFocus: "Multitasking, pressure, teamwork.",
          },
          {
            pseudonym: "David 1980",
            initials: "D",
            uxr: true,
            companyId: "whole-foods",
            role: "Customer service + cashier",
            discovery: "LinkedIn + Monster.com",
            application: "Online (LinkedIn redirected)",
            process: "Phone interview, then in-person",
            processTags: ["Phone interview", "In-person"],
            backgroundCheck: "Yes",
            drugTest: "Yes (required before starting)",
            timeToHire: "~2 weeks",
            other: "External hire; some staff with very long tenure (10–20 years).",
          },
          {
            pseudonym: "Alicia",
            initials: "A",
            uxr: true,
            companyId: "starbucks",
            role: "Assistant manager + barista",
            discovery: "LinkedIn job posting",
            application: "LinkedIn (Jan 2018)",
            process: "In-person interview with manager",
            backgroundCheck: "Yes (via Checkr)",
            drugTest: "No",
            timeToHire: "~1 month",
            other: "Text-message offer ~48 hrs after interview.",
          },
          {
            pseudonym: "Christopher",
            initials: "C",
            uxr: true,
            companyId: "chick-fil-a",
            role: "Kitchen + delivery",
            discovery: "Friend referral",
            application: "Company website",
            process: "One brief interview with manager on day 1",
            backgroundCheck: "Yes",
            drugTest: "No",
            timeToHire: "~1 week",
            keyFactor: "Prior experience + referral — fast process.",
          },
          {
            pseudonym: "Julian",
            initials: "Ju",
            uxr: true,
            companyId: "mcdonalds",
            role: "Front-of-house + cashier",
            discovery: "'Now Hiring' sign in window",
            application: "Paper application in person",
            process: "In-person interview — basic questions",
            backgroundCheck: "Yes",
            drugTest: "No",
            timeToHire: "~1 week",
            interviewFocus: "General knowledge, operating under pressure.",
          },
        ],
        atAGlance: [],
        phases: [],
        quotes: [],
      },
      companies: [
        {
          id: "mcdonalds",
          displayName: "McDonald's",
          logoUrl: "logos/mcdonalds.png",
          initials: "M",
          accent: "#FFC72C",
          initialsFg: "#1a1a1a",
          tagline: "Franchised QSR — crew, cashier, cook",
          roleLine: "Cook · crew member · cashier",
          stepsSectionTitle: "Company hiring program — what’s unique to each",
          hiringFacts: [
            {
              label: "How to apply",
              value: "McHire site, or walk-in paper app at store",
              uxr: true,
            },
            {
              label: "Assessment",
              value: "None for entry-level; AI chatbot ‘Olivia’ screens online applicants",
            },
            {
              label: "Interview",
              value: "1 short in-person; 10–15 min; basic questions",
              uxr: true,
            },
            {
              label: "Drug test",
              value: "No — confirmed by research participant",
              uxr: true,
            },
            {
              label: "Background check",
              value: "Yes — franchise-dependent, not universal",
              uxr: true,
            },
            {
              label: "Time to hire",
              value: "~1 week; fastest in group",
              uxr: true,
            },
            {
              label: "On-the-spot hiring",
              value: "New store locations actively post signs and hire same-day",
            },
          ],
        },
        {
          id: "whole-foods",
          displayName: "Whole Foods (Amazon)",
          logoUrl: "logos/whole-foods.png",
          initials: "WF",
          accent: "#00674B",
          tagline: "Amazon-owned grocery — team member, department associate",
          roles: "Team member · customer service · cashier",
          stepsSectionTitle: "Company hiring program — what’s unique to each",
          hiringFacts: [
            {
              label: "How to apply",
              value: "Amazon Jobs portal or Whole Foods website",
            },
            {
              label: "Interview",
              value: "Phone interview first, then in-person — confirmed by research participant",
              uxr: true,
            },
            {
              label: "Interview style",
              value: "Behavioral questions — 'Why Whole Foods?' and culture fit focus",
            },
            {
              label: "Drug test",
              value: "Yes — required before starting",
              uxr: true,
            },
            {
              label: "Background check",
              value: "Yes — comprehensive criminal history check",
              uxr: true,
            },
            {
              label: "I-9 verification",
              value: "Must bring IDs to appointment",
            },
            {
              label: "Time to hire",
              value: "~2 weeks — confirmed by research participant",
              uxr: true,
            },
            {
              label: "Culture emphasis",
              value: "Team member culture fit is a stated priority in the process",
            },
          ],
        },
        {
          id: "target",
          displayName: "Target",
          logoUrl: "logos/target.png",
          initials: "T",
          accent: "#CC0000",
          tagline: "Big-box retail — guest advocate, style, fulfillment",
          highlightNameTerms: ["Target"],
          roleLine: "Guest advocate · style · fulfillment",
          squareMark: true,
          processSteps: [
            { text: "Apply on Target Careers website", highlightTerms: ["Target"] },
            { text: "Virtual job preview assessment (personality + situational)" },
            { text: "HireVue recorded video interview — 6 questions, 3 attempts each" },
            { text: "HR phone call to confirm availability" },
            { text: "Offer often made on the phone call itself; avg 13 days total" },
          ],
        },
        {
          id: "starbucks",
          displayName: "Starbucks",
          logoUrl: "logos/starbucks.png",
          initials: "SB",
          accent: "#00704A",
          tagline: "Café retail — barista, shift supervisor",
          roles: "Barista · part-time · shift roles",
          stepsSectionTitle: "Company hiring program — what’s unique to each",
          hiringFacts: [
            {
              label: "How to apply",
              value: "Starbucks career site — search for a specific store; applying to multiple stores increases chances",
            },
            {
              label: "Interview",
              value: "In-person with store manager or assistant manager — confirmed by two research participants",
              uxr: true,
            },
            {
              label: "Interview style",
              value: "Behavioral and STAR questions — multitasking, pressure, teamwork; product knowledge may come up",
              uxr: true,
            },
            {
              label: "Drug test",
              value: "No — confirmed by research participants",
              uxr: true,
            },
            {
              label: "Background check",
              value: "Yes — third party (First Advantage); initiated during interview",
              uxr: true,
            },
            {
              label: "After the interview",
              value: "Text message with next steps sent after interview",
              uxr: true,
            },
            {
              label: "Time to hire",
              value: "~2–3 weeks",
              uxr: true,
            },
          ],
        },
        {
          id: "home-depot",
          displayName: "Home Depot",
          logoUrl: "logos/home-depot.png",
          initials: "HD",
          accent: "#F96302",
          tagline: "Home improvement — cashier, lot, sales floor",
          roleLine: "Cashier · lot associate · sales associate",
          squareMark: true,
          processSteps: [
            { text: "Apply on Home Depot Careers; choose store location" },
            { text: "Online behavioral + customer service quiz during application" },
            { text: "Phone screen — availability and prior experience" },
            { text: "In-store interview with manager; 4–6 STAR questions" },
            { text: "Physical ability confirmed — can you lift 50 lbs?" },
            { text: "Background check required; avg 18 days to hire" },
          ],
        },
        {
          id: "kroger",
          displayName: "Kroger",
          logoUrl: "logos/kroger.png",
          initials: "K",
          accent: "#004985",
          tagline: "Grocery banners — front end, stock, deli",
          roleLine: "Cashier · stocker · deli associate",
          squareMark: true,
          processSteps: [
            { text: "Apply online or at an in-store hiring kiosk" },
            { text: "3-part assessment immediately after applying: personality + situational judgment + skills" },
            { text: "Phone or text screening within a few days" },
            { text: "In-person behavioral interview with store manager" },
            { text: "Background check required; no drug test for most store roles" },
          ],
        },
        {
          id: "chick-fil-a",
          displayName: "Chick-fil-A",
          logoUrl: "logos/chick-fil-a.png",
          initials: "CF",
          accent: "#E5162B",
          tagline: "Operator-owned QSR — front counter, kitchen",
          roles: "Team member · kitchen · delivery",
          stepsSectionTitle: "Company hiring program — what’s unique to each",
          hiringFacts: [
            {
              label: "How to apply",
              value: "Chick-fil-A career site, local store website, or paper application in person",
              uxr: true,
            },
            {
              label: "Interview",
              value: "Multiple interviews (2–3) starting with a phone screen, then in-person — confirmed by two research participants",
              uxr: true,
            },
            {
              label: "Interview style",
              value: "Character and values focus — ‘Second Mile Service’ framing; 20–30 min per round",
              uxr: true,
            },
            {
              label: "Shadow shift",
              value: "2-hour shadow shift as part of the process at some locations — confirmed by research participant",
              uxr: true,
            },
            {
              label: "Drug test",
              value: "No — confirmed by research participants",
              uxr: true,
            },
            {
              label: "Background check",
              value: "Yes — varies by franchise",
              uxr: true,
            },
            {
              label: "Time to hire",
              value: "~1–2 weeks",
              uxr: true,
            },
            {
              label: "Franchise note",
              value: "Every location is independently owned — process details vary by operator",
            },
          ],
        },
        {
          id: "dollar-general",
          displayName: "Dollar General",
          logoUrl: "logos/dollar-general.png",
          initials: "DG",
          accent: "#F5B800",
          initialsFg: "#1a1a1a",
          tagline: "Small-format discount — lean crews, key holders",
          roleLine: "Sales associate · lead · key holder",
          squareMark: true,
          processSteps: [
            { text: "Apply on Dollar General careers site" },
            { text: "Brief in-store interview with assistant manager or store manager" },
            { text: "Very small teams — you may work alone or with 1 other person" },
            { text: "Questions focus on reliability and cash handling" },
            { text: "Avg 12 days to hire; among the lowest difficulty ratings in this group" },
          ],
        },
      ],
      aiDesignGuidance: {
        headline: "AI Interview Design Guidance",
        personaLabel: "Low skilled — Customer facing",
        modalRecommendation: {
          primary: "Voice-first",
          fallback: "Text chat",
          rationale: "The real-world interview for this persona is a 10–15 minute informal manager conversation — not a form. Voice matches that expectation and removes the literacy and typing-speed barrier. Text fallback is required for noisy environments and accessibility.",
          fallbackTriggers: [
            "Candidate is in a loud environment (bus, street)",
            "Candidate declines microphone permission",
            "Device has no microphone capability",
            "Candidate switches to text mid-session — allow this without penalty"
          ]
        },
        sections: [
          {
            id: "session-design",
            title: "Session Design",
            icon: "clock",
            items: [
              {
                label: "Duration",
                guidance: "Target 8–12 minutes. This persona's real-world interview is 10–15 minutes at most. Exceeding 15 minutes will cause drop-off.",
                failureMode: "Sessions over 15 minutes see sharp drop-off. Candidates assume something is wrong or that they've failed."
              },
              {
                label: "Question count",
                guidance: "5–7 questions maximum. Lead with availability (it's the #1 real-world screen and signals respect for the candidate's time). Follow with 2–3 character/soft-skill questions, 1 situational, and close with a candidate question slot.",
                failureMode: "Asking role-knowledge questions before availability wastes everyone's time if the schedule doesn't match. Candidates also feel set up to fail."
              },
              {
                label: "Question order",
                guidance: "1. Availability and shift flexibility → 2. Reliability signal (transportation, consistency) → 3. Character/teamwork → 4. Handling pressure or a difficult customer → 5. Why this company or role. Do not open with 'Tell me about yourself' — this persona often hasn't rehearsed this and it creates immediate anxiety.",
                failureMode: "Opening with open-ended identity questions causes freezing and one-word answers, especially for first-time job seekers."
              },
              {
                label: "Pacing",
                guidance: "Allow 20–30 seconds of silence before the AI prompts again. Many candidates in this group are processing in a second language or thinking carefully. Jumping in too fast reads as hostile.",
                failureMode: "Premature re-prompting after 5–8 seconds causes candidates to feel rushed and give worse answers — or abandon the session."
              },
              {
                label: "Retakes",
                guidance: "Allow at least one retake per question, no explanation required. The real-world interview allows for restarts. An AI that doesn't is perceived as unfair.",
                failureMode: "No-retake design disproportionately penalises ESL speakers and first-time interviewees. Creates legal risk around disparate impact."
              }
            ]
          },
          {
            id: "tone-language",
            title: "Tone & Language",
            icon: "message",
            items: [
              {
                label: "Register",
                guidance: "Conversational and warm, not formal. The AI should sound like a friendly shift supervisor, not an HR system. Contractions are appropriate. Filler affirmations ('Great, thanks') are fine but should not be overdone — they feel hollow after the third question.",
                failureMode: "Formal or clinical tone causes candidates to believe they are being recorded for legal purposes and they self-censor, giving coached non-answers."
              },
              {
                label: "Reading / listening level",
                guidance: "Target Grade 6–8 reading level for any on-screen text. For voice prompts, keep questions under 25 words. Avoid idioms, jargon, and multi-part questions.",
                failureMode: "Multi-part questions ('Tell me about a time you handled a difficult customer AND what you learned from it') cause candidates to answer only the first part and feel penalised for it."
              },
              {
                label: "ESL considerations",
                guidance: "Offer language selection upfront — at minimum English and Spanish for this persona. The AI voice should speak at 85–90% of normal conversational speed. Do not penalise accent, hesitation, or grammatically non-standard answers in any scoring logic.",
                failureMode: "English-only with fast speech rate creates immediate dropout from Spanish-dominant candidates. This is a significant portion of the QSR workforce."
              },
              {
                label: "Handling silence",
                guidance: "If a candidate doesn't respond within 20 seconds, the AI should offer a simpler reframe of the same question — not repeat it verbatim. Example: 'No worries — let me put it a different way: can you work weekends?'",
                failureMode: "Verbatim repetition of an unanswered question reads as a malfunction. Candidates hang up or close the session."
              },
              {
                label: "Handling one-word answers",
                guidance: "Accept short answers as valid. Follow up with one gentle open prompt maximum ('Can you tell me a little more about that?'). If the candidate gives a second short answer, move on — do not probe a third time.",
                failureMode: "Aggressive follow-up probing on short answers feels like interrogation. This persona is accustomed to quick manager chats, not STAR-format drilling."
              }
            ]
          },
          {
            id: "question-design",
            title: "Question Design",
            icon: "list",
            items: [
              {
                label: "What to ask",
                guidance: "Availability and schedule flexibility. Reliability signals (how do you get to work, have you missed shifts before and why). Teamwork and getting along with others. Handling a stressed or upset customer. What draws them to this kind of work.",
                failureMode: null
              },
              {
                label: "What not to ask",
                guidance: "Do not ask questions that assume prior interview experience ('Walk me through your resume'). Do not ask questions that require multi-step narrative recall ('Describe a time when… and what was the outcome…'). Do not ask questions where the 'right' answer is obvious — this persona has been coached to game these and they produce no signal.",
                failureMode: "Obvious-answer questions ('Are you a team player?') produce 100% positive responses and give the scoring model nothing to work with."
              },
              {
                label: "Character over skills",
                guidance: "This persona is hired for reliability, attitude, and warmth — not job knowledge. Questions should surface those signals. Ask about showing up consistently, about handling a bad day, about working with someone difficult. Skills are trained on the floor — the AI should not test for them.",
                failureMode: "Skills-based questions ('Do you know how to operate a POS system?') disadvantage first-time applicants and create false negatives. They also don't predict retention."
              },
              {
                label: "Situational framing",
                guidance: "Use low-stakes, relatable scenarios — not abstract hypotheticals. 'If a customer was upset about their order, what would you do?' not 'Describe your conflict resolution philosophy.' Ground every question in something they've likely experienced.",
                failureMode: "Abstract hypotheticals cause freezing in candidates who haven't been exposed to formal interview formats. They assume they're being tricked."
              },
              {
                label: "Availability question design",
                guidance: "Make availability structured and explicit, not open-ended. Offer a grid or voice-navigable options (morning / afternoon / evening / overnight, weekdays / weekends). Don't ask 'What's your availability?' as an open question — the answer is unparseable.",
                failureMode: "Open availability questions produce answers like 'I'm pretty flexible' which cannot be matched to shift requirements programmatically."
              }
            ]
          },
          {
            id: "candidate-ux",
            title: "Candidate-Side UX",
            icon: "phone",
            items: [
              {
                label: "Entry point",
                guidance: "The session should be launchable from a text message link — this persona applies and gets contacted via SMS. The link should open directly into the experience with no account creation, no app download, and no login. One tap to begin.",
                failureMode: "Any friction before the session starts (sign-up, email verification, app store) causes abandonment. This cohort has low tolerance for pre-interview admin."
              },
              {
                label: "Setting expectations upfront",
                guidance: "Before the first question, tell the candidate: who the AI is, that this is not a human, how long it will take, that they can retake questions, and that a human will review their responses. Be explicit that the AI cannot make a hiring decision — humans do. This is both a trust signal and a legal best practice.",
                failureMode: "Candidates who don't know they're talking to an AI and discover it mid-session feel deceived. Drop-off and negative brand signal follow."
              },
              {
                label: "Mobile interface",
                guidance: "Design for a 375px viewport as the primary canvas. Voice waveform visualisation should be minimal and not data-heavy. Buttons should be 44px minimum tap target. Progress indicator (question 2 of 6) should always be visible. Avoid any interface element that requires scrolling to find.",
                failureMode: "Interfaces designed for desktop and scaled down lose the progress indicator and retake button below the fold — two of the highest-impact UX elements for this persona."
              },
              {
                label: "During the interview",
                guidance: "Show a live transcription of what the AI said — not the candidate's answer. This serves as a safety net for ESL candidates who missed a word. Keep it small and unobtrusive. Do not show the candidate's own transcript back to them in real time — it causes self-editing and worse answers.",
                failureMode: "Showing the candidate's own words back to them live causes them to stop mid-sentence to correct grammar. Answer quality drops significantly."
              },
              {
                label: "Closing the session",
                guidance: "End with a clear, human-sounding close: what happens next, when they might hear back, and a genuine thank-you. Do not end abruptly. Give the candidate a way to flag a technical issue. Do not promise a specific outcome.",
                failureMode: "Abrupt endings with no 'what happens next' cause candidates to assume they failed immediately and reach out to HR repeatedly, creating operational overhead."
              },
              {
                label: "Noisy / interrupted environment",
                guidance: "This persona interviews from home, transit, or outside. Design for background noise — the AI should not fail or penalise for ambient sound. If audio quality drops critically, offer a graceful switch to text without restarting the session.",
                failureMode: "Session failures due to background noise that require a full restart cause near-total abandonment. The candidate assumes the technical failure reflects on them."
              }
            ]
          },
          {
            id: "failure-modes",
            title: "Critical Failure Modes",
            icon: "warning",
            items: [
              {
                label: "Drop-off risks",
                guidance: "Any friction before session start. Sessions over 15 minutes. No retake option. Abrupt or unexplained session endings. Loss of audio requiring full restart. English-only with no language option.",
                failureMode: null
              },
              {
                label: "Bias risks",
                guidance: "Penalising accent or non-standard grammar in voice-to-text scoring. Penalising short answers without follow-up context. Skills-based questions that disadvantage first-time applicants. No retake policy that disproportionately impacts ESL speakers.",
                failureMode: null
              },
              {
                label: "Trust risks",
                guidance: "Not disclosing the AI upfront. Sounding too robotic or too uncannily human. Failing to say that a human makes the final decision. Not being clear about data retention or recording.",
                failureMode: null
              },
              {
                label: "Scoring model risks",
                guidance: "Training the scoring model on historical hires from this sector will encode existing bias — QSR hiring has well-documented demographic skew. Avoid using word choice, sentence length, or fluency as positive signals. Character and reliability are the valid signals — design the model to surface those specifically.",
                failureMode: null
              }
            ]
          }
        ]
      },
    },

    operations: {
      id: "operations",
      personaSubtitle:
        "Warehouse, gig, parcel, and contract services — online apply, physical screens, safety-first floor onboarding.",
      common: {
        richBadge: "Across 6 employers",
        richTitle: "Interview Process for Operations support persona",
        sharedHeadline: "What all 6 companies share",
        sharedCards: [
          {
            title: "Online application only",
            body: "All 6 require an online application. There is no walk-in hiring. Most jobs are found on Indeed or company careers sites.",
          },
          {
            title: "Background check universal",
            body: "Every company runs a background check with no exceptions across any role or location.",
          },
          {
            title: "Availability is a primary screen",
            body: "Shift coverage and schedule flexibility are asked of every candidate and often determine the job offer.",
          },
          {
            title: "No degree required",
            body: "Zero companies require a diploma or certification for entry-level operations support roles.",
          },
          {
            title: "Physical requirements confirmed",
            body: "All roles require lifting ability (typically 25–70 lbs) and the ability to stand for long periods.",
          },
          {
            title: "Fast timelines",
            body: "Hiring timelines range from 1 day (DoorDash) to approximately 3 weeks (Amazon, FedEx). Most are between 1–2 weeks.",
          },
          {
            title: "Low interview difficulty",
            body: "All companies rate between 1.4 and 2.0 on Glassdoor’s difficulty scale. Reliability and physical readiness are the primary filters.",
          },
          {
            title: "Orientation over training",
            body: "All companies use safety-focused onboarding videos and tours rather than skill-based training; learning happens on the floor.",
          },
        ],
        userProfilesHeadline:
          "User profiles — UserTesting (test 5993309, frontline operations)",
        userProfiles: [
          {
            pseudonym: "Googz",
            initials: "G",
            uxr: true,
            companyId: "ups",
            role: "Part-time package handler — fulfillment warehouse",
            discovery:
              "Friend who works there said they needed people; good fit for extra income outside a teaching job.",
            application: "Online portal via a link to the posting.",
            process:
              "Apply online → schedule interview → in-person interview → tour and shadow someone in a similar role before working solo.",
            backgroundCheck: "Yes",
            drugTest: "Yes",
            driversLicense: "Yes",
            timeToHire: "~2.5–3 weeks",
            interviewFocus:
              "One round, then training — discussed fit and role expectations.",
            other:
              "Moderator note: clear on steps; asked about weight they can lift (lbs). Hiring within the last 6 months.",
          },
          {
            pseudonym: "nkpm",
            initials: "nk",
            uxr: true,
            companyId: "doordash",
            role: "Dasher — part-time, on demand",
            discovery:
              "Word of mouth and social media; had applied years earlier when there was no local opening.",
            application: "DoorDash site; when the area opened, refreshed saved profile (insurance, license).",
            process:
              "All virtual — qualified and started without an in-person interview; ID and insurance verified.",
            processTags: ["No interview", "App / web"],
            backgroundCheck: "Yes",
            drugTest: "No",
            driversLicense: "Yes; vehicle insurance",
            timeToHire:
              "Long wait for an area slot; once open, onboarding was fast with account already on file.",
            other:
              "Moderator note: no in-person interview; occasional photo verification while delivering. Hiring within the last 6 months.",
          },
          {
            pseudonym: "niceness8000",
            initials: "ni",
            uxr: true,
            companyId: "doordash",
            role: "DoorDash delivery driver",
            discovery:
              "Uber/Lyft requirements were out of reach (own insured vehicle); DoorDash worked with a rental and a valid license.",
            application:
              "Started on the website; full application flow through the Dasher app.",
            process:
              "Background and license checks (often within ~48 hours), bank account for payouts — no hiring interview.",
            processTags: ["No interview", "Checks in ~48 hrs"],
            backgroundCheck: "Yes",
            drugTest: "No",
            driversLicense: "Yes",
            timeToHire:
              "~1 week including lining up a vehicle; could start the same day as approval if ready.",
            other:
              "Described long shifts when chasing earnings; pay varies by market, rank, and time of day.",
          },
          {
            pseudonym: "donhero",
            initials: "d",
            uxr: true,
            companyId: "ups",
            role: "Fulfillment & inventory manager — warehouse",
            discovery:
              "Had worked there very early in career, left; a former coworker brought the opening back when they were interested.",
            application: "Employer career site — role-specific application.",
            process:
              "Online app → short online assessment (reliability, fast-paced work) → pre-hire appointment (expectations, documents) → two rounds with HR/ops and senior ops (leadership, scenarios) → background check and I-9 → short safety training, then floor.",
            backgroundCheck: "Yes",
            drugTest: "Yes (drug screening recalled)",
            driversLicense: "Not required for this non-driving role",
            timeToHire: "~2–3 weeks",
            interviewFocus:
              "Team leadership, missed dispatch times, staffing shortages, workflow efficiency.",
            other:
              "Rose from picker/packer; ~5 months with company on this return (tenure split by earlier departure).",
          },
          {
            pseudonym: "Anusub2k",
            initials: "A",
            uxr: true,
            companyId: "amazon-fulfilment",
            role: "Parcel sort — inbound sort / conveyors (full-time)",
            discovery:
              "Amazon Careers and general job sites (e.g. Indeed); applied widely for something stable and quick to start.",
            application: "Amazon Careers — contact, eligibility, availability, document uploads.",
            process:
              "No formal interview; eligibility checklist (e.g. lifting), background check, drug test, then start date and first-day instructions.",
            processTags: ["No formal interview"],
            backgroundCheck: "Yes",
            drugTest: "Yes",
            driversLicense: "No — floor role, not driving",
            timeToHire: "~22 days from first contact to first day (stated in session)",
            other:
              "Scan and stage packages to bins/conveyors; help load/unload as needed; on feet, fast-paced.",
          },
          {
            pseudonym: "Prior44",
            initials: "P",
            uxr: true,
            companyId: "ups",
            role: "Package handler — load, unload, move freight (part-time)",
            discovery: "Indeed listing, then applied on the UPS careers page.",
            application: "Indeed → UPS careers (direct employer application).",
            process:
              "Online application → screening → virtual/in-person interview → drug test → job offer.",
            backgroundCheck: "Yes",
            drugTest: "Yes",
            driversLicense: "No — handler role",
            timeToHire: "Quick path — about two days of orientation then working",
            interviewFocus:
              "Short round: lifting ability, reliability, why UPS.",
            other: "~1 year with UPS at time of interview.",
          },
        ],
        atAGlance: [],
        phases: [],
        quotes: [],
      },
      companies: [
        {
          id: "amazon-fulfilment",
          displayName: "Amazon Fulfillment",
          logoUrl: "logos/amazon-fulfilment.png",
          initials: "AF",
          accent: "#FF9900",
          tagline: "Fulfillment center paths — high-volume fulfillment hiring",
          roles: "Fulfillment center associate, sorter, picker, packer",
          processSteps: [
            {
              text: "Apply on Amazon Jobs; shift selection is built into the application flow.",
            },
            {
              text: "Warehouse & Fulfillment Assessment: includes a test plus a ~20-minute Virtual Job Tryout.",
            },
            {
              text: "Typically no interview for entry-level roles — drug test and background check are the main gate.",
              uxr: true,
            },
            {
              text: "Drug test: yes; oral mouth swab often done on-site at orientation.",
              uxr: true,
            },
            {
              text: "Driver’s license: not required for non-driving floor roles.",
              uxr: true,
            },
            {
              text: "Time to hire: about 14–22 days — confirmed at ~22 days by research participant.",
              uxr: true,
            },
            {
              text: "A ~20-minute ‘Office Hours’ in-person appointment can replace a traditional interview.",
            },
          ],
        },
        {
          id: "doordash",
          displayName: "DoorDash (Dasher)",
          logoUrl: "logos/doordash.png",
          initials: "D",
          accent: "#FF3008",
          tagline: "Gig delivery — app-driven onboarding",
          roles: "Delivery driver, gig worker",
          processSteps: [
            {
              text: "Must use the Dasher mobile app to apply; the website alone is not sufficient.",
              uxr: true,
            },
            {
              text: "Area-based waitlist — applicants may wait months or years for their market to open.",
              uxr: true,
            },
            {
              text: "No interview — zero human contact; ID scans and automated checks only.",
              uxr: true,
            },
            {
              text: "Background check: yes; often completed within 48 hours.",
              uxr: true,
            },
            {
              text: "Drug test: not required.",
              uxr: true,
            },
            {
              text: "Driver’s license plus vehicle insurance required.",
              uxr: true,
            },
            {
              text: "Bank account required upfront for payment routing.",
              uxr: true,
            },
            {
              text: "Time to hire: 2–3 days once an area opens; can start the same day as approval.",
              uxr: true,
            },
          ],
        },
        {
          id: "ups",
          displayName: "UPS",
          logoUrl: "logos/ups.png",
          initials: "U",
          accent: "#FFB81C",
          initialsFg: "#1a1a1a",
          tagline: "Package network — preload and warehouse",
          roles: "Package handler, warehouse worker",
          processSteps: [
            {
              text: "Apply on UPS Jobs — often discovered via Indeed first.",
              uxr: true,
            },
            {
              text: "One structured in-person or virtual interview round.",
              uxr: true,
            },
            {
              text: "Typical questions: lifting ability, reliability, why UPS — short and direct.",
              uxr: true,
            },
            {
              text: "Drug test: required.",
              uxr: true,
            },
            {
              text: "Background check: yes for all hires.",
              uxr: true,
            },
            {
              text: "Driver’s license: not required for handler roles.",
              uxr: true,
            },
            {
              text: "Onboarding: facility tour and job shadow before solo work.",
              uxr: true,
            },
            {
              text: "Time to hire: about 1–2 weeks; orientation spans 2 days.",
              uxr: true,
            },
          ],
        },
        {
          id: "fedex",
          displayName: "FedEx",
          logoUrl: "logos/fedex.png",
          initials: "FX",
          accent: "#4D148C",
          tagline: "Express / Ground / Freight — sort and handler paths",
          roles: "Package handler, warehouse worker",
          processSteps: [
            { text: "Apply via FedEx Careers only; application requires a 10-year job history." },
            { text: "Optional personality and behavior assessment after application." },
            { text: "Interview: inconsistent — handlers often get no interview, just a phone call offering a shift choice." },
            { text: "Drug test: random for handlers; required for driver/courier roles." },
            { text: "Background check: yes; can take up to a week." },
            { text: "Brief facility tour sometimes substitutes for a formal interview." },
            { text: "Time to hire: ~12 days average for handlers; up to ~3 weeks overall." },
          ],
        },
        {
          id: "compass-group",
          displayName: "Compass Group",
          logoUrl: "logos/compass-group.png",
          initials: "CG",
          accent: "#0085CA",
          tagline: "Contract food & support services at sites and institutions",
          roles: "Station prep, cafeteria staff, food service",
          processSteps: [
            { text: "Apply through the Compass Group careers portal only; an email address is required." },
            { text: "Indeed is the most common discovery channel, followed by employee referrals." },
            { text: "Interview: phone or in-person with HR and hiring manager; some candidates hired on the spot at recruitment fairs." },
            { text: "Online assessment sometimes included after application." },
            { text: "Background check: yes — via First Advantage, includes SSN trace (often 1–3 weeks)." },
            { text: "Drug test: yes; varies by state and client site." },
            { text: "Operates under many sub-brands (Chartwells, Eurest, etc.) — postings and branding vary by contract." },
          ],
        },
        {
          id: "abm-industries",
          displayName: "ABM Industries",
          logoUrl: "logos/abm-industries.png",
          initials: "A",
          accent: "#003DA5",
          tagline: "Facilities services — janitorial and porter teams",
          roles: "Janitor, cleaner, day porter, custodian",
          processSteps: [
            { text: "Apply at abm.com/careers only — do not rely on third-party job sites." },
            { text: "Group hiring events: sometimes 50–100 applicants processed together in one session." },
            { text: "Drug test: yes; oral mouth swab often administered live during the group session." },
            { text: "Background check: yes — standard process." },
            { text: "Typical questions: transportation, shift availability, prior cleaning experience — short and direct." },
            { text: "Time to hire: average 11–15 days; ~45% receive an offer within 1–3 days of the interview." },
            { text: "Staffing agency placement is common — many workers are placed via third-party agencies." },
          ],
        },
      ],
      aiDesignGuidance: {
        headline: "AI Interview Design Guidance",
        personaLabel: "Low skilled — Operations support",
        modalRecommendation: {
          primary: "Video (avatar-led)",
          fallback: "Voice-only",
          rationale: "This persona's real-world process ranges from fully automated (no human contact) to a single structured in-person round. A video avatar interviewer adds a human signal that automated-only flows lack, while keeping the session short and efficiency-focused. Voice-only fallback covers candidates on low-end devices or in environments where camera use isn't practical.",
          fallbackTriggers: [
            "Candidate declines camera permission",
            "Device has no front-facing camera",
            "Candidate is in a shared or public space and requests audio-only",
            "Camera connection drops mid-session — continue in voice-only without restarting"
          ]
        },
        sections: [
          {
            id: "session-design",
            title: "Session Design",
            icon: "clock",
            items: [
              {
                label: "Duration",
                guidance: "Target 6–10 minutes. This persona's real-world interview — where one exists — is short and direct. The AI session should feel like an efficient eligibility confirmation, not a formal interview. For roles like DoorDash or Amazon entry-level, candidates expect near-instant decisions.",
                failureMode: "Sessions that feel longer than necessary signal to this persona that the role is more complex or demanding than expected — causing withdrawal before offer."
              },
              {
                label: "Session structure",
                guidance: "Run in two clear phases. Phase 1 (2–3 min): automated eligibility checks — right to work, physical requirements confirmation, shift availability, drug test consent where applicable. Phase 2 (4–6 min): short structured interview — reliability, physical readiness, why this role. The avatar should narrate the transition between phases explicitly: 'Great, the eligibility checks are done — I have a few short questions for you now.'",
                failureMode: "Blending eligibility checks and interview questions without signalling the shift confuses candidates who expect a binary pass/fail on requirements before any conversation begins."
              },
              {
                label: "Question count",
                guidance: "3–5 interview questions maximum after eligibility checks. Focus: reliability and attendance history, physical capability confirmation, availability and shift flexibility, basic safety awareness. Do not ask more than one question per topic.",
                failureMode: "Over-questioning this persona signals distrust. These candidates know the bar is low and interpret excess questioning as a sign the role has been misrepresented."
              },
              {
                label: "Pacing",
                guidance: "Move efficiently. This persona responds well to a brisk, respectful pace — they are often juggling multiple applications simultaneously. Allow 15–20 seconds of silence before re-prompting. Do not linger on affirmations between questions.",
                failureMode: "Slow pacing reads as a system malfunction to candidates who are used to automated flows. Dropout spikes when sessions feel stalled."
              },
              {
                label: "Retakes",
                guidance: "Allow one retake per question. Keep the retake prompt brief and non-judgmental: 'No problem — want to try that one again?' Do not require a reason.",
                failureMode: "No retake option disproportionately penalises candidates answering in non-primary languages or in noisy home environments — common for this persona."
              }
            ]
          },
          {
            id: "tone-language",
            title: "Tone & Language",
            icon: "message",
            items: [
              {
                label: "Avatar tone",
                guidance: "Configure the avatar as direct, efficient, and respectful — not warm and conversational. This persona reads excessive warmth as performative. The avatar should feel like a competent HR coordinator running an efficient onboarding call, not a friendly retail manager.",
                failureMode: "Overly warm or casual avatar tone creates a mismatch with the role context. Warehouse and logistics candidates have often been through automated flows and find unexpected warmth suspicious."
              },
              {
                label: "Language level",
                guidance: "Keep all questions under 20 words. Use plain language — no HR jargon. Avoid 'behavioural' framing ('Tell me about a time when…') — this persona is not prepared for STAR-format responses and doesn't need to be. Ask direct situational questions instead.",
                failureMode: "STAR-format questions cause this persona to freeze or give one-word answers, which then score poorly — creating false negatives for candidates who would perform well in the role."
              },
              {
                label: "ESL and multilingual",
                guidance: "Offer language selection before the session begins. Spanish is the minimum second language for US operations roles. The avatar's speech rate should be set to 85–90% of normal. Do not penalise non-standard grammar or accent in any scoring logic.",
                failureMode: "English-only sessions exclude a significant portion of the warehouse and logistics workforce. This is both an operational and legal risk."
              },
              {
                label: "Handling short answers",
                guidance: "Accept short, direct answers — this persona gives them naturally and they are often sufficient. Follow up once if clarification is genuinely needed. Do not probe for elaboration on eligibility or physical capability answers.",
                failureMode: "Probing for elaboration on straightforward answers ('Can you lift 50 lbs?' — 'Yes.' — 'Can you tell me more about that?') reads as absurd to this persona and damages trust in the process."
              }
            ]
          },
          {
            id: "question-design",
            title: "Question Design",
            icon: "list",
            items: [
              {
                label: "Eligibility check questions",
                guidance: "Right to work confirmation. Physical requirements — lifting threshold (role-specific), ability to stand for extended periods. Shift availability — structured options, not open-ended. Drug test consent where legally required. Background check consent. These should feel administrative, not evaluative.",
                failureMode: null
              },
              {
                label: "Interview questions",
                guidance: "Attendance and reliability: 'Is there anything that might regularly affect your ability to get to work on time?' Safety awareness: 'Have you worked in a warehouse or delivery role before? What's the most important safety rule you followed?' Motivation: 'What's drawing you to this kind of work right now?' Keep all questions grounded and concrete.",
                failureMode: null
              },
              {
                label: "What not to ask",
                guidance: "Do not ask questions that require narrative recall or multi-step answers. Do not ask about career goals or five-year plans — this persona is applying for immediate income, not a career path. Do not ask skills-based questions that assume prior role-specific training.",
                failureMode: "Career-framing questions ('Where do you see yourself in 5 years?') create friction and feel tone-deaf for a candidate applying for a package handler role. Dropout risk increases."
              },
              {
                label: "Availability question design",
                guidance: "Present shift options visually or as explicit voice-navigable choices — morning / afternoon / evening / overnight, weekdays / weekends / both. Confirm willingness to work mandatory overtime where applicable. Do not ask 'What's your availability?' as an open question.",
                failureMode: "Open availability questions produce unparseable answers. The eligibility check fails programmatically even when the candidate is a match."
              }
            ]
          },
          {
            id: "candidate-ux",
            title: "Candidate-Side UX",
            icon: "phone",
            items: [
              {
                label: "Entry point",
                guidance: "Session must be launchable via SMS link — this is the primary contact channel for operations hiring. No account creation, no app download, no login required. One tap to enter the video session. Camera and microphone permission prompts should be handled gracefully with a plain-language explanation of why they're needed.",
                failureMode: "Any pre-session friction causes abandonment. This persona is applying to multiple roles simultaneously and will move on immediately if the process feels complicated."
              },
              {
                label: "Avatar introduction",
                guidance: "The avatar should open with a brief, clear introduction: her name, that she is an AI interviewer, that this is not a human, how long the session will take, and that a human will review the results. Then immediately signal the two-phase structure: eligibility checks first, then a few short questions.",
                failureMode: "Candidates who don't know they're talking to an AI and discover it mid-session feel deceived. For this persona, that distrust extends to the employer brand — not just the technology."
              },
              {
                label: "Progress visibility",
                guidance: "Show a clear phase indicator and question counter at all times — 'Eligibility check 2 of 3' and 'Question 1 of 4'. This persona responds well to visible progress. The end should feel earned and predictable.",
                failureMode: "No progress indicator causes candidates to abandon sessions they assume are longer than they are. This is especially acute for candidates completing sessions between shifts or during a commute."
              },
              {
                label: "Camera setup guidance",
                guidance: "Before the session starts, show a brief camera check screen — confirm the candidate is visible, lighting is adequate, and audio is working. Keep this to 30 seconds maximum. Do not make it feel like a technical test.",
                failureMode: "Candidates who appear in poor lighting or out of frame for the entire session may be disadvantaged if any human reviewer sees the recording. A 30-second check prevents this."
              },
              {
                label: "Closing the session",
                guidance: "End with a clear summary: what was covered, what happens next, and a realistic timeline. For roles like Amazon or FedEx where decisions are fast, be specific ('You'll receive an update within 2 business days'). Do not leave the candidate uncertain about whether their session was received.",
                failureMode: "Vague session endings cause candidates to reapply, contact HR directly, or assume failure — all of which create operational overhead."
              }
            ]
          },
          {
            id: "failure-modes",
            title: "Critical Failure Modes",
            icon: "warning",
            items: [
              {
                label: "Drop-off risks",
                guidance: "Any pre-session friction. Sessions that blur eligibility checks and interview questions without signalling the transition. Progress indicators that are absent or inaccurate. Vague session endings. Avatar tone that feels mismatched to the role context.",
                failureMode: null
              },
              {
                label: "Bias risks",
                guidance: "Penalising short or direct answers that are factually sufficient. Scoring fluency or elaboration as proxies for capability in physical roles. English-only sessions that exclude non-primary English speakers. Any visual scoring of candidate appearance from video.",
                failureMode: null
              },
              {
                label: "Trust risks",
                guidance: "Not disclosing the AI avatar upfront. Avatar warmth that feels inconsistent with the role type. Failing to confirm that a human reviews the output. Lack of clarity on what data is recorded and retained.",
                failureMode: null
              },
              {
                label: "Scoring model risks",
                guidance: "Do not use answer length, vocabulary complexity, or response latency as positive signals for this persona. Reliability and physical readiness are the valid hiring signals. Train the model to weight availability match, attendance history answers, and safety awareness — not communication style.",
                failureMode: null
              }
            ]
          }
        ]
      },
    },

    technician: {
      id: "technician",
      personaSubtitle:
        "Hourly workers promoted internally to supervisory or technical roles — not external hires. Amazon, Walmart, UPS, Target, Tyson.",
      common: {
        richBadge: "Across 5 companies",
        richTitle: "Technician / Supervisor persona — interview playbook",
        sharedHeadline: "What all companies share",
        sharedCards: [
          {
            title: "Manager tap is the pipeline",
            body: "5 of 7 UXR participants heard about the role from their manager first. The internal job board is secondary — the nomination conversation is where the process really starts.",
          },
          {
            title: "Conflict resolution — every time",
            body: "Asked of all 7 participants, regardless of company. Even where the STAR format isn't named explicitly, interviewers always ask for specific past examples and hypothetical conflict scenarios.",
          },
          {
            title: "1 year + clean record",
            body: "~1 year tenure minimum confirmed across all participants. Amazon sets the most specific bar: 4.5 / 5.0 performance rating average minimum.",
          },
          {
            title: "Scenario prep is the gap",
            body: "Multiple participants were caught off guard by hypothetical scenario questions — not job knowledge questions. The prep gap is STAR practice, not role familiarity.",
          },
          {
            title: "Internal still feels like external",
            body: "Multiple participants said the process felt as structured as an external-hire interview. Assuming 'they already know me' leaves internal candidates underprepared.",
          },
          {
            title: "2 rounds — 2–4 weeks",
            body: "5 of 7 participants had 2 rounds. Typical timeline: 2–4 weeks. 3 rounds is the exception. One informal conversation is possible at flatter organizations.",
          },
          {
            title: "Promotion letter or standing offer",
            body: "Amazon issues an 'incline' (valid for 12 months at any fulfillment center). Walmart and Target issue a formal promotion letter. UPS issues a pay-grade change via the collective bargaining agreement (CBA).",
          },
          {
            title: "Learn-by-doing onboarding",
            body: "Compliance / HR modules are universal but brief. Most participants said some version of 'I already knew the job, so I just started.' Formal leadership development programs are rare.",
          },
        ],
        userProfiles: [
          {
            pseudonym: "RationalYak2468",
            initials: "RY",
            uxr: true,
            companyId: "amazon-process-assistant",
            role: "Team Lead",
            discovery: "Manager nominated after observed performance",
            application: "Internal portal (Workday or equivalent)",
            process: "3 rounds over ~6 weeks. Behavioral + hypothetical questions.",
            timeToHire: "~6 weeks (3 rounds — high end)",
            interviewFocus: "Behavioral and hypothetical scenarios; conflict resolution training. Wished he'd practiced thinking on his feet for ad-hoc questions.",
            other: "26, male, $80–99k. Note: listed as full-time student in demographics — weight qualitatively.",
          },
          {
            pseudonym: "Peckieh",
            initials: "Pe",
            uxr: true,
            companyId: "walmart-coach",
            role: "Team Lead",
            discovery: "Another TL recommended her to the manager after someone left the role",
            application: "Internal portal after manager conversation",
            process: "1-yr tenure + clean record required. Interviewed by manager + 2 dept managers. Shadowed outgoing TL for 2 weeks.",
            timeToHire: "Not specified",
            interviewFocus: "Hypothetical scenarios: customer handling, employee conflicts, task allocation.",
            other: "28, female, $20–39k. Note: listed as full-time student. Wished she'd researched the role's actual hours and schedule impact before accepting.",
          },
          {
            pseudonym: "Lrichxx",
            initials: "Lr",
            uxr: true,
            companyId: "walmart-coach",
            role: "Team Lead — Health/Wellness, HR",
            discovery: "Saw role posted on the internal careers page; also had store-level awareness",
            application: "Internal careers portal",
            process: "1-yr min + no disciplinary issues + leadership training prereqs. 2 rounds: hiring manager, then store manager.",
            timeToHire: "~2–3 weeks",
            interviewFocus: "'Walk in and what do you notice?' floor observation prompt. Customer service + cash handling scenarios. Process felt more formal than expected for an internal candidate.",
            other: "33, female, $125–149k. Solid profile. Wished she'd prepared more STAR scenarios for hypotheticals.",
          },
          {
            pseudonym: "dugpa",
            initials: "du",
            uxr: true,
            companyId: "tyson-supervisor",
            role: "Operations Supervisor — Food Production",
            discovery: "Founders approached him when his boss was relocated; role contingent on finishing supply chain degree",
            application: "No formal application — leadership conversations over 6 months",
            process: "No formal interview — conversations with founders and new COO during restructuring. Degree + PCQI/SQF training were the qualifications.",
            timeToHire: "~6 months (company restructuring — outlier)",
            interviewFocus: "No traditional interview. Offer tied to finishing supply chain degree.",
            other: "48, male, $60–79k. Outlier: small-company restructuring, not a standard promotion path. Hit the ground running with no formal onboarding.",
          },
          {
            pseudonym: "TESTER121997",
            initials: "TE",
            uxr: true,
            companyId: "walmart-coach",
            role: "Department Supervisor",
            discovery: "Manager flagged position; also posted on internal careers page",
            application: "Internal portal + manager endorsement",
            process: "5-yr tenure, solid ratings, leadership/compliance/systems training required. 3 conversations over 3 weeks: manager + dept leader → HR (comp/policies) → waiting period.",
            timeToHire: "~3 weeks",
            interviewFocus: "Leadership examples + hypothetical scenarios. Format felt fully structured — as formal as an external hire process, which was the biggest surprise.",
            other: "29, female, $40–59k. Solid profile. Wished she'd known the leadership-example focus and who she'd be meeting with in advance.",
          },
          {
            pseudonym: "King_",
            initials: "Ki",
            uxr: true,
            companyId: "target-team-leader",
            role: "Team Lead — Security",
            discovery: "Saw a paper poster in the staff locker room",
            application: "Applied through standard channel after seeing the posting",
            process: "2 rounds: store manager interview, then district manager group interview. Only a few candidates reached round 2.",
            timeToHire: "~2–3 weeks",
            interviewFocus: "Security-specific scenarios: awareness, staff compliance, rules enforcement. Wished he'd known the scenario questions in advance — especially for the district-level round.",
            other: "27, male, $80–99k. Flag: listed as self-employed in demographics. Treat as qualitative.",
          },
          {
            pseudonym: "TreborZ",
            initials: "Tr",
            uxr: true,
            companyId: "amazon-process-assistant",
            role: "Team Lead",
            discovery: "Manager approached based on observed performance, focus, and teamwork",
            application: "Manager-led; minimal formal application step",
            process: "1 conversation with manager, then approval from manager's boss. 2 weeks total. Requirements: 6 months tenure + 4.5/5.0 average performance rating.",
            timeToHire: "~2 weeks",
            interviewFocus: "Hypothetical scenarios, career goals, 5-yr/10-yr plans. Appreciated the company's expressed interest in his long-term career path.",
            other: "57, male, $100–124k. Solid profile (caveat: listed as self-employed). Post-hire: online HR policy training only — no structured onboarding program.",
          },
        ],
        atAGlance: [],
        phases: [],
        quotes: [],
      },
      companies: [
        {
          id: "amazon-process-assistant",
          displayName: "Amazon (Process Assistant)",
          initials: "A",
          accent: "#FF9900",
          initialsFg: "#1a1a1a",
          tagline: "L3 warehouse associate promoted to L4 floor supervisor",
          roles: "Process Assistant (L4), Area Manager path",
          stepsSectionTitle: "Promotion process",
          processSteps: [
            {
              text: "Manager nominates based on observed performance — the internal job board is secondary. Most candidates hear about the opening directly from their manager.",
              uxr: true,
            },
            {
              text: "HR eligibility check: minimum 6 months tenure + 4.5/5.0 average performance rating. Any active disciplinary issues are disqualifying.",
              uxr: true,
            },
            {
              text: "Behavioral interview — 1 to 2 rounds. Questions test Leadership Principles by name; conflict resolution and hypothetical scenarios are central.",
              uxr: true,
            },
            {
              text: "Mock area tour: candidate walks the interviewer through a floor process as if already in the role.",
              uxr: true,
            },
            {
              text: "'Incline' issued — a standing offer usable at any Amazon fulfillment center within 12 months.",
              uxr: true,
            },
          ],
        },
        {
          id: "walmart-coach",
          displayName: "Walmart (Coach / Team Lead)",
          initials: "W",
          accent: "#0071DC",
          tagline: "Hourly associate promoted to department coach or team lead",
          roles: "Coach, Team Lead, department manager",
          stepsSectionTitle: "Promotion process",
          processSteps: [
            {
              text: "Associate self-applies via Workday or is nominated by the store manager. Peer recommendations from existing team leads also occur.",
              uxr: true,
            },
            {
              text: "Prerequisites: ~1 year tenure, clean record, no disciplinary issues. Leadership and compliance training modules required before eligibility.",
              uxr: true,
            },
            {
              text: "Round 1 with hiring manager: behavioral and hypothetical scenarios — customer handling, conflict resolution, task allocation. A common prompt: 'Walk in and what do you notice?' — testing floor awareness.",
              uxr: true,
            },
            {
              text: "Round 2 with store manager or district manager. The process feels as structured as an external hire — the most common surprise among internal candidates.",
              uxr: true,
            },
            {
              text: "Formal promotion letter issued after district/market leadership approval.",
              uxr: true,
            },
          ],
        },
        {
          id: "ups-supervisor",
          displayName: "UPS (Preload Supervisor)",
          logoUrl: "logos/ups.png",
          initials: "U",
          accent: "#FFB81C",
          initialsFg: "#1a1a1a",
          tagline: "Package handler promoted to shift supervisor",
          roles: "Preload Supervisor, Air Supervisor",
          stepsSectionTitle: "Promotion process",
          processSteps: [
            { text: "Internal application via UPS HR portal; manager endorsement is standard." },
            { text: "HR eligibility check: tenure, attendance record, and performance metrics." },
            { text: "Joint interview with HR and an operations manager. STAR-format questions." },
            { text: "Pay-grade change letter issued through the collective bargaining agreement (CBA) upon acceptance." },
          ],
        },
        {
          id: "target-team-leader",
          displayName: "Target (Team Leader)",
          logoUrl: "logos/target.png",
          initials: "T",
          accent: "#CC0000",
          squareMark: true,
          tagline: "Sales associate promoted to inbound or sales floor team lead",
          roles: "Team Leader — Inbound, Sales Floor, GM",
          stepsSectionTitle: "Promotion process",
          processSteps: [
            {
              text: "Apply on Target's internal careers portal; manager endorsement expected.",
              uxr: true,
            },
            {
              text: "HR eligibility check: 2–4 years tenure, performance rating, availability.",
              uxr: true,
            },
            {
              text: "Round 1 with store manager; round 2 with district manager — only a few candidates reach the second round.",
              uxr: true,
            },
            {
              text: "'Tell me about your store' walk-through: candidate narrates department conditions and priorities as if already in the role.",
              uxr: true,
            },
            {
              text: "Security-specific scenario questions at round 2 — awareness, staff compliance, rules enforcement.",
              uxr: true,
            },
            {
              text: "Promotion letter issued; new compensation tier takes effect at the start of the next pay cycle.",
              uxr: true,
            },
          ],
        },
        {
          id: "tyson-supervisor",
          displayName: "Tyson (Production Supervisor)",
          initials: "TY",
          accent: "#C0392B",
          tagline: "Line worker promoted to shift supervisor in a food processing plant",
          roles: "Production Supervisor, Shift Lead",
          stepsSectionTitle: "Promotion process",
          processSteps: [
            {
              text: "Started on the production line; supervisory role opened internally after 3–6 years.",
              uxr: true,
            },
            {
              text: "OSHA training and food safety certification required before eligibility.",
              uxr: true,
            },
            {
              text: "No formal interview in at least one observed case — offer came through leadership conversations during a company restructuring, tied to finishing a supply chain degree.",
              uxr: true,
            },
            {
              text: "Safety record is heavily scrutinized — any OSHA incidents are a significant disqualifier.",
            },
            {
              text: "Formal promotion to salaried supervisor role; shift responsibility assigned immediately.",
              uxr: true,
            },
          ],
        },
      ],
      aiDesignGuidance: {
        headline: "AI Interview Design Guidance",
        personaLabel: "Technician / Supervisor — Internal Promotions",
        modalRecommendation: {
          primary: "Video (avatar-led)",
          fallback: "Voice-only",
          rationale: "This is a structured, formal process — even for internal candidates. The research shows candidates are consistently surprised by how formal the promotion interview feels. A video avatar matches that formality and signals to the candidate that this is a real evaluation, not a rubber stamp. Two modes are required: data-enriched (AI has access to performance data and tenure) and cold (no prior context available).",
          fallbackTriggers: [
            "Candidate is on a work device that blocks camera access",
            "Candidate declines camera mid-session — continue in voice-only",
            "Integration with HRIS is unavailable — switch to cold mode automatically"
          ]
        },
        sections: [
          {
            id: "session-design",
            title: "Session Design",
            icon: "clock",
            items: [
              {
                label: "Duration",
                guidance: "Target 20–30 minutes. This persona goes through 2 rounds in the real world over 2–4 weeks. The AI session should feel like a credible first round — substantive enough to be taken seriously, not so long that it feels like a final panel. A session under 15 minutes will be perceived as not thorough enough for a promotion decision.",
                failureMode: "Sessions that feel perfunctory undermine the candidate's confidence in the process and the outcome. Internal candidates who feel under-evaluated are more likely to disengage after a rejection."
              },
              {
                label: "Two operating modes",
                guidance: "Data-enriched mode: The avatar opens by acknowledging the candidate's context — tenure, role, manager nomination, performance signal. Example: 'I can see you've been with the team for 18 months and your manager highlighted your work on floor efficiency. I'd like to build on that today.' Cold mode: The avatar opens without any prior context and runs a standard structured behavioural interview. UXDs must design both entry paths — the session should detect which mode it is in before the first question and adapt the opening accordingly.",
                failureMode: "Defaulting to cold mode when data is available wastes the personalisation opportunity and feels impersonal to a candidate who expects their record to be visible. Defaulting to data-enriched mode with incorrect or stale data is worse — it creates immediate distrust."
              },
              {
                label: "Question structure",
                guidance: "Open with role context and acknowledgement (data-enriched) or brief orientation (cold). Then: 2 behavioural questions grounded in past experience, 2 hypothetical scenario questions (conflict resolution, floor decision under pressure), 1 leadership vision question, 1 candidate question slot. Total: 6–7 questions.",
                failureMode: "Skipping hypothetical scenario questions is the most common design gap for this persona. The research shows scenario questions are where candidates are most frequently caught off guard — and where the AI can add the most value in preparation and evaluation."
              },
              {
                label: "Pacing",
                guidance: "Allow 30–45 seconds of silence on hypothetical and scenario questions — these require genuine thought. Do not re-prompt before 30 seconds. On behavioural questions, allow 20 seconds. The avatar should signal patience visually — a calm, attentive expression, not a frozen or loading state.",
                failureMode: "Premature re-prompting on scenario questions produces shallow answers and disadvantages candidates who think carefully before speaking — often the stronger candidates."
              },
              {
                label: "Retakes",
                guidance: "Allow one retake per question. For this persona, frame it professionally: 'Take your time — would you like to revisit that?' Do not make retakes feel like a second chance at a test — frame them as a normal part of a thoughtful conversation.",
                failureMode: "No-retake design penalises candidates who articulate well on reflection but not under immediate pressure — a poor proxy for supervisory performance."
              }
            ]
          },
          {
            id: "tone-language",
            title: "Tone & Language",
            icon: "message",
            items: [
              {
                label: "Avatar tone",
                guidance: "Configure the avatar as professional, measured, and respectful — not warm or casual. This is a promotion interview, not an onboarding call. The avatar should feel like a credible senior HR business partner or a respected operations leader. Recruiters should select an avatar template that reads as experienced and composed.",
                failureMode: "A casual or overly friendly avatar tone undermines the perceived legitimacy of the evaluation. Internal candidates who feel the AI isn't taking the process seriously will not take it seriously either."
              },
              {
                label: "Data-enriched personalisation",
                guidance: "In data-enriched mode, the avatar should reference specific data points early and naturally — not as a list read-out. Weave tenure, role, and nomination context into the opening and into question framing. Example: 'Given that you've been managing the inbound sort team, how would you approach a situation where…' This signals that the session is genuinely personalised.",
                failureMode: "Generic questions after a personalised opening break the immersion and signal that the data integration was superficial — eroding trust in the process."
              },
              {
                label: "Language level",
                guidance: "Use professional but plain language. Avoid corporate jargon. Questions should be specific and grounded — not abstract. 'Walk me through how you handled a situation where two team members were in conflict' not 'Describe your conflict resolution philosophy.'",
                failureMode: "Abstract questions produce abstract answers that give the scoring model nothing concrete to evaluate. This persona knows their job — ask about it specifically."
              },
              {
                label: "Handling unprepared candidates",
                guidance: "The research shows many internal candidates are caught off guard by the formality of scenario questions. If a candidate gives a very short or clearly unprepared answer to a scenario question, the avatar should offer a structured prompt: 'Let me ground that a bit more — imagine it's a Tuesday morning, you're short-staffed, and two of your team members have a public disagreement on the floor. What do you do first?' One re-frame maximum.",
                failureMode: "Accepting a non-answer on a scenario question and moving on produces a false negative. The candidate may be fully capable — they just haven't been exposed to this format."
              }
            ]
          },
          {
            id: "question-design",
            title: "Question Design",
            icon: "list",
            items: [
              {
                label: "Behavioural questions",
                guidance: "Ground these in the candidate's actual work context. In data-enriched mode, reference their role explicitly. Ask about: a time they took initiative beyond their current role, a time they handled a difficult team dynamic, a time they identified and fixed a process problem. Keep STAR framing implicit — do not name it.",
                failureMode: null
              },
              {
                label: "Scenario questions",
                guidance: "These are the highest-signal questions for this persona. Design scenarios that are: specific to the promotion role, grounded in realistic floor or team situations, resolvable in multiple valid ways. Examples: staffing shortage mid-shift, missed dispatch target, two team members in public conflict, a safety rule being ignored by a peer. Always set the scene fully before asking the question.",
                failureMode: "Vague scenario questions ('What would you do if there was a conflict on your team?') produce generic answers. Specific scenarios ('It's 6am, you're one person short, and your fastest picker just walked off the floor mid-shift') produce evaluable ones."
              },
              {
                label: "Leadership vision question",
                guidance: "Close the interview questions with one forward-looking question. In data-enriched mode: 'In this new role, what's the first thing you'd want to change or improve about how the team operates?' In cold mode: 'What does good leadership look like to you in a role like this?' This gives the candidate a chance to articulate motivation — a key retention signal.",
                failureMode: null
              },
              {
                label: "What not to ask",
                guidance: "Do not ask questions that could be answered by reading the job description. Do not ask about career plans beyond the role being applied for — this creates anxiety about overqualification. Do not ask about compensation expectations — this is handled by HR after selection.",
                failureMode: "Job-description questions ('What are the responsibilities of a Process Assistant?') signal that the AI hasn't been configured for this role. Candidates lose confidence in the evaluation."
              }
            ]
          },
          {
            id: "candidate-ux",
            title: "Candidate-Side UX",
            icon: "phone",
            items: [
              {
                label: "Entry point",
                guidance: "Internal candidates should access the session via a link in their company email or HRIS notification — not SMS. The session should open with the candidate's name and role pre-populated. In data-enriched mode, show a brief summary of what context the AI has access to before the session begins — this builds trust and sets expectations.",
                failureMode: "Internal candidates who don't know what data the AI has access to will spend the first few minutes of the session testing whether it knows them — wasting question time and creating an adversarial dynamic."
              },
              {
                label: "Pre-session context screen",
                guidance: "Before the avatar appears, show a screen that states: what the session covers, how long it will take, that answers will be reviewed by a human hiring manager, and — in data-enriched mode — a plain-language summary of what information the AI has been given ('Your tenure, performance rating, and your manager's nomination note'). Give the candidate a moment to prepare.",
                failureMode: "Starting the video session with no pre-session orientation causes candidates to feel ambushed. The research shows internal candidates already feel the process is more formal than expected — a cold start amplifies that."
              },
              {
                label: "Two-way video setup",
                guidance: "Run a brief camera and audio check before the avatar appears. For this persona, frame it as professional preparation: 'Let's make sure your setup looks good before we begin.' Confirm framing, lighting, and audio. This also signals that the video recording matters — which it does for the human reviewer.",
                failureMode: "Poor video quality in the recording disadvantages candidates during human review, even when the AI scoring is unaffected. A setup check prevents this."
              },
              {
                label: "During the session",
                guidance: "Show a question counter and estimated time remaining. Do not show a live transcript of the candidate's answers — it causes self-editing. The avatar should maintain eye contact and attentive body language during candidate responses — not a frozen or neutral expression. This is a two-way conversation, not a form.",
                failureMode: "An avatar that appears inattentive or static during candidate answers breaks the conversational illusion and makes candidates feel they are talking to a wall."
              },
              {
                label: "Closing the session",
                guidance: "The avatar should close with: a summary of what was covered, a clear statement that a human hiring manager will review the session, a realistic timeline for next steps, and an invitation to ask one question. End warmly but professionally. Do not promise an outcome.",
                failureMode: "Abrupt endings after a 25-minute session feel dismissive. For internal candidates, a poor closing experience damages the employer relationship regardless of the hiring outcome."
              }
            ]
          },
          {
            id: "failure-modes",
            title: "Critical Failure Modes",
            icon: "warning",
            items: [
              {
                label: "Drop-off risks",
                guidance: "Cold-mode sessions that feel generic after a personalised opening. Sessions under 15 minutes that feel insufficiently thorough for a promotion decision. No pre-session context screen for internal candidates. Avatar tone that feels too casual for the gravity of a promotion evaluation.",
                failureMode: null
              },
              {
                label: "Bias risks",
                guidance: "Data-enriched mode surfacing biased performance data — if the underlying HRIS data reflects prior bias (e.g. demographic patterns in performance ratings), the AI will encode it. Scoring communication style or articulateness over content. Penalising candidates who are thoughtful but slow to respond on scenario questions.",
                failureMode: null
              },
              {
                label: "Trust risks",
                guidance: "Not disclosing what data the AI has access to before the session. Stale or incorrect data surfaced in data-enriched mode. Avatar appearing to read from a script rather than engage. Human reviewer not actually reviewing before a decision is made.",
                failureMode: null
              },
              {
                label: "Scoring model risks",
                guidance: "Do not weight response length or vocabulary as positive signals. The valid signals for this persona are: scenario reasoning quality, conflict resolution approach, reliability and accountability examples, leadership framing. Train the model on these specifically — not on general interview performance proxies.",
                failureMode: null
              }
            ]
          }
        ]
      },
    },

    skilledTrade: {
      id: "skilledTrade",
      personaSubtitle:
        "State-licensed trade workers — electricians, HVAC techs, plumbers, welders, building maintenance. Validated by 7 UXR interviews (April 2026). Credential verified at application; interviews are conversational and fast.",
      common: {
        richBadge: "7 UXR interviews — April 2026",
        richTitle: "Skilled Trade Worker persona — interview playbook",
        sharedHeadline: "What all trades share",
        sharedCards: [
          {
            title: "Referral is the primary pipeline",
            body: "5 of 7 research participants found the role through a personal connection — a friend, former colleague, or family member already working at the company. Job boards are a secondary channel; employers treat referrals as a soft credential check.",
            uxr: true,
          },
          {
            title: "Credential verified at application",
            body: "License number or certification is collected on the application form in every case. Some employers ask for proof again at the in-person interview. No one proceeds to interview without a valid credential on file.",
            uxr: true,
          },
          {
            title: "Conversations, not tests",
            body: "Interviews run 15–40 minutes and are highly conversational. Formal skills tests during the hiring process are rare — employers use day-one shadowing or a ride-along to assess hands-on ability instead.",
            uxr: true,
          },
          {
            title: "Owners and supervisors interview directly",
            body: "At small and mid-size shops, the owner or direct supervisor conducts the interview — no HR layer, no recruiter screen. Decisions are made quickly, often the same day or within a few days.",
            uxr: true,
          },
          {
            title: "Background check standard; MVR only for driving roles",
            body: "A background check was part of every hiring process observed. Drug testing occurred in roughly 5 of 7 cases. Motor vehicle record (MVR) checks apply only to roles that include driving a company vehicle — not universal across all trades.",
            uxr: true,
          },
          {
            title: "3 days to 5 weeks — referrals close fastest",
            body: "Timeline ranged from 3 days (superintendent referral path) to 5 weeks (large employer with multiple interview rounds). Referral hires consistently resolved faster than job-board applicants.",
            uxr: true,
          },
          {
            title: "Fit and retention are the real screen",
            body: "Employers expressed concern about turnover more than technical gaps. Interviews lean toward assessing attitude, reliability, and long-term commitment — skills can be taught; churn cannot easily be fixed.",
            uxr: true,
          },
          {
            title: "No-interview path exists at large employers",
            body: "At least one large-employer path was fully automated: online application, background check, and drug test — no interview at all. Candidates were hired based on credentials and availability alone.",
            uxr: true,
          },
        ],
        userProfiles: [
          {
            name: "Participant A",
            initials: "A",
            brand: "Residential HVAC Contractor",
            role: "HVAC Apprentice",
            companyId: "hvac-tech",
            uxr: true,
            discovery: "Family connection already at the company",
            interviewFocus: "Reliability, availability, and willingness to learn — owner-led, 20 minutes",
            timeToHire: "Same week as initial contact",
            keyFactor: "Referral effectively replaced a technical credential screen at the apprentice level",
          },
          {
            name: "Participant B",
            initials: "B",
            brand: "Commercial Property Management",
            role: "Building Maintenance Technician",
            companyId: "building-maintenance",
            uxr: true,
            discovery: "Indeed job posting",
            application: "Online application with trade certifications uploaded",
            interviewFocus: "Multi-trade breadth — HVAC, electrical, and plumbing coverage were the primary criteria",
            timeToHire: "Approximately 2 weeks",
            keyFactor: "Breadth across trades was weighted above depth in any single area",
          },
          {
            name: "Participant C",
            initials: "C",
            brand: "Plumbing Contractor",
            role: "Journeyman Plumber",
            companyId: "plumber",
            uxr: true,
            discovery: "Company website / direct application",
            interviewFocus: "Phone screen re-asked every application question; in-person shifted to company culture and team fit",
            keyFactor: "Conversation moving toward culture and team dynamic was interpreted as a strong offer signal",
          },
          {
            name: "Participant D",
            initials: "D",
            brand: "Electrical Contractor",
            role: "Journeyman Electrician",
            companyId: "electrician",
            uxr: true,
            discovery: "Job board application",
            process: "Two rounds — phone screen with HR, then in-person with field supervisor",
            interviewFocus: "Technical systems knowledge; journeyman card verified at the in-person step",
            backgroundCheck: "Background check and drug test post-offer",
            keyFactor: "Credential was re-verified in person — not deferred to the background check phase",
          },
          {
            name: "Participant E",
            initials: "E",
            brand: "Facilities Management Company",
            role: "Building Maintenance Technician",
            companyId: "building-maintenance",
            uxr: true,
            discovery: "Referred by a coworker",
            interviewFocus: "Systems experience and after-hours emergency availability — conversational, no written test",
            keyFactor: "Technical ability assessed entirely through conversation; skills evaluated on the job in the first weeks",
          },
          {
            name: "Participant F",
            initials: "F",
            brand: "Large Commercial Employer",
            role: "Building Maintenance Technician",
            companyId: "building-maintenance",
            uxr: true,
            discovery: "Online application portal",
            process: "Fully automated — no interview",
            backgroundCheck: "Background check and drug test; hire confirmed by email",
            keyFactor: "No interview conducted — credentials, background check, and drug test were the only requirements",
          },
          {
            name: "Participant G",
            initials: "G",
            brand: "Residential Property Management",
            role: "Building Maintenance Technician",
            companyId: "building-maintenance",
            uxr: true,
            discovery: "Superintendent referred directly to the hiring manager before application",
            interviewFocus: "Informal 20-minute conversation with the hiring manager",
            timeToHire: "3 days from referral to offer",
            keyFactor: "Superintendent's direct call was the real hiring event — the interview was a formality",
          },
        ],
        atAGlance: [],
        phases: [],
        quotes: [],
      },
      companies: [
        {
          id: "electrician",
          displayName: "Electrician",
          initials: "E",
          accent: "#1d6aa5",
          tagline: "Electrical contractor — regional independents, MYR Group, EMCOR",
          roles: "Journeyman Electrician, Apprentice",
          processSteps: [
            {
              text: "Apply via Indeed or the company site; submit journeyman card at application. Credential is verified before a screen is scheduled.",
              tags: [],
            },
            {
              text: "Phone screen with HR or service manager: systems and equipment experience, service area, license status, availability.",
              tags: [],
            },
            {
              text: "In-person interview with field supervisor: technical knowledge and safety scenario questions. Journeyman card is re-verified at this stage — not deferred to the background check. At larger contractors, a second round with the field supervisor may follow.",
              tags: [],
              uxr: true,
            },
            {
              text: "Background check and drug test. Offer upon passing all screens.",
              tags: [],
              uxr: true,
            },
          ],
        },
        {
          id: "hvac-tech",
          displayName: "HVAC Technician",
          initials: "HV",
          accent: "#0891b2",
          tagline: "Comfort Systems, Johnson Controls, or regional HVAC shop",
          roles: "HVAC Technician — residential or light commercial; Apprentice considered at small shops",
          processSteps: [
            {
              text: "At small residential shops, referral is the primary path — the owner often reaches out directly before a formal posting exists. Job boards (Indeed, ZipRecruiter) are used when the referral network is exhausted.",
              tags: [],
              uxr: true,
            },
            {
              text: "Apply via Indeed or company site; EPA 608 certification submitted at application. Apprentice-level candidates are considered at smaller shops when a journeyman refers them.",
              tags: [],
              uxr: true,
            },
            {
              text: "Phone screen: equipment brand familiarity (Carrier, Trane, York, Lennox), residential vs. commercial experience, availability for on-call shifts.",
              tags: [],
            },
            {
              text: "In-person interview with owner or service manager: conversational, 20–30 minutes. Focuses on reliability, attitude, and how the candidate handles difficult customers or unexpected failures in the field. Formal skills tests are rare — shadowing begins on day one instead.",
              tags: [],
              uxr: true,
            },
            {
              text: "Background check and drug test. Offer typically includes company vehicle or truck access and uniform. Larger contractors (Johnson Controls, Comfort Systems) may add a ride-along or bench evaluation.",
              tags: [],
            },
          ],
        },
        {
          id: "plumber",
          displayName: "Plumber",
          initials: "PL",
          accent: "#7c3aed",
          tagline: "Plumbing contractor — regional independents and national service companies",
          roles: "Journeyman Plumber, Apprentice",
          processSteps: [
            {
              text: "Apply via company site or Indeed; include journeyman card and license number. Referrals from current employees are common and accelerate the process.",
              tags: [],
            },
            {
              text: "Phone screen: revisits questions from the application — license status, years of experience, types of systems worked on, service area willingness. Expect the same questions asked again in slightly different form.",
              tags: [],
              uxr: true,
            },
            {
              text: "In-person interview: shifts tone from technical to cultural — questions about the team, scheduling expectations, and long-term fit. A conversation that moves toward company culture and team dynamic is a strong signal that an offer is close.",
              tags: [],
              uxr: true,
            },
            {
              text: "Reference checks are common at plumbing contractors. Background check and drug test follow the verbal offer. Turnaround is often within 1–2 weeks of initial application.",
              tags: [],
              uxr: true,
            },
          ],
        },
        {
          id: "welder",
          displayName: "Welder",
          initials: "W",
          accent: "#b45309",
          tagline: "AWS or manufacturer cert — construction, manufacturing, or pipeline",
          roles: "Certified Welder — construction, manufacturing, pipeline",
          processSteps: [
            {
              text: "Apply via Indeed, company site, or staffing agency. Submit AWS certification and position certs (1G, 2G, 6G) at application.",
              tags: [],
            },
            {
              text: "Phone screen: which processes and positions are you certified in? Prior project types and environments?",
              tags: [],
            },
            {
              text: "In-person interview: technical questions on welding procedures, safety compliance, and prior project scope.",
              tags: [],
            },
            {
              text: "Weld test: almost always required at this stage — employers want to observe technique, not just verify certifications on paper.",
              tags: [],
            },
            {
              text: "Background check and drug test. Offer. Staffing agency placement is common for project-based or pipeline work.",
              tags: [],
            },
          ],
        },
        {
          id: "building-maintenance",
          displayName: "Building Maintenance Tech",
          initials: "BM",
          accent: "#059669",
          tagline: "Multi-trade cert — commercial or residential property management",
          roles: "Building Maintenance Technician",
          processSteps: [
            {
              text: "Three distinct hiring paths exist depending on employer size. (1) Large employer — fully automated: online application, credential submission, background check, drug test, and hire by email. No interview. (2) Mid-size commercial or residential property — superintendent or facilities manager referral leads to a 20-minute informal conversation, often resolved in 3 days. (3) Standard path — apply via Indeed or property management company site, followed by a phone screen and in-person interview.",
              tags: [],
              uxr: true,
            },
            {
              text: "Phone screen (standard path): which trades are you certified in? HVAC, electrical, and plumbing coverage is preferred. After-hours and emergency availability is a frequent question.",
              tags: [],
              uxr: true,
            },
            {
              text: "In-person interview with facilities manager or direct supervisor: conversational format covering multi-trade scenarios — 'What would you do if…' questions spanning HVAC, electrical, and plumbing. Breadth across trades is valued over depth in any single area.",
              tags: [],
              uxr: true,
            },
            {
              text: "No formal skills test is administered during the hiring process — technical ability is evaluated through day-one shadowing and the first few weeks of work.",
              tags: [],
              uxr: true,
            },
            {
              text: "Background check and drug test standard. MVR check applies only if the role includes driving a company vehicle — not universal for this role type. Offer may include building access credentials and on-call scheduling details.",
              tags: [],
              uxr: true,
            },
          ],
        },
      ],
      aiDesignGuidance: {
        headline: "AI Interview Design Guidance",
        personaLabel: "Skilled Trade Worker",
        modalRecommendation: {
          primary: "Video (avatar-led)",
          fallback: "Voice-only",
          rationale: "The real-world interview for this persona is a direct, conversational exchange with an owner or field supervisor — no HR layer, no formal structure. A video avatar replicates that directness. Critically, the session runs in two sequential phases: credential verification first (integrated or conversational), then a structured trade-specific conversation. Voice-only fallback covers candidates on job sites or in vehicles where camera use isn't practical.",
          fallbackTriggers: [
            "Candidate is on a job site or in a vehicle",
            "Candidate declines camera permission",
            "Device has no front-facing camera",
            "Camera drops mid-session — continue in voice-only, do not restart"
          ]
        },
        sections: [
          {
            id: "session-design",
            title: "Session Design",
            icon: "clock",
            items: [
              {
                label: "Duration",
                guidance: "Target 20–35 minutes. The real-world interview runs 15–40 minutes and is highly conversational. The AI session should feel like a credible trade conversation, not an HR screen. Under 15 minutes will not generate enough signal. Over 40 minutes will feel like an audit.",
                failureMode: "Sessions that feel like a compliance exercise rather than a trade conversation cause this persona to disengage. These candidates have been hired via referral and informal conversation — they have low tolerance for process theatre."
              },
              {
                label: "Two-phase structure",
                guidance: "Phase 1 — Credential verification (3–5 min): Confirm license type, license number, state of licensure, and expiration date. If integrated with a licensing database, verify in real time and confirm to the candidate. If conversational only, collect the details and flag for post-session verification. The avatar should narrate this clearly: 'Before we get into the conversation, I need to confirm your credentials — this takes about 3 minutes.' Phase 2 — Trade conversation (18–30 min): structured but conversational interview covering experience, systems, field judgment, and fit.",
                failureMode: "Mixing credential checks into the interview conversation creates confusion about what is evaluative and what is administrative. Candidates need the boundary to be explicit."
              },
              {
                label: "Question count",
                guidance: "8–10 questions in the trade conversation phase. Cover: years and type of experience, systems and equipment familiarity, a field judgment scenario, safety record and approach, availability and on-call willingness, team or solo work preference, and one fit question. Do not rush — this persona values being heard.",
                failureMode: "Fewer than 6 questions signals that the AI hasn't been configured for the trade. This persona will flag it immediately and lose confidence in the process."
              },
              {
                label: "Pacing",
                guidance: "Allow 30–45 seconds of silence on field judgment and experience questions. Tradespeople think in specifics — they are recalling real jobs, real systems, real failures. Do not interrupt or re-prompt before 30 seconds. The avatar should appear engaged and patient during silence, not frozen.",
                failureMode: "Premature re-prompting cuts off answers that were building toward the most relevant detail. For trade interviews, the specific detail is the signal — the preamble is not."
              },
              {
                label: "Retakes",
                guidance: "Allow one retake per question. Frame it as natural: 'Want to add anything to that or come at it differently?' Do not make retakes feel like a correction.",
                failureMode: null
              }
            ]
          },
          {
            id: "tone-language",
            title: "Tone & Language",
            icon: "message",
            items: [
              {
                label: "Avatar tone",
                guidance: "Configure the avatar as knowledgeable, direct, and collegial — the equivalent of a field supervisor or experienced project manager, not an HR coordinator. The avatar should feel like someone who understands the trade. Recruiters should select an avatar template that reads as experienced and grounded, not corporate.",
                failureMode: "An avatar that sounds like it's reading from a job description will lose this persona within the first two minutes. Tradespeople are accustomed to being interviewed by people who know the work — a generic HR tone signals immediately that the AI doesn't."
              },
              {
                label: "Trade-specific language",
                guidance: "Questions must use the correct trade terminology for the role. For electricians: journeyman card, service panels, conduit bending, NEC. For HVAC: EPA 608, refrigerant handling, load calculations, Carrier/Trane/York/Lennox brand familiarity. For plumbers: journeyman license, rough-in, PEX vs copper, backflow prevention. Recruiters must configure the correct trade template — do not use a generic skilled-trades template across all roles.",
                failureMode: "Generic trade questions ('Have you worked with tools?') are insulting to a licensed journeyman with 10 years of experience. The session will be abandoned or mocked."
              },
              {
                label: "Credential verification tone",
                guidance: "During Phase 1, the avatar should be matter-of-fact and administrative — not interrogative. Frame verification as a standard step: 'I just need to confirm your license details before we get into the conversation.' If real-time integration confirms the credential, acknowledge it positively and move on immediately.",
                failureMode: "A verification phase that feels like an accusation ('I need to verify that you actually have a license') creates immediate hostility. This persona views their credential as their primary professional identity."
              },
              {
                label: "Handling referral context",
                guidance: "If the candidate was referred, the avatar should acknowledge it naturally early in the conversation: 'I understand you were referred by [name / the team] — that's helpful context.' Referral candidates for this persona expect the conversation to feel warmer and more direct than a cold application. Match that expectation.",
                failureMode: "Treating a referred candidate identically to a cold applicant signals that the referral context wasn't passed through — which erodes trust in both the AI and the referring colleague."
              }
            ]
          },
          {
            id: "question-design",
            title: "Question Design",
            icon: "list",
            items: [
              {
                label: "Credential phase questions",
                guidance: "License type and number. State of licensure and expiration. Any additional certifications relevant to the role (EPA 608, AWS cert, OSHA 10/30, PCQI). If driving is required: driver's license status and MVR consent. Keep this phase transactional — confirm, verify where integrated, and move on.",
                failureMode: null
              },
              {
                label: "Experience questions",
                guidance: "Years in trade. Residential vs commercial vs industrial experience. Systems and equipment brand familiarity. Largest or most complex project. Solo vs team work history. These establish credibility context for everything that follows — do not skip them.",
                failureMode: null
              },
              {
                label: "Field judgment scenario",
                guidance: "Include one scenario question grounded in a realistic field situation for the specific trade. For HVAC: 'You arrive at a job and the homeowner says the system was serviced last month but still isn't cooling. What's your first move?' For electricians: 'You open a panel and find wiring that doesn't match the diagram — how do you handle that?' The scenario should have no single right answer — it is testing reasoning and safety instinct.",
                failureMode: "Generic scenarios ('What would you do if something went wrong on a job?') produce generic answers. Trade-specific scenarios produce evaluable field reasoning."
              },
              {
                label: "Fit and retention questions",
                guidance: "Ask about availability for on-call or emergency shifts — critical for HVAC and plumbing. Ask about solo vs team preference — relevant for building maintenance. Ask one question about what they're looking for in their next role — this is the primary retention signal. The research shows employers care more about reducing churn than closing technical gaps.",
                failureMode: "Skipping fit questions produces hires who leave within 90 days because the role's on-call requirements or team structure weren't surfaced. The AI should surface these — not assume the candidate already knows."
              },
              {
                label: "What not to ask",
                guidance: "Do not ask about formal education or degrees — irrelevant for licensed trades. Do not ask resume walk-through questions — this persona often doesn't have a formatted resume. Do not ask abstract leadership or career-vision questions — this persona is evaluated on craft and judgment, not management aspiration.",
                failureMode: "Resume-walk questions for a candidate who found the role through a referral and has never written a formal resume create immediate friction and false negatives."
              }
            ]
          },
          {
            id: "candidate-ux",
            title: "Candidate-Side UX",
            icon: "phone",
            items: [
              {
                label: "Entry point",
                guidance: "Session should be accessible via SMS link or direct URL — this persona does not use company email or HRIS portals. No account creation, no app download. One tap to enter. The pre-session screen should explain the two-phase structure clearly: credential check first, then trade conversation.",
                failureMode: "Any friction before the session starts causes abandonment. Referred candidates especially — they have a warm path in and will not tolerate a cold technical barrier."
              },
              {
                label: "Pre-session credential upload",
                guidance: "Before the video session begins, offer the candidate the option to photograph and upload their license or certification card. This enables pre-verification and allows the avatar to confirm credentials without asking for numbers verbally. Frame it as: 'To save time in our conversation, you can upload a photo of your license now — takes 30 seconds.' Make it optional, not required.",
                failureMode: "Requiring credential upload before access to the session feels like a barrier, not a convenience. Optional upload with conversational fallback is the correct design."
              },
              {
                label: "Two-way video setup",
                guidance: "Run a brief camera and audio check before the avatar appears. For this persona, keep it very brief and practical — 20 seconds maximum. They are often joining from a phone in a vehicle or on a job site. Frame it as: 'Quick check — can you see and hear me clearly?' Then proceed.",
                failureMode: "A lengthy technical setup process before a trade interview reads as bureaucratic. This persona's threshold for process overhead is very low."
              },
              {
                label: "During the session",
                guidance: "Show question number and phase (Credential Check / Trade Conversation) at all times. The avatar should engage naturally during candidate answers — nodding, maintaining eye contact, occasional brief acknowledgements ('Got it', 'That makes sense'). This persona is accustomed to being interviewed by a person in the room — the avatar must hold that conversational reality.",
                failureMode: "A static or inattentive avatar during long trade answers breaks the conversational contract. This persona will stop elaborating and give shorter answers — reducing the quality of every subsequent response."
              },
              {
                label: "Closing the session",
                guidance: "The avatar should close with: a genuine acknowledgement of the candidate's experience ('You clearly have strong experience in commercial HVAC — thanks for walking me through that'), what happens next, and a realistic timeline. For referral candidates, acknowledge the referral path in the close. Do not promise an outcome.",
                failureMode: "A generic close after a substantive trade conversation feels dismissive. This persona will remember how the conversation ended — and so will the person who referred them."
              }
            ]
          },
          {
            id: "failure-modes",
            title: "Critical Failure Modes",
            icon: "warning",
            items: [
              {
                label: "Drop-off risks",
                guidance: "Generic trade questions that signal the AI wasn't configured for the specific trade. Credential verification that feels accusatory. Avatar tone that reads as corporate HR rather than field-experienced. Session length under 15 minutes. Any pre-session friction for a referred candidate.",
                failureMode: null
              },
              {
                label: "Bias risks",
                guidance: "Penalising candidates who describe non-standard career paths (apprenticeship, family trade, no formal job history). Scoring communication style over trade knowledge and field reasoning. Treating referral candidates identically to cold applicants in scoring — referral is itself a signal and should be weighted.",
                failureMode: null
              },
              {
                label: "Trust risks",
                guidance: "An avatar that does not appear to understand the trade. Credential verification that feels like distrust rather than administration. Not disclosing the AI upfront. Failing to explain how the session recording will be used and who will review it.",
                failureMode: null
              },
              {
                label: "Scoring model risks",
                guidance: "The valid signals for this persona are: credential validity, relevant systems experience, field judgment quality in the scenario question, on-call availability match, and retention fit signals. Do not score vocabulary, sentence structure, or response length. A journeyman electrician with 15 years of experience may give short, direct answers — that is not a negative signal.",
                failureMode: null
              }
            ]
          }
        ]
      },
    },

    credentialedProfessional: {
      id: "credentialedProfessional",
      personaSubtitle:
        "Workers whose credential (RN license, pharmacist license, teaching certificate, CPA) is the primary hiring gatekeeper. Interview confirms fit — credential already proves competence.",
      common: {
        richBadge: "Across 5 role types",
        richTitle: "Credentialed Professional persona — interview playbook",
        sharedHeadline: "What all sub-types share",
        sharedCards: [
          {
            title: "Credential is the gatekeeper",
            body: "Without a valid license or certificate, no interview happens. The credential proves competence — the interview then confirms fit and role specifics.",
          },
          {
            title: "Behavioral + situational questions",
            body: "All sub-types use behavioral or scenario-based questions. Focus varies: patient scenarios for healthcare, classroom management for teachers, client handling for accounting.",
          },
          {
            title: "Credential verification timing varies",
            body: "Some verify at application, some before the interview, some after the offer. Knowing the timing shapes how candidates prepare their paperwork.",
          },
          {
            title: "Background check universal",
            body: "All sub-types run a background check. Education adds fingerprinting; healthcare adds OIG exclusion list checks not found in other sectors.",
          },
          {
            title: "Multi-step funnels",
            body: "Credentialed professionals go through more steps than entry-level workers — typically 3–6 rounds depending on the role type.",
          },
          {
            title: "Recruiter or HR is an early gate",
            body: "All sub-types have a recruiter or HR phone screen early in the process before any hiring manager or panel interview.",
          },
          {
            title: "Long and short timelines coexist",
            body: "Healthcare averages 14 days to offer. Big 4 campus recruiting can take months. Education hiring is highly seasonal (June–August).",
          },
          {
            title: "Structured post-hire onboarding",
            body: "New grad nurses enter year-long residency programs. New teachers enter district induction. Big 4 hires go through formal training weeks before starting client work.",
          },
        ],
        userProfiles: [],
        atAGlance: [],
        phases: [],
        quotes: [],
      },
      companies: [
        {
          id: "rn-hospital",
          displayName: "RN / Hospital (HCA)",
          initials: "RN",
          accent: "#0891b2",
          tagline: "Registered nurse — new grad or <3 yrs experience, hospital setting",
          roles: "Registered Nurse — med/surg, ICU, ED",
          processSteps: [
            { text: "Apply online via hospital ATS; RN license number required at application." },
            { text: "Recruiter phone screen: 15–20 min — unit preference, shift availability, licensure status." },
            { text: "Unit or department interview + floor shadow — hired by the department, not just HR." },
            { text: "Background check + OIG exclusion list check + license verification." },
            { text: "Offer + residency enrollment for new grads — a year-long structured onboarding program." },
            { text: "HCA averages 14 days from application to offer." },
          ],
        },
        {
          id: "pharmacist",
          displayName: "Pharmacist (CVS / Walgreens)",
          initials: "Rx",
          accent: "#CC0000",
          tagline: "PharmD + state license — retail pharmacy workflow",
          roles: "Staff Pharmacist — retail, clinical",
          processSteps: [
            { text: "Apply online; CVS routes through a structured online assessment before any human contact." },
            { text: "Recruiter phone screen: license status, state(s) of licensure, shift availability." },
            { text: "Interview with pharmacy manager: focus on DUR, patient counseling scripts, and workflow speed under volume." },
            { text: "State license must be active and verified before the offer is extended." },
            { text: "Background check; offer with pharmacy and schedule assignment." },
          ],
        },
        {
          id: "teacher-district",
          displayName: "K–12 Teacher (Public District)",
          initials: "TD",
          accent: "#1d4ed8",
          tagline: "State teaching certificate required — district portal, two-gate process",
          roles: "K–12 Teacher — public school district",
          processSteps: [
            { text: "Apply via district portal (Workday, OLAS, or Frontline); upload state teaching certificate." },
            { text: "Curriculum or HR interview at the district level — pass to enter the candidate pool." },
            { text: "Placed in a candidate pool; individual schools select candidates from the pool." },
            { text: "School-level panel or principal interview — behavioral + classroom scenario questions." },
            { text: "Demo lesson increasingly standard, especially at charter schools and some districts." },
            { text: "Background check + fingerprinting; offer for the following school year. Highly seasonal: June–August." },
          ],
        },
        {
          id: "teacher-charter",
          displayName: "K–12 Teacher (Charter)",
          initials: "CS",
          accent: "#7c3aed",
          tagline: "Same cert requirements — faster process, demo lesson standard, more selective",
          roles: "K–12 Teacher — charter school network",
          processSteps: [
            { text: "Apply directly to the charter network (KIPP, Success Academy, Uncommon Schools, etc.)." },
            { text: "Talent team phone screen: cert status, grade preference, mission alignment." },
            { text: "Panel interview with school leader and department team — behavioral and vision questions." },
            { text: "Demo lesson required: teach a real lesson to students or perform in front of evaluators." },
            { text: "Background check + fingerprinting; faster than district hiring — often 2–4 weeks total." },
            { text: "More selective than district hiring — charter networks prioritize mission fit above all." },
          ],
        },
        {
          id: "big4-accounting",
          displayName: "Big 4 Accounting (Deloitte / EY)",
          initials: "B4",
          accent: "#1e3a8a",
          tagline: "CPA candidate or licensed — campus recruiting or internship conversion",
          roles: "Staff Accountant, Auditor — Big 4 firm",
          processSteps: [
            { text: "Campus career fair or online apply; internship-to-full-time conversion is the primary pipeline." },
            { text: "Resume screen: GPA check (typically 3.0+ minimum) and CPA candidacy status confirmed." },
            { text: "Recruiter phone or video screen — behavioral questions, interest in practice area." },
            { text: "'Office visit': a full day of 4–6 back-to-back interviews with managers and partners." },
            { text: "Background check + reference checks." },
            { text: "Offer — often tied to internship conversion (~90% at KPMG for interns). Cold-apply acceptance: under 4%." },
          ],
        },
      ],
    },
  };
})();
