(() => {
  const nav = document.querySelector('.nav-links');
  const inner = document.querySelector('.nav-inner');
  if (nav && inner && !document.querySelector('.nav-toggle')) {
    const btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Menu';
    inner.appendChild(btn);
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const target = href.split('/').pop() || 'index.html';
    if (target === path) link.classList.add('is-active');
  });

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();

(() => {
  const page = document.querySelector('[data-watch-page]');
  if (!page) return;

  const list = page.querySelector('[data-watch-list]');
  const searchInput = page.querySelector('[data-watch-search]');
  const filterSelect = page.querySelector('[data-watch-filter]');
  const sortSelect = page.querySelector('[data-watch-sort]');
  const countEl = page.querySelector('[data-watch-count]');
  const resetBtn = page.querySelector('[data-watch-reset]');
  const storageKey = 'enzo-watch-favorites';
  let favorites = [];

  try {
    favorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
  } catch {
    favorites = [];
  }

  const cards = Array.from(page.querySelectorAll('.watch-article'));
  let empty = page.querySelector('.watch-empty');
  if (!empty) {
    empty = document.createElement('div');
    empty.className = 'watch-empty';
    empty.textContent = 'Aucun article ne correspond aux filtres.';
    list.appendChild(empty);
  }

  const saveFavorites = () => localStorage.setItem(storageKey, JSON.stringify(favorites));

  const isFavorite = (card) => favorites.includes(card.dataset.id);

  const syncFavoriteButtons = () => {
    cards.forEach((card) => {
      const btn = card.querySelector('[data-favorite]');
      const active = isFavorite(card);
      btn.classList.toggle('is-active', active);
      btn.textContent = active ? '★' : '☆';
      btn.setAttribute('aria-label', active ? 'Retirer des favoris' : 'Ajouter aux favoris');
    });
  };

  const matchesFilter = (card, filter) => {
    if (filter === 'all') return true;
    if (filter === 'favoris') return isFavorite(card);
    return card.dataset.category === filter || (card.dataset.tags || '').includes(filter);
  };

  const apply = () => {
    const query = (searchInput.value || '').trim().toLowerCase();
    const filter = filterSelect.value;
    const sort = sortSelect.value;

    const ordered = [...cards].sort((a, b) => {
      if (sort === 'date-asc') return a.dataset.date.localeCompare(b.dataset.date);
      if (sort === 'source') return a.dataset.source.localeCompare(b.dataset.source, 'fr');
      if (sort === 'favorites') return Number(isFavorite(b)) - Number(isFavorite(a)) || b.dataset.date.localeCompare(a.dataset.date);
      return b.dataset.date.localeCompare(a.dataset.date);
    });

    ordered.forEach((card) => list.insertBefore(card, empty));

    let visible = 0;
    ordered.forEach((card) => {
      const haystack = `${card.textContent} ${card.dataset.tags} ${card.dataset.source}`.toLowerCase();
      const show = (!query || haystack.includes(query)) && matchesFilter(card, filter);
      card.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    empty.style.display = visible ? 'none' : 'block';
    if (countEl) countEl.textContent = String(visible);
  };

  cards.forEach((card) => {
    card.querySelector('[data-favorite]').addEventListener('click', () => {
      const id = card.dataset.id;
      favorites = isFavorite(card) ? favorites.filter((item) => item !== id) : [...favorites, id];
      saveFavorites();
      syncFavoriteButtons();
      apply();
    });
  });

  [searchInput, filterSelect, sortSelect].forEach((el) => el.addEventListener('input', apply));
  resetBtn?.addEventListener('click', () => {
    searchInput.value = '';
    filterSelect.value = 'all';
    sortSelect.value = 'date-desc';
    apply();
  });

  syncFavoriteButtons();
  apply();
})();

(() => {
  const tool = document.querySelector('[data-watch-tool]');
  if (!tool) return;

  const storageKey = 'enzo-watch-custom-articles';
  const form = tool.querySelector('[data-watch-tool-form]');
  const list = tool.querySelector('[data-watch-tool-list]');
  const count = tool.querySelector('[data-watch-tool-count]');
  const output = tool.querySelector('[data-watch-tool-code]');
  const reset = tool.querySelector('[data-watch-tool-reset]');
  const exportBtn = tool.querySelector('[data-watch-tool-export]');
  const htmlBtn = tool.querySelector('[data-watch-tool-html]');
  const publishBtn = tool.querySelector('[data-watch-tool-publish]');
  const autoPublishBtn = tool.querySelector('[data-watch-tool-auto-publish]');
  const pdfBtn = tool.querySelector('[data-watch-tool-pdf]');
  const clearBtn = tool.querySelector('[data-watch-tool-clear]');
  const importInput = tool.querySelector('[data-watch-tool-import]');

  const escapeHtml = (value) => String(value || '').replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  const slug = (value) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`;
  const statusLabel = (status) => ({ 'a-lire': 'À lire', lu: 'Lu', utilise: 'Utilisé dans le portfolio' }[status] || 'Lu');
  const monthLabel = (dateValue) => {
    const date = new Date(`${dateValue}T12:00:00`);
    if (Number.isNaN(date.getTime())) return 'Article ajouté';
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).replace(/^./, (c) => c.toUpperCase());
  };
  const load = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch { return []; }
  };
  const save = (articles) => localStorage.setItem(storageKey, JSON.stringify(articles));
  const tagsArray = (tags) => String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean);
  const articleHtml = (article) => {
    const tags = tagsArray(article.tags);
    return `<article class="watch-article" data-id="${escapeHtml(article.id)}" data-date="${escapeHtml(article.date)}" data-source="${escapeHtml(article.source)}" data-tags="${escapeHtml(tags.join(' ').toLowerCase())}" data-category="${escapeHtml(article.category || 'technique')}">
  <aside><strong>${escapeHtml(monthLabel(article.date))}</strong><span>${escapeHtml(article.source)}</span></aside>
  <div class="watch-article-body">
    <button class="watch-favorite" type="button" data-favorite aria-label="Ajouter aux favoris">☆</button>
    <h3>${escapeHtml(article.title)}</h3>
    <p>${escapeHtml(article.summary)}</p>
    <div class="watch-analysis"><strong>Mon analyse</strong><span>${escapeHtml(article.analysis)}</span></div>
    <div class="watch-card-footer"><div class="watch-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div><a href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">Lire la source →</a></div>
  </div>
</article>`;
  };
  const render = () => {
    const articles = load().sort((a, b) => b.date.localeCompare(a.date));
    count.textContent = String(articles.length);
    list.innerHTML = articles.length ? articles.map((article) => `
      <article class="watch-tool-item">
        <div><strong>${escapeHtml(article.title)}</strong><span>${escapeHtml(monthLabel(article.date))} · ${escapeHtml(article.source)} · ${escapeHtml(statusLabel(article.status))}</span>${article.juryQuestion ? `<em>Question jury : ${escapeHtml(article.juryQuestion)}</em>` : ''}</div>
        <div class="watch-tool-item-actions"><button type="button" data-unpublish-article="${escapeHtml(article.id)}">Dépublier</button><button type="button" data-delete-article="${escapeHtml(article.id)}">Supprimer</button></div>
      </article>`).join('') : '<div class="watch-empty">Aucun article ajouté pour le moment.</div>';
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const article = {
      id: `${data.date}-${slug(data.title)}`,
      title: data.title.trim(),
      date: data.date,
      source: data.source.trim(),
      url: data.url.trim(),
      status: data.status || 'lu',
      category: data.category,
      tags: data.tags.trim(),
      summary: data.summary.trim(),
      analysis: data.analysis.trim(),
      juryQuestion: (data.juryQuestion || '').trim(),
    };
    const articles = load().filter((item) => item.id !== article.id);
    articles.push(article);
    save(articles);
    form.reset();
    output.value = JSON.stringify(article, null, 2);
    render();
  });

  list.addEventListener('click', async (event) => {
    const deleteButton = event.target.closest('[data-delete-article]');
    if (deleteButton) {
      save(load().filter((article) => article.id !== deleteButton.dataset.deleteArticle));
      render();
      return;
    }

    const unpublishButton = event.target.closest('[data-unpublish-article]');
    if (!unpublishButton) return;
    try {
      const response = await fetch('./tools/unpublish-veille-article.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: unpublishButton.dataset.unpublishArticle }),
      });
      const result = await response.json();
      output.value = result.ok
        ? `${result.message}\nSauvegarde : ${result.backup || 'non nécessaire'}`
        : `Erreur : ${result.error || 'dépublication impossible'}`;
    } catch (error) {
      output.value = `Erreur de dépublication automatique. Vérifie que Wamp/PHP est actif.\n${error.message}`;
    }
  });

  reset.addEventListener('click', () => form.reset());
  clearBtn.addEventListener('click', () => {
    if (!confirm('Supprimer tous les articles locaux de veille ?')) return;
    save([]);
    output.value = '';
    render();
  });
  exportBtn.addEventListener('click', () => {
    const json = JSON.stringify(load(), null, 2);
    output.value = json;
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'veille-articles-enzo.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });
  htmlBtn.addEventListener('click', () => {
    output.value = load().sort((a, b) => b.date.localeCompare(a.date)).map(articleHtml).join('\n\n');
  });
  publishBtn?.addEventListener('click', () => {
    const html = load().sort((a, b) => b.date.localeCompare(a.date)).map(articleHtml).join('\n\n');
    output.value = `BLOC À COLLER DANS veille.html\n\n1. Ouvre veille.html.\n2. Colle ce bloc dans <div class="watch-list" data-watch-list>, avant la fermeture </div>.\n3. La question jury et le statut privé ne sont pas inclus dans le portfolio public.\n\n${html}`;
  });
  autoPublishBtn?.addEventListener('click', async () => {
    const articles = load().sort((a, b) => b.date.localeCompare(a.date));
    if (!articles.length) {
      output.value = 'Aucun article local à publier.';
      return;
    }
    const article = articles[0];
    try {
      const response = await fetch('./tools/publish-veille-article.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: article.id, articleHtml: articleHtml(article) }),
      });
      const result = await response.json();
      output.value = result.ok
        ? `${result.message}\nSauvegarde : ${result.backup || 'non nécessaire'}\n\nArticle publié : ${article.title}`
        : `Erreur : ${result.error || 'publication impossible'}`;
    } catch (error) {
      output.value = `Erreur de publication automatique. Vérifie que Wamp/PHP est actif.\n${error.message}`;
    }
  });
  pdfBtn?.addEventListener('click', () => {
    const articles = load().sort((a, b) => b.date.localeCompare(a.date));
    const rows = articles.map((article) => `
      <article>
        <p class="meta">${escapeHtml(monthLabel(article.date))} · ${escapeHtml(article.source)} · ${escapeHtml(statusLabel(article.status))}</p>
        <h2>${escapeHtml(article.title)}</h2>
        <p>${escapeHtml(article.summary)}</p>
        <h3>Mon analyse</h3>
        <p>${escapeHtml(article.analysis)}</p>
        ${article.juryQuestion ? `<h3>Question jury possible</h3><p>${escapeHtml(article.juryQuestion)}</p>` : ''}
        <p class="source">Source : ${escapeHtml(article.url)}</p>
      </article>`).join('');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Export veille IPv6</title><style>
      body{font-family:Segoe UI,Arial,sans-serif;margin:36px;color:#081426;line-height:1.55}h1{font-family:Georgia,serif;font-size:44px;line-height:.95;margin:0 0 24px}article{break-inside:avoid;border-top:1px solid #ddd;padding:20px 0}h2{font-size:22px;margin:0 0 8px}.meta,.source{color:#72542a;font-weight:700;font-size:12px;text-transform:uppercase;letter-spacing:.08em}h3{font-size:13px;text-transform:uppercase;letter-spacing:.08em;margin:14px 0 4px}@media print{button{display:none}}
    </style></head><body><h1>Veille IPv6 - articles préparés</h1>${rows || '<p>Aucun article local.</p>'}<button onclick="window.print()">Imprimer / enregistrer en PDF</button></body></html>`);
    printWindow.document.close();
  });
  importInput.addEventListener('change', async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported)) return;
    save(imported);
    output.value = `Import terminé : ${imported.length} article(s).`;
    render();
  });

  render();
})();
