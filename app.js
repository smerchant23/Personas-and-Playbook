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
      gates:       { label: 'Tier 1 — Eligibility Gates',     sublabel: 'Hard knockout. Automated. No exceptions.',                color: '#dc2626', colorLight: 'rgba(220,38,38,0.06)',  colorBorder: 'rgba(220,38,38,0.18)'  },
      core:        { label: 'Tier 2 — Core Fit',              sublabel: 'Must-have signals. Assessed in the AI interview.',         color: '#7c3aed', colorLight: 'rgba(124,58,237,0.06)', colorBorder: 'rgba(124,58,237,0.18)' },
      accelerators:{ label: 'Tier 3 — Accelerators',          sublabel: 'Good-to-have. Boosts candidate ranking when present.',    color: '#d97706', colorLight: 'rgba(217,119,6,0.06)',  colorBorder: 'rgba(217,119,6,0.18)'  },
      retention:   { label: 'Tier 4 — Retention Predictors',  sublabel: 'Standout signals. Differentiates the shortlist.',         color: '#16a34a', colorLight: 'rgba(22,163,74,0.06)',  colorBorder: 'rgba(22,163,74,0.18)'  },
    };

    const COMPANIES = [
      // ── CUSTOMER FACING ──────────────────────────────────────────────
      {
        id: 'mcdonalds',
        displayName: "McDonald's",
        logoUrl: 'logos/mcdonalds.png',
        accent: '#FFC72C',
        group: 'Customer Facing',
        role: 'Crew Member · Cashier · Cook',
        context: 'Franchised QSR with the fastest time-to-hire in the research group (~1 week). AI chatbot Olivia handles initial online screening. Walk-in paper applications still accepted at store level. No drug test confirmed by research participant.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'McDonald\'s operates across breakfast, lunch, dinner, and overnight windows. Availability must map to the specific location\'s open shifts — not just "flexible."' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application. Franchise-level requirement.' },
            { signal: 'Age requirement',                rationale: 'Minimum age varies by franchise and local labour law. Some equipment and roles have minimum age thresholds. Confirmed as knockout.' },
            { signal: 'Background check consent',       rationale: 'Franchise-dependent but broadly required. Consent confirmed before advancing to interview.' },
          ],
          core: [
            { signal: 'Composure under service pressure', rationale: 'Research participant (Julian) confirmed the interview focused on operating under pressure. McDonald\'s peak periods are intense — candidates who describe staying calm and focused during rush are the signal.' },
            { signal: 'Reliability and attendance',     rationale: 'The number one operational failure in QSR is the no-show. Candidates who demonstrate consistent attendance in any prior role — school, other jobs, volunteering — are meaningfully preferable.' },
            { signal: 'Speed and efficiency orientation', rationale: 'McDonald\'s is a throughput operation. Candidates who describe enjoying fast-paced work — not just tolerating it — are a stronger fit than those who describe preferring a methodical pace.' },
            { signal: 'Team orientation',               rationale: 'Kitchen and counter roles require constant handoffs. Candidates who describe covering for teammates or helping during rush score higher.' },
            { signal: 'General customer handling',      rationale: 'Basic knowledge of how to interact with an upset or confused customer. Not scripted — natural. Candidates who describe a real example score meaningfully higher than those who give a coached answer.' },
          ],
          accelerators: [
            { signal: 'Prior QSR or food service experience', rationale: 'Reduces training time. Familiarity with order flow, kitchen equipment, and service windows accelerates onboarding.' },
            { signal: 'Cash handling experience',       rationale: 'Relevant for cashier and front-of-house roles. Reduces error rate and shrink risk in first weeks.' },
            { signal: 'Multilingual capability',        rationale: 'Spanish bilingualism is particularly valuable given the demographic profile of McDonald\'s customer base and crew in many US markets.' },
            { signal: 'Availability for opening or closing shifts', rationale: 'Opening and closing shifts are the hardest to fill. Candidates who can cover these shifts have higher scheduling utility than those limited to midday windows.' },
          ],
          retention: [
            { signal: 'Growth orientation',             rationale: 'McDonald\'s has strong internal promotion paths — crew trainer, shift manager, assistant manager. Candidates who express interest in growing within the role stay longer and are cheaper to develop than external hires.' },
            { signal: 'Realistic pace expectations',    rationale: 'Only 54% of QSR employees reach the 90-day mark. Candidates who accurately describe what a lunch rush feels like — and express readiness for it — show dramatically lower early attrition.' },
            { signal: 'Local or community ties',        rationale: 'Candidates who live near the location and have community connections show longer average tenure. McDonald\'s high-performing franchise locations skew toward locally embedded crews.' },
            { signal: 'Peer referral source',           rationale: 'Referred candidates show longer tenure, faster onboarding, and lower early attrition across QSR employers. A referral is itself a soft credential signal.' },
          ],
        },
      },
      {
        id: 'starbucks',
        displayName: 'Starbucks',
        logoUrl: 'logos/starbucks.png',
        accent: '#00704A',
        group: 'Customer Facing',
        role: 'Barista · Shift Supervisor',
        context: 'Café retail with a 2–3 week hiring cycle. In-person interview with store manager or assistant manager confirmed by two UXR participants. Background check via First Advantage initiated during interview. No drug test. Text message follow-up after interview.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Starbucks operates early morning through evening. Availability must cover the store\'s specific gap shifts — typically early morning weekdays and weekend opens.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Background check consent',       rationale: 'Third-party check via First Advantage. Initiated during the interview stage. Consent confirmed before advancing.' },
            { signal: 'Multiple store applications awareness', rationale: 'Starbucks hiring is store-specific. Candidates who have applied to multiple locations have a significantly higher chance of offer — confirming this intent signals genuine interest rather than a single passive application.' },
          ],
          core: [
            { signal: 'Multitasking under pressure',    rationale: 'UXR participant Rachel confirmed the interview focused explicitly on multitasking, pressure, and teamwork. The ability to manage concurrent drink orders, customer requests, and team communication simultaneously is the central job requirement.' },
            { signal: 'Customer warmth',                rationale: 'Starbucks brand is built on personalised customer interaction. Candidates who describe genuine interest in customers — remembering names, handling complaints with empathy — are the signal.' },
            { signal: 'Teamwork in fast-paced context', rationale: 'Barista roles require constant coordination during peak periods. Candidates who describe covering for teammates, communicating drink queue status, or helping train new hires score significantly higher.' },
            { signal: 'Composure with difficult customers', rationale: 'Custom order disputes and wait time frustration are daily realities. Candidates who describe de-escalation with a specific example are meaningfully more valuable than those who give a generic answer.' },
            { signal: 'Reliability and consistency',    rationale: 'UXR participant Alicia (assistant manager path) noted the process screens for consistency. Candidates who can demonstrate a pattern of showing up — in any context — are preferable.' },
          ],
          accelerators: [
            { signal: 'Barista or café experience',     rationale: 'Familiarity with espresso workflow, drink customisation, and order queue management directly reduces training time and accelerates speed-to-proficiency.' },
            { signal: 'Product knowledge interest',     rationale: 'UXR data notes product knowledge may come up in the interview. Candidates who express genuine curiosity about coffee or tea — not just a willingness to learn — signal stronger cultural fit.' },
            { signal: 'Shift supervisor experience',    rationale: 'Relevant for candidates applying to or likely to grow into shift supervisor roles. Prior experience managing a small team during a shift is an accelerator.' },
            { signal: 'Multilingual capability',        rationale: 'Spanish bilingualism is particularly useful in customer-facing roles across Starbucks markets with high Spanish-speaking customer bases.' },
          ],
          retention: [
            { signal: 'Cultural fit with Starbucks values', rationale: 'Starbucks has a strong internal culture. Candidates who express alignment with community, inclusion, and service values — not just job requirements — show longer tenure.' },
            { signal: 'Growth orientation',             rationale: 'The barista-to-shift-supervisor-to-assistant-manager path is well-established. Candidates who express interest in that trajectory are significantly more retainable.' },
            { signal: 'Realistic workload awareness',   rationale: 'Peak period intensity at Starbucks is among the highest in café retail. Candidates who describe the rush accurately and express genuine readiness for it show lower 90-day attrition.' },
            { signal: 'Peer referral source',           rationale: 'Referred candidates consistently show longer tenure across café retail employers. A referral from a current partner (Starbucks\' term for employee) is a strong retention signal.' },
          ],
        },
      },
      {
        id: 'chick-fil-a',
        displayName: 'Chick-fil-A',
        logoUrl: 'logos/chick-fil-a.png',
        accent: '#E5162B',
        group: 'Customer Facing',
        role: 'Team Member · Kitchen · Delivery',
        context: 'Operator-owned QSR with the most rigorous hiring process in the customer-facing group. 2–3 interview rounds confirmed by two UXR participants. Shadow shift at some locations. Character and values-first screening. No drug test. Franchise variation is significant.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Chick-fil-A locations vary in hours but typically require coverage across lunch and dinner peaks. Availability must map to the specific operator\'s needs.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Driver\'s license (delivery roles)', rationale: 'UXR participant Jose confirmed driver\'s license was required for his kitchen and delivery role. Confirmed as role-specific gate.' },
            { signal: 'Background check consent',       rationale: 'Varies by franchise but broadly required. Consent confirmed before advancing to first interview.' },
          ],
          core: [
            { signal: 'Values and character alignment', rationale: 'Chick-fil-A explicitly frames its hiring around "Second Mile Service" — going beyond what is expected. Candidates who describe genuinely caring about others, not just performing friendliness, are the signal. This is the most heavily weighted signal in the process.' },
            { signal: 'Warmth and genuine hospitality', rationale: 'Distinct from customer service competency — this is about natural disposition. Candidates who describe moments of spontaneous kindness or going out of their way for someone score significantly higher than those who describe following service scripts.' },
            { signal: 'Composure and reliability',      rationale: 'UXR participant Christopher noted the interview was brief but focused on prior experience and referral quality. Reliability — shown up consistently, no unexplained gaps — is a core signal.' },
            { signal: 'Teamwork and community orientation', rationale: 'Chick-fil-A crew teams are typically 10–12 people working 10–12 hour shifts. Candidates who describe themselves in terms of their team — not just their individual contribution — are a stronger fit.' },
            { signal: 'Honest self-presentation',       rationale: 'Chick-fil-A\'s multi-round process is explicitly designed to identify authenticity. Candidates who give rehearsed or obviously coached answers are screened out. Specific real examples are the signal.' },
          ],
          accelerators: [
            { signal: 'Prior QSR or food service experience', rationale: 'Reduces training time. Familiarity with fast service workflows and kitchen equipment accelerates onboarding — though Chick-fil-A hires first-timers regularly when character signals are strong.' },
            { signal: 'Community involvement',          rationale: 'Chick-fil-A\'s operator-owned model means many locations are embedded in local communities. Candidates with community ties — church, school, local sports — signal the kind of relational orientation the brand values.' },
            { signal: 'Shadow shift willingness',       rationale: 'Some locations include a 2-hour shadow shift in the process. Candidates who express genuine enthusiasm for this — rather than treating it as an obstacle — signal stronger fit.' },
            { signal: 'Multilingual capability',        rationale: 'Spanish bilingualism is useful across most US Chick-fil-A markets given crew and customer demographics.' },
          ],
          retention: [
            { signal: 'Alignment with operator\'s mission', rationale: 'Each Chick-fil-A location is independently owned. Candidates who research the specific operator — their community involvement, their location culture — and reference it in the interview show meaningfully higher retention.' },
            { signal: 'Growth orientation',             rationale: 'Chick-fil-A has structured pathways from team member to team leader to director. Candidates who express interest in that trajectory show longer tenure and are prioritised for development.' },
            { signal: 'Peer referral source',           rationale: 'UXR participant Christopher was referred by a friend — his process took ~1 week. Referred candidates show higher retention and faster onboarding at Chick-fil-A locations.' },
            { signal: 'Realistic shift expectations',   rationale: 'Jose confirmed 10–12 hour shifts on a 10–12 person team. Candidates who understand and accept the shift structure before starting show dramatically lower early attrition.' },
          ],
        },
      },
      {
        id: 'target',
        displayName: 'Target',
        logoUrl: 'logos/target.png',
        accent: '#CC0000',
        group: 'Customer Facing',
        role: 'Guest Advocate · Style · Fulfillment',
        context: 'Big-box retail with a structured digital hiring process. HireVue recorded video interview (6 questions, 3 attempts each). Virtual job preview assessment. HR phone call to confirm availability. Average 13 days to hire. Background check required.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Target requires coverage across daytime, evening, and weekend shifts. Availability must match the specific store\'s open slots.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Background check consent',       rationale: 'Required across all Target hires. Confirmed before advancing past the HR phone call.' },
            { signal: 'Virtual job preview completion', rationale: 'Target\'s process includes a personality and situational assessment immediately after application. Completion — not just starting — is a gate before the video interview stage.' },
          ],
          core: [
            { signal: 'Customer service orientation',   rationale: 'Target frames its role as "Guest Advocate" — a deliberate positioning that goes beyond transaction completion. Candidates who describe service as advocacy rather than task completion are the signal.' },
            { signal: 'Composure with guest concerns',  rationale: 'Target\'s video interview includes situational questions about handling difficult guest interactions. Candidates who describe de-escalation with a specific real example score significantly higher.' },
            { signal: 'Reliability and availability flexibility', rationale: 'HR phone call to confirm availability is a late-stage gate. Candidates who are honest about constraints — and have genuine flexibility — are preferable to those who overstate availability and then cannot cover scheduled shifts.' },
            { signal: 'Teamwork and floor awareness',   rationale: 'Target\'s style and fulfillment roles require close team coordination. Candidates who describe awareness of their team\'s needs — not just their own tasks — signal stronger operational fit.' },
            { signal: 'Self-presentation on video',     rationale: 'Target uses a recorded video interview. Candidates who are composed, clear, and genuine on camera — not rehearsed or stilted — perform better in the human review stage that follows.' },
          ],
          accelerators: [
            { signal: 'Prior retail experience',        rationale: 'Reduces onboarding time. Familiarity with POS systems, floor merchandising, and customer service scripts is directly applicable.' },
            { signal: 'Style or merchandising interest', rationale: 'Target\'s Style team requires genuine aesthetic sensibility. Candidates who express authentic interest in fashion, home, or visual merchandising — not just willingness to work the department — are a stronger fit.' },
            { signal: 'Fulfillment or logistics experience', rationale: 'Relevant for fulfillment and same-day delivery roles. Familiarity with pick-and-pack workflows, scanning systems, or order accuracy requirements accelerates ramp-up.' },
            { signal: 'Multilingual capability',        rationale: 'Spanish bilingualism is useful across most Target markets for both guest interaction and team communication.' },
          ],
          retention: [
            { signal: 'Growth orientation',             rationale: 'Target has strong internal promotion paths from guest advocate to team leader and executive team leader. Candidates who express interest in that trajectory are meaningfully more retainable.' },
            { signal: 'Realistic schedule expectations', rationale: 'Target\'s shift structure includes early morning freight, evening close, and weekend peaks. Candidates who understand and accept this before starting show lower 30-day attrition.' },
            { signal: 'Alignment with Target brand values', rationale: 'Target\'s guest-first culture is a meaningful differentiator in retail. Candidates who describe genuine alignment with inclusivity, community, and guest experience show stronger cultural retention.' },
            { signal: 'Local ties',                     rationale: 'Candidates who live near the location and have community connections show longer average tenure across big-box retail employers.' },
          ],
        },
      },
      {
        id: 'whole-foods',
        displayName: 'Whole Foods (Amazon)',
        logoUrl: 'logos/whole-foods.png',
        accent: '#00674B',
        group: 'Customer Facing',
        role: 'Team Member · Customer Service · Cashier',
        context: 'Amazon-owned grocery with a 2-step interview process (phone then in-person) confirmed by UXR participant David. Drug test required before starting — the only customer-facing employer in the research group with this requirement. Background check required. Culture fit is a stated hiring priority.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Whole Foods operates standard grocery hours including early morning stocking and weekend peaks. Availability must cover the department\'s specific open shifts.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application. Amazon Jobs portal collects this at intake.' },
            { signal: 'Drug test consent',              rationale: 'UXR participant David confirmed drug testing is required before starting — the only customer-facing employer in the research group with this hard requirement. Consent confirmed at application.' },
            { signal: 'Background check consent',       rationale: 'Comprehensive criminal history check. Required across all hires. I-9 verification with physical ID documents required at appointment.' },
            { signal: 'I-9 document readiness',         rationale: 'Whole Foods requires candidates to bring identity documents to their in-person appointment. Confirming document readiness upfront prevents offer delays.' },
          ],
          core: [
            { signal: 'Culture fit with Whole Foods values', rationale: '"Why Whole Foods?" is a confirmed interview question. Candidates who can articulate genuine alignment with natural foods, sustainability, or health — not just proximity to the location — score significantly higher.' },
            { signal: 'Customer service warmth',        rationale: 'Whole Foods positions itself as a premium grocery experience. Candidates who describe service as a genuine value — not a task — are the signal. Tone and authenticity matter more than script.' },
            { signal: 'Team orientation',               rationale: 'Whole Foods team structure is department-based with close collaboration. Candidates who describe themselves in team terms — covering for colleagues, supporting the department — are a stronger fit.' },
            { signal: 'Composure with customer concerns', rationale: 'Premium grocery customers have high expectations. Candidates who describe handling complaints or complex requests calmly and effectively are meaningfully preferable.' },
            { signal: 'Reliability',                    rationale: 'Some Whole Foods staff have very long tenure (10–20 years confirmed in research). Reliability signals — consistent prior employment, low unexplained gaps — predict the kind of stability the culture rewards.' },
          ],
          accelerators: [
            { signal: 'Grocery or food retail experience', rationale: 'Reduces training time. Familiarity with department operations, food safety, and customer service in a grocery context is directly applicable.' },
            { signal: 'Natural foods or wellness knowledge', rationale: 'Candidates who have genuine knowledge of — or interest in — natural foods, supplements, or wellness products can immediately engage customers on product questions, a key differentiator in the Whole Foods service model.' },
            { signal: 'Department-specific skills',     rationale: 'Bakery, deli, prepared foods, and seafood departments require specific handling knowledge. Prior experience in these areas meaningfully accelerates onboarding.' },
            { signal: 'Multilingual capability',        rationale: 'Useful across most urban Whole Foods locations for both customer interaction and team communication.' },
          ],
          retention: [
            { signal: 'Genuine values alignment',       rationale: 'Whole Foods\' long-tenure staff (10–20 year employees confirmed in research) share a genuine commitment to the company\'s food and wellness mission. Candidates hired primarily for proximity or convenience show higher early attrition.' },
            { signal: 'Growth orientation',             rationale: 'Whole Foods has structured pathways from team member to team leader and associate store team leader. Candidates who express interest in department expertise or leadership stay longer.' },
            { signal: 'Realistic workload awareness',   rationale: 'Grocery retail involves early starts, physical demands, and peak period intensity. Candidates who accurately describe these realities and express readiness show lower 90-day attrition.' },
            { signal: 'Amazon ecosystem comfort',       rationale: 'As an Amazon-owned entity, Whole Foods operates with Amazon systems, standards, and culture elements. Candidates who are comfortable with technology-driven operations and performance metrics fit better.' },
          ],
        },
      },
      {
        id: 'home-depot',
        displayName: 'Home Depot',
        logoUrl: 'logos/home-depot.png',
        accent: '#F96302',
        group: 'Customer Facing',
        role: 'Cashier · Lot Associate · Sales Associate',
        context: 'Home improvement retail with an 18-day average time-to-hire. Online behavioral quiz during application. Phone screen for availability. In-store interview with 4–6 STAR questions. Physical ability confirmation required. Background check required.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Home Depot operates 6am–10pm typically, with weekend peaks. Availability must cover the store\'s specific open shifts.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Physical capability — lift 50 lbs', rationale: 'Physical ability is confirmed explicitly in the interview process. Lot and floor roles require lifting, carrying, and extended standing. A hard gate for physical roles.' },
            { signal: 'Background check consent',       rationale: 'Required across all hires. Average 18-day process includes background check completion before offer.' },
            { signal: 'Behavioral assessment completion', rationale: 'Online behavioral and customer service quiz is embedded in the application. Completion and minimum threshold score are gates before the phone screen.' },
          ],
          core: [
            { signal: 'Product knowledge orientation',  rationale: 'Home Depot differentiates on associate expertise. Candidates who describe genuine interest in home improvement, construction, or DIY — not just willingness to learn — are meaningfully preferable.' },
            { signal: 'Customer problem-solving',       rationale: 'Home Depot customers often arrive with a project problem, not just a product list. Candidates who describe helping someone figure out what they need — rather than just directing them to an aisle — are the signal.' },
            { signal: 'Composure under customer pressure', rationale: 'STAR questions in the in-store interview specifically probe this. Candidates who provide specific, structured examples of handling a difficult customer situation score significantly higher.' },
            { signal: 'Reliability and attendance',     rationale: 'Home Depot\'s phone screen confirms availability and prior experience. Consistent attendance history — in any prior role — is a core signal.' },
            { signal: 'Team orientation',               rationale: 'Floor associates work closely with department teams and lot associates. Candidates who describe covering for teammates and communicating across roles score higher.' },
          ],
          accelerators: [
            { signal: 'Home improvement or trade knowledge', rationale: 'Candidates with genuine knowledge of plumbing, electrical, lumber, or garden categories can immediately add value on the floor without category-specific training.' },
            { signal: 'Prior retail experience',        rationale: 'Reduces onboarding time. POS familiarity, customer service experience, and merchandise awareness all accelerate ramp-up.' },
            { signal: 'Forklift or heavy equipment certification', rationale: 'Relevant for lot and receiving roles. Directly reduces training investment and time-to-productivity.' },
            { signal: 'Bilingual capability',           rationale: 'Spanish bilingualism is particularly valuable in many Home Depot markets for both customer and contractor interactions.' },
          ],
          retention: [
            { signal: 'Genuine product interest',       rationale: 'Associates who have genuine enthusiasm for the product categories they cover show meaningfully longer tenure. Home Depot\'s culture rewards expertise — candidates who want to build knowledge stay.' },
            { signal: 'Growth orientation',             rationale: 'Home Depot has strong internal promotion paths — department supervisor, assistant store manager. Candidates who express interest in building a retail career show longer tenure.' },
            { signal: 'Contractor or trade community connection', rationale: 'Associates who interact naturally with professional contractors — a key Home Depot customer segment — add disproportionate value and tend to be retained actively.' },
            { signal: 'Realistic physical demands awareness', rationale: 'Lot and floor roles are physically demanding. Candidates who accurately describe the physical requirements and express genuine readiness show lower early attrition.' },
          ],
        },
      },
      {
        id: 'kroger',
        displayName: 'Kroger',
        logoUrl: 'logos/kroger.png',
        accent: '#004985',
        group: 'Customer Facing',
        role: 'Cashier · Stocker · Deli Associate',
        context: 'Grocery banner group with a 3-part assessment immediately after applying (personality, situational judgment, skills). Phone or text screening within days. In-person behavioral interview with store manager. Background check required. No drug test for most store roles.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Kroger operates extended grocery hours including early morning stocking and evening close. Availability must cover department-specific shift needs.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Background check consent',       rationale: 'Required across all store hires. Confirmed before advancing to in-person interview.' },
            { signal: '3-part assessment minimum threshold', rationale: 'Kroger\'s personality, situational judgment, and skills assessment is embedded immediately after application. Minimum threshold score is a gate before human review.' },
          ],
          core: [
            { signal: 'Customer service orientation',   rationale: 'Kroger\'s in-person interview uses behavioral questions to assess customer handling. Candidates who describe genuine service orientation — not just completing transactions — are the signal.' },
            { signal: 'Reliability and attendance',     rationale: 'Grocery retail depends on consistent coverage. Candidates who demonstrate a pattern of showing up — in any prior role — are core hires.' },
            { signal: 'Composure under volume',         rationale: 'Grocery checkout during peak periods is high-volume and fast-paced. Candidates who describe staying accurate and calm under customer volume are preferable.' },
            { signal: 'Team orientation',               rationale: 'Kroger\'s department structure requires close coordination. Candidates who describe covering for teammates or helping with cross-department tasks score higher.' },
            { signal: 'Situational judgment',           rationale: 'The situational judgment component of the application assessment is specifically designed to surface this. Candidates who demonstrate common-sense decision-making in customer and team scenarios perform better in the interview.' },
          ],
          accelerators: [
            { signal: 'Prior grocery or retail experience', rationale: 'Reduces training time. Familiarity with POS, food safety basics, and department operations is directly applicable.' },
            { signal: 'Deli or food preparation experience', rationale: 'Specifically relevant for deli and prepared foods roles. Prior experience with food handling, slicing equipment, and food safety significantly reduces ramp-up time.' },
            { signal: 'Inventory or stocking experience', rationale: 'Relevant for stocker and overnight crew roles. Familiarity with scan-and-stock workflows, shelf-reset processes, and inventory management accelerates onboarding.' },
            { signal: 'Bilingual capability',           rationale: 'Spanish bilingualism is particularly valuable across Kroger\'s banner locations in high-Hispanic-population markets.' },
          ],
          retention: [
            { signal: 'Growth orientation',             rationale: 'Kroger has structured internal promotion paths from associate to team lead to department manager. Candidates who express interest in that trajectory show longer tenure.' },
            { signal: 'Community connection',           rationale: 'Kroger stores are community anchors. Candidates who live near the location and shop there regularly show stronger identification with the role and longer average tenure.' },
            { signal: 'Realistic schedule expectations', rationale: 'Overnight stocking, early morning receiving, and weekend peaks are operational realities. Candidates who understand and accept this before starting show lower 30-day dropout.' },
            { signal: 'Benefits awareness',             rationale: 'Kroger offers union representation in many markets with associated benefits. Candidates who are aware of and value this signal a more deliberate employment choice — associated with longer tenure.' },
          ],
        },
      },
      {
        id: 'dollar-general',
        displayName: 'Dollar General',
        logoUrl: 'logos/dollar-general.png',
        accent: '#F5B800',
        group: 'Customer Facing',
        role: 'Sales Associate · Lead · Key Holder',
        context: 'Small-format discount retail with lean crews and high individual responsibility. Average 12-day time-to-hire. Brief in-person interview with assistant manager or store manager. Focus on reliability and cash handling. Among the lowest interview difficulty ratings in the research group.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Dollar General stores are typically open 8am–10pm. With very small teams (often 1–2 people on shift), coverage gaps have immediate operational impact.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Background check consent',       rationale: 'Standard requirement. Confirmed before advancing to interview.' },
            { signal: 'Key holder eligibility',         rationale: 'Many Dollar General roles involve opening and closing responsibility. Candidates must be willing and eligible to hold store keys — a specific gate for key holder roles.' },
          ],
          core: [
            { signal: 'Reliability — solo shift capability', rationale: 'Dollar General associates often work alone or with one other person. The ability to manage the store independently — without team backup — is the single most important operating signal.' },
            { signal: 'Cash handling accuracy',         rationale: 'Interview questions focus explicitly on cash handling. Candidates who describe prior experience with registers, cash counts, and shrink awareness are significantly preferable.' },
            { signal: 'Self-directed work orientation', rationale: 'Unlike larger retail, Dollar General associates must manage their own tasks without supervisor direction during most shifts. Candidates who describe taking initiative and working independently score higher.' },
            { signal: 'Composure with difficult customers', rationale: 'Small-format discount stores often serve high-stress communities. Candidates who describe handling upset or aggressive customers calmly are the signal.' },
            { signal: 'Reliability and attendance',     rationale: 'With teams of 1–3 people per shift, a single no-show has immediate operational consequence. Reliability is weighted more heavily here than in any other customer-facing format in the research group.' },
          ],
          accelerators: [
            { signal: 'Prior retail or discount store experience', rationale: 'Reduces training time. Familiarity with small-format retail operations, stockroom management, and customer service at this price point is directly applicable.' },
            { signal: 'Inventory and stocking experience', rationale: 'Dollar General associates are responsible for receiving, stocking, and organising merchandise. Prior experience with these tasks accelerates onboarding.' },
            { signal: 'Opening and closing experience', rationale: 'Candidates who have previously held key holder or opening/closing responsibility at any retail employer are immediately deployable in high-responsibility shifts.' },
            { signal: 'Bilingual capability',           rationale: 'Spanish bilingualism is useful across many Dollar General markets, particularly in rural and suburban locations with significant Spanish-speaking customer bases.' },
          ],
          retention: [
            { signal: 'Growth to key holder or lead',   rationale: 'Dollar General\'s internal path from associate to lead to assistant manager is a meaningful retention tool. Candidates who express interest in taking on more responsibility show longer tenure.' },
            { signal: 'Comfort with solo responsibility', rationale: 'Candidates who describe genuinely preferring independent work — rather than tolerating it — are meaningfully more retainable in the small-team format.' },
            { signal: 'Local community ties',           rationale: 'Dollar General stores serve as community anchors in many rural and suburban markets. Candidates who have personal connections to the community show stronger identification with the role.' },
            { signal: 'Realistic format expectations',  rationale: 'Dollar General\'s lean staffing model means higher individual responsibility than larger retail formats. Candidates who understand this before starting show lower early attrition.' },
          ],
        },
      },

      // ── OPERATIONS ───────────────────────────────────────────────────
      {
        id: 'amazon-fulfilment',
        displayName: 'Amazon Fulfillment',
        logoUrl: 'logos/amazon-fulfilment.png',
        accent: '#FF9900',
        group: 'Operations Support',
        role: 'Fulfillment Associate · Sorter · Picker · Packer',
        context: 'High-volume fulfillment with minimal human interview — typically no formal interview for entry-level roles. Drug test (oral swab) and background check are the primary gates. Virtual Job Tryout (~20 min) included in application. Average 22 days to hire confirmed by UXR participant.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Amazon operates 24/7 across multiple shift patterns. Availability must match the specific FC\'s open shift (typically 10-hour, 4-day schedules). Shift selection is built into the application flow.' },
            { signal: 'Physical capability — lift 49 lbs', rationale: 'Standard physical requirement across Amazon FC roles. Standing for extended periods and repetitive motion are also confirmed requirements. Hard gate.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application. Eligibility checklist is part of the intake flow.' },
            { signal: 'Drug test consent',              rationale: 'UXR participant confirmed oral mouth swab on-site at orientation. Consent confirmed during application. A hard gate before start date.' },
            { signal: 'Background check consent',       rationale: 'Required across all FC hires. Confirmed during application flow.' },
            { signal: 'Virtual Job Tryout completion',  rationale: 'Amazon\'s ~20-minute Virtual Job Tryout is embedded in the application. Completion is required before a start date is assigned.' },
          ],
          core: [
            { signal: 'Physical pace readiness',        rationale: 'UXR participant described on-feet, fast-paced work scanning and staging packages to bins and conveyors. Candidates who accurately describe comfort with sustained physical pace are meaningfully preferable.' },
            { signal: 'Process adherence',              rationale: 'Amazon FC operations are highly systematised. Candidates who describe following instructions precisely, checking their work, and asking when unsure are a stronger operational fit than those who project independence.' },
            { signal: 'Safety-conscious mindset',       rationale: 'Amazon has significant safety protocols across all FC operations. Candidates who proactively reference safety awareness — without prompting — are a meaningful positive signal.' },
            { signal: 'Reliability and attendance',     rationale: 'Amazon tracks attendance rate as a performance metric (minimum 4.5/5.0 for internal promotion). Candidates who demonstrate consistent attendance in any prior role signal the behaviour that matters most.' },
            { signal: 'Shift commitment',               rationale: 'Amazon\'s 4-day, 10-hour shift structure requires genuine commitment — not just availability. Candidates who describe having considered the structure and made a deliberate choice score higher than those who are vaguely flexible.' },
          ],
          accelerators: [
            { signal: 'Prior warehouse or FC experience', rationale: 'Reduces ramp-up time. Familiarity with conveyor systems, scanning workflows, and fulfilment floor operations accelerates time-to-productivity.' },
            { signal: 'Amazon or e-commerce platform familiarity', rationale: 'Prior experience with Amazon\'s systems — even as a delivery driver or temp worker — reduces orientation time.' },
            { signal: 'Forklift or powered equipment certification', rationale: 'Not required for most entry-level roles but meaningfully expands role eligibility and internal transfer options.' },
            { signal: 'Multilingual capability',        rationale: 'Spanish bilingualism is particularly valuable in Amazon FC environments given workforce demographics across many US markets.' },
          ],
          retention: [
            { signal: 'Growth orientation',             rationale: 'Amazon\'s internal promotion path to Process Assistant (L4) requires 6 months tenure and 4.5/5.0 performance rating. Candidates who express interest in that path are significantly more retainable.' },
            { signal: 'Realistic pace expectations',    rationale: 'Amazon\'s FC pace is among the most demanding in operations. Candidates who accurately describe what sustained fast-paced physical work feels like — and express readiness — show lower 30-day attrition.' },
            { signal: 'Financial stability signals',    rationale: 'Amazon FC roles attract candidates seeking stable, above-average hourly income. Candidates who describe work as a deliberate financial choice — not a stopgap — show longer tenure.' },
            { signal: 'Referral source',               rationale: 'Employee referrals are a meaningful retention signal across warehouse employers. Referred candidates know what to expect before day one.' },
          ],
        },
      },
      {
        id: 'doordash',
        displayName: 'DoorDash (Dasher)',
        logoUrl: 'logos/doordash.png',
        accent: '#FF3008',
        group: 'Operations Support',
        role: 'Delivery Driver · Gig Worker',
        context: 'Fully automated onboarding — no interview, zero human contact. ID and insurance verified, background check completed (often within 48 hours). Area-based waitlist. Driver\'s license and vehicle insurance required. No drug test. Confirmed by two UXR participants.',
        tiers: {
          gates: [
            { signal: 'Valid driver\'s license',        rationale: 'Hard requirement. Confirmed via ID scan during app-based onboarding. No license, no activation.' },
            { signal: 'Vehicle insurance',              rationale: 'UXR participant confirmed insurance verification is required during onboarding. Must be current and cover the vehicle being used for deliveries.' },
            { signal: 'Area availability',              rationale: 'DoorDash operates waitlists by market. Candidates must be in or near an open market to activate. Confirmed at application.' },
            { signal: 'Background check consent',       rationale: 'Automated background check — often completed within 48 hours. Consent confirmed during app onboarding. A hard gate before activation.' },
            { signal: 'Bank account for payment routing', rationale: 'Required upfront for payment setup. Confirmed during app-based onboarding.' },
            { signal: 'Smartphone capability',          rationale: 'The Dasher app is the entire operating system for this role. Candidates must have a compatible smartphone to use it.' },
          ],
          core: [
            { signal: 'Self-directed work orientation', rationale: 'DoorDash is fully autonomous. There is no manager, no team, and no supervisor. Candidates who describe genuine comfort with independent work — setting their own schedule, solving problems alone — are the signal.' },
            { signal: 'Navigation and route efficiency', rationale: 'UXR participant described long shifts chasing earnings — route decisions directly impact income. Candidates who describe comfort with navigation tools and efficiency-minded thinking are a stronger fit.' },
            { signal: 'Customer interaction composure', rationale: 'Occasional customer contact at pickup and drop-off requires basic composure and communication. Candidates who describe handling complaints or confusion calmly are preferable.' },
            { signal: 'Reliability in gig context',     rationale: 'DoorDash\'s completion rate and acceptance metrics affect Dasher ranking and earnings. Candidates who describe a disciplined approach to commitments — even in gig work — signal better operational outcomes.' },
          ],
          accelerators: [
            { signal: 'Prior delivery or gig platform experience', rationale: 'Reduces learning curve. Familiarity with Uber Eats, Instacart, or similar platforms means the operational model is already understood.' },
            { signal: 'Market knowledge',              rationale: 'Candidates who know the local area well — restaurant density, traffic patterns, parking — can optimise routes faster and earn more efficiently from day one.' },
            { signal: 'Multi-apping experience',       rationale: 'UXR participant described intentionally piecing together multiple gig platforms. Candidates who understand how to manage multiple platforms efficiently show higher operational sophistication.' },
            { signal: 'Vehicle type suited to market', rationale: 'In dense urban markets, a bicycle or scooter may outperform a car. Candidates whose vehicle type matches the market\'s delivery density are more efficient from activation.' },
          ],
          retention: [
            { signal: 'Income goal clarity',           rationale: 'DoorDash earning varies significantly by market, time, and order density. Candidates who have realistic income expectations — and a plan for achieving them — show longer platform tenure than those with vague earnings assumptions.' },
            { signal: 'Schedule flexibility as a genuine priority', rationale: 'The core DoorDash value proposition is flexible scheduling. Candidates who describe genuine need for flexibility — not just willingness to accept it — show stronger long-term engagement.' },
            { signal: 'Comfort with variable income',  rationale: 'Gig income is inherently variable. Candidates who describe comfort with income variation — and have a financial plan that accommodates it — show lower early deactivation rates.' },
            { signal: 'Physical vehicle readiness',    rationale: 'Vehicle maintenance issues are the leading cause of unexpected DoorDash deactivation. Candidates who describe maintaining their vehicle proactively show longer platform tenure.' },
          ],
        },
      },
      {
        id: 'ups',
        displayName: 'UPS',
        logoUrl: 'logos/ups.png',
        accent: '#FFB81C',
        group: 'Operations Support',
        role: 'Package Handler · Warehouse Worker',
        context: 'Structured hiring with one in-person or virtual interview round confirmed by three UXR participants. Drug test required. Background check required. Facility tour and job shadow before solo work. Average 1–2 weeks to hire. Often discovered via Indeed first.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'UPS operates preload (early morning), day, and twilight shifts. Availability must match the specific hub\'s open shift — preload in particular is hard to fill and critically important.' },
            { signal: 'Physical capability — lift 70 lbs', rationale: 'UPS package handling involves lifting, bending, and sustained physical activity. Physical capability is confirmed in the interview. Hard gate.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application.' },
            { signal: 'Drug test consent',              rationale: 'Required across all UPS hires confirmed by three UXR participants. A hard gate before offer.' },
            { signal: 'Background check consent',       rationale: 'Required across all hires. Confirmed at application.' },
          ],
          core: [
            { signal: 'Reliability — why UPS',         rationale: 'UXR participant confirmed the interview includes a direct "why UPS?" question. Candidates who give a specific, honest answer — steady income, hours, benefits — score higher than those who give a generic answer.' },
            { signal: 'Physical pace readiness',        rationale: 'UPS preload in particular operates at high pace with tight sort windows. Candidates who describe comfort with sustained physical pace and repetitive motion are a stronger fit.' },
            { signal: 'Lifting technique awareness',   rationale: 'UPS has explicit safety training around lifting. Candidates who describe knowing how to lift correctly — knees, not back — before training begins signal safety-consciousness that reduces injury risk.' },
            { signal: 'Attendance reliability',        rationale: 'UXR participant Prior44 confirmed the interview included questions on lifting ability, reliability, and why UPS. Attendance reliability is a core screen.' },
            { signal: 'Team orientation',              rationale: 'Sort operations require close coordination. Candidates who describe working well in a team — covering when others fall behind, communicating about package issues — are a stronger operational fit.' },
          ],
          accelerators: [
            { signal: 'Prior warehouse or package handling experience', rationale: 'Reduces ramp-up time. Familiarity with conveyor systems, scan-and-sort workflows, and physical sort operations accelerates time-to-productivity.' },
            { signal: 'Forklift or powered equipment certification', rationale: 'Relevant for dock and large-package roles. Expands role eligibility and scheduling flexibility.' },
            { signal: 'CDL or driver\'s license',      rationale: 'Relevant for candidates on a path to driver roles. UPS strongly promotes from within for driver positions — candidates with licenses signal a longer career arc.' },
            { signal: 'Multilingual capability',       rationale: 'Spanish bilingualism is particularly useful in UPS hub environments across many US markets.' },
          ],
          retention: [
            { signal: 'Growth orientation — driver path', rationale: 'UPS is one of the few employers where an entry-level package handler can realistically reach a $40/hour+ driver role. Candidates who express interest in that path are significantly more retainable.' },
            { signal: 'Benefits awareness',            rationale: 'UPS offers healthcare, pension, and tuition assistance — among the strongest benefits in the hourly sector. Candidates who are aware of and value this signal a more deliberate employment choice.' },
            { signal: 'Realistic pace expectations',   rationale: 'UPS preload is among the most physically demanding hourly roles in the research group. Candidates who accurately describe what the pace feels like — and express genuine readiness — show lower 30-day attrition.' },
            { signal: 'Union familiarity',             rationale: 'UPS is a Teamsters shop. Candidates who have prior union experience or express comfort with collective bargaining show stronger long-term fit.' },
          ],
        },
      },
      {
        id: 'fedex',
        displayName: 'FedEx',
        logoUrl: 'logos/fedex.png',
        accent: '#4D148C',
        group: 'Operations Support',
        role: 'Package Handler · Warehouse Worker',
        context: 'Inconsistent interview process — handlers often receive no formal interview, just a phone call offering shift choice. 10-year job history required in application. Optional personality assessment. Drug test random for handlers, required for drivers. Average 12 days for handlers.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'FedEx sort operations run across early morning, day, and evening windows. Shift choice is often offered by phone — availability must be confirmed immediately.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application. FedEx Careers portal is the only application channel.' },
            { signal: 'Background check consent',       rationale: 'Required across all hires. Can take up to a week. Consent confirmed at application.' },
            { signal: '10-year employment history',     rationale: 'FedEx requires a 10-year job history in the application — unusual among operations employers. Gaps or inability to document prior employment can delay or prevent advancement.' },
            { signal: 'Drug test consent (driver roles)', rationale: 'Required for all courier and driver roles. Random for handler roles. Consent confirmed at application for driving-path candidates.' },
          ],
          core: [
            { signal: 'Reliability and attendance',    rationale: 'Sort operations are time-critical. A handler no-show delays an entire sort window. Candidates who demonstrate consistent attendance in any prior role are the core signal.' },
            { signal: 'Physical pace readiness',       rationale: 'FedEx handler roles involve sustained physical activity across the entire sort window. Candidates who describe comfort with fast-paced, repetitive physical work are preferable.' },
            { signal: 'Process adherence',             rationale: 'Accurate package handling — scanning, sorting, weight confirmation — is the core job. Candidates who describe checking their work and following process precisely are a stronger operational fit.' },
            { signal: 'Safety awareness',              rationale: 'FedEx has significant safety requirements across handler operations. Candidates who proactively reference safety habits are a meaningful positive signal.' },
            { signal: 'Shift commitment',              rationale: 'FedEx often offers shift choice by phone. Candidates who confirm a shift and commit to it — rather than hedging — show the reliability the operation depends on.' },
          ],
          accelerators: [
            { signal: 'Prior package handling or logistics experience', rationale: 'Reduces ramp-up time. Familiarity with sort operations, scanning workflows, and package handling procedures accelerates time-to-productivity.' },
            { signal: 'CDL or driver\'s license',     rationale: 'Strongly relevant for candidates on a courier or driver path. FedEx Ground uses independent contractors in many markets — a license opens significantly higher earning potential.' },
            { signal: 'Forklift certification',       rationale: 'Relevant for freight and large-package roles. Expands role eligibility and shift options.' },
            { signal: 'Multilingual capability',      rationale: 'Spanish bilingualism is useful across most FedEx sort facilities given workforce demographics.' },
          ],
          retention: [
            { signal: 'Driver path interest',         rationale: 'FedEx Ground and Express have structured paths from handler to driver. Candidates who express interest in that trajectory are significantly more retainable and investable.' },
            { signal: 'Realistic pace expectations',  rationale: 'FedEx sort operations are physically demanding and time-pressured. Candidates who accurately describe this and express genuine readiness show lower 30-day attrition.' },
            { signal: 'Stability signals',            rationale: 'The 10-year history requirement signals that FedEx values documented stability. Candidates with consistent employment records — even across multiple employers — are a stronger long-term fit.' },
            { signal: 'Benefits awareness',           rationale: 'FedEx offers healthcare, tuition assistance, and employee discounts. Candidates who are aware of and value these signal a more deliberate employment choice.' },
          ],
        },
      },
      {
        id: 'compass-group',
        displayName: 'Compass Group',
        logoUrl: 'logos/compass-group.png',
        accent: '#0085CA',
        group: 'Operations Support',
        role: 'Station Prep · Cafeteria Staff · Food Service',
        context: 'Contract food and support services at institutional sites. Phone or in-person interview with HR and hiring manager. Spot hiring at recruitment fairs. Background check via First Advantage (1–3 weeks). Drug test varies by state and client site. Operates under many sub-brands (Chartwells, Eurest, etc.).',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'Compass Group contracts vary significantly by site — a hospital cafeteria operates on different hours than a corporate dining account. Availability must match the specific contract site\'s schedule.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Required at application. Email address required for the Compass Group careers portal.' },
            { signal: 'Background check consent',       rationale: 'Via First Advantage, including SSN trace. Can take 1–3 weeks. Confirmed at application.' },
            { signal: 'Drug test consent (site-dependent)', rationale: 'Varies by state and client site. Confirmed at application for sites where required — typically healthcare and government contracts.' },
            { signal: 'Food handler certification or willingness', rationale: 'Many Compass Group contracts at healthcare and education sites require food handler certification. Confirmed as a gate where applicable.' },
          ],
          core: [
            { signal: 'Reliability and attendance',    rationale: 'Compass Group contracts are site-specific and staffing-sensitive. A no-show at a small café or dining account has immediate client-facing consequences. Reliability is the primary screen.' },
            { signal: 'Food service orientation',      rationale: 'Candidates who describe genuine interest in food preparation or service — not just willingness to work — are a stronger fit across Compass Group\'s hospitality-focused culture.' },
            { signal: 'Client site adaptability',      rationale: 'Compass Group employees work at client sites — hospitals, universities, corporations. Candidates who describe comfort working within another organisation\'s environment and standards score higher.' },
            { signal: 'Team orientation',              rationale: 'Food service operations require close coordination across kitchen, service, and cleaning roles. Candidates who describe cross-function teamwork are preferable.' },
            { signal: 'Customer or guest interaction', rationale: 'Many Compass Group accounts are guest-facing — hospital visitors, university students, corporate employees. Candidates who describe natural warmth in service interactions are the signal.' },
          ],
          accelerators: [
            { signal: 'Prior food service experience', rationale: 'Reduces training time. Familiarity with commercial kitchen operations, service line management, and food safety protocols is directly applicable.' },
            { signal: 'ServSafe or food safety certification', rationale: 'Directly relevant across all Compass Group accounts. Candidates who already hold ServSafe certification require less investment before client deployment.' },
            { signal: 'Healthcare or institutional site experience', rationale: 'Relevant for hospital and healthcare campus accounts. Familiarity with patient tray service, dietary restrictions, and HIPAA-adjacent protocols is an accelerator for premium accounts.' },
            { signal: 'Multilingual capability',      rationale: 'Spanish bilingualism is particularly useful across Compass Group\'s diverse workforce in most US markets.' },
          ],
          retention: [
            { signal: 'Sub-brand and account awareness', rationale: 'Compass Group operates under Chartwells, Eurest, Levy, and other sub-brands. Candidates who understand they are joining a contract services company — not a single restaurant or cafeteria — show more realistic expectations and longer tenure.' },
            { signal: 'Site-specific values fit',     rationale: 'Each Compass Group account has its own client culture. Candidates who express genuine interest in the specific account type — education, healthcare, corporate — show stronger fit and longer tenure at that account.' },
            { signal: 'Growth orientation',           rationale: 'Compass Group has structured paths from line staff to lead to supervisor to account manager. Candidates who express interest in that trajectory are meaningfully more retainable.' },
            { signal: 'Referral source',              rationale: 'Employee referrals are a strong retention signal in contract food service, where word-of-mouth about site conditions significantly influences candidate expectations.' },
          ],
        },
      },
      {
        id: 'abm-industries',
        displayName: 'ABM Industries',
        logoUrl: 'logos/abm-industries.png',
        accent: '#003DA5',
        group: 'Operations Support',
        role: 'Janitor · Cleaner · Day Porter · Custodian',
        context: 'Facilities services with group hiring events (50–100 applicants processed together). Drug test via oral mouth swab administered live during group session. Background check standard. Average 11–15 days to hire; ~45% receive offer within 1–3 days of interview. Staffing agency placement common.',
        tiers: {
          gates: [
            { signal: 'Shift availability match',       rationale: 'ABM roles span day porter (business hours), evening cleaning (post-close), and overnight. Availability must match the specific contract site\'s cleaning schedule.' },
            { signal: 'Work authorisation',             rationale: 'Legal right to work. Confirmed at application via abm.com/careers.' },
            { signal: 'Drug test consent',              rationale: 'Oral mouth swab often administered live during the group hiring session. Consent confirmed at application. A hard gate.' },
            { signal: 'Background check consent',       rationale: 'Standard requirement across all ABM hires. Confirmed at application.' },
            { signal: 'Transportation to site',         rationale: 'ABM sites vary significantly in location — offices, hospitals, airports, schools. Reliable transportation to the specific site is confirmed as a screening question in the interview.' },
          ],
          core: [
            { signal: 'Reliability and attendance',    rationale: 'ABM cleaning contracts are time-sensitive — client facilities must be cleaned within specific windows. A no-show has immediate client-facing consequences. Reliability is the primary screen.' },
            { signal: 'Self-directed work orientation', rationale: 'ABM custodians typically work with minimal supervision, especially on evening and overnight shifts. Candidates who describe comfort with independent, task-driven work are a stronger fit.' },
            { signal: 'Physical endurance',            rationale: 'Cleaning roles involve sustained physical activity — pushing equipment, bending, lifting, and extended standing. Candidates who describe comfort with physically demanding work are preferable.' },
            { signal: 'Attention to detail',           rationale: 'Cleaning quality is directly observable by clients. Candidates who describe thoroughness and attention to standards — not just speed — are a stronger operational fit.' },
            { signal: 'Professional conduct on client sites', rationale: 'ABM employees work within client facilities — hospitals, airports, offices. Candidates who describe professional behaviour in client environments — minimal disruption, appropriate interaction — score higher.' },
          ],
          accelerators: [
            { signal: 'Prior janitorial or facilities experience', rationale: 'Reduces training time. Familiarity with commercial cleaning equipment, chemical handling protocols, and cleaning schedule management accelerates deployment.' },
            { signal: 'OSHA or chemical handling certification', rationale: 'Relevant for roles involving industrial cleaning chemicals or regulated environments. Reduces liability and training investment.' },
            { signal: 'Floor care equipment experience', rationale: 'Familiarity with floor buffers, scrubbers, and extractors is an accelerator for accounts that require specialty floor care.' },
            { signal: 'Multilingual capability',       rationale: 'Spanish bilingualism is particularly valuable across ABM\'s workforce in most US markets, and useful for team communication on multi-person accounts.' },
          ],
          retention: [
            { signal: 'Comfort with independent night shifts', rationale: 'ABM\'s evening and overnight shifts are the hardest to fill and the most likely to cause early attrition if candidates underestimate the isolation. Candidates who actively prefer late shifts are significantly more retainable.' },
            { signal: 'Site stability preference',    rationale: 'ABM can place workers across multiple client sites. Candidates who express preference for a consistent site assignment — rather than floating — show longer tenure at accounts where that stability is possible.' },
            { signal: 'Growth orientation',           rationale: 'ABM has structured paths from custodian to lead to supervisor to operations manager. Candidates who express interest in that trajectory are more retainable and investable.' },
            { signal: 'Agency vs direct hire awareness', rationale: 'ABM uses staffing agency placement frequently. Candidates who understand they may start through an agency and have realistic expectations about that transition show lower early attrition.' },
          ],
        },
      },
    ];

    // Group companies
    const groups = {};
    COMPANIES.forEach(c => {
      if (!groups[c.group]) groups[c.group] = [];
      groups[c.group].push(c);
    });

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

    function renderCompanyPanel(co) {
      const tiersHtml = tierKeys.map(k => renderTier(k, co.tiers[k])).join('');
      const logoHtml = co.logoUrl
        ? `<img class="sc-company-panel__logo" src="${escapeHtml(co.logoUrl)}" alt="" width="32" height="32" loading="lazy" />`
        : '';
      return `
        <div class="sc-company-panel" id="sc-panel-${escapeHtml(co.id)}" role="tabpanel" aria-labelledby="sc-tab-${escapeHtml(co.id)}" hidden>
          <div class="sc-company-panel__header">
            <div class="sc-company-panel__mark" style="background:${escapeHtml(co.accent)}" aria-hidden="true">
              ${logoHtml || escapeHtml((co.displayName || '').charAt(0))}
            </div>
            <div>
              <h3 class="sc-company-panel__name">${escapeHtml(co.displayName)}</h3>
              <p class="sc-company-panel__role">${escapeHtml(co.role)}</p>
            </div>
          </div>
          <div class="sc-company-panel__context">
            <span class="sc-context-label">Hiring context</span>
            <p class="sc-context-text">${escapeHtml(co.context)}</p>
          </div>
          <div class="sc-company-tiers">${tiersHtml}</div>
        </div>`;
    }

    // Build tabs per group
    const groupTabsHtml = Object.entries(groups).map(([groupName, companies]) => {
      const tabs = companies.map(co => {
        const logoUrl = co.logoUrl
          ? `<img class="sc-tab__logo" src="${escapeHtml(co.logoUrl)}" alt="" width="18" height="18" loading="lazy" />`
          : '';
        return `
          <button type="button" class="sc-company-tab" role="tab"
            id="sc-tab-${escapeHtml(co.id)}"
            data-sc-company="${escapeHtml(co.id)}"
            aria-selected="false"
            aria-controls="sc-panel-${escapeHtml(co.id)}">
            ${logoUrl}
            <span>${escapeHtml(co.displayName)}</span>
          </button>`;
      }).join('');

      return `
        <div class="sc-group">
          <p class="sc-group__label">${escapeHtml(groupName)}</p>
          <div class="sc-group__tabs" role="tablist" aria-label="${escapeHtml(groupName)} companies">${tabs}</div>
        </div>`;
    }).join('');

    const panelsHtml = COMPANIES.map(renderCompanyPanel).join('');

    return `
      <div class="scorecard-root" id="scorecard-root">
        <div class="scorecard-intro">
          <div class="scorecard-intro__title-row">
            <span class="scorecard-intro__kicker">Candidate Scorecard</span>
            <span class="scorecard-wip-badge">Work in progress</span>
          </div>
          <h2 class="scorecard-intro__title">What good looks like — by company</h2>
          <p class="scorecard-intro__sub">Eightfold defines what a strong candidate looks like for each employer before the AI interview begins. Select a company to see its four-tier scorecard. Tier weights are co-configured with each customer.</p>
          <div class="scorecard-intro__model">
            <div class="scorecard-model-block">
              <span class="scorecard-model-label">Eightfold provides</span>
              <p class="scorecard-model-text">Baseline signal definitions, rationale grounded in hiring research, and tier structure per company and role.</p>
            </div>
            <div class="scorecard-model-divider" aria-hidden="true">+</div>
            <div class="scorecard-model-block">
              <span class="scorecard-model-label">Customer configures</span>
              <p class="scorecard-model-text">Tier weights, company-specific knockouts, location-level requirements, and any signals unique to their hiring context.</p>
            </div>
            <div class="scorecard-model-divider" aria-hidden="true">=</div>
            <div class="scorecard-model-block scorecard-model-block--output">
              <span class="scorecard-model-label">Output</span>
              <p class="scorecard-model-text">A curated shortlist scored against a definition of "good" specific to this company, this role, and this location.</p>
            </div>
          </div>
        </div>

        <div class="sc-nav">${groupTabsHtml}</div>
        <div class="sc-panels">${panelsHtml}</div>
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

    // Scorecard company tab navigation (event delegation — Change D)
    document.addEventListener('click', function(e) {
      const tab = e.target.closest('.sc-company-tab[data-sc-company]');
      if (!tab) return;
      const companyId = tab.dataset.scCompany;
      const root = document.getElementById('scorecard-root');
      if (!root) return;
      root.querySelectorAll('.sc-company-tab').forEach(t => t.setAttribute('aria-selected', 'false'));
      root.querySelectorAll('.sc-company-panel').forEach(p => { p.hidden = true; });
      tab.setAttribute('aria-selected', 'true');
      const panel = root.querySelector(`#sc-panel-${companyId}`);
      if (panel) panel.hidden = false;
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
