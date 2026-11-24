// PillMate AI Knowledge Database (DUR & Supplement Interaction Graph)
// 세종사이버대학교 AI학과 2026 『일상의 편리를 위한 AI서비스개발 공모전』

const PILL_DATABASE = [
  // --- 비타민 / 미네랄 영양제 ---
  {
    id: "supp_mv",
    name: "종합비타민 & 미네랄",
    engName: "Multivitamin & Minerals",
    category: "비타민/미네랄",
    icon: "💊",
    ingredients: [
      { name: "비타민A", amount: 700, unit: "mcg RAE" },
      { name: "비타민B군", amount: 50, unit: "mg" },
      { name: "비타민C", amount: 500, unit: "mg" },
      { name: "비타민D", amount: 25, unit: "mcg (1000IU)" },
      { name: "아연", amount: 15, unit: "mg" },
      { name: "마그네슘", amount: 100, unit: "mg" }
    ],
    bestTiming: "아침 식후 30분",
    preferredSlot: "morning_meal",
    stomachBurden: "중간 (공복 시 메스꺼움 유발 가능)",
    tags: ["활력", "면역", "피로회복"]
  },
  {
    id: "supp_vit_b",
    name: "고함량 활성 비타민B군",
    engName: "High Potency Vitamin B Complex",
    category: "비타민/미네랄",
    icon: "⚡",
    ingredients: [
      { name: "비타민B1(벤포티아민)", amount: 100, unit: "mg" },
      { name: "비타민B2", amount: 100, unit: "mg" },
      { name: "비타민B6", amount: 100, unit: "mg" },
      { name: "비타민B12", amount: 500, unit: "mcg" }
    ],
    bestTiming: "아침 식후",
    preferredSlot: "morning_meal",
    stomachBurden: "낮음",
    tags: ["만성피로", "에너지", "신경통"]
  },
  {
    id: "supp_vit_c",
    name: "비타민C 1000mg",
    engName: "Vitamin C 1000mg",
    category: "비타민/미네랄",
    icon: "🍋",
    ingredients: [
      { name: "비타민C", amount: 1000, unit: "mg" }
    ],
    bestTiming: "아침 또는 점심 식후",
    preferredSlot: "lunch_meal",
    stomachBurden: "높음 (강한 산성으로 공복 복용 시 속쓰림)",
    tags: ["항산화", "피부", "결합조직형성"]
  },
  {
    id: "supp_vit_d",
    name: "비타민D3 (2000~4000IU)",
    engName: "Vitamin D3",
    category: "비타민/미네랄",
    icon: "☀️",
    ingredients: [
      { name: "비타민D", amount: 50, unit: "mcg (2000IU)" }
    ],
    bestTiming: "점심 식후 (지방질 식사 직후 흡수 극대화)",
    preferredSlot: "lunch_meal",
    stomachBurden: "낮음",
    tags: ["뼈건강", "면역력", "칼슘흡수"]
  },
  {
    id: "supp_calcium",
    name: "구연산 칼슘",
    engName: "Calcium Citrate",
    category: "관절/뼈/근육",
    icon: "🦴",
    ingredients: [
      { name: "칼슘", amount: 500, unit: "mg" }
    ],
    bestTiming: "저녁 식후",
    preferredSlot: "dinner_meal",
    stomachBurden: "중간 (변비 유발 가능)",
    tags: ["골다공증", "뼈", "치아"]
  },
  {
    id: "supp_iron",
    name: "철분제 (헴철/비헴철)",
    engName: "Iron Supplement",
    category: "비타민/미네랄",
    icon: "🩸",
    ingredients: [
      { name: "철분", amount: 24, unit: "mg" }
    ],
    bestTiming: "아침 공복 또는 식간",
    preferredSlot: "fasting",
    stomachBurden: "높음 (메스꺼움, 위장장애, 흑변 가능)",
    tags: ["빈혈", "산소공급", "피로예방"]
  },
  {
    id: "supp_magnesium",
    name: "마그네슘 (킬레이트/말산/글리시네이트)",
    engName: "Magnesium",
    category: "관절/뼈/근육",
    icon: "🌙",
    ingredients: [
      { name: "마그네슘", amount: 250, unit: "mg" }
    ],
    bestTiming: "취침 전 1시간 또는 저녁 식후",
    preferredSlot: "bedtime",
    stomachBurden: "낮음 (과량 시 연변 가능)",
    tags: ["수면", "근육이완", "신경안정", "눈떨림"]
  },
  {
    id: "supp_zinc",
    name: "아연 (글루콘산/피콜리네이트)",
    engName: "Zinc",
    category: "비타민/미네랄",
    icon: "🛡️",
    ingredients: [
      { name: "아연", amount: 25, unit: "mg" }
    ],
    bestTiming: "식후 즉시",
    preferredSlot: "lunch_meal",
    stomachBurden: "높음 (공복 시 강한 구토감 유발)",
    tags: ["면역기능", "세포분열", "피부"]
  },

  // --- 기능성 영양제 ---
  {
    id: "supp_omega3",
    name: "rTG 오메가-3 (EPA/DHA)",
    engName: "rTG Omega-3",
    category: "혈행/지질",
    icon: "🐟",
    ingredients: [
      { name: "EPA+DHA", amount: 1000, unit: "mg" }
    ],
    bestTiming: "점심 또는 저녁 식후 즉시 (기름진 식사 후)",
    preferredSlot: "lunch_meal",
    stomachBurden: "낮음 (비린내 역류 가능)",
    tags: ["혈행개선", "중성지방", "건조한눈"]
  },
  {
    id: "supp_probiotics",
    name: "프로바이오틱스 (생유산균)",
    engName: "Probiotics",
    category: "장/소화",
    icon: "🦠",
    ingredients: [
      { name: "보장균수", amount: 100, unit: "억 CFU" }
    ],
    bestTiming: "아침 기상 직후 공복 (미온수 1컵과 함께)",
    preferredSlot: "fasting",
    stomachBurden: "매우 낮음",
    tags: ["장건강", "배변활동", "면역"]
  },
  {
    id: "supp_milk_thistle",
    name: "밀크씨슬 (실리마린)",
    engName: "Milk Thistle (Silymarin)",
    category: "간건강/해독",
    icon: "🌿",
    ingredients: [
      { name: "실리마린", amount: 130, unit: "mg" }
    ],
    bestTiming: "저녁 식후 또는 취침 전",
    preferredSlot: "dinner_meal",
    stomachBurden: "낮음",
    tags: ["간건강", "알코올대사", "피로회복"]
  },
  {
    id: "supp_lutein",
    name: "루테인 지아잔틴",
    engName: "Lutein & Zeaxanthin",
    category: "눈건강",
    icon: "👁️",
    ingredients: [
      { name: "루테인", amount: 20, unit: "mg" },
      { name: "비타민A", amount: 500, unit: "mcg RAE" }
    ],
    bestTiming: "아침 또는 점심 식후",
    preferredSlot: "morning_meal",
    stomachBurden: "낮음",
    tags: ["눈피로", "황반색소밀도", "시력보호"]
  },
  {
    id: "supp_ginkgo",
    name: "은행잎추출물 (플라보놀 배당체)",
    engName: "Ginkgo Biloba Extract",
    category: "혈행/기억력",
    icon: "🍂",
    ingredients: [
      { name: "플라보놀배당체", amount: 28, unit: "mg" }
    ],
    bestTiming: "아침 식후",
    preferredSlot: "morning_meal",
    stomachBurden: "낮음",
    tags: ["기억력개선", "혈액순환", "말초혈류"]
  },
  {
    id: "supp_coq10",
    name: "코엔자임 Q10 (유비퀴논)",
    engName: "Coenzyme Q10",
    category: "혈압/항산화",
    icon: "❤️",
    ingredients: [
      { name: "코엔자임Q10", amount: 100, unit: "mg" }
    ],
    bestTiming: "아침 식후 (지용성)",
    preferredSlot: "morning_meal",
    stomachBurden: "낮음",
    tags: ["높은혈압감소", "항산화", "미토콘드리아"]
  },

  // --- 일반의약품 & 전문의약품 ---
  {
    id: "drug_ibuprofen",
    name: "이부프로펜 (소염진통제/NSAIDs)",
    engName: "Ibuprofen (Advil/Brufen)",
    category: "소염진통제",
    icon: "💊",
    ingredients: [
      { name: "이부프로펜", amount: 400, unit: "mg" }
    ],
    bestTiming: "식후 30분 (위장장애 방지)",
    preferredSlot: "lunch_meal",
    stomachBurden: "매우 높음 (위점막 자극, 궤양 위험)",
    tags: ["두통", "생리통", "관절염", "소염"]
  },
  {
    id: "drug_acetaminophen",
    name: "아세트아미노펜 (타이레놀)",
    engName: "Acetaminophen (Tylenol)",
    category: "해열진통제",
    icon: "💊",
    ingredients: [
      { name: "아세트아미노펜", amount: 500, unit: "mg" }
    ],
    bestTiming: "필요 시 (식전/식후 무관)",
    preferredSlot: "morning_meal",
    stomachBurden: "낮음 (간 대사 주의)",
    tags: ["해열", "두통", "치통", "근육통"]
  },
  {
    id: "drug_aspirin",
    name: "저용량 아스피린 (100mg 장용정)",
    engName: "Low-dose Aspirin",
    category: "항혈소판/혈관",
    icon: "🩸",
    ingredients: [
      { name: "아스피린", amount: 100, unit: "mg" }
    ],
    bestTiming: "아침 식후 충분한 물과 함께",
    preferredSlot: "morning_meal",
    stomachBurden: "높음 (출혈 경향 주의)",
    tags: ["혈전예방", "심혈관질환", "뇌졸중예방"]
  },
  {
    id: "drug_warfarin",
    name: "와파린 (항응고제)",
    engName: "Warfarin",
    category: "항응고제",
    icon: "⚠️",
    ingredients: [
      { name: "와파린나트륨", amount: 2, unit: "mg" }
    ],
    bestTiming: "매일 일정한 시간 (주로 저녁 식후)",
    preferredSlot: "dinner_meal",
    stomachBurden: "주의 (치명적 출혈 위험)",
    tags: ["혈전색전증", "심방세동", "인공판막"]
  },
  {
    id: "drug_statin",
    name: "스타틴계 고지혈증약 (아토르바스타틴 등)",
    engName: "Statin (Atorvastatin)",
    category: "만성질환/지질",
    icon: "🫀",
    ingredients: [
      { name: "스타틴", amount: 20, unit: "mg" }
    ],
    bestTiming: "저녁 식후 또는 취침 전 (야간 콜레스테롤 합성 억제)",
    preferredSlot: "dinner_meal",
    stomachBurden: "중간 (근육통 주의)",
    tags: ["콜레스테롤", "고지혈증", "동맥경화"]
  },
  {
    id: "drug_bp_acei",
    name: "ACE억제제/ARB계 혈압약",
    engName: "Blood Pressure Meds (ARB/ACEi)",
    category: "만성질환/혈압",
    icon: "🫀",
    ingredients: [
      { name: "혈압약성분", amount: 1, unit: "정" }
    ],
    bestTiming: "아침 기상 직후 또는 식후",
    preferredSlot: "morning_meal",
    stomachBurden: "낮음",
    tags: ["고혈압", "심부전", "단백뇨"]
  },
  {
    id: "drug_antibiotic_tetra",
    name: "테트라사이클린/퀴놀론계 항생제",
    engName: "Tetracycline / Fluoroquinolone",
    category: "항생제",
    icon: "🦠",
    ingredients: [
      { name: "항생제성분", amount: 100, unit: "mg" }
    ],
    bestTiming: "식전 1시간 또는 식후 2시간 공복",
    preferredSlot: "morning_meal",
    stomachBurden: "높음",
    tags: ["여드름", "세균감염", "비뇨기감염"]
  },
  {
    id: "drug_thyroid",
    name: "씬지로이드 (레보티록신/갑상선호르몬제)",
    engName: "Levothyroxine (Synthroid)",
    category: "내분비/호르몬",
    icon: "🦋",
    ingredients: [
      { name: "레보티록신", amount: 50, unit: "mcg" }
    ],
    bestTiming: "아침 기상 직후 공복 (복용 후 30~60분간 금식)",
    preferredSlot: "fasting",
    stomachBurden: "낮음 (흡수 방해 극도 민감)",
    tags: ["갑상선저하증", "호르몬보충"]
  }
];

// --- 1일 영양성분 기준치 및 상한섭취량 (식약처/보건복지부 2025~2026 기준) ---
const NUTRIENT_STANDARDS = {
  "비타민A": { rda: 700, ul: 3000, unit: "mcg RAE", desc: "피부 점막 형성, 시각 기능 유지 (상한 초과 시 간 손상·기형아 출산 위험)" },
  "비타민C": { rda: 100, ul: 2000, unit: "mg", desc: "결합조직 형성 및 기능 유지, 항산화 (상한 초과 시 삼투성 설사·신장 결석)" },
  "비타민D": { rda: 10, ul: 100, unit: "mcg (4000IU)", desc: "칼슘과 인의 흡수 및 뼈 형성 (상한 초과 시 고칼슘혈증·신장 결석)" },
  "아연": { rda: 10, ul: 35, unit: "mg", desc: "면역 기능 및 세포분열 (상한 초과 시 구리 결핍·면역 저하·구토)" },
  "마그네슘": { rda: 315, ul: 350, unit: "mg (보충제 기준)", desc: "에너지 이용 및 신경·근육 기능 유지 (보충제 과량 섭취 시 설사 유발)" },
  "철분": { rda: 12, ul: 45, unit: "mg", desc: "체내 산소 운반 및 혈액 생성 (상한 초과 시 위장장애 및 간세포 손상)" },
  "칼슘": { rda: 700, ul: 2500, unit: "mg", desc: "뼈와 치아 형성 및 혈액응고 (상한 초과 시 고칼슘뇨증·신결석증)" }
};

// --- 상호작용 지식베이스 (DUR / 약학 논문 근거) ---
const INTERACTION_RULES = [
  // 1. [위험-출혈] 아스피린 + 오메가3
  {
    pair: ["drug_aspirin", "supp_omega3"],
    level: "danger",
    title: "🚨 출혈 위험 증가 (지혈 지연 주의)",
    mechanism: "아스피린(항혈소판제)과 고함량 오메가-3(EPA)는 모두 혈소판 응집을 억제하여 멍, 코피, 잇몸 출혈, 소화관 출혈 위험을 현저히 높입니다.",
    advice: "오메가-3를 고용량(1000mg 이상)으로 복용 중이라면 반드시 담당 전문의와 상의하십시오. 수술이나 치과 발치 예정 시 1~2주 전 중단이 필요합니다.",
    source: "식약처 의약품안전사용서비스(DUR) & 한국약학회지"
  },
  // 2. [위험-출혈] 와파린 + 오메가3 / 비타민E / 은행잎
  {
    pair: ["drug_warfarin", "supp_omega3"],
    level: "danger",
    title: "🚨 치명적 항응고 작용 증강 (출혈 위험)",
    mechanism: "와파린 복용 환자가 오메가-3를 병용할 경우 INR 수치가 급상승하여 뇌출혈 및 장출혈 위험이 발생할 수 있습니다.",
    advice: "와파린 복용 중에는 오메가-3 보충제 임의 복용을 엄격히 금지하며, 정기적인 혈액응고(PT/INR) 수치 검사가 필수입니다.",
    source: "KFDA 의약품 안전성 서한 & 대한심장학회 가이드라인"
  },
  {
    pair: ["drug_warfarin", "supp_ginkgo"],
    level: "danger",
    title: "🚨 와파린 + 은행잎추출물 병용 금기",
    mechanism: "은행잎추출물의 징코라이드(Ginkgolide B) 성분은 강력한 PAF(혈소판 활성화 인자) 길항제로 와파린의 항응고 효과를 위험 수준으로 증폭시킵니다.",
    advice: "두 제제의 병용을 피하십시오.",
    source: "식약처 병용금기(DUR)"
  },
  // 3. [주의-흡수경쟁] 칼슘 + 철분
  {
    pair: ["supp_calcium", "supp_iron"],
    level: "caution",
    title: "⚠️ 칼슘과 철분의 상호 흡수 저해 (흡수율 경쟁)",
    mechanism: "칼슘과 철분은 소장 세포막의 동일한 2가 양이온 수송체(DMT1)를 통해 흡수되므로, 동시에 복용하면 상호 경쟁으로 인해 두 성분 모두 흡수율이 50% 이상 급감합니다.",
    advice: "복용 시간을 최소 2~4시간 이상 띄우세요. 철분은 아침 공복에, 칼슘은 저녁 식후에 복용하는 것이 최적의 솔루션입니다.",
    source: "미국임상영양학저널(AJCN) & 대한약사회 복약지도서"
  },
  // 4. [주의-흡수경쟁] 항생제 + 칼슘 / 마그네슘 / 철분
  {
    pair: ["drug_antibiotic_tetra", "supp_calcium"],
    level: "danger",
    title: "🚨 항생제 킬레이트 형성으로 약효 무력화",
    mechanism: "테트라사이클린/퀴놀론계 항생제는 칼슘 이온과 결합하여 물에 녹지 않는 불용성 침전물(Chelate)을 형성하여 체내 흡수를 원천 차단합니다.",
    advice: "항생제 복용 전후 최소 2시간 동안은 칼슘, 마그네슘 영양제 및 유제품 섭취를 엄격히 중단하십시오.",
    source: "식약처 DUR 처방조제지원시스템"
  },
  {
    pair: ["drug_antibiotic_tetra", "supp_magnesium"],
    level: "danger",
    title: "🚨 항생제 + 마그네슘 약효 급감 주의",
    mechanism: "마그네슘 이온 역시 항생제와 난용성 착염을 형성하여 항생제 치료 실패를 초래할 수 있습니다.",
    advice: "항생제 복용 기간 동안 마그네슘은 4시간 이상 시차를 두고 복용하거나 항생제 치료 완료 후 재개하십시오.",
    source: "KFDA 의약품 안전사용기준"
  },
  // 5. [주의-흡수차단] 씬지로이드(갑상선약) + 칼슘/철분
  {
    pair: ["drug_thyroid", "supp_calcium"],
    level: "danger",
    title: "🚨 갑상선 호르몬제 흡수 방해 (호르몬 불균형 초래)",
    mechanism: "칼슘은 레보티록신과 결합하여 장내 흡수를 크게 저해하여 갑상선 기능 저하 증상이 악화될 수 있습니다.",
    advice: "씬지로이드는 아침 기상 직후 공복에 단독 복용하고, 칼슘제는 최소 4시간 이상 간격을 두고 저녁에 복용해야 합니다.",
    source: "대한갑상선학회 가이드라인"
  },
  {
    pair: ["drug_thyroid", "supp_iron"],
    level: "danger",
    title: "🚨 갑상선 호르몬제 + 철분 상호작용",
    mechanism: "철분 이온이 레보티록신과 불용성 복합체를 형성하여 혈중 T4 농도를 급격히 떨어뜨립니다.",
    advice: "철분제는 갑상선 호르몬제 복용 후 최소 4시간 이후 복용하십시오.",
    source: "미국갑상선학회(ATA) 복약 권고안"
  },
  // 6. [위험-위장장애] 이부프로펜(소염진통제) + 아스피린
  {
    pair: ["drug_ibuprofen", "drug_aspirin"],
    level: "danger",
    title: "🚨 NSAIDs 중복 복용 : 급성 위장관 궤양 및 심혈관 위험",
    mechanism: "이부프로펜은 아스피린의 혈소판 COX-1 결합을 경쟁적으로 차단하여 아스피린의 심혈관 보호 효과를 무력화하며, 위장관 점막 손상 및 궤양 위험을 4배 이상 증가시킵니다.",
    advice: "아스피린 복용 환자는 통증 시 이부프로펜 대신 아세트아미노펜(타이레놀)을 우선 복용해야 합니다.",
    source: "FDA 약물 안전성 통고 & 식약처 DUR 병용금기"
  },
  // 7. [시너지] 스타틴 + 코엔자임Q10
  {
    pair: ["drug_statin", "supp_coq10"],
    level: "synergy",
    title: "✨ 긍정적 시너지 : 스타틴 유발 코큐텐 결핍 및 근육통 완화",
    mechanism: "스타틴은 콜레스테롤 합성 경로(HMG-CoA 환원효소)를 억제하면서 체내 CoQ10 생합성도 40% 이상 감소시킵니다. CoQ10을 보충하면 스타틴의 흔한 부작용인 근육통과 피로도를 효과적으로 완화할 수 있습니다.",
    advice: "스타틴을 장기 복용 중인 분에게 코엔자임 Q10(100mg) 병용은 매우 훌륭한 권장 조합입니다.",
    source: "미국심장학회지(JACC) & 대한약사회 기능성 가이드"
  },
  // 8. [시너지] 비타민D + 칼슘
  {
    pair: ["supp_vit_d", "supp_calcium"],
    level: "synergy",
    title: "✨ 긍정적 시너지 : 칼슘의 장내 흡수 촉진",
    mechanism: "비타민D는 소장 세포에서 칼슘 결합 단백질(Calbindin)의 발현을 유도하여 칼슘 흡수율을 30~80% 증가시킵니다.",
    advice: "칼슘제 복용 시 비타민D를 함께 섭취하면 골밀도 향상에 최상의 시너지를 냅니다.",
    source: "대한골대사학회 가이드라인"
  },
  // 9. [시너지] 철분 + 비타민C
  {
    pair: ["supp_iron", "supp_vit_c"],
    level: "synergy",
    title: "✨ 긍정적 시너지 : 철분의 체내 흡수율 3배 증대",
    mechanism: "비타민C의 강력한 환원 작용이 흡수가 어려운 3가 철(Fe3+)을 흡수가 쉬운 2가 철(Fe2+)로 전환시켜 철분 흡수율을 극대화합니다.",
    advice: "철분제를 복용할 때 오렌지주스나 비타민C 영양제와 함께 섭취하면 빈혈 개선 효과가 뛰어납니다.",
    source: "세계보건기구(WHO) 철분 결핍 치료 권고안"
  },
  // 10. [주의-과다] 종합비타민 + 루테인 (비타민A 중복)
  {
    pair: ["supp_mv", "supp_lutein"],
    level: "caution",
    title: "⚠️ 지용성 비타민A 중복 섭취 모니터링",
    mechanism: "종합비타민과 루테인 복합제에 공통으로 비타민A(또는 베타카로틴)가 배합된 경우가 많아 장기 복용 시 체내에 축적될 수 있습니다.",
    advice: "두 제품의 영양성분표를 확인하여 총 비타민A 섭취량이 상한선(3000mcg RAE)을 초과하지 않는지 확인하십시오.",
    source: "한국인 영양소 섭취기준 (보건복지부)"
  },
  // 11. [주의] 혈압약(ACEi/ARB) + 칼륨/고함량 마그네슘
  {
    pair: ["drug_bp_acei", "supp_magnesium"],
    level: "caution",
    title: "⚠️ 전해질 균형 및 혈압 강하 작용 관찰",
    mechanism: "고함량 마그네슘 보충제는 혈관 확장 효과가 있어 혈압약과 병용 시 기립성 저혈압이나 어지럼증을 유발할 수 있습니다.",
    advice: "처음 복용 시에는 낮은 용량부터 시작하고 취침 전에 복용하여 낮 시간대의 어지럼을 예방하십시오.",
    source: "대한고혈압학회"
  }
];

// --- 4가지 대표 일상 시나리오 프리셋 ---
const PRESET_SCENARIOS = [
  {
    id: "preset_worker",
    name: "⚡ 바쁜 K-직장인 활력 세트",
    tagline: "만성 피로 + 눈 건조 + 커피/진통제 일상",
    desc: "야근과 피로에 지친 30대 직장인이 흔히 먹는 조합. 비타민B군과 밀크씨슬로 피로를 풀고, 두통에 진통제를 복용할 때의 주의점 분석.",
    pillIds: ["supp_vit_b", "supp_milk_thistle", "supp_omega3", "drug_ibuprofen"]
  },
  {
    id: "preset_bone",
    name: "⚠️ 뼈·관절 건강 흡수충돌 세트",
    tagline: "칼슘과 철분의 치명적 흡수 경쟁",
    desc: "골다공증 예방과 빈혈 관리를 위해 칼슘과 철분제를 동시에 먹는 부모님 세대. 동일 수송체 경쟁으로 인한 낭비와 올바른 시차 배분 솔루션.",
    pillIds: ["supp_calcium", "supp_iron", "supp_vit_d", "supp_magnesium"]
  },
  {
    id: "preset_vascular",
    name: "🚨 심혈관 혈액순환 병용위험 세트",
    tagline: "아스피린 + 오메가3 + 은행잎 출혈 경고",
    desc: "혈관 건강을 위해 저용량 아스피린을 처방받아 먹으면서 혈행 개선 영양제를 중복 섭취하는 전형적인 고위험 조합.",
    pillIds: ["drug_aspirin", "supp_omega3", "supp_ginkgo", "drug_statin"]
  },
  {
    id: "preset_multiover",
    name: "🧬 종합영양 과다섭취 점검 세트",
    tagline: "좋은 건 다 챙겨먹다 상한선 초과",
    desc: "종합비타민, 루테인, 비타민C, 아연을 중복 섭취하여 지용성 비타민과 미네랄 상한선(UL)을 넘나드는 건강 염려증 일상.",
    pillIds: ["supp_mv", "supp_lutein", "supp_vit_c", "supp_zinc"]
  }
];

// --- AI 어드바이저 지식베이스 (Zero-Key 오프라인 지능형 챗봇) ---
const AI_ADVISOR_KB = [
  {
    keywords: ["커피", "카페인", "아메리카노"],
    response: "☕ **커피(카페인)와 영양제 섭취 가이드**:\n- **비타민B군, 비타민C, 철분, 칼슘**은 커피와 상극입니다! 카페인의 이뇨 작용으로 수용성 비타민이 흡수되기도 전에 소변으로 배출되며, 커피 속 탄닌 성분이 철분과 칼슘의 흡수를 최대 80% 방해합니다.\n- 💡 **솔루션**: 영양제 복용 전후 최소 **1~2시간의 시간차**를 두고 커피를 즐기시는 것이 가장 좋습니다."
  },
  {
    keywords: ["속쓰림", "위장", "울렁", "메스꺼움", "위"],
    response: "🤢 **영양제 복용 후 속쓰림/울렁거림의 주원인과 대처법**:\n1. **비타민C, 아연, 철분**은 공복에 복용 시 위점막을 강하게 자극하여 심한 메스꺼움을 유발합니다.\n2. **소염진통제(이부프로펜 등)** 역시 위장 보호 프로스타글란딘을 억제하므로 절대 공복에 드시면 안 됩니다.\n- 💡 **솔루션**: 식사 중 또는 식후 30분 이내에 충분한 미온수(200ml 이상)와 함께 복용하세요. 유산균을 제외한 대부분의 비타민/미네랄은 식후 복용이 안전합니다."
  },
  {
    keywords: ["시간", "언제", "타이밍", "아침", "저녁", "공복"],
    response: "⏰ **영양제별 골든 타임 요약**:\n- 🌅 **기상 직후 공복**: 유산균 (위산이 약할 때 장까지 도달)\n- ☀️ **아침 식후**: 비타민B군, 종합비타민, 코큐텐 (하루 에너지 대사 촉진)\n- 🍽️ **점심/저녁 식후**: 오메가3, 비타민D, 루테인 (지방과 함께 흡수되는 지용성)\n- 🌙 **취침 전 1시간**: 마그네슘, 테아닌 (신경 이완 및 편안한 숙면 유도)"
  },
  {
    keywords: ["임산부", "임신", "수유"],
    response: "🤰 **임산부/수유부 복약 안전 수칙**:\n- 임신 초기 **비타민A는 1일 3,000mcg(5,000IU)를 초과하지 않도록** 엄격히 제한해야 합니다(기형아 유발 위험).\n- 임신 중에는 **엽산(800mcg)**과 **철분제(16주 이후)**, **식물성 오메가-3**가 필수적입니다.\n- 처방약이나 소염진통제는 태아 동맥관 조기 폐쇄 등의 위험이 있으므로 반드시 산부인과 주치의의 처방을 따라야 합니다."
  },
  {
    keywords: ["오메가3", "비린내", "보관"],
    response: "🐟 **오메가-3 똑똑한 섭취 & 보관 팁**:\n- 오메가-3는 산화(산패)되기 쉬우므로 직사광선과 고온을 피해 서늘한 곳이나 냉장 보관하는 것이 좋습니다.\n- 비린내 트림이 심하다면 **식사 직후**에 드시거나, 장용성(Enteric coated) 캡슐 제품을 선택하세요.\n- 아스피린이나 혈압약을 드시는 분은 출혈 경향이 생길 수 있으니 1일 1,000mg 내외 적정량을 지켜주세요."
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PILL_DATABASE,
    NUTRIENT_STANDARDS,
    INTERACTION_RULES,
    PRESET_SCENARIOS,
    AI_ADVISOR_KB
  };
}
