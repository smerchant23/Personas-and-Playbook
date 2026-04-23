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
    let activeView = 'research';

    function setWorkspaceView(view) {
      activeView = view;
      const showResearch = view === 'research';

      workspaceViewTabs.forEach(t => {
        t.setAttribute('aria-selected', t.dataset.view === view ? 'true' : 'false');
      });

      companyFilterBar.hidden = !showResearch;
      drillRoot.hidden = !showResearch;
      userProfilesMount.hidden = !showResearch;

      if (!showResearch) {
        const bundle = DATA[statePersona];
        aiGuideMount.innerHTML = renderAiDesignGuidance(bundle, statePersona);
        aiGuideMount.hidden = false;
      } else {
        aiGuideMount.hidden = true;
        aiGuideMount.innerHTML = '';
        renderSourcesLink(statePersona);
      }
    }

    workspaceViewTabs.forEach(tab => {
      tab.addEventListener('click', () => setWorkspaceView(tab.dataset.view));
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
