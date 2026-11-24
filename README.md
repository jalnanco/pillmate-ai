# PillMate AI (필메이트 AI) 💊
> **세종사이버대학교 AI학과 2026 『일상의 편리를 위한 AI서비스개발 공모전』 출품작**  
> *“오늘 먹는 영양제와 약, 같이 먹어도 안전할까? 일상을 지키는 스마트 복약 세이프가드”*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-success)](https://jalnanco.github.io/pillmate-ai/)

---

## 1. 프로젝트 개요 (Overview)
현대인은 피로 회복, 눈 건강, 관절 등을 위해 다양한 영양제와 상비약을 함께 복용하지만, **성분 간 흡수 저해(경쟁), 과다 복용에 따른 독성, 의약품-영양제 병용 위험**을 명확히 파악하기 어렵습니다.

**PillMate AI**는 대한민국 식품의약품안전처 DUR(의약품안전사용서비스) 공공 데이터 기준과 임상 약학 가이드라인을 기반으로, 브라우저에서 외부 API 키 없이 즉시 구동되는 **온디바이스 하이브리드 복약 세이프가드 서비스**입니다.

- **라이브 서비스 접속**: [https://jalnanco.github.io/pillmate-ai/](https://jalnanco.github.io/pillmate-ai/)
- **개발자**: 장지호 (Jiho Jang) / jihobada@gmail.com
- **라이선스**: MIT License

---

## 2. 주요 핵심 기능 (Key Features)

1. **온디바이스 하이브리드 상호작용 분석 엔진**
   - 100+개 주요 일반/전문의약품 및 80+개 영양 기능성 성분의 결합 관계 전수 탐색
   - 🚨 위험(병용 금기/출혈 경고), ⚠️ 주의(흡수율 저하/시차 권장), ✨ 시너지(흡수 촉진) 실시간 진단
2. **24시간 최적 복약 타임테이블 (스케줄러)**
   - 제약 조건 충족(CSP) 알고리즘을 통한 5단계 타임슬롯(기상 직후 공복, 아침 식후, 점심 식후, 저녁 식후, 취침 전) 최적 배분
   - 성분 충돌(예: 칼슘 vs 철분) 발생 시 최소 2~4시간 간격을 자동으로 유지
3. **1일 상한 섭취량(UL) 안전선 모니터링**
   - 종합비타민, 루테인, 미네랄 중복 복용에 따른 비타민A, 비타민D, 아연 등의 과다 축적을 실시간 시각화
4. **1:1 AI 복약 어드바이저 (하이브리드 RAG)**
   - 인메모리 지식베이스 기반의 즉각 질의응답 (Zero-Key 모드)
   - 사용자 보유 Google Gemini API 키(BYOK) 연동 지원
5. **원클릭 복약 리포트 인쇄 및 내보내기**
   - 어르신 및 가족을 위해 최적 복약 시간표를 깔끔한 A4 가이드로 출력 가능

---

## 3. 심사위원 원클릭 프리셋 시나리오

1. **⚡ 바쁜 K-직장인 활력 세트**: 비타민B군 + 밀크씨슬 + 오메가3 + 이부프로펜
2. **⚠️ 뼈·관절 건강 흡수충돌 세트**: 칼슘 + 철분 + 비타민D + 마그네슘 (흡수 저해 시차 배분)
3. **🚨 심혈관 혈액순환 병용위험 세트**: 저용량 아스피린 + 오메가3 + 은행잎추출물 + 스타틴 (출혈 위험 경고)
4. **🧬 종합영양 과다섭취 점검 세트**: 종합비타민 + 루테인 + 비타민C + 아연 (지용성 상한선 초과 모니터링)

---

## 4. 기술 스택 (Tech Stack)
- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Tailwind CSS, Lucide Icons
- **AI / Algorithm**: On-Device Knowledge Graph, Constraint Satisfaction Problem (CSP) Scheduler
- **Deployment**: GitHub Pages (Static Hosting)

---

## 5. 라이선스 (License)
This project is licensed under the terms of the [MIT License](LICENSE).
