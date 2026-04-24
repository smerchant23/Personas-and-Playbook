(function () {
  const PERSONA_ORDER = ["customerFacing", "operations", "technician", "skilledTrade", "credentialedProfessional"];

  function getVariant(personaId) {
    const map = {
      customerFacing: "customer",
      operations: "operations",
      technician: "supervisor",
      skilledTrade: "trade",
      credentialedProfessional: "credentialed",
    };
    return map[personaId] || "customer";
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s == null ? "" : String(s);
    return div.innerHTML;
  }

  /** Safe for HTML attribute values (e.g. title tooltips). */
  function escapeAttr(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  /** Prefer bundled files under `logos/` so icons work offline and aren’t blocked by third-party CDNs. */
  function companyLogoUrl(c) {
    if (c.logoUrl) return c.logoUrl;
    if (c.logoDomain) {
      return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(c.logoDomain)}&sz=128`;
    }
    return null;
  }

  /** Logo image in company tabs (no initials). */
  function renderCompanyTabMark(c) {
    const logoUrl = companyLogoUrl(c);
    if (!logoUrl) return "";
    const safeUrl = escapeHtml(logoUrl);
    return `<span class="company-tab__mark">
          <img class="company-tab__logo" src="${safeUrl}" alt="" width="24" height="24" loading="eager" decoding="async" />
        </span>`;
  }

  /** Stand-alone strip: employer logos (same assets as company tabs). */
  function renderEmployerLogoStrip(companies, variant) {
    if (!companies || !companies.length) return "";
    const cells = companies
      .map((c) => {
        const url = companyLogoUrl(c);
        if (!url) return "";
        return `<li class="persona-card__employer-cell" title="${escapeAttr(c.displayName)}">
            <img class="persona-card__employer-logo" src="${escapeHtml(url)}" alt="${escapeHtml(c.displayName)}" width="28" height="28" loading="lazy" decoding="async" />
          </li>`;
      })
      .join("");
    if (!cells.trim()) return "";
    return `<section class="persona-card__employer-section persona-card__employer-section--${variant}" aria-label="Employers in this research">
        <p class="persona-card__employer-caption">Employers in this research</p>
        <ul class="persona-card__employer-logos">${cells}</ul>
      </section>`;
  }

  function isPlaceholderQuote(text) {
    return !text || /^placeholder/i.test(String(text).trim());
  }

  function renderTimeline(atAGlance) {
    return (atAGlance || [])
      .map(
        (row, i) => `
        <div class="timeline-step">
          <div class="timeline-step__marker">${i + 1}</div>
          <div class="timeline-step__content">
            <strong>${escapeHtml(row.step)}</strong>
            <span>${escapeHtml(row.note)}</span>
          </div>
        </div>`
      )
      .join("");
  }

  function renderPhases(phases) {
    return (phases || [])
      .map(
        (p) => `
        <details class="phase-block">
          <summary>
            <span>${escapeHtml(p.title)}</span>
            <span class="phase-summary-meta">${escapeHtml(p.duration)}</span>
          </summary>
          <div class="phase-body">
            <ul>
              ${(p.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
            </ul>
          </div>
        </details>`
      )
      .join("");
  }

  function renderQuotes(quotes) {
    const list = (quotes || []).filter((q) => q.text && !isPlaceholderQuote(q.text));
    if (!list.length) return "";
    return `
        <div class="quotes">
          <h4>From interviews</h4>
          ${list
            .map(
              (q) => `
            <blockquote>
              ${escapeHtml(q.text)}
              ${q.attribution ? `<cite>${escapeHtml(q.attribution)}</cite>` : ""}
            </blockquote>`
            )
            .join("")}
        </div>`;
  }

  const TAG_LABELS = {
    common: "Common",
    unique: "Unique",
    fastest: "Fastest",
    onboarding: "Onboarding",
    context: "Context",
    "most-tests": "Most tests",
    easiest: "Easiest",
    "no-interview": "No interview",
    "critical-step": "Critical step",
    "high-friction": "High friction",
    "most-formal": "Most formal",
    varied: "Varied",
    "role-dependent": "Role dependent",
  };

  function tagClassSafe(t) {
    return String(t || "")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
  }

  function renderProcessTags(_tags) {
    // Tags (unique, context, etc.) are hidden — not shown to end users
    return "";
  }

  /** Minimal line icons for shared “stage” cards (cycles if more than 8). */
  const SHARED_STAGE_ICONS = [
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 4 3-4 3V9z"/></svg>',
  ];

  function renderSharedSection(common, variant) {
    const cards = common.sharedCards || [];
    if (!cards.length) return "";
    const shellClass = `shared-bento-shell shared-bento-shell--${variant}`;
    const grid = cards
      .map((c, i) => {
        const stageNum = String(i + 1).padStart(2, "0");
        const icon = SHARED_STAGE_ICONS[i % SHARED_STAGE_ICONS.length];
        return `
        <div class="shared-card shared-card--stage" role="listitem" style="--stagger: ${i}">
          <div class="shared-card__icon-tile">${icon}</div>
          <span class="shared-card__stage-label">${stageNum}</span>
          <h4 class="shared-card__title">${escapeHtml(c.title)}</h4>
          <p class="shared-card__body">${escapeHtml(c.body)}</p>
        </div>`;
      })
      .join("");

    return `
        <div class="rich-section rich-section--shared rich-section--persona-${variant}">
          <div class="${shellClass}">
            <h4 class="rich-section__title shared-bento-shell__title">${escapeHtml(common.sharedHeadline || "What employers share")}</h4>
            <div class="shared-grid shared-grid--${variant}" role="list">${grid}</div>
          </div>
        </div>`;
  }

  function renderUniqueTeaser(common, variant) {
    if (!common.uniqueHeadline) return "";
    return `
        <div class="rich-section rich-section--unique-teaser rich-section--persona-${variant}">
          <h4 class="rich-section__title">${escapeHtml(common.uniqueHeadline)}</h4>
          ${common.uniqueLead ? `<p class="rich-section__lead">${escapeHtml(common.uniqueLead)}</p>` : ""}
        </div>`;
  }

  function findCompanyInBundle(bundle, companyId) {
    return (bundle.companies || []).find((c) => c.id === companyId) || null;
  }

  function renderUserProfileTags(tags) {
    if (!tags || !tags.length) return "";
    const pills = tags
      .filter(Boolean)
      .map((t) => `<span class="user-profile-card__tag">${escapeHtml(t)}</span>`)
      .join("");
    return pills ? `<div class="user-profile-card__tags">${pills}</div>` : "";
  }

  /** Strips employment-type prefixes from legacy role strings. */
  function formatProfileRole(role) {
    if (role == null) return "";
    return String(role)
      .replace(/^(Full-time|Part-time)\s*[—–-]\s*/i, "")
      .trim();
  }

  /** Renders a single user profile card, optionally with a UXR badge. */
  function renderSingleProfileCard(p, bundle, i) {
    const co = p.companyId ? findCompanyInBundle(bundle, p.companyId) : null;
    const accent = co && co.accent ? co.accent : "var(--accent-hot)";
    const fg = co && co.initialsFg ? co.initialsFg : "rgba(255,255,255,0.95)";
    const brand = co ? co.displayName : "";
    const markVars = `--mark-accent: ${accent}; --mark-fg: ${fg}`;
    const ini = escapeHtml(p.initials || (p.pseudonym || "?").charAt(0));
    const application = p.application != null ? p.application : p.appliedVia;
    const process = p.process != null ? p.process : p.rounds;
    const roleLine = escapeHtml(formatProfileRole(p.role));
    const optionalRow = (label, val) =>
      val != null && String(val).trim() !== ""
        ? `<div class="user-profile-card__fact"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(val)}</dd></div>`
        : "";
    const tagRow =
      p.processTags && p.processTags.length
        ? `<div class="user-profile-card__fact"><dt>Process</dt><dd>
            ${process ? `<span class="user-profile-card__process-text">${escapeHtml(process)}</span> ` : ""}
            ${renderUserProfileTags(p.processTags)}
          </dd></div>`
        : optionalRow("Process", process);

    const displayName = brand || "Research Participant";
    return `
      <div class="user-profile-card" role="listitem" style="--stagger: ${i}">
        <div class="user-profile-card__top">
          <div class="user-profile-card__mark" style="${escapeHtml(markVars)}" aria-hidden="true"><span>${ini}</span></div>
          <div class="user-profile-card__intro">
            <div class="user-profile-card__name-row">
              <p class="user-profile-card__name">${escapeHtml(displayName)}</p>
              ${p.uxr ? `<span class="uxr-badge" title="Informed by user research">UXR</span>` : ""}
            </div>
            ${roleLine ? `<p class="user-profile-card__role">${roleLine}</p>` : ""}
          </div>
        </div>
        <dl class="user-profile-card__facts">
          ${optionalRow("Discovery", p.discovery)}
          ${optionalRow("Application", application)}
          ${tagRow}
          ${optionalRow("Background check", p.backgroundCheck)}
          ${optionalRow("Drug test", p.drugTest)}
          ${optionalRow("Driver’s license", p.driversLicense)}
          ${optionalRow("Time to hire", p.timeToHire)}
          ${optionalRow("Interview focus", p.interviewFocus)}
          ${optionalRow("Key factor", p.keyFactor)}
        </dl>
      </div>`;
  }

  /**
   * A callout block at the bottom of the playbook body with participant insights.
   * Uses a distinct visual style rather than mimicking the fact-row grid.
   */
  function renderProfileInsightRows(profiles) {
    const items = [];
    profiles.forEach(p => {
      const role = formatProfileRole(p.role);
      const attr = role || "Research participant";
      const uxrBadge = p.uxr ? `<span class="uxr-badge">UXR</span>` : "";
      if (p.interviewFocus) {
        items.push(`
          <div class="research-insight">
            <span class="research-insight__label">Interview focus</span>
            <p class="research-insight__value">${escapeHtml(p.interviewFocus)}</p>
            <p class="research-insight__attr">${uxrBadge}<span>${escapeHtml(attr)}</span></p>
          </div>`);
      }
      if (p.keyFactor) {
        items.push(`
          <div class="research-insight">
            <span class="research-insight__label">Key factor</span>
            <p class="research-insight__value">${escapeHtml(p.keyFactor)}</p>
            <p class="research-insight__attr">${uxrBadge}<span>${escapeHtml(attr)}</span></p>
          </div>`);
      }
    });
    if (!items.length) return "";
    return `
      <div class="playbook-research-callout">
        <span class="playbook-research-callout__heading">From a participant</span>
        ${items.join("")}
      </div>`;
  }

  /**
   * Collapsible "Research participants" section below the playbook.
   * Contains the full participant fact-table cards as source attribution.
   */
  function renderResearchSourcesSection(profiles, bundle, variant) {
    if (!profiles.length) return "";
    const hasUxr = profiles.some(p => p.uxr);
    const count = profiles.length;
    const cards = profiles.map((p, i) => renderSingleProfileCard(p, bundle, i)).join("");
    return `
      <details class="research-sources-accordion rich-section--persona-${variant}">
        <summary class="research-sources-accordion__summary">
          <span class="research-sources-accordion__label">Research participants</span>
          <span class="research-sources-accordion__meta">
            ${hasUxr ? `<span class="uxr-badge uxr-badge--section">UXR · UserTesting</span>` : ""}
            <span class="research-sources-accordion__count">${count}</span>
          </span>
        </summary>
        <div class="research-sources-accordion__body">
          <div class="user-profile-grid user-profile-grid--bento" role="list">${cards}</div>
        </div>
      </details>`;
  }

  /** Fallback accordion for profiles not tied to any specific company. */
  function renderUserProfilesAccordion(bundle, personaId) {
    const common = bundle.common;
    const variant = getVariant(personaId);
    const profiles = (common.userProfiles || []).filter(p => !p.companyId);
    if (!profiles.length) return "";
    const headline = common.userProfilesHeadline || "User profiles";
    const cards = profiles.map((p, i) => renderSingleProfileCard(p, bundle, i)).join("");

    return `
      <section class="persona-user-profiles-below-drill rich-section--persona-${variant}" aria-label="${escapeAttr(headline)}">
        <details class="user-profiles-accordion user-profiles-accordion--bento" open>
          <summary class="user-profiles-accordion__summary">
            <span class="user-profiles-accordion__summary-text">${escapeHtml(headline)}</span>
          </summary>
          <div class="user-profiles-accordion__body">
            <div class="user-profile-grid user-profile-grid--bento" role="list">${cards}</div>
          </div>
        </details>
      </section>`;
  }

  function renderRichPersonaCommonCard(bundle, variant) {
    const common = bundle.common;
    const badge = common.richBadge || "Across employers";
    const title = common.richTitle || "Hiring patterns";
    return `
      <article class="persona-card persona-card--${variant} persona-card--spectrum">
        <header class="persona-card__head">
          <span class="persona-badge">${escapeHtml(badge)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p class="subtitle">${escapeHtml(bundle.personaSubtitle)}</p>
        </header>
        ${renderEmployerLogoStrip(bundle.companies, variant)}
        <div class="persona-card__body persona-card__body--rich">
          ${common.summary ? `<p class="summary summary--hero">${escapeHtml(common.summary)}</p>` : ""}
          ${renderSharedSection(common, variant)}
          ${renderUniqueTeaser(common, variant)}
        </div>
      </article>`;
  }

  /** Inline pills on hiring-fact rows — hidden globally; UXR badge used instead. */
  function renderHiringFactPills(_tags) {
    return "";
  }

  /** Wraps exact substring matches in <mark> (safe: escapes non-matched segments). */
  function highlightTermsInText(text, terms) {
    const s = text == null ? "" : String(text);
    if (!s || !terms || !terms.length) return escapeHtml(s);
    const uniq = [...new Set(terms.filter(Boolean))].sort((a, b) => b.length - a.length);
    if (!uniq.length) return escapeHtml(s);
    const escaped = uniq.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const re = new RegExp(`(${escaped.join("|")})`, "g");
    return s
      .split(re)
      .map((part) =>
        uniq.includes(part)
          ? `<mark class="playbook-step__hl">${escapeHtml(part)}</mark>`
          : escapeHtml(part)
      )
      .join("");
  }

  function renderHiringFacts(co) {
    const rows = (co.hiringFacts || [])
      .map((row) => {
        const pills = renderHiringFactPills(row.tags);
        const uxrBadge = row.uxr
          ? `<span class="uxr-badge uxr-badge--step" title="Informed by user research">UXR</span>`
          : "";
        return `
        <div class="playbook-fact${row.uxr ? " playbook-fact--uxr" : ""}">
          <div class="playbook-fact__label">${escapeHtml(row.label)}</div>
          <div class="playbook-fact__value-wrap">
            <p class="playbook-fact__value">${escapeHtml(row.value)}</p>
            ${pills}${uxrBadge}
          </div>
        </div>`;
      })
      .join("");
    return `<div class="playbook-facts" role="list">${rows}</div>`;
  }

  function renderCompanyPlaybook(co, variant, profiles) {
    const accent = co.accent || "var(--accent-hot)";
    const markVars = co.initialsFg
      ? `--mark-accent: ${accent}; --mark-fg: ${co.initialsFg}`
      : `--mark-accent: ${accent}`;
    const rolesBlock =
      co.roleLine != null && String(co.roleLine).trim() !== ""
        ? `<p class="company-playbook__roles company-playbook__roles--plain">${escapeHtml(co.roleLine)}</p>`
        : `<p class="company-playbook__roles"><strong>Roles:</strong> ${escapeHtml(co.roles || co.tagline)}</p>`;
    const sectionTitle = escapeHtml(
      co.stepsSectionTitle || (variant === "operations" ? "Hiring process" : "Interview process")
    );

    const nameHtml =
      co.highlightNameTerms && co.highlightNameTerms.length
        ? highlightTermsInText(co.displayName, co.highlightNameTerms)
        : escapeHtml(co.displayName);

    const insightRowsHtml = renderProfileInsightRows(profiles || []);

    if (co.hiringFacts && co.hiringFacts.length) {
      return `
      <article class="company-playbook company-playbook--facts persona-card persona-card--${variant}" data-company="${escapeHtml(co.id)}">
        <header class="company-playbook__header">
          <div class="company-playbook__mark" style="${escapeHtml(markVars)}" aria-hidden="true">
            <span>${escapeHtml(co.initials || co.displayName.charAt(0))}</span>
          </div>
          <div class="company-playbook__titles">
            <h3 class="company-playbook__name">${nameHtml}</h3>
            ${rolesBlock}
          </div>
        </header>
        <div class="company-playbook__body">
          <p class="glance-title">${sectionTitle}</p>
          ${renderHiringFacts(co)}
          ${insightRowsHtml}
        </div>
      </article>`;
    }

    const markClass =
      "company-playbook__mark" + (co.squareMark ? " company-playbook__mark--square" : "");

    const steps = (co.processSteps || [])
      .map((step, i) => {
        const tags = renderProcessTags(step.tags);
        const body =
          step.highlightTerms && step.highlightTerms.length
            ? highlightTermsInText(step.text, step.highlightTerms)
            : escapeHtml(step.text);
        const uxrBadge = step.uxr
          ? `<span class="uxr-badge uxr-badge--step" title="Informed by user research">UXR</span>`
          : "";
        return `
        <li class="playbook-step${step.uxr ? " playbook-step--uxr" : ""}">
          <span class="playbook-step__num">${i + 1}</span>
          <div class="playbook-step__main">
            <p class="playbook-step__text">${body}</p>
            ${tags ? `<div class="playbook-step__tags">${tags}</div>` : ""}
            ${uxrBadge}
          </div>
        </li>`;
      })
      .join("");

    return `
      <article class="company-playbook persona-card persona-card--${variant}" data-company="${escapeHtml(co.id)}">
        <header class="company-playbook__header">
          <div class="${markClass}" style="${escapeHtml(markVars)}" aria-hidden="true">
            <span>${escapeHtml(co.initials || co.displayName.charAt(0))}</span>
          </div>
          <div class="company-playbook__titles">
            <h3 class="company-playbook__name">${nameHtml}</h3>
            ${rolesBlock}
          </div>
        </header>
        <div class="company-playbook__body">
          <p class="glance-title">${sectionTitle}</p>
          <ol class="playbook-steps">${steps}</ol>
          ${insightRowsHtml}
        </div>
      </article>`;
  }

  function renderPlaybook(activeUCId) {
    const useCases = [
      {
        id: 'hvh',
        label: 'High-Volume / Hourly Hiring',
        color: '#7c3aed',
        colorLight: 'rgba(124, 58, 237, 0.07)',
        colorBorder: 'rgba(124, 58, 237, 0.2)',
        verticals: 'Retail, Hospitality, BPO, Consumer Services, Logistics',
        roles: 'Cashiers, Customer Service Agents, Warehouse Staff, Food Service Workers',
        corePressure: 'Speed and recruiter capacity. The highest-quality hourly candidates are off the market within days. The company that reaches them first — not just contacts them, but interviews them — wins.',
        positioning: 'An always-on interviewer that qualifies every candidate the moment they apply, at any hour, without adding headcount.',
        approach: [
          { label: 'Modality', value: 'Voice-first. Matches the informal, conversational nature of real-world hourly interviews. Accessible via SMS link — no app, no login, one tap to begin.' },
          { label: 'Session length', value: '8–12 minutes. Mirrors the real-world interview: a short, direct manager conversation. Sessions beyond 15 minutes see sharp candidate drop-off.' },
          { label: 'Question focus', value: 'Availability and shift flexibility first — it is the primary screen in practice. Followed by reliability signals, character and teamwork, and one situational question grounded in a realistic scenario.' },
          { label: 'What we assess', value: 'Reliability, warmth, availability match, and retention signals. Not job knowledge — skills are trained on the floor. Character and consistency are the valid hiring signals at this level.' },
          { label: 'Tone', value: 'Conversational and warm. The AI interviewer is configured to sound like a friendly shift supervisor, not an HR system. Plain language, short questions, patient pacing.' },
          { label: 'Eligibility checks', value: 'Integrated into the session flow — right to work, physical requirements, shift availability, and knockout criteria are handled automatically before interview questions begin.' },
        ],
        outcomes: [
          '100% of applicants interviewed — no candidate left uncontacted due to recruiter capacity',
          'Shortlist delivered to recruiters by morning, scored and ranked',
          'Time from application to interview measured in seconds, not days',
          '80% reduction in manual recruiter screen time',
          'Seasonal and surge hiring absorbed without adding headcount',
        ],
        differentiators: [
          'Conducts the interview end-to-end — not a scheduling bot, not a chatbot, not a one-way video recording',
          'Apply & Interview triggers a live AI session the moment a candidate submits — no recruiter touch required',
          '92.5% interview completion rate with automated follow-ups',
        ],
      },
      {
        id: 'campus',
        label: 'Campus & Early Career',
        color: '#2563eb',
        colorLight: 'rgba(37, 99, 235, 0.07)',
        colorBorder: 'rgba(37, 99, 235, 0.2)',
        verticals: 'Finance, Consulting, Technology, Large Enterprise',
        roles: 'Interns, New Graduates, Entry-Level Analysts, DEI cohorts',
        corePressure: 'Consistency at scale. Every resume looks the same. Recruiters screen 3–5% of applicants based on GPA and school pedigree. The result is not a talent filter — it is a bias filter.',
        positioning: 'Structured, adaptive interviews for every applicant — not just the ones a recruiter had time to reach. The same rubric, across every campus, every cohort, every cycle.',
        approach: [
          { label: 'Modality', value: 'Video-led avatar interview. Gen Z candidates share interview experiences widely — the experience itself is part of the employer brand. A high-quality, two-way video interview signals that the company takes candidates seriously.' },
          { label: 'Session length', value: '20–30 minutes. Campus candidates expect a substantive first interaction. A session under 15 minutes reads as a perfunctory screen, not a genuine evaluation.' },
          { label: 'Question focus', value: 'STAR-based functional interviews. Problem-solving, communication, and leadership potential — assessed through structured behavioural questions with adaptive follow-ups. Not GPA. Not school. Actual conversational performance.' },
          { label: 'What we assess', value: 'Thinking quality, communication clarity, and role-specific functional competencies. Pre-built, science-backed question sets by role and industry ensure every candidate is evaluated against the same standard.' },
          { label: 'Tone', value: 'Professional and encouraging. This persona may be interviewing for the first time. The AI interviewer is warm enough to put candidates at ease, structured enough to produce evaluable signal.' },
          { label: 'DEI by design', value: 'Identical questions, identical rubric, identical evaluation — for every candidate regardless of school, background, or network. Structural fairness is built into the process, not bolted on.' },
        ],
        outcomes: [
          '100% of applicants receive a structured first-round interview',
          'Screener variance eliminated — no interviewer inconsistency across campuses or cohorts',
          'Recruiters spend time on top candidates, not on volume management',
          'Auditable, documented evaluations for every candidate — defensible under EEOC and DEI compliance review',
          'Campus brand protected — candidates receive a response, not silence',
        ],
        differentiators: [
          'Pre-built interview library with science-backed question sets by role and industry — deployable across 20+ campuses without customisation',
          'Adaptive follow-up probes depth — not a static video prompt that every candidate answers identically',
          'Interview Companion joins human interview days: suggests questions, auto-fills feedback forms',
        ],
        comingSoon: true,
      },
      {
        id: 'technical',
        label: 'Technical & Professional',
        color: '#d97706',
        colorLight: 'rgba(217, 119, 6, 0.07)',
        colorBorder: 'rgba(217, 119, 6, 0.2)',
        verticals: 'Technology, Engineering, SaaS, Professional Services',
        roles: 'Software Engineers, Sales / SDRs, Specialised Technical Roles, Technical Fluency Roles',
        corePressure: 'Skill validation and pipeline quality. Recruiters cannot assess technical depth. Candidates reach hiring manager panels unqualified. Expert time is consumed by filtering, not closing.',
        positioning: 'A technical skills gate before your experts get involved. The AI interviewer evaluates reasoning, not just answers — so hiring managers see only pre-validated candidates.',
        approach: [
          { label: 'Modality', value: 'Video-led avatar interview with integrated coding and whiteboarding capability. Two-way, adaptive, and live — not a recorded prompt or a static assessment.' },
          { label: 'Session length', value: '30–45 minutes. Technical evaluation requires depth. The AI interviewer probes reasoning, asks follow-up questions on technical claims, and surfaces how a candidate thinks — not just what they can recall.' },
          { label: 'Question focus', value: 'Technical reasoning and problem-solving. The AI goes beyond "does it compile?" — it asks "why?" and "how does this scale?" Functional interviews for PMs, SEs, and consultants cover role-specific competencies with adaptive follow-ups.' },
          { label: 'What we assess', value: 'Technical reasoning quality, problem-solving approach, communication of complex ideas, and role-specific functional competencies. Cheat detection and ID verification are integrated — not an afterthought.' },
          { label: 'Tone', value: 'Precise and intellectually engaged. The AI interviewer is configured to probe meaningfully — not to intimidate, but to surface genuine signal from candidates who actually understand the domain.' },
          { label: 'Fraud prevention', value: 'ID verification and cheat detection run throughout the session. With 1 in 4 candidate profiles projected to contain fabricated elements by 2028, identity integrity is a core feature, not an add-on.' },
        ],
        outcomes: [
          'Hiring manager and panel time protected — only pre-validated candidates advance',
          'Interview-to-offer ratio improves as unqualified candidates are filtered before expert involvement',
          'Technical bar standardised across all recruiters and hiring teams',
          'Match score correlated with +11.9% promotability and 26% decrease in attrition',
          'Senior engineer time reclaimed from first-round filtering and returned to building',
        ],
        differentiators: [
          'Evaluates reasoning in real time — HireVue\'s CodeVue runs static on-demand challenges with no adaptive follow-up',
          'One continuous AI flow: screens, interviews, and evaluates — no fragmented multi-tool handoffs',
          'Workday has no native coding interview capability; Eightfold owns the full technical evaluation loop',
        ],
      },
      {
        id: 'trades',
        label: 'Skilled Trades / Shift-Based',
        color: '#db2777',
        colorLight: 'rgba(219, 39, 119, 0.07)',
        colorBorder: 'rgba(219, 39, 119, 0.2)',
        verticals: 'Automotive, Healthcare, Manufacturing, Construction',
        roles: 'Technicians, Forklift Operators, Nurses / CNAs, Shift-Based Skilled Labor',
        corePressure: 'Access and compliance. Qualified candidates are on job sites and shifts — not checking email during recruiter hours. Every hire carries licensing, safety, or regulatory requirements that must be verified before anyone steps on a floor.',
        positioning: 'Credential verification and structured skills assessment delivered on the candidate\'s schedule — immediately after application, or at 10pm between shifts.',
        approach: [
          { label: 'Modality', value: 'Video-led avatar interview, accessible via SMS on any phone. No app download, no login required. Candidates can complete the interview between shifts, after hours, or from a job site.' },
          { label: 'Session length', value: '20–35 minutes across two phases. Phase 1: credential verification — license type, number, state, expiration, and role-specific certifications confirmed upfront. Phase 2: structured trade conversation assessing experience, field judgment, and shift availability.' },
          { label: 'Question focus', value: 'Credential confirmation first. Then: trade-specific experience, systems and equipment familiarity, a realistic field judgment scenario, safety record, and on-call availability. Questions use correct trade terminology — not generic screening language.' },
          { label: 'What we assess', value: 'Credential validity, relevant trade experience, field reasoning quality, availability match, and compliance readiness. The goal is to deliver ready-to-work candidates to floor supervisors — not just screened ones.' },
          { label: 'Tone', value: 'Direct, knowledgeable, and collegial. The AI interviewer is configured to sound like an experienced field supervisor or project manager — not a generalist HR coordinator. Trade terminology is required.' },
          { label: 'Compliance', value: 'Knockout questions validate credentials inside the interview — no license, no pipeline entry. ISO 42001 certified. CEFR-based language proficiency assessed in 22+ languages. Full audit trail for every verification.' },
        ],
        outcomes: [
          'Credentials verified at the point of application — not late in the process when the cost of a failed hire is highest',
          'Candidates reached and qualified on their schedule — 24/7 availability eliminates shift-timing mismatch',
          'Compliance documentation automated and auditable — defensible under regulatory review',
          'Staffing agency dependency reduced — AI interview at $9/session vs $3K–8K per agency placement',
          'Ready-to-work candidates delivered to floor supervisors with scored, documented evaluations',
        ],
        differentiators: [
          'Credential verification integrated inside the interview — Paradox schedules but does not interview or verify credentials',
          'CEFR-based language proficiency assessed in 22+ languages inside the session — no separate test needed',
          'ISO 42001 certified for regulated industries — complete audit trail from application to offer',
        ],
      },
    ];

    const active = useCases.find(uc => uc.id === activeUCId) || useCases[0];

    // ── Internal tab strip ──
    const tabStrip = useCases.map(uc => {
      const isActive = uc.id === active.id;
      return `<button type="button" class="playbook-uc-tab${isActive ? ' playbook-uc-tab--active' : ''}"
        data-uc="${uc.id}"
        aria-selected="${isActive ? 'true' : 'false'}"
        style="--uc-color: ${uc.color}"
      >${escapeHtml(uc.label)}${uc.comingSoon ? ' <span class="playbook-coming-soon">Research coming soon</span>' : ''}</button>`;
    }).join('');

    // ── Active use case panel ──
    const uc = active;

    const approachItems = uc.approach.map(a =>
      `<li class="playbook-approach-item">
        <span class="playbook-approach-item__label">${escapeHtml(a.label)}</span>
        <span class="playbook-approach-item__value">${escapeHtml(a.value)}</span>
      </li>`
    ).join('');

    const outcomeItems = uc.outcomes.map(o =>
      `<li class="playbook-outcome-item">${escapeHtml(o)}</li>`).join('');

    const diffItems = uc.differentiators.map(d =>
      `<li class="playbook-diff-item">${escapeHtml(d)}</li>`).join('');

    const panel = `
      <article class="playbook-use-case" style="--uc-color: ${uc.color}; --uc-color-light: ${uc.colorLight}; --uc-color-border: ${uc.colorBorder}">
        <header class="playbook-use-case__header">
          <div class="playbook-use-case__meta">
            <span class="playbook-meta-item"><span class="playbook-meta-label">Verticals</span>${escapeHtml(uc.verticals)}</span>
            <span class="playbook-meta-divider" aria-hidden="true">·</span>
            <span class="playbook-meta-item"><span class="playbook-meta-label">Roles</span>${escapeHtml(uc.roles)}</span>
          </div>
        </header>

        <div class="playbook-use-case__body">
          <div class="playbook-pressure-block">
            <span class="playbook-block-label">Core pressure</span>
            <p class="playbook-pressure-text">${escapeHtml(uc.corePressure)}</p>
          </div>

          <div class="playbook-positioning-block">
            <span class="playbook-block-label">Our approach</span>
            <p class="playbook-positioning-text">${escapeHtml(uc.positioning)}</p>
          </div>

          <div class="playbook-approach-block">
            <span class="playbook-block-label">How we configure the interview</span>
            <ul class="playbook-approach-list">${approachItems}</ul>
          </div>

          <div class="playbook-two-col">
            <div class="playbook-outcomes-block">
              <span class="playbook-block-label">What the customer gets</span>
              <ul class="playbook-outcomes-list">${outcomeItems}</ul>
            </div>
            <div class="playbook-diff-block">
              <span class="playbook-block-label">Why Eightfold</span>
              <ul class="playbook-diff-list">${diffItems}</ul>
            </div>
          </div>
        </div>
      </article>`;

    return `
      <div class="playbook-root">
        <div class="playbook-intro">
          <span class="playbook-intro__kicker">AI Interviewer Playbook</span>
          <h2 class="playbook-intro__title">How we approach each use case</h2>
          <p class="playbook-intro__sub">Four hiring contexts. Four distinct interview configurations. Each grounded in how these roles are actually filled — and where the current process breaks down.</p>
        </div>
        <div class="playbook-uc-tabs" role="tablist" aria-label="Use case">${tabStrip}</div>
        <div class="playbook-panel">${panel}</div>
      </div>`;
  }

  function renderCandidateScorecard() {

    const TIER_META = {
      gates:       { label: 'Tier 1 — Eligibility Gates',    sublabel: 'Hard knockout. Automated. No exceptions.',                     color: '#dc2626', colorLight: 'rgba(220,38,38,0.06)',  colorBorder: 'rgba(220,38,38,0.18)'  },
      core:        { label: 'Tier 2 — Core Fit',             sublabel: 'Must-have signals. Assessed in the AI interview.',              color: '#7c3aed', colorLight: 'rgba(124,58,237,0.06)', colorBorder: 'rgba(124,58,237,0.18)' },
      accelerators:{ label: 'Tier 3 — Accelerators',         sublabel: 'Good-to-have. Boosts candidate ranking when present.',         color: '#d97706', colorLight: 'rgba(217,119,6,0.06)',  colorBorder: 'rgba(217,119,6,0.18)'  },
      retention:   { label: 'Tier 4 — Retention Predictors', sublabel: 'Standout signals. Differentiates the shortlist.',              color: '#16a34a', colorLight: 'rgba(22,163,74,0.06)',  colorBorder: 'rgba(22,163,74,0.18)'  },
    };

    const roles = [
      {
        id: 'warehouse',
        title: 'Warehouse / Fulfillment Associate',
        employers: 'Amazon Fulfillment · UPS · FedEx · ABM Industries',
        description: 'Pickers, packers, sorters, loaders — high-volume physical roles with safety requirements and shift-based scheduling.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',         rationale: 'Must cover required shifts — morning, overnight, weekend. A great candidate on the wrong schedule is an immediate no-hire.' },
            { signal: 'Physical capability confirmed',    rationale: 'Ability to lift role-specific weight threshold (typically 25–70 lbs) and stand for extended periods. Safety and operational requirement.' },
            { signal: 'Work authorisation',               rationale: 'Legal right to work in the role jurisdiction. Non-negotiable at application.' },
            { signal: 'Background check consent',         rationale: 'Required across all warehouse employers in research. Consent must be confirmed before advancing.' },
            { signal: 'Drug test consent',                rationale: 'Required at Amazon, UPS, FedEx, and ABM. Oral swab typically administered at orientation. Consent confirmed here.' },
          ],
          core: [
            { signal: 'Reliability and attendance history',   rationale: 'The primary predictor of value in physical shift roles. Candidates who can articulate consistent attendance — and explain any gaps honestly — score higher than those who cannot.' },
            { signal: 'Composure under physical pressure',    rationale: 'Warehouse roles involve pace, noise, and physical demand. Candidates who show awareness of and comfort with that environment are meaningfully more retainable.' },
            { signal: 'Safety-conscious mindset',             rationale: 'Injury incidents are a top-line cost driver for warehouse employers. Candidates who proactively reference safety habits — without prompting — are a meaningful positive signal.' },
            { signal: 'Team orientation',                     rationale: 'Shift teams depend on each other directly. Candidates who describe work in terms of the team — not just their own tasks — signal better fit.' },
            { signal: 'Follows instructions accurately',      rationale: 'Process adherence is critical in pick-and-pack and sort operations. Candidates who describe checking their work or asking when unsure are preferable to those who project overconfidence.' },
          ],
          accelerators: [
            { signal: 'Prior warehouse or logistics experience', rationale: 'Reduces ramp-up time. Familiarity with conveyor systems, scanning equipment, or fulfilment flow is immediately useful.' },
            { signal: 'Forklift or equipment certification',    rationale: 'Not required for most entry-level roles but meaningfully expands scheduling flexibility and reduces training investment.' },
            { signal: 'Multilingual capability',               rationale: 'Spanish bilingualism is particularly valuable in US warehouse environments. Enables communication across team and with supervisors.' },
            { signal: 'Inventory or WMS system familiarity',   rationale: 'Experience with warehouse management systems (even basic scan-and-confirm workflows) accelerates onboarding.' },
          ],
          retention: [
            { signal: 'Growth orientation',                    rationale: 'Research shows internal mobility is a strong retention driver. Candidates who express interest in learning more or moving into team lead roles are significantly more likely to stay beyond 6 months.' },
            { signal: 'Financial stability signals',           rationale: 'Candidates who describe consistent prior employment — even in unrelated roles — signal that work is a stable part of their life, not a stopgap.' },
            { signal: 'Realistic role awareness',              rationale: 'Candidates who accurately describe the demands of the role before starting — pace, physicality, shift structure — show lower early attrition. Unrealistic expectations are the leading cause of 30-day dropout.' },
            { signal: 'Referral source',                       rationale: 'Referred candidates consistently show longer tenure than job-board applicants across warehouse employers. Referral is itself a soft credential signal.' },
          ],
        },
      },
      {
        id: 'cashier',
        title: 'Cashier / Customer Service Associate',
        employers: 'McDonald\'s · Target · Kroger · Dollar General · Home Depot',
        description: 'Front-of-house transaction and service roles in retail and QSR — high customer contact, scripted interaction, and shift-based scheduling.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',         rationale: 'Nights, weekends, and split shifts are the operating reality. A candidate who cannot cover required shifts cannot be scheduled.' },
            { signal: 'Work authorisation',               rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Background check consent',         rationale: 'Required at Target, Home Depot, Kroger, and most franchise QSR locations. Consent confirmed before advancing.' },
            { signal: 'Age requirement where applicable', rationale: 'Some roles (alcohol sales, certain equipment) have minimum age requirements. Confirmed as a knockout criterion.' },
          ],
          core: [
            { signal: 'Warmth and customer orientation',    rationale: 'The primary signal employers screen for in person. Candidates who speak naturally about helping people — not just completing transactions — match what managers are looking for. Character over credentials.' },
            { signal: 'Composure with difficult customers', rationale: 'Every research participant in QSR and retail described being asked about upset customers. This is the central interview question for a reason — it surfaces emotional regulation under social pressure.' },
            { signal: 'Reliability signals',               rationale: 'Transportation to work, consistency in prior roles, and clear explanation of any gaps are the most-cited screening factors across all customer-facing employers in the research.' },
            { signal: 'Teamwork orientation',              rationale: 'Front-of-house roles require constant handoffs. Candidates who describe work as a shared effort — covering for teammates, helping during rush — are meaningfully stronger fits.' },
            { signal: 'Honest self-awareness',             rationale: 'Candidates who give coached answers to obvious questions provide no signal. Those who describe specific past situations — including difficulties — give the scoring model something to work with.' },
          ],
          accelerators: [
            { signal: 'Prior retail or QSR experience',   rationale: 'Reduces training time. Familiarity with POS systems, cash handling, and customer service scripts is immediately useful even if not required.' },
            { signal: 'Cash handling experience',         rationale: 'Directly relevant for cashier roles. Reduces error rate and shrink risk in first weeks.' },
            { signal: 'Multilingual capability',          rationale: 'Spanish bilingualism is particularly valuable in customer-facing roles. Directly improves customer experience and widens the candidate\'s scheduling utility.' },
            { signal: 'Cross-training willingness',       rationale: 'Candidates open to covering multiple stations or departments give managers more scheduling flexibility — a meaningful operational benefit.' },
          ],
          retention: [
            { signal: 'Growth orientation',               rationale: 'QSR and retail have strong internal promotion paths (shift supervisor, team lead, assistant manager). Candidates who express interest in growing within the role stay longer and are cheaper to promote than external hires.' },
            { signal: 'Fit with role demands',            rationale: 'Candidates who describe the pace, the customer volume, and the physical demands accurately before starting show dramatically lower 30-day dropout. Only 54% of QSR employees reach the 90-day mark — realistic expectations at hire are the intervention.' },
            { signal: 'Community or local ties',          rationale: 'Candidates who live near the location and have community connections — family, school, neighbourhood — show longer average tenure. Transient candidates show shorter tenure regardless of interview performance.' },
            { signal: 'Scheduling flexibility headroom',  rationale: 'Candidates with slightly more availability than the minimum required give managers buffer to absorb no-shows and surge shifts. This is a meaningful operational differentiator between equally qualified candidates.' },
          ],
        },
      },
      {
        id: 'qsr',
        title: 'QSR Crew Member / Food Service Worker',
        employers: 'McDonald\'s · Chick-fil-A · Starbucks · Whole Foods',
        description: 'Kitchen, counter, and delivery roles in quick-service and café environments — values-driven hiring, high pace, and character-first screening.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',         rationale: 'QSR operates across early morning, lunch, dinner, and late-night windows. Availability must match operational need — not just "I\'m flexible".' },
            { signal: 'Work authorisation',               rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Food handler eligibility',         rationale: 'Some jurisdictions require food handler certification or the willingness to obtain one. Confirmed as a knockout criterion where applicable.' },
            { signal: 'Driver\'s license where required', rationale: 'Delivery roles at Chick-fil-A and some McDonald\'s locations require a valid license. Confirmed as role-specific knockout.' },
          ],
          core: [
            { signal: 'Warmth and values alignment',      rationale: 'Chick-fil-A explicitly screens for "Second Mile Service" orientation. Starbucks screens for teamwork and pressure handling. Across all QSR employers in the research, character is the primary screen — not job knowledge.' },
            { signal: 'Composure under service pressure', rationale: 'Rush periods are the defining operational challenge. Candidates who can describe staying calm, focused, and helpful when things go wrong are the signal employers are paying for.' },
            { signal: 'Reliability and attendance',       rationale: 'The most operationally costly failure in QSR is the no-show. Candidates who demonstrate a pattern of showing up — in any context, not just prior food service — are meaningfully preferable.' },
            { signal: 'Teamwork in fast-paced context',   rationale: 'Kitchen and counter roles require constant coordination. Candidates who describe covering for teammates, communicating during rush, or helping train new staff are top-tier signals.' },
            { signal: 'Customer empathy',                 rationale: 'Distinct from warmth — this is the ability to read and respond to a customer\'s emotional state. Candidates who describe specific instances of de-escalation or going out of their way for a customer score significantly higher.' },
          ],
          accelerators: [
            { signal: 'Prior QSR or food service experience', rationale: 'Reduces training time. Familiarity with kitchen equipment, order flow, and service scripts is immediately useful. Not required — Chick-fil-A and Starbucks both hire first-timers — but accelerates ramp-up.' },
            { signal: 'Food safety awareness',            rationale: 'Candidates who reference temperature handling, cross-contamination, or hygiene without prompting show operational maturity that reduces training overhead.' },
            { signal: 'Multilingual capability',          rationale: 'Spanish bilingualism is particularly valuable in customer-facing QSR roles. Extends the candidate\'s utility across customer interactions and team communication.' },
            { signal: 'Barista or specialty beverage experience', rationale: 'Specifically relevant for Starbucks and café roles. Familiarity with espresso workflow, drink customisation, and order queuing is a meaningful accelerator.' },
          ],
          retention: [
            { signal: 'Values fit — not just role fit',   rationale: 'Chick-fil-A\'s 2–3 interview process is explicitly designed to surface values alignment. Candidates hired on values stay longer than candidates hired on availability. The AI interview should surface this signal — not just screen for schedule.' },
            { signal: 'Growth orientation',               rationale: 'Starbucks and McDonald\'s both have internal promotion paths. Candidates who express interest in becoming a trainer, shift lead, or supervisor are significantly more retainable than those who describe the role as temporary.' },
            { signal: 'Peer referral source',             rationale: 'Friend or family referral is the strongest single retention predictor across QSR employers in the research. Referred candidates show longer tenure, faster onboarding, and lower early attrition.' },
            { signal: 'Workload self-awareness',          rationale: 'Research shows workload is the number one reason QSR workers quit — not pay. Candidates who accurately describe what a peak lunch rush feels like, and express genuine readiness for it, are meaningfully more retainable than those who underestimate it.' },
          ],
        },
      },
    ];

    const tierKeys = ['gates', 'core', 'accelerators', 'retention'];

    function renderTier(tierKey, signals) {
      const meta = TIER_META[tierKey];
      const rows = signals.map(s => `
        <div class="sc-signal-row">
          <div class="sc-signal-name">${escapeHtml(s.signal)}</div>
          <p class="sc-signal-rationale">${escapeHtml(s.rationale)}</p>
        </div>`).join('');
      return `
        <div class="sc-tier" style="--tier-color:${meta.color};--tier-light:${meta.colorLight};--tier-border:${meta.colorBorder}">
          <div class="sc-tier__header">
            <span class="sc-tier__label">${escapeHtml(meta.label)}</span>
            <span class="sc-tier__sublabel">${escapeHtml(meta.sublabel)}</span>
          </div>
          <div class="sc-tier__signals">${rows}</div>
        </div>`;
    }

    const roleCards = roles.map((role, i) => {
      const tiersHtml = tierKeys.map(k => renderTier(k, role.tiers[k])).join('');
      return `
        <article class="sc-role-card" style="--stagger:${i}" id="sc-role-${role.id}">
          <header class="sc-role-card__header">
            <h3 class="sc-role-card__title">${escapeHtml(role.title)}</h3>
            <p class="sc-role-card__employers">${escapeHtml(role.employers)}</p>
            <p class="sc-role-card__desc">${escapeHtml(role.description)}</p>
          </header>
          <div class="sc-role-card__tiers">${tiersHtml}</div>
        </article>`;
    }).join('');

    return `
      <div class="scorecard-root">
        <div class="scorecard-intro">
          <div class="scorecard-intro__title-row">
            <span class="scorecard-intro__kicker">Candidate Scorecard</span>
            <span class="scorecard-wip-badge">Work in progress</span>
          </div>
          <h2 class="scorecard-intro__title">High-Volume Hiring — Role definitions</h2>
          <p class="scorecard-intro__sub">Eightfold defines what good looks like for each HVH role before the AI interview begins. The four tiers form the scoring framework — eligibility gates are automated knockouts, core fit is assessed in the interview, accelerators and retention predictors differentiate the shortlist. Tier weights are co-configured with each customer.</p>
          <div class="scorecard-intro__model">
            <div class="scorecard-model-block">
              <span class="scorecard-model-label">Eightfold provides</span>
              <p class="scorecard-model-text">Baseline signal definitions, rationale, and tier structure — grounded in hiring research and retention data across the role type.</p>
            </div>
            <div class="scorecard-model-divider" aria-hidden="true">+</div>
            <div class="scorecard-model-block">
              <span class="scorecard-model-label">Customer configures</span>
              <p class="scorecard-model-text">Tier weights, role-specific knockouts, company-specific values signals, and any industry or location-specific requirements.</p>
            </div>
            <div class="scorecard-model-divider" aria-hidden="true">=</div>
            <div class="scorecard-model-block scorecard-model-block--output">
              <span class="scorecard-model-label">Output</span>
              <p class="scorecard-model-text">A curated shortlist scored against a definition of "good" that is specific to this company, this role, and this hiring context.</p>
            </div>
          </div>
        </div>

        <div class="scorecard-tier-legend">
          ${tierKeys.map(k => {
            const m = TIER_META[k];
            return `<div class="sc-legend-item" style="--tier-color:${m.color};--tier-light:${m.colorLight};--tier-border:${m.colorBorder}">
              <span class="sc-legend-dot"></span>
              <div>
                <span class="sc-legend-label">${escapeHtml(m.label)}</span>
                <span class="sc-legend-sub">${escapeHtml(m.sublabel)}</span>
              </div>
            </div>`;
          }).join('')}
        </div>

        <div class="scorecard-roles">${roleCards}</div>
      </div>`;
  }

  function renderAiDesignGuidance(bundle, personaId) {
    const guide = bundle.aiDesignGuidance;
    if (!guide) return '<p class="drill-empty">No AI design guidance available for this persona yet.</p>';

    const variant = getVariant(personaId);

    const ICONS = {
      clock: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
      message: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      list: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/></svg>',
      phone: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
      warning: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
    };

    const modalHtml = `
      <div class="ai-guide__modal-rec">
        <div class="ai-guide__modal-primary">
          <span class="ai-guide__modal-label">Primary modality</span>
          <strong class="ai-guide__modal-value">${escapeHtml(guide.modalRecommendation.primary)}</strong>
          <span class="ai-guide__modal-fallback-tag">Fallback: ${escapeHtml(guide.modalRecommendation.fallback)}</span>
        </div>
        <p class="ai-guide__modal-rationale">${escapeHtml(guide.modalRecommendation.rationale)}</p>
        <div class="ai-guide__modal-triggers">
          <span class="ai-guide__triggers-label">Switch to text fallback when:</span>
          <ul class="ai-guide__triggers-list">
            ${guide.modalRecommendation.fallbackTriggers.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
      </div>`;

    const sectionsHtml = guide.sections.map(section => {
      const isWarning = section.id === 'failure-modes';
      const icon = ICONS[section.icon] || '';
      const itemsHtml = section.items.map(item => `
        <div class="ai-guide__item${isWarning ? ' ai-guide__item--warning' : ''}">
          <div class="ai-guide__item-label">${escapeHtml(item.label)}</div>
          <div class="ai-guide__item-body">
            <p class="ai-guide__item-guidance">${escapeHtml(item.guidance)}</p>
            ${item.failureMode ? `
              <div class="ai-guide__item-failure">
                <span class="ai-guide__failure-flag">If ignored →</span>
                <span class="ai-guide__failure-text">${escapeHtml(item.failureMode)}</span>
              </div>` : ''}
          </div>
        </div>`).join('');

      return `
        <details class="ai-guide__section" open>
          <summary class="ai-guide__section-summary">
            <span class="ai-guide__section-icon${isWarning ? ' ai-guide__section-icon--warning' : ''}">${icon}</span>
            <span class="ai-guide__section-title">${escapeHtml(section.title)}</span>
          </summary>
          <div class="ai-guide__section-body">${itemsHtml}</div>
        </details>`;
    }).join('');

    return `
      <div class="ai-design-guide ai-design-guide--${variant}">
        <div class="ai-guide__intro">
          <span class="ai-guide__kicker">AI Interview Design Guidance</span>
          <p class="ai-guide__intro-sub">Design specifications for building an AI-conducted voice interview experience for this persona. Covers session design, tone, question strategy, candidate UX, and failure modes.</p>
        </div>
        ${modalHtml}
        <div class="ai-guide__sections">${sectionsHtml}</div>
      </div>`;
  }

  function renderCard(variant, head, data) {
    const { badge, title, subtitle } = head;
    return `
      <article class="persona-card persona-card--${variant}">
        <header class="persona-card__head">
          <span class="persona-badge">${escapeHtml(badge)}</span>
          <h3>${escapeHtml(title)}</h3>
          <p class="subtitle">${escapeHtml(subtitle)}</p>
        </header>
        <div class="persona-card__body">
          <p class="summary">${escapeHtml(data.summary)}</p>
          <p class="glance-title">At a glance</p>
          <div class="timeline">${renderTimeline(data.atAGlance)}</div>
          <p class="glance-title">Detail — expand each stage</p>
          ${renderPhases(data.phases)}
          ${renderQuotes(data.quotes)}
        </div>
      </article>`;
  }

  function parseHash() {
    const raw = (location.hash || "").replace(/^#/, "").trim();
    if (!raw) return { personaId: "customerFacing", companyId: null };
    const sep = raw.indexOf("--");
    if (sep === -1) return { personaId: raw, companyId: null };
    return { personaId: raw.slice(0, sep), companyId: raw.slice(sep + 2) || null };
  }

  function setHash(personaId, companyId) {
    const h = companyId ? `${personaId}--${companyId}` : personaId;
    try {
      history.replaceState(null, "", `#${h}`);
    } catch (_) {
      /* ignore */
    }
  }

  function init() {
    const DATA = window.INTERVIEW_DATA;
    if (!DATA) return;

    const overviewMount = document.getElementById("persona-overview-mount");
    const drillRoot = document.getElementById("company-drill-root");
    const userProfilesMount = document.getElementById("persona-user-profiles-mount");
    const sourcesLinkMount = document.getElementById("sources-link-mount");
    const personaTabs = document.querySelectorAll(".persona-type-tab");
    const companyFilterBar = document.getElementById("company-filter-bar");
    const companyFilterTabs = document.getElementById("company-filter-tabs");
    if (!overviewMount || !drillRoot || !userProfilesMount || !personaTabs.length || !companyFilterBar || !companyFilterTabs)
      return;

    const workspaceViewTabs = document.querySelectorAll('.workspace-view-tab');
    const aiGuideMount = document.getElementById('ai-guide-mount');
    const playbookMount = document.getElementById('playbook-mount');
    const scorecardMount = document.getElementById('scorecard-mount');
    const personaStrip = document.getElementById('persona-strip');
    const personaWorkspace = document.getElementById('persona-workspace');
    let activeView = 'research';
    let activePlaybookUC = 'hvh';

    function setWorkspaceView(view) {
      activeView = view;
      const showResearch  = view === 'research';
      const showAi        = view === 'ai';
      const showPlaybook  = view === 'playbook';
      const showScorecard = view === 'scorecard';

      workspaceViewTabs.forEach(t => {
        t.setAttribute('aria-selected', t.dataset.view === view ? 'true' : 'false');
      });

      // Persona strip + workspace only for research and design guidance
      const showPersonaPanel = showResearch || showAi;
      personaStrip.hidden    = !showPersonaPanel;
      personaWorkspace.hidden = !showPersonaPanel;

      if (showPersonaPanel) {
        // Overview block only shown in Research view
        overviewMount.parentElement.hidden = !showResearch;
        companyFilterBar.hidden  = !showResearch;
        drillRoot.hidden         = !showResearch;
        userProfilesMount.hidden = !showResearch;

        if (showAi) {
          const bundle = DATA[statePersona];
          aiGuideMount.innerHTML = renderAiDesignGuidance(bundle, statePersona);
          aiGuideMount.hidden = false;
        } else {
          aiGuideMount.hidden = true;
          aiGuideMount.innerHTML = '';
        }

        if (showResearch) {
          renderSourcesLink(statePersona);
        } else {
          sourcesLinkMount.hidden = true;
        }
      }

      if (showPlaybook) {
        playbookMount.innerHTML = renderPlaybook(activePlaybookUC);
        playbookMount.hidden = false;
      } else {
        playbookMount.hidden = true;
        playbookMount.innerHTML = '';
      }

      if (showScorecard) {
        scorecardMount.innerHTML = renderCandidateScorecard();
        scorecardMount.hidden = false;
      } else {
        scorecardMount.hidden = true;
        scorecardMount.innerHTML = '';
      }
    }

    workspaceViewTabs.forEach(tab => {
      tab.addEventListener('click', () => setWorkspaceView(tab.dataset.view));
    });

    // Playbook internal tab navigation (event delegation)
    playbookMount.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-uc]');
      if (!btn) return;
      activePlaybookUC = btn.dataset.uc;
      playbookMount.innerHTML = renderPlaybook(activePlaybookUC);
    });

    let statePersona = "customerFacing";

    function companyIds(personaId) {
      return (DATA[personaId].companies || []).map((c) => c.id);
    }

    function findCompany(personaId, companyId) {
      return (DATA[personaId].companies || []).find((c) => c.id === companyId);
    }

    /** First company in the list is the default selection (e.g. McDonald’s, Amazon Fulfillment). */
    function defaultCompanyId(personaId) {
      const ids = companyIds(personaId);
      return ids[0] || null;
    }

    function normalizeCompanyId(personaId, companyId) {
      const ids = companyIds(personaId);
      if (!ids.length) return null;
      if (companyId && ids.includes(companyId)) return companyId;
      return ids[0];
    }

    function renderPersonaOverviewInner(bundle, personaId) {
      const variant = getVariant(personaId);
      const commonCard =
        bundle.common.sharedCards && bundle.common.sharedCards.length
          ? renderRichPersonaCommonCard(bundle, variant)
          : renderCard(
              variant,
              {
                badge: "Across employers",
                title: "Typical interview process for this persona",
                subtitle: bundle.personaSubtitle,
              },
              bundle.common
            );
      return commonCard;
    }

    function renderCompanyFilterBar(personaId, selectedCompanyId) {
      const bundle = DATA[personaId];
      const companyBtns = bundle.companies
        .map((c) => {
          const sel = selectedCompanyId === c.id;
          const mark = renderCompanyTabMark(c);
          return `
        <button type="button" class="company-tab company-tab--dense ${mark ? "company-tab--brand" : ""}" role="tab" data-company="${escapeHtml(c.id)}" aria-selected="${sel ? "true" : "false"}" aria-controls="company-drill-root" id="company-tab-${escapeHtml(c.id)}" title="${escapeAttr(c.displayName)}">
          ${mark}
          <span class="company-tab__label">${escapeHtml(c.displayName)}</span>
        </button>`;
        })
        .join("");
      companyFilterTabs.innerHTML = companyBtns;
    }

    function renderDrill(personaId, companyId) {
      const variant = getVariant(personaId);

      if (!companyId) {
        drillRoot.innerHTML = `<p class="drill-empty">No employers listed for this persona.</p>`;
        return;
      }

      const co = findCompany(personaId, companyId);
      if (!co) {
        drillRoot.innerHTML = `<p class="drill-empty">Unknown company for this persona.</p>`;
        return;
      }

      const bundle = DATA[personaId];
      const profiles = (bundle.common.userProfiles || []).filter(p => p.companyId === companyId);

      let playbookHtml;
      if (
        (co.hiringFacts && co.hiringFacts.length) ||
        (co.processSteps && co.processSteps.length)
      ) {
        playbookHtml = renderCompanyPlaybook(co, variant, profiles);
      } else {
        playbookHtml = renderCard(
          variant,
          {
            badge: "Company-specific",
            title: co.displayName,
            subtitle: co.tagline,
          },
          co
        );
      }

      const sourcesHtml = renderResearchSourcesSection(profiles, bundle, variant);
      drillRoot.innerHTML = `<div class="drill-with-profiles">${playbookHtml}</div>${sourcesHtml}`;
    }

    function renderSourcesLink(personaId) {
      if (!sourcesLinkMount) return;
      const srcMap = {
        customerFacing: "sources-customer-facing.html",
        operations: "sources.html",
      };
      const href = srcMap[personaId];
      if (!href) { sourcesLinkMount.hidden = true; return; }
      sourcesLinkMount.hidden = false;
      sourcesLinkMount.innerHTML = `<a href="${href}">Sources</a>`;
    }

    function activatePersona(personaId, companyId, opts) {
      const { skipHash, scrollToPlaybook } = opts || {};
      if (!PERSONA_ORDER.includes(personaId)) personaId = "customerFacing";

      statePersona = personaId;
      const co = normalizeCompanyId(personaId, companyId);
      const bundle = DATA[personaId];

      personaTabs.forEach((t) => {
        const sel = t.dataset.persona === personaId;
        t.setAttribute("aria-selected", sel ? "true" : "false");
        t.tabIndex = sel ? 0 : -1;
      });

      overviewMount.innerHTML = renderPersonaOverviewInner(bundle, personaId);
      renderCompanyFilterBar(personaId, co);
      renderDrill(personaId, co);
      userProfilesMount.innerHTML = renderUserProfilesAccordion(bundle, personaId);
      renderSourcesLink(personaId);

      if (!skipHash) setHash(personaId, co);

      if (scrollToPlaybook && co) {
        requestAnimationFrame(() => {
          drillRoot.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      }

      if (activeView === 'ai') {
        setWorkspaceView('ai');
      }
    }

    function applyHash() {
      let { personaId, companyId } = parseHash();
      if (!PERSONA_ORDER.includes(personaId)) personaId = "customerFacing";
      companyId = normalizeCompanyId(personaId, companyId);
      activatePersona(personaId, companyId, { skipHash: true, scrollToPlaybook: false });
      setHash(personaId, companyId);
    }

    personaTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const pid = tab.dataset.persona;
        activatePersona(pid, null, { scrollToPlaybook: false });
      });
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          const i = PERSONA_ORDER.indexOf(tab.dataset.persona);
          const next =
            e.key === "ArrowRight"
              ? (i + 1) % PERSONA_ORDER.length
              : (i - 1 + PERSONA_ORDER.length) % PERSONA_ORDER.length;
          const nextTab = document.querySelector(`.persona-type-tab[data-persona="${PERSONA_ORDER[next]}"]`);
          nextTab?.focus();
          activatePersona(PERSONA_ORDER[next], null, { scrollToPlaybook: false });
        }
      });
    });

    companyFilterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".company-tab[data-company]");
      if (btn && btn.dataset.company) {
        activatePersona(statePersona, btn.dataset.company, { scrollToPlaybook: true });
      }
    });

    window.addEventListener("hashchange", applyHash);

    applyHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
