// PillMate AI Application Core Logic
// 세종사이버대학교 AI학과 2026 『일상의 편리를 위한 AI서비스개발 공모전』

document.addEventListener("DOMContentLoaded", () => {
  // --- App State ---
  const state = {
    selectedPills: [],
    apiKey: localStorage.getItem("pillmate_gemini_key") || "",
    currentCategory: "all",
    chatMessages: [
      {
        sender: "ai",
        text: "안녕하세요! PillMate AI 복약 세이프가드입니다. 💊 현재 선택하신 약·영양제 목록을 바탕으로 실시간 상호작용 검진, 최적 복약 타임라인, 성분 과다 위험을 분석해 드립니다. 궁금한 점이 있으시면 언제든 편하게 물어보세요!"
      }
    ]
  };

  // --- DOM Elements ---
  const presetContainer = document.getElementById("preset-container");
  const quickChipsContainer = document.getElementById("quick-chips-container");
  const pillSearchInput = document.getElementById("pill-search-input");
  const btnClearSearch = document.getElementById("btn-clear-search");
  const autocompleteList = document.getElementById("autocomplete-list");
  const categoryFilters = document.querySelectorAll(".cat-pill");
  const activePillsList = document.getElementById("active-pills-list");
  const pillsEmptyState = document.getElementById("pills-empty-state");
  const pillCountBadge = document.getElementById("pill-count-badge");
  const btnResetAll = document.getElementById("btn-reset-all");

  const safetyBadge = document.getElementById("safety-badge");
  const safetyLabel = document.getElementById("safety-label");
  const scoreText = document.getElementById("score-text");
  const dangerCountEl = document.getElementById("danger-count");
  const cautionCountEl = document.getElementById("caution-count");
  const synergyCountEl = document.getElementById("synergy-count");
  const overdoseCountEl = document.getElementById("overdose-count");
  const interactionResultsContainer = document.getElementById("interaction-results-container");

  const timelineSlotsContainer = document.getElementById("timeline-slots-container");
  const nutrientBarsContainer = document.getElementById("nutrient-bars-container");

  const chatMessagesEl = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatModeLabel = document.getElementById("chat-mode-label");
  const chatQuickButtons = document.querySelectorAll(".chat-q-chip");

  const archModal = document.getElementById("arch-modal");
  const btnOpenArch = document.getElementById("btn-open-arch");
  const btnCloseArch = document.getElementById("btn-close-arch");
  const btnCloseArchBottom = document.getElementById("btn-close-arch-bottom");

  const keyModal = document.getElementById("key-modal");
  const btnOpenKeyModal = document.getElementById("btn-open-key-modal");
  const btnCloseKey = document.getElementById("btn-close-key");
  const btnSaveKey = document.getElementById("btn-save-key");
  const btnRemoveKey = document.getElementById("btn-remove-key");
  const geminiKeyInput = document.getElementById("gemini-key-input");

  const btnPrintReport = document.getElementById("btn-print-report");

  // --- Initial Setup ---
  function init() {
    renderPresets();
    renderQuickChips();
    setupEventListeners();
    updateChatModeUI();

    // Default Load Preset: Worker Set ( 직장인 피로회복 세트 )
    loadPreset("preset_worker");
  }

  // --- Render Preset Scenarios ---
  function renderPresets() {
    if (!presetContainer) return;
    presetContainer.innerHTML = PRESET_SCENARIOS.map(p => `
      <button class="preset-card bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left flex flex-col justify-between group" data-preset-id="${p.id}">
        <div>
          <div class="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-blue-600 mb-1 flex items-center justify-between">
            <span>${p.name}</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5"></i>
          </div>
          <div class="text-[11px] text-blue-600 font-medium mb-1">${p.tagline}</div>
          <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">${p.desc}</p>
        </div>
        <div class="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-slate-400">
          <span>성분 ${p.pillIds.length}개</span>
          <span>•</span>
          <span class="text-blue-500 font-medium">원클릭 시연</span>
        </div>
      </button>
    `).join("");

    if (window.lucide) lucide.createIcons();
  }

  // --- Render Quick Chips ---
  function renderQuickChips() {
    if (!quickChipsContainer) return;
    const popularPills = [
      "supp_omega3", "supp_vit_b", "supp_vit_c", "supp_calcium",
      "supp_iron", "supp_magnesium", "drug_ibuprofen", "drug_aspirin"
    ];
    quickChipsContainer.innerHTML = popularPills.map(id => {
      const pill = PILL_DATABASE.find(p => p.id === id);
      if (!pill) return "";
      return `
        <button class="quick-add-btn text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 transition-colors flex items-center gap-1 font-medium" data-id="${pill.id}">
          <span>${pill.icon}</span>
          <span>${pill.name}</span>
        </button>
      `;
    }).join("");
  }

  // --- Autocomplete & Search ---
  function handleSearch(query) {
    if (!query || query.trim() === "") {
      autocompleteList.classList.add("hidden");
      btnClearSearch.classList.add("hidden");
      return;
    }

    btnClearSearch.classList.remove("hidden");
    const q = query.toLowerCase().trim();
    
    const matches = PILL_DATABASE.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchEng = p.engName.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchTag = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
      const matchIngr = p.ingredients && p.ingredients.some(i => i.name.toLowerCase().includes(q));
      return matchName || matchEng || matchCat || matchTag || matchIngr;
    });

    if (matches.length === 0) {
      autocompleteList.innerHTML = `
        <div class="p-3 text-xs text-slate-400 text-center">검색 결과가 없습니다.</div>
      `;
    } else {
      autocompleteList.innerHTML = matches.slice(0, 8).map(pill => {
        const isAdded = state.selectedPills.some(p => p.id === pill.id);
        return `
          <div class="p-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between group autocomplete-item" data-id="${pill.id}">
            <div class="flex items-center gap-2">
              <span class="text-base">${pill.icon}</span>
              <div>
                <div class="font-semibold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                  <span>${pill.name}</span>
                  <span class="text-[10px] text-slate-400">(${pill.category})</span>
                </div>
                <div class="text-[11px] text-slate-500">${pill.bestTiming}</div>
              </div>
            </div>
            <div>
              ${isAdded ? 
                `<span class="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">등록됨</span>` : 
                `<span class="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded group-hover:bg-blue-600 group-hover:text-white transition-colors">+ 추가</span>`}
            </div>
          </div>
        `;
      }).join("");
    }

    autocompleteList.classList.remove("hidden");
  }

  // --- Add / Remove Pills ---
  function addPill(pillId) {
    if (state.selectedPills.some(p => p.id === pillId)) {
      showToast("이미 등록된 항목입니다.");
      return;
    }
    const pill = PILL_DATABASE.find(p => p.id === pillId);
    if (!pill) return;

    state.selectedPills.push(pill);
    pillSearchInput.value = "";
    autocompleteList.classList.add("hidden");
    btnClearSearch.classList.add("hidden");

    updateUI();
    showToast(`'${pill.name}'이(가) 복약함에 추가되었습니다.`);
  }

  function removePill(pillId) {
    state.selectedPills = state.selectedPills.filter(p => p.id !== pillId);
    updateUI();
  }

  function resetPills() {
    if (state.selectedPills.length === 0) return;
    state.selectedPills = [];
    updateUI();
    showToast("복약함이 초기화되었습니다.");
  }

  function loadPreset(presetId) {
    const preset = PRESET_SCENARIOS.find(p => p.id === presetId);
    if (!preset) return;

    state.selectedPills = preset.pillIds.map(id => PILL_DATABASE.find(p => p.id === id)).filter(Boolean);
    updateUI();
    showToast(`'${preset.name}' 시나리오가 로드되었습니다.`);
  }

  // --- Core UI & Analysis Update ---
  function updateUI() {
    renderSelectedPillsList();
    runAIAnalysis();
    renderTimeline();
    renderNutrientBars();
    if (window.lucide) lucide.createIcons();
  }

  // --- Render Selected Pills List ---
  function renderSelectedPillsList() {
    pillCountBadge.textContent = `${state.selectedPills.length}개 등록됨`;

    if (state.selectedPills.length === 0) {
      pillsEmptyState.classList.remove("hidden");
      activePillsList.classList.add("hidden");
      activePillsList.innerHTML = "";
      return;
    }

    pillsEmptyState.classList.add("hidden");
    activePillsList.classList.remove("hidden");

    activePillsList.innerHTML = state.selectedPills.map(pill => `
      <div class="p-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-start justify-between gap-3 shadow-2xs animate-fade-in">
        <div class="flex items-start gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-base flex-shrink-0">
            ${pill.icon}
          </div>
          <div>
            <div class="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 flex-wrap">
              <span>${pill.name}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">${pill.category}</span>
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5">
              권장: <span class="font-medium text-slate-700">${pill.bestTiming}</span>
            </div>
            <div class="flex flex-wrap gap-1 mt-1 text-[10px] text-slate-400">
              ${pill.ingredients.map(i => `<span class="bg-slate-50 px-1 py-0.2 rounded">${i.name}</span>`).join("")}
            </div>
          </div>
        </div>
        <button class="btn-remove-pill text-slate-400 hover:text-red-500 transition-colors p-1" data-id="${pill.id}" title="삭제">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    `).join("");
  }

  // --- AI Analysis Engine ---
  function runAIAnalysis() {
    const pills = state.selectedPills;
    const pillIds = pills.map(p => p.id);

    if (pills.length === 0) {
      scoreText.innerHTML = `100<span class="text-sm font-normal text-slate-400">/100점</span>`;
      safetyLabel.textContent = "복약 목록 없음";
      safetyBadge.className = "px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-slate-100 text-slate-600";
      dangerCountEl.textContent = "0";
      cautionCountEl.textContent = "0";
      synergyCountEl.textContent = "0";
      overdoseCountEl.textContent = "0";
      interactionResultsContainer.innerHTML = `
        <div class="text-center py-8 text-xs text-slate-400">
          약 또는 영양제를 등록하면 AI 상호작용 검진 결과가 표시됩니다.
        </div>
      `;
      return;
    }

    // Find all matched interactions
    const foundInteractions = [];
    for (let i = 0; i < pillIds.length; i++) {
      for (let j = i + 1; j < pillIds.length; j++) {
        const idA = pillIds[i];
        const idB = pillIds[j];

        const match = INTERACTION_RULES.find(rule => 
          (rule.pair[0] === idA && rule.pair[1] === idB) ||
          (rule.pair[0] === idB && rule.pair[1] === idA)
        );

        if (match) {
          const pillA = PILL_DATABASE.find(p => p.id === idA);
          const pillB = PILL_DATABASE.find(p => p.id === idB);
          foundInteractions.push({ ...match, pillA, pillB });
        }
      }
    }

    // Check Nutrient Overdose
    const nutrientTotals = calculateNutrientTotals();
    const overdoseList = [];
    for (const [nutrientName, data] of Object.entries(nutrientTotals)) {
      const std = NUTRIENT_STANDARDS[nutrientName];
      if (std && std.ul && data.total > std.ul) {
        overdoseList.push({
          name: nutrientName,
          total: data.total,
          ul: std.ul,
          unit: std.unit,
          desc: std.desc
        });
      }
    }

    const dangerCount = foundInteractions.filter(r => r.level === "danger").length;
    const cautionCount = foundInteractions.filter(r => r.level === "caution").length;
    const synergyCount = foundInteractions.filter(r => r.level === "synergy").length;
    const overdoseCount = overdoseList.length;

    dangerCountEl.textContent = dangerCount;
    cautionCountEl.textContent = cautionCount;
    synergyCountEl.textContent = synergyCount;
    overdoseCountEl.textContent = overdoseCount;

    // Safety Score Calculation
    let score = 100;
    score -= (dangerCount * 30);
    score -= (cautionCount * 12);
    score -= (overdoseCount * 15);
    score += (synergyCount * 5);
    if (score > 100) score = 100;
    if (score < 20) score = 20;

    let scoreColor = "text-emerald-600";
    if (score < 60) {
      scoreColor = "text-red-600";
      safetyLabel.textContent = "🚨 위험 경고 (조정 필수)";
      safetyBadge.className = "px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-red-100 text-red-800 animate-pulse";
    } else if (score < 85) {
      scoreColor = "text-amber-600";
      safetyLabel.textContent = "⚠️ 주의 요망 (시차 복용 권장)";
      safetyBadge.className = "px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-amber-100 text-amber-800";
    } else {
      scoreColor = "text-emerald-600";
      safetyLabel.textContent = "🟢 안전 (우수 조합)";
      safetyBadge.className = "px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 bg-emerald-100 text-emerald-800";
    }

    scoreText.innerHTML = `<span class="${scoreColor}">${score}</span><span class="text-sm font-normal text-slate-400">/100점</span>`;

    // Render Interaction Cards
    if (foundInteractions.length === 0 && overdoseList.length === 0) {
      interactionResultsContainer.innerHTML = `
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900 text-xs sm:text-sm flex items-start gap-3">
          <i data-lucide="check-circle" class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
          <div>
            <div class="font-bold mb-0.5">발견된 위험 상호작용이 없습니다!</div>
            <p class="text-emerald-700 text-xs leading-relaxed">
              현재 등록하신 의약품 및 영양제 간에는 알려진 병용 금기나 심각한 흡수 저해 상충이 발견되지 않았습니다. 권장 시간대에 맞춰 안심하고 복용하세요.
            </p>
          </div>
        </div>
      `;
    } else {
      let cardsHtml = "";

      // Overdose warnings first
      overdoseList.forEach(item => {
        cardsHtml += `
          <div class="p-4 rounded-xl border border-purple-200 bg-purple-50/80 text-xs sm:text-sm animate-fade-in">
            <div class="flex items-center justify-between font-bold text-purple-900 mb-1">
              <span class="flex items-center gap-1.5">
                <i data-lucide="alert-triangle" class="w-4 h-4 text-purple-600"></i>
                [상한 섭취량 초과] ${item.name} 1일 누적 ${item.total} ${item.unit}
              </span>
              <span class="bg-purple-200 text-purple-800 text-[10px] px-2 py-0.5 rounded font-bold">UL: ${item.ul} ${item.unit}</span>
            </div>
            <p class="text-purple-800 text-xs mb-1.5 leading-relaxed">${item.desc}</p>
            <div class="text-[11px] text-purple-600 font-medium">
              💡 솔루션: 중복 함유된 보충제 중 하나를 격일로 복용하거나 단일제 함량을 낮추는 것을 권장합니다.
            </div>
          </div>
        `;
      });

      // Interaction warnings
      foundInteractions.forEach(item => {
        const isDanger = item.level === "danger";
        const isSynergy = item.level === "synergy";

        let borderClass = isDanger ? "border-red-200 bg-red-50/80 text-red-950" : (isSynergy ? "border-emerald-200 bg-emerald-50/80 text-emerald-950" : "border-amber-200 bg-amber-50/80 text-amber-950");
        let badgeClass = isDanger ? "bg-red-200 text-red-800" : (isSynergy ? "bg-emerald-200 text-emerald-800" : "bg-amber-200 text-amber-800");
        let badgeLabel = isDanger ? "위험 (금기)" : (isSynergy ? "시너지 (권장)" : "주의 (흡수경쟁)");

        cardsHtml += `
          <div class="p-4 rounded-xl border ${borderClass} text-xs sm:text-sm animate-fade-in space-y-2">
            <div class="flex items-center justify-between">
              <div class="font-bold flex items-center gap-1.5">
                <span>${item.title}</span>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded ${badgeClass}">${badgeLabel}</span>
            </div>
            <div class="text-[11px] opacity-80 flex items-center gap-2">
              <span class="font-semibold">${item.pillA.name}</span>
              <span>↔</span>
              <span class="font-semibold">${item.pillB.name}</span>
            </div>
            <p class="text-xs leading-relaxed opacity-90">
              <strong>약학 기전:</strong> ${item.mechanism}
            </p>
            <div class="p-2.5 rounded-lg bg-white/70 border border-slate-200/50 text-xs leading-relaxed">
              <strong>💡 복약 지도 가이드:</strong> ${item.advice}
            </div>
            <div class="text-[10px] text-slate-500 flex items-center gap-1">
              <span>근거:</span>
              <span class="italic">${item.source}</span>
            </div>
          </div>
        `;
      });

      interactionResultsContainer.innerHTML = cardsHtml;
    }
  }

  // --- Calculate Nutrient Totals ---
  function calculateNutrientTotals() {
    const totals = {};
    state.selectedPills.forEach(pill => {
      pill.ingredients.forEach(ingr => {
        // extract base nutrient name
        let baseName = "";
        for (const key of Object.keys(NUTRIENT_STANDARDS)) {
          if (ingr.name.includes(key)) {
            baseName = key;
            break;
          }
        }
        if (baseName) {
          if (!totals[baseName]) {
            totals[baseName] = { total: 0, pills: [] };
          }
          totals[baseName].total += ingr.amount;
          totals[baseName].pills.push({ pillName: pill.name, amount: ingr.amount });
        }
      });
    });
    return totals;
  }

  // --- Render 24-Hour Smart Timeline ---
  function renderTimeline() {
    if (!timelineSlotsContainer) return;

    if (state.selectedPills.length === 0) {
      timelineSlotsContainer.innerHTML = `
        <div class="text-center py-8 text-xs text-slate-400">
          약 또는 영양제를 추가하면 24시간 최적 복약 타임라인이 자동으로 설계됩니다.
        </div>
      `;
      return;
    }

    // 5 Time Slots definition
    const slots = [
      {
        id: "fasting",
        title: "🌅 아침 기상 직후 (공복)",
        timing: "오전 07:00 ~ 08:00 (미온수 200ml 필수)",
        pills: [],
        reason: "위산 분비가 적은 공복에 흡수율이 높거나 장까지 도달해야 하는 성분"
      },
      {
        id: "morning_meal",
        title: "☀️ 아침 식후 30분",
        timing: "오전 08:30 ~ 09:30",
        pills: [],
        reason: "하루 활력 및 대사를 촉진하고 음식물과 함께 흡수되어 위장 자극을 줄이는 성분"
      },
      {
        id: "lunch_meal",
        title: "🍽️ 점심 식후 즉시",
        timing: "오후 12:30 ~ 01:30 (식사 직후)",
        pills: [],
        reason: "식사 중 분비된 담즙산과 지방질에 녹아 흡수율이 극대화되는 지용성 성분"
      },
      {
        id: "dinner_meal",
        title: "🌙 저녁 식후 30분",
        timing: "오후 07:00 ~ 08:00",
        pills: [],
        reason: "밤 사이 간 대사 및 세포 재생에 관여하거나 아침 성분과 시차를 둬야 하는 성분"
      },
      {
        id: "bedtime",
        title: "🛌 취침 전 1시간",
        timing: "오후 10:30 ~ 11:30",
        pills: [],
        reason: "신경 안정 및 근육 이완을 도와 수면의 질을 향상시키는 성분"
      }
    ];

    // CSP Assignment Logic
    state.selectedPills.forEach(pill => {
      let assignedSlotId = pill.preferredSlot || "morning_meal";

      // Collision avoidance adjustments
      // If Iron and Calcium both present:
      if (pill.id === "supp_calcium") {
        assignedSlotId = "dinner_meal";
      }
      if (pill.id === "supp_iron") {
        assignedSlotId = "fasting";
      }
      if (pill.id === "supp_magnesium") {
        assignedSlotId = "bedtime";
      }
      if (pill.id === "supp_omega3" || pill.id === "supp_vit_d") {
        assignedSlotId = "lunch_meal";
      }

      const slot = slots.find(s => s.id === assignedSlotId) || slots[1];
      slot.pills.push(pill);
    });

    timelineSlotsContainer.innerHTML = slots.map(slot => {
      const hasPills = slot.pills.length > 0;
      return `
        <div class="p-3.5 rounded-xl border ${hasPills ? 'border-indigo-100 bg-indigo-50/40' : 'border-slate-100 bg-slate-50/50 opacity-60'} transition-all">
          <div class="flex items-center justify-between mb-1.5">
            <div class="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
              <span>${slot.title}</span>
              <span class="text-[11px] text-slate-400 font-normal">(${slot.timing})</span>
            </div>
            <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${hasPills ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}">
              ${slot.pills.length}개
            </span>
          </div>
          <p class="text-[11px] text-slate-500 mb-2 leading-tight">${slot.reason}</p>
          
          ${hasPills ? `
            <div class="flex flex-wrap gap-1.5">
              ${slot.pills.map(p => `
                <div class="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-2xs flex items-center gap-1">
                  <span>${p.icon}</span>
                  <span>${p.name}</span>
                </div>
              `).join("")}
            </div>
          ` : `
            <div class="text-[11px] text-slate-400 italic">복용 권장 항목 없음</div>
          `}
        </div>
      `;
    }).join("");
  }

  // --- Render Nutrient Bars ---
  function renderNutrientBars() {
    if (!nutrientBarsContainer) return;
    const totals = calculateNutrientTotals();

    const tracked = ["비타민A", "비타민C", "비타민D", "아연", "마그네슘", "철분", "칼슘"];

    nutrientBarsContainer.innerHTML = tracked.map(nutName => {
      const std = NUTRIENT_STANDARDS[nutName];
      const data = totals[nutName] || { total: 0 };
      const current = data.total;
      const rda = std.rda;
      const ul = std.ul;
      const percentOfRda = Math.round((current / rda) * 100);
      const percentOfUl = Math.round((current / ul) * 100);

      let barColor = "bg-blue-500";
      let statusBadge = `<span class="text-[10px] text-slate-400 font-normal">적정</span>`;

      if (current === 0) {
        barColor = "bg-slate-300";
        statusBadge = `<span class="text-[10px] text-slate-400 font-normal">미섭취</span>`;
      } else if (current > ul) {
        barColor = "bg-red-500";
        statusBadge = `<span class="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">상한 초과(${percentOfUl}%)</span>`;
      } else if (percentOfRda > 150) {
        barColor = "bg-emerald-500";
        statusBadge = `<span class="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">충분 (${percentOfRda}%)</span>`;
      } else {
        barColor = "bg-blue-500";
        statusBadge = `<span class="text-[10px] font-medium text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded">${percentOfRda}%</span>`;
      }

      // Max display bar width capped at 100%
      const barWidth = Math.min(Math.max(percentOfUl, percentOfRda / 2), 100);

      return `
        <div>
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-semibold text-slate-700">${nutName}</span>
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-slate-500">${current} / ${ul} ${std.unit}</span>
              ${statusBadge}
            </div>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
            <div class="${barColor} h-2 rounded-full transition-all duration-500" style="width: ${barWidth}%"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // --- AI Advisor Chat Logic ---
  async function handleChatSubmit(query) {
    if (!query || query.trim() === "") return;

    // Append user message
    state.chatMessages.push({ sender: "user", text: query });
    renderChatMessages();
    chatInput.value = "";

    // Show loading
    const loadingMsgId = "loading-" + Date.now();
    state.chatMessages.push({ sender: "ai", text: "답변을 생성 중입니다...", id: loadingMsgId });
    renderChatMessages();

    // Check if user has Gemini API Key
    if (state.apiKey && state.apiKey.trim().startsWith("AIzaSy")) {
      try {
        const reply = await callGeminiAPI(query);
        updateLoadingMessage(loadingMsgId, reply);
      } catch (err) {
        console.error("Gemini API Error:", err);
        const fallbackReply = generateLocalAdvisorResponse(query);
        updateLoadingMessage(loadingMsgId, fallbackReply + "\n\n*(Gemini API 호출 지연으로 온디바이스 엔진이 응답했습니다)*");
      }
    } else {
      // Natural on-device generation delay for realism
      setTimeout(() => {
        const reply = generateLocalAdvisorResponse(query);
        updateLoadingMessage(loadingMsgId, reply);
      }, 400);
    }
  }

  function generateLocalAdvisorResponse(query) {
    const q = query.toLowerCase();

    // Check specific KB keywords first
    for (const kb of AI_ADVISOR_KB) {
      if (kb.keywords.some(k => q.includes(k))) {
        return kb.response;
      }
    }

    // Contextual synthesis
    const pillNames = state.selectedPills.map(p => p.name);
    if (pillNames.length > 0) {
      return `💊 현재 등록하신 복약 목록 [${pillNames.join(", ")}]을 검토해 드렸습니다.\n\n` +
             `- **복용 순서**: 아침 공복에는 유산균·철분을, 식사 후에는 비타민B군과 오메가3를, 저녁 또는 취침 전에는 칼슘과 마그네슘을 섭취하시는 것이 가장 흡수율이 좋습니다.\n` +
             `- **수분 섭취**: 위장 보호와 흡수를 위해 복용 시 최소 1컵(200ml) 이상의 미온수를 함께 드세요.\n` +
             `- 더 구체적인 부작용이나 음식과의 상호작용이 궁금하시다면 상단의 빠른 질문 버튼을 눌러보세요!`;
    }

    return "영양제와 의약품의 복용 시간, 상호작용 위험, 음식과의 궁합 등에 대해 질문해 주시면 식약처 DUR 기준에 따라 상세히 조언해 드리겠습니다!";
  }

  async function callGeminiAPI(userQuery) {
    const pillSummary = state.selectedPills.map(p => `${p.name} (${p.category}): ${p.ingredients.map(i => i.name + ' ' + i.amount + i.unit).join(', ')}`).join("\n");
    const systemPrompt = `당신은 대한민국 식약처 DUR 및 임상 약학 가이드라인에 기반한 전문 AI 복약 어드바이저 'PillMate AI'입니다.
현재 사용자가 복용 중인 약/영양제 목록:
${pillSummary || "현재 등록된 약 없음"}

사용자의 질문에 대해:
1. 친절하고 명확한 전문 약사 톤으로 설명하세요.
2. 성분 간 흡수 저해나 부작용 위험, 올바른 복용 시간대를 짚어주세요.
3. 마지막에 의학적 진단은 의사/약사와 상담하라는 안내를 덧붙이세요.
답변은 읽기 편하게 마크다운 포맷으로 작성하세요.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${state.apiKey}`;
    const payload = {
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n사용자 질문: " + userQuery }] }
      ]
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("API call failed: " + res.status);
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  }

  function updateLoadingMessage(id, newText) {
    const target = state.chatMessages.find(m => m.id === id);
    if (target) {
      target.text = newText;
      delete target.id;
    }
    renderChatMessages();
  }

  function renderChatMessages() {
    chatMessagesEl.innerHTML = state.chatMessages.map(m => {
      const isUser = m.sender === "user";
      return `
        <div class="flex gap-2.5 items-start ${isUser ? 'flex-row-reverse' : ''} animate-fade-in">
          <div class="w-7 h-7 rounded-full ${isUser ? 'bg-blue-600' : 'bg-purple-600'} text-white flex items-center justify-center text-xs flex-shrink-0">
            ${isUser ? '나' : 'AI'}
          </div>
          <div class="${isUser ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800'} p-3 rounded-2xl ${isUser ? 'rounded-tr-none' : 'rounded-tl-none'} shadow-xs leading-relaxed max-w-[85%] whitespace-pre-line text-xs sm:text-sm">
            ${m.text}
          </div>
        </div>
      `;
    }).join("");
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }

  function updateChatModeUI() {
    if (state.apiKey && state.apiKey.trim().startsWith("AIzaSy")) {
      chatModeLabel.textContent = "Google Gemini 1.5 Flash 실시간 생성 연동 중";
    } else {
      chatModeLabel.textContent = "온디바이스 하이브리드 지식 엔진 (즉각 응답)";
    }
  }

  // --- Toast Notification ---
  function showToast(msg) {
    let toast = document.getElementById("toast-banner");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-banner";
      toast.className = "fixed bottom-5 right-5 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs z-50 flex items-center gap-2 animate-fade-in";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>💊</span><span>${msg}</span>`;
    toast.style.display = "flex";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2400);
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Preset cards
    document.addEventListener("click", e => {
      const presetCard = e.target.closest(".preset-card");
      if (presetCard) {
        const pid = presetCard.dataset.presetId;
        loadPreset(pid);
      }

      const quickBtn = e.target.closest(".quick-add-btn");
      if (quickBtn) {
        addPill(quickBtn.dataset.id);
      }

      const autoItem = e.target.closest(".autocomplete-item");
      if (autoItem) {
        addPill(autoItem.dataset.id);
      }

      const removeBtn = e.target.closest(".btn-remove-pill");
      if (removeBtn) {
        removePill(removeBtn.dataset.id);
      }
    });

    // Search input
    pillSearchInput.addEventListener("input", e => handleSearch(e.target.value));
    btnClearSearch.addEventListener("click", () => {
      pillSearchInput.value = "";
      handleSearch("");
    });

    // Category filter pills
    categoryFilters.forEach(btn => {
      btn.addEventListener("click", () => {
        categoryFilters.forEach(b => {
          b.className = "cat-pill px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50";
        });
        btn.className = "cat-pill active px-2.5 py-1 rounded-lg border border-blue-600 bg-blue-50 text-blue-700 font-semibold";
        
        const cat = btn.dataset.cat;
        state.currentCategory = cat;
        if (cat === "all") {
          handleSearch(pillSearchInput.value);
        } else {
          pillSearchInput.value = cat;
          handleSearch(cat);
        }
      });
    });

    // Reset All
    btnResetAll.addEventListener("click", resetPills);

    // Chat submit
    chatForm.addEventListener("submit", e => {
      e.preventDefault();
      handleChatSubmit(chatInput.value);
    });

    // Chat quick questions
    chatQuickButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        handleChatSubmit(btn.textContent.trim());
      });
    });

    // Modals
    btnOpenArch.addEventListener("click", () => archModal.classList.remove("hidden"));
    btnCloseArch.addEventListener("click", () => archModal.classList.add("hidden"));
    btnCloseArchBottom.addEventListener("click", () => archModal.classList.add("hidden"));

    btnOpenKeyModal.addEventListener("click", () => {
      geminiKeyInput.value = state.apiKey;
      keyModal.classList.remove("hidden");
    });
    btnCloseKey.addEventListener("click", () => keyModal.classList.add("hidden"));
    btnSaveKey.addEventListener("click", () => {
      const val = geminiKeyInput.value.trim();
      state.apiKey = val;
      localStorage.setItem("pillmate_gemini_key", val);
      keyModal.classList.add("hidden");
      updateChatModeUI();
      showToast("Gemini API 키가 안전하게 저장되었습니다.");
    });
    btnRemoveKey.addEventListener("click", () => {
      state.apiKey = "";
      localStorage.removeItem("pillmate_gemini_key");
      geminiKeyInput.value = "";
      keyModal.classList.add("hidden");
      updateChatModeUI();
      showToast("API 키가 삭제되었습니다. (온디바이스 모드 전환)");
    });

    // Print
    btnPrintReport.addEventListener("click", () => window.print());
  }

  init();
});
