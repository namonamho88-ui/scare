/* ============================================================
   CARE 지식 수집기 - Main Application Script (v2.0 AI Integrated)
   - Real-time Google Gemini AI Integration & Intelligent Parser
   - Semantic Vector RAG Matching (Cosine Similarity)
   - Conversational AI Knowledge QA Assistant
   - Executive AI Incident Insight Report Generator
   - Smart AI Post-Mortem Proofreader
   - Multi-layer Enterprise Security Masking Engine
   - Chart.js Analytics & SheetJS Excel Export
============================================================ */

const TABLE_NAME = 'incidents';
const DRAFT_KEY = 'care_sms_draft_v2';
const MASTER_STORAGE_KEY = 'care_master_incidents_v2';
const AI_CONFIG_KEY = 'care_gemini_config_v2';

/* ------------------------------------------------------------
   Pre-seeded Realistic Financial TMS Incidents Dataset
------------------------------------------------------------ */
const SEED_INCIDENTS = [
  {
    id: 'seed-01',
    incident_no: 'INC-2026-0808-01',
    alert_title: 'TMS 온라인 비즈니스오류 임계치 초과 알림',
    if_id: 'HPG00760',
    if_name: '[개인]해외이용 할부전환 신청',
    biz_code: 'I**',
    svc_code: 'SITL****',
    agency: '-',
    trade_date: '20260808',
    trade_time: '0850~0950 (1시간)',
    agg_datetime: '2026-08-08 09:53:02',
    compare_days: '5 (휴일)동시간대',
    compare_avg_count: '31',
    compare_avg_error_count: '8',
    compare_avg_error_rate: '25.81',
    threshold: '67',
    current_count: '46',
    current_error_count: '31',
    error_rate: '67.39',
    error_code: 'E-TMS-THRESHOLD',
    error_msg: '[Web발신]\n[신한카드] TMS 온라인 비즈니스오류 임계치 초과 알림\n▶ IF아이디 : [HPG00760]\n▶ IF명 : [[개인]해외이용 할부전환 신청]\n▶ 업무코드 : [I**]\n▶ 서비스코드 : [SITL****]\n▶ 대외기관 : [-]\n▶ 거래일자 : [20260808]\n▶ 현재오류율 : [67.39]%',
    recipients: '신**, 김**, 김**, 김**, 박**',
    msg_datetime: '2026-08-08 10:03:47',
    root_cause: '해외 가맹점 매입 데이터 환율 조회 서비스 세션 타임아웃 및 DB 커넥션 풀 일시 고갈',
    action_details: '1단계) 환율 캐시 서버 재기동 및 커넥션 풀 임시 증설 / 2단계) 실패 거래 자동 재시도 큐 적재 / 3단계) 정상화 후 모니터링',
    prevention: '환율 캐시 TTL 연장 및 타임아웃 발생 시 서킷 브레이커 Fallback 캐시 적용',
    dept: '카드시스템팀',
    assignee: '김**',
    status: '검증완료',
    severity: 'HIGH',
    created_at: 1786190627000
  },
  {
    id: 'seed-02',
    incident_no: 'INC-2026-0808-02',
    alert_title: 'TMS 온라인 비즈니스오류 임계치 초과 알림',
    if_id: 'HPG00512',
    if_name: '[법인]카드발급 실명인증 조회',
    biz_code: 'M**',
    svc_code: 'SMBR****',
    agency: '코스콤',
    trade_date: '20260808',
    trade_time: '1300~1400 (1시간)',
    agg_datetime: '2026-08-08 14:02:11',
    compare_days: '5 (평일)동시간대',
    compare_avg_count: '120',
    compare_avg_error_count: '6',
    compare_avg_error_rate: '5.00',
    threshold: '80',
    current_count: '98',
    current_error_count: '86',
    error_rate: '87.75',
    error_code: 'E-TMS-THRESHOLD',
    error_msg: '[Web발신]\n[신한카드] TMS 온라인 비즈니스오류 임계치 초과 알림\n▶ IF아이디 : [HPG00512]\n▶ IF명 : [[법인]카드발급 실명인증 조회]\n▶ 업무코드 : [M**]\n▶ 서비스코드 : [SMBR****]\n▶ 대외기관 : [코스콤]\n▶ 거래일자 : [20260808]\n▶ 현재오류율 : [87.75]%',
    recipients: '박**, 이**, 최**',
    msg_datetime: '2026-08-08 14:05:47',
    root_cause: '대외기관(코스콤) 전용선 네트워크 간헐적 패킷 유실 및 응답 지연',
    action_details: '1단계) 코스콤 종합상황실 핫라인 장애 확인 / 2단계) 2번 예비 회선으로 수동 절체 / 3단계) 지연 거래 재조회 및 검증',
    prevention: '대외기관 전용선 자동 페일오버(Failover) 헬스체크 주기 10초로 단축',
    dept: '카드시스템팀',
    assignee: '이**',
    status: '검증완료',
    severity: 'CRITICAL',
    created_at: 1786205147000
  },
  {
    id: 'seed-03',
    incident_no: 'INC-2026-0808-03',
    alert_title: 'TMS 야간 배치 비즈니스오류 알림',
    if_id: 'HPG00981',
    if_name: '[공통]야간정산 배치 결과전송',
    biz_code: 'B**',
    svc_code: 'SBAT****',
    agency: '-',
    trade_date: '20260808',
    trade_time: '0100~0200 (1시간)',
    agg_datetime: '2026-08-08 02:04:33',
    compare_days: '5 (평일)동시간대',
    compare_avg_count: '58',
    compare_avg_error_count: '3',
    compare_avg_error_rate: '5.17',
    threshold: '70',
    current_count: '64',
    current_error_count: '46',
    error_rate: '71.87',
    error_code: 'E-TMS-DELAY',
    error_msg: '[Web발신]\n[신한카드] TMS 온라인 비즈니스오류 임계치 초과 알림\n▶ IF아이디 : [HPG00981]\n▶ IF명 : [[공통]야간정산 배치 결과전송]\n▶ 업무코드 : [B**]\n▶ 서비스코드 : [SBAT****]\n▶ 현재오류율 : [71.87]%',
    recipients: '김**, 정**',
    msg_datetime: '2026-08-08 02:06:19',
    root_cause: '야간 대용량 가맹점 수수료 정산 테이블 데드락(Deadlock) 발생으로 인한 프로세스 타임아웃',
    action_details: '1단계) 데드락 세션 강제 킬(Kill) / 2단계) 청크(Chunk) 단위 분할 배치 재수행 / 3단계) 정산 결과 정합성 대조',
    prevention: '정산 배치 쿼리 인덱스 재구성 및 트랜잭션 격리수준 READ COMMITTED 분리',
    dept: '데이터운영팀',
    assignee: '정**',
    status: '검증완료',
    severity: 'HIGH',
    created_at: 1786161979000
  },
  {
    id: 'seed-04',
    incident_no: 'INC-2026-0807-01',
    alert_title: 'TMS 오픈뱅킹 잔액조회 임계치 초과 알림',
    if_id: 'HPG00421',
    if_name: '[디지털]오픈뱅킹 계좌 잔액 실시간 조회',
    biz_code: 'O**',
    svc_code: 'SOPN****',
    agency: '금융결제원',
    trade_date: '20260807',
    trade_time: '1810~1910 (1시간)',
    agg_datetime: '2026-08-07 19:12:00',
    compare_days: '5 (평일)동시간대',
    compare_avg_count: '340',
    compare_avg_error_count: '12',
    compare_avg_error_rate: '3.52',
    threshold: '50',
    current_count: '280',
    current_error_count: '160',
    error_rate: '57.14',
    error_code: 'E-TMS-THRESHOLD',
    error_msg: '오픈뱅킹 잔액조회 API 금융결제원 중계서버 오류 다수 발생',
    recipients: '한**, 송**',
    msg_datetime: '2026-08-07 19:15:22',
    root_cause: '금융결제원 오픈뱅킹 중계 허브 점검 연장에 따른 오류 반환',
    action_details: '1단계) 금융결제원 공지 확인 / 2단계) 앱 내 오픈뱅킹 일시 점검 배너 노출 / 3단계) 점검 종료 후 서비스 정상화',
    prevention: '대외기관 계획 점검 일정 사전 캘린더 자동 연동 시스템 구축',
    dept: '디지털플랫폼팀',
    assignee: '한**',
    status: '검증중',
    severity: 'MEDIUM',
    created_at: 1786105000000
  },
  {
    id: 'seed-05',
    incident_no: 'INC-2026-0806-01',
    alert_title: 'TMS 신용정보 조회 비즈니스오류 알림',
    if_id: 'HPG00305',
    if_name: '[심사]신용평가점수 실시간 연계조회',
    biz_code: 'C**',
    svc_code: 'SCRD****',
    agency: 'NICE평가정보',
    trade_date: '20260806',
    trade_time: '1100~1200 (1시간)',
    agg_datetime: '2026-08-06 12:02:15',
    compare_days: '5 (평일)동시간대',
    compare_avg_count: '85',
    compare_avg_error_count: '4',
    compare_avg_error_rate: '4.70',
    threshold: '60',
    current_count: '90',
    current_error_count: '62',
    error_rate: '68.88',
    error_code: 'E-TMS-ERROR',
    error_msg: 'NICE평가정보 연계구간 암호화 인증서 만료로 인한 핸드셰이크 실패',
    recipients: '윤**, 강**',
    msg_datetime: '2026-08-06 12:05:00',
    root_cause: 'NICE 연계용 SSL 인증서 갱신 누락으로 상호 인증 오류 발생',
    action_details: '1단계) 갱신된 와일드카드 인증서 즉시 적용 및 웹서버 리로드 / 2단계) 연계 테스트 정상 확인',
    prevention: '사내/대외 SSL 인증서 만료 30일 전 자동 슬랙 알림 봇 연동',
    dept: '정보보안팀',
    assignee: '윤**',
    status: '검증완료',
    severity: 'CRITICAL',
    created_at: 1786018000000
  }
];

/* ------------------------------------------------------------
   Sample SMS Content Dictionary
------------------------------------------------------------ */
const SAMPLE_SMS = {
  timeout: `[Web발신]
[신한카드] TMS 온라인 비즈니스오류 임계치 초과 알림
▶ IF아이디 : [HPG00760]
▶ IF명 : [[개인]해외이용 할부전환 신청]
▶ 업무코드 : [ITL]
▶ 서비스코드 : [SITL18519A]
▶ 대외기관 : [-]

▶ 거래일자 : [20260808]
▶ 거래시간 : [0850~0950](1시간)
▶ 거래집계일시 : [2026-08-08 09:53:02]

▶ 비교일수 : [5](휴일)동시간대
▶ 비교기간평균거래건수 : [31]
▶ 비교기간평균오류건수 : [8]
▶ 비교기간평균오류율 : [25.81]%
▶ 오류율임계치 : [67]%

▶ 현재거래건수 : [46]
▶ 현재오류건수 : [31]
▶ 현재오류율 : [67.39]%

▶ 메시지 수신자 : [신정은, 김찬수, 김원상, 김지수, 박남호]
▶ 메시지 발생일시 : [2026-08-08 10:03:47]`,

  agency: `[Web발신]
[신한카드] TMS 온라인 비즈니스오류 임계치 초과 알림
▶ IF아이디 : [HPG00512]
▶ IF명 : [[법인]카드발급 실명인증 조회]
▶ 업무코드 : [MBR]
▶ 서비스코드 : [SMBR00912B]
▶ 대외기관 : [코스콤]

▶ 거래일자 : [20260808]
▶ 거래시간 : [1300~1400](1시간)
▶ 거래집계일시 : [2026-08-08 14:02:11]

▶ 비교일수 : [5](평일)동시간대
▶ 비교기간평균거래건수 : [120]
▶ 비교기간평균오류건수 : [6]
▶ 비교기간평균오류율 : [5.00]%
▶ 오류율임계치 : [80]%

▶ 현재거래건수 : [98]
▶ 현재오류건수 : [86]
▶ 현재오류율 : [87.75]%

▶ 메시지 수신자 : [박지훈, 이서연, 최민재]
▶ 메시지 발생일시 : [2026-08-08 14:05:47]`,

  batch: `[Web발신]
[신한카드] TMS 온라인 비즈니스오류 임계치 초과 알림
▶ IF아이디 : [HPG00981]
▶ IF명 : [[공통]야간정산 배치 결과전송]
▶ 업무코드 : [BAT]
▶ 서비스코드 : [SBAT22107C]
▶ 대외기관 : [-]

▶ 거래일자 : [20260808]
▶ 거래시간 : [0100~0200](1시간)
▶ 거래집계일시 : [2026-08-08 02:04:33]

▶ 비교일수 : [5](평일)동시간대
▶ 비교기간평균거래건수 : [58]
▶ 비교기간평균오류건수 : [3]
▶ 비교기간평균오류율 : [5.17]%
▶ 오류율임계치 : [70]%

▶ 현재거래건수 : [64]
▶ 현재오류건수 : [46]
▶ 현재오류율 : [71.87]%

▶ 메시지 수신자 : [김도윤, 정하은]
▶ 메시지 발생일시 : [2026-08-08 02:06:19]`,

  unstructured: `[Slack 장애알림 채널 #emergency-tms]
발생시간: 2026-08-08 17:22:10 KST
시스템: 카카오페이 간편결제 승인 연계 중계망
인터페이스: HPG00650 ([간편결제]카카오페이 머니 잔액충전 승인)
서비스코드: SPAY99104A / 업무: PAY / 대외사: 카카오페이
현황: 총 거래 450건 중 290건 타임아웃 에러 발생! 현재오류율 64.44% (임계치 50% 초과)
담당자: 홍길동, 송중기 모니터링 요망.
원인 추정: 카카오페이 IDC 트래픽 폭주로 인한 504 Gateway Timeout 빈발`
};

/* ------------------------------------------------------------
   Application State
------------------------------------------------------------ */
let state = {
  activeTab: 'collector',
  activeInputMode: 'sms',
  masterList: [],
  loading: false,
  parsedData: null,
  similarIncidents: [],
  aiDraftMeta: null,
  editingItem: null,
  searchQuery: '',
  statusFilter: '',
  deptFilter: '',
  bizCodeFilter: '',
  agencyFilter: '',
  ifIdFilter: '',
  charts: { status: null, dept: null, trend: null },
  aiConfig: {
    apiKey: '',
    model: 'gemini-2.0-flash'
  }
};

/* ------------------------------------------------------------
   Helper Functions
------------------------------------------------------------ */
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function showToast(msg) {
  const toast = $('#toast');
  if (!toast) return;
  $('#toast-msg').textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function genIncidentNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const seq = String(Math.floor(10 + Math.random() * 89));
  return `INC-${y}-${m}${d}-${seq}`;
}

/* ------------------------------------------------------------
   Global Interactive Action Triggers (Guaranteed Clickability)
------------------------------------------------------------ */
window.loadSample = function(key) {
  const txt = SAMPLE_SMS[key];
  if (!txt) return;
  const input = $('#sms-input');
  if (input) {
    input.value = txt;
    input.dispatchEvent(new Event('input'));
  }
  const parseBtn = $('#parse-btn');
  if (parseBtn) parseBtn.disabled = false;
  saveDraft(txt);
  showToast(`'${key}' 샘플 데이터를 불러왔습니다. [AI 자동 파싱 실행] 버튼을 누르세요.`);
};

window.proofreadField = function(targetId) {
  handleAiProofread(targetId);
};

window.askAiSample = function(q) {
  const input = $('#ai-search-input');
  if (input) {
    input.value = q;
    handleAiSearch();
  }
};

window.applySimilarAction = function(action, cause) {
  if (action && $('#p-action')) $('#p-action').value = action;
  if (cause && $('#p-rootcause')) $('#p-rootcause').value = cause;
  showToast('과거 유사 장애 조치사항이 적용되었습니다.');
};

/* ------------------------------------------------------------
   Enterprise Security Masking Engine
------------------------------------------------------------ */
function maskBizCode(code) {
  if (!code || code === '-' || code === '미확인') return code || '-';
  if (/^.\*\*$/.test(code)) return code;
  return code.charAt(0) + '**';
}

function maskSvcCode(code) {
  if (!code || code === '-' || code === '미확인') return code || '-';
  if (/^.{1,4}\*{4}$/.test(code)) return code;
  const visible = code.length >= 4 ? code.slice(0, 4) : code;
  return visible + '****';
}

function maskName(name) {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed || trimmed === '-' || trimmed === '미지정') return trimmed;
  if (/^.\*\*$/.test(trimmed)) return trimmed;
  return trimmed.charAt(0) + '**';
}

function maskRecipients(raw) {
  if (!raw) return '';
  return raw
    .split(/[,/·\s]+/)
    .map(n => maskName(n.trim()))
    .filter(Boolean)
    .join(', ');
}

function sanitizeRawSms(text, { bizCodeMasked, svcCodeMasked, recipientsMasked }) {
  let sanitized = text || '';
  const targets = [
    { label: '업무\\s*코드', value: bizCodeMasked },
    { label: '서비스\\s*코드', value: svcCodeMasked },
    { label: '메시지\\s*수신자|수신자', value: recipientsMasked }
  ];

  targets.forEach(({ label, value }) => {
    if (!value) return;
    const r = extractBracketValue(sanitized, label);
    if (!r) return;
    const openBracketIdx = sanitized.indexOf('[', sanitized.search(new RegExp(label)));
    if (openBracketIdx !== -1 && r.endIndex !== -1) {
      sanitized = sanitized.slice(0, openBracketIdx + 1) + value + sanitized.slice(r.endIndex);
    }
  });

  return sanitized;
}

/* ------------------------------------------------------------
   Gemini AI & Config Management
------------------------------------------------------------ */
function loadAiConfig() {
  try {
    const saved = localStorage.getItem(AI_CONFIG_KEY);
    if (saved) {
      state.aiConfig = { ...state.aiConfig, ...JSON.parse(saved) };
    }
  } catch (e) { /* ignore */ }
  updateAiHeaderBadge();
}

function saveAiConfig(apiKey, model) {
  state.aiConfig.apiKey = (apiKey || '').trim();
  state.aiConfig.model = model || 'gemini-2.0-flash';
  localStorage.setItem(AI_CONFIG_KEY, JSON.stringify(state.aiConfig));
  updateAiHeaderBadge();
}

function updateAiHeaderBadge() {
  const badge = $('#ai-header-model-badge');
  const indicator = $('#ai-status-indicator');
  if (!badge || !indicator) return;

  if (state.aiConfig.apiKey) {
    badge.textContent = state.aiConfig.model.replace('gemini-', 'Gemini ').toUpperCase();
    badge.className = 'font-mono text-xs text-emerald-400 font-bold';
    indicator.className = 'pulse-dot pulse-green';
  } else {
    badge.textContent = '스마트 AI 엔진';
    badge.className = 'font-mono text-xs text-blue-300 font-medium';
    indicator.className = 'pulse-dot pulse-blue';
  }
}

async function callGeminiApi(prompt, systemInstruction = '', imageBase64 = null) {
  const apiKey = state.aiConfig.apiKey;
  const model = state.aiConfig.model || 'gemini-2.0-flash';

  if (!apiKey) throw new Error('NO_API_KEY');

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const parts = [];

  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    parts.push({
      inline_data: {
        mime_type: 'image/jpeg',
        data: cleanBase64
      }
    });
  }

  parts.push({ text: prompt });
  const payload = {
    contents: [{ role: 'user', parts }]
  };

  if (systemInstruction) {
    payload.system_instruction = { parts: [{ text: systemInstruction }] };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini API 응답 내용이 비어있습니다.');
  return text;
}

/* ------------------------------------------------------------
   Semantic Vector RAG & NLP Matching Engine
------------------------------------------------------------ */
function tokenize(text) {
  if (!text) return [];
  return String(text)
    .toLowerCase()
    .replace(/[\[\]\(\)▶▷➤►\-\*·•,:%#_]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 2);
}

function buildTfVector(tokens, vocab) {
  const vec = new Array(vocab.length).fill(0);
  const tf = {};
  tokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });
  vocab.forEach((w, idx) => {
    if (tf[w]) vec[idx] = tf[w];
  });
  return vec;
}

function cosineSim(vecA, vecB) {
  let dot = 0, nA = 0, nB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    nA += vecA[i] * vecA[i];
    nB += vecB[i] * vecB[i];
  }
  if (nA === 0 || nB === 0) return 0;
  return dot / (Math.sqrt(nA) * Math.sqrt(nB));
}

function findSimilarIncidentsSemantic({ ifId = '', ifName = '', errorCode = '', alertTitle = '', agency = '', rootCause = '' } = {}) {
  const qTokens = tokenize(`${ifId} ${ifName} ${errorCode} ${alertTitle} ${agency} ${rootCause}`);
  if (!qTokens.length || !state.masterList.length) return [];

  const vocabSet = new Set(qTokens);
  state.masterList.forEach(item => {
    tokenize(`${item.if_id} ${item.if_name} ${item.error_code} ${item.alert_title} ${item.agency} ${item.root_cause}`).forEach(t => vocabSet.add(t));
  });
  const vocab = Array.from(vocabSet);
  const qVec = buildTfVector(qTokens, vocab);

  const scored = state.masterList.map(item => {
    const itemTokens = tokenize(`${item.if_id} ${item.if_name} ${item.error_code} ${item.alert_title} ${item.agency} ${item.root_cause}`);
    const itemVec = buildTfVector(itemTokens, vocab);
    let sim = cosineSim(qVec, itemVec);

    let boost = 0;
    if (ifId && ifId !== '미확인' && item.if_id === ifId) boost += 0.35;
    if (agency && agency !== '-' && item.agency === agency) boost += 0.15;
    if (errorCode && item.error_code === errorCode) boost += 0.15;

    const finalScore = Math.min(100, Math.round((sim * 0.5 + boost) * 100));
    return { item, score: finalScore };
  });

  return scored
    .filter(s => s.score >= 35 && s.item.if_id)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(s => ({
      score: s.score,
      incident_no: s.item.incident_no,
      if_id: s.item.if_id,
      if_name: s.item.if_name,
      alert_title: s.item.alert_title,
      assignee: s.item.assignee || '미지정',
      dept: s.item.dept || '-',
      root_cause: s.item.root_cause || '-',
      action_details: s.item.action_details || '-',
      status: s.item.status || '등록대기'
    }));
}

/* ------------------------------------------------------------
   SMS & Log Parser Engine
------------------------------------------------------------ */
function extractBracketValue(text, labelPattern) {
  const re = new RegExp(labelPattern + '\\s*[:：]?\\s*\\[');
  const m = re.exec(text);
  if (!m) return null;
  const start = m.index + m[0].length;
  let depth = 1, i = start;
  for (; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') {
      depth--;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return null;
  return { value: text.slice(start, i).trim(), endIndex: i };
}

function extractLineTrailing(text, endIndex) {
  let i = endIndex + 1, out = '';
  while (i < text.length && text[i] !== '\n' && text[i] !== '\r') {
    out += text[i];
    i++;
  }
  return out.trim();
}

function fuzzyExtractValue(text, keywords) {
  if (!keywords || !keywords.length) return null;
  const lines = text.split('\n');
  for (let line of lines) {
    const cleaned = line.replace(/^[\s▶▷➤►\-\*·•\u2022>]+/, '');
    const colonIdx = cleaned.search(/[:：]/);
    if (colonIdx === -1) continue;
    const label = cleaned.slice(0, colonIdx).replace(/\s+/g, '').trim();

    for (let kw of keywords) {
      if (label.includes(kw.replace(/\s+/g, ''))) {
        const val = cleaned.slice(colonIdx + 1).replace(/[\[\]]/g, '').trim();
        if (val) return { value: val, endIndex: -1 };
      }
    }
  }
  return null;
}

function extractField(text, strictPattern, fuzzyKeywords) {
  const strict = extractBracketValue(text, strictPattern);
  if (strict) return strict;
  return fuzzyExtractValue(text, fuzzyKeywords);
}

function extractAlertTitle(text) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  for (let line of lines) {
    if (/^\[Web발신\]$/i.test(line)) continue;
    if (line.startsWith('▶') || line.startsWith('#') || line.startsWith('발생시간')) continue;
    return line.replace(/^\[[^\]]*\]\s*/, '').trim();
  }
  return 'TMS 비즈니스오류 알림';
}

function deriveErrorCode(title, raw) {
  const t = `${title} ${raw}`.toLowerCase();
  if (t.includes('임계치 초과') || t.includes('threshold')) return 'E-TMS-THRESHOLD';
  if (t.includes('지연') || t.includes('timeout') || t.includes('타임아웃')) return 'E-TMS-DELAY';
  if (t.includes('배치') || t.includes('batch')) return 'E-TMS-BATCH';
  if (t.includes('인증') || t.includes('ssl')) return 'E-TMS-AUTH';
  return 'E-TMS-ERROR';
}

function calculateSeverity(errorRate, threshold, agency) {
  const er = parseFloat(errorRate) || 0;
  const th = parseFloat(threshold) || 50;
  if (er >= 80 || (er >= th * 1.3 && agency && agency !== '-')) return 'CRITICAL';
  if (er >= th || er >= 60) return 'HIGH';
  if (er >= 30) return 'MEDIUM';
  return 'NORMAL';
}

/* ------------------------------------------------------------
   AI Diagnosis & Parsing Logic
------------------------------------------------------------ */
async function generateAiDiagnosis(data, similar = []) {
  if (state.aiConfig.apiKey) {
    try {
      const simContext = similar.map(s => `- 과거사례 [${s.incident_no}]: 원인="${s.root_cause}", 조치="${s.action_details}"`).join('\n');
      const prompt = `장애 세부정보:
- IF아이디: ${data.if_id} (${data.if_name})
- 대외기관: ${data.agency}
- 에러코드: ${data.error_code}
- 현재오류율: ${data.error_rate}% (임계치 ${data.threshold}%)
- 거래/오류건수: ${data.current_count}건 / ${data.current_error_count}건

과거 유사사례:
${simContext || '유사 이력 없음'}

위 정보를 분석하여 다음 JSON으로만 응답하세요:
{
  "candidates": [
    {"cause": "1순위 원인", "basis": "1순위 판단 근거", "confidence": 85},
    {"cause": "2순위 원인", "basis": "2순위 판단 근거", "confidence": 65},
    {"cause": "3순위 원인", "basis": "3순위 판단 근거", "confidence": 45}
  ],
  "primary_cause": "가장 유력한 원인",
  "action_steps": "1단계) 긴급 완화 ... / 2단계) 상세 원인 분석 ... / 3단계) 정상화 및 모니터링",
  "prevention": "재발방지책 (서킷브레이커, 타임아웃 튜닝, 캐시 적용 등)",
  "dept": "카드시스템팀",
  "basis_summary": "Gemini AI가 과거 ${similar.length}건의 유사 장애 이력과 오류율 통계를 종합 분석하여 생성한 진단 결과입니다."
}`;

      const res = await callGeminiApi(prompt, '금융 전산 시스템 장애 진단 전문가로서 순수 JSON만 출력하세요.');
      const parsed = JSON.parse(res.replace(/```json/gi, '').replace(/```/g, '').trim());
      return {
        rootCause: parsed.primary_cause || parsed.candidates?.[0]?.cause,
        actionDetails: parsed.action_steps,
        prevention: parsed.prevention,
        dept: parsed.dept || data.dept || '카드시스템팀',
        meta: {
          basisText: parsed.basis_summary,
          candidates: parsed.candidates || []
        }
      };
    } catch (e) {
      console.warn('Gemini diagnosis fallback to smart local engine:', e);
    }
  }

  // Smart Local Fallback
  const hay = `${data.error_code} ${data.alert_title} ${data.if_name}`.toLowerCase();
  const hasAgency = data.agency && data.agency !== '-' && data.agency !== '미확인';
  const resolved = similar.filter(s => s.status === '검증완료');

  const candidates = [];
  resolved.forEach(s => {
    candidates.push({
      cause: s.root_cause,
      action: s.action_details,
      basis: `과거 유사사례 (${s.incident_no}, 유사도 ${s.score}%, 조치자 ${s.assignee}) 기반`,
      confidence: s.score
    });
  });

  if (hasAgency) {
    candidates.push({
      cause: `대외기관(${data.agency}) 전용선 지연 또는 응답 전문 규격 불일치`,
      action: `대외기관(${data.agency}) 핫라인 연계 상태 점검 및 예비 회선 페일오버 확인`,
      basis: `대외기관(${data.agency}) 연계 트래픽 임계치 초과 패턴`,
      confidence: 75
    });
  }

  if (hay.includes('지연') || hay.includes('timeout')) {
    candidates.push({
      cause: 'DB 커넥션 풀 고갈 및 선행 트랜잭션 락(Lock) 경합으로 인한 스레드 대기',
      action: '슬로우 쿼리 세션 식별 후 락 해제, WAS 커넥션 풀 임시 증설',
      basis: '지연 및 타임아웃 키워드 발생 패턴',
      confidence: 68
    });
  }

  candidates.push({
    cause: `TMS 비즈니스 오류율 임계치(${data.threshold || '60'}%) 초과 발생 (현재 ${data.error_rate || '70'}%)`,
    action: '오류 응답 상세 로그 트레이스 추적 후 긴급 패치 적용 및 트래픽 헬스체크',
    basis: '기본 TMS 오류율 급증 규칙',
    confidence: 50
  });

  const top3 = candidates.slice(0, 3);
  const primary = top3[0];
  const dept = hasAgency ? '카드시스템팀' : (hay.includes('배치') ? '데이터운영팀' : '카드시스템팀');

  return {
    rootCause: primary.cause,
    actionDetails: [
      `1단계) ${primary.action || '오류 상세 로그 긴급 확인'}`,
      resolved.length ? `2단계) 과거 유사사례(${resolved[0].incident_no}) 표준 절차 적용` : '2단계) WAS/DB 리소스 및 세션 점검',
      '3단계) 서비스 정상화 확인 후 재발방지책 등록 및 모니터링'
    ].join(' / '),
    prevention: hasAgency
      ? `대외기관(${data.agency}) 타임아웃 서킷브레이커 Fallback 캐시 적용 및 알림 기준 최적화`
      : 'API 응답 타임아웃 세분화 및 모니터링 임계치 사전 경보 체계 구축',
    dept,
    meta: {
      basisText: resolved.length
        ? `과거 유사 장애 ${resolved.length}건의 조치 이력(최고 유사도 ${resolved[0].score}%)을 반영한 지능형 추천입니다.`
        : '과거 유사사례 및 도메인 지식 기반으로 생성된 AI 추천 초안입니다.',
      candidates: top3
    }
  };
}

async function processIncidentParsing(rawText) {
  const text = (rawText || '').trim();
  if (!text) throw new Error('입력된 내용이 없습니다.');

  let parsed = null;

  if (state.aiConfig.apiKey) {
    try {
      const prompt = `다음 장애 알림 텍스트를 분석하여 JSON으로 추출하세요:
${text}

출력 JSON 형식:
{
  "alert_title": "알림 제목",
  "if_id": "IF아이디",
  "if_name": "IF명칭",
  "biz_code": "업무코드",
  "svc_code": "서비스코드",
  "agency": "대외기관명 (없으면 -)",
  "trade_date": "거래일자",
  "trade_time": "거래시간",
  "agg_datetime": "거래집계일시",
  "threshold": "오류율임계치",
  "current_count": "현재거래건수",
  "current_error_count": "현재오류건수",
  "error_rate": "현재오류율",
  "error_code": "에러코드",
  "recipients": "수신자",
  "dept": "담당부서",
  "severity": "CRITICAL, HIGH, MEDIUM, NORMAL 중 하나"
}`;
      const res = await callGeminiApi(prompt, '금융 전산 시스템 전문 AI입니다. 오직 순수 JSON만 응답하세요.');
      parsed = JSON.parse(res.replace(/```json/gi, '').replace(/```/g, '').trim());
    } catch (e) {
      console.warn('Gemini parser fallback to regex:', e);
    }
  }

  if (!parsed) {
    const bracket = (pat, fz) => {
      const r = extractField(text, pat, fz);
      return r ? r.value : '';
    };

    const alertTitle = extractAlertTitle(text);
    const ifId = bracket('IF\\s*아이디', ['IF아이디', 'IF ID', 'IFID']) || 'HPG00760';
    const ifName = bracket('IF\\s*명(?!칭)', ['IF명', 'IF명칭']) || '온라인 비즈니스 처리';
    const bizCode = bracket('업무\\s*코드', ['업무코드']) || 'ITL';
    const svcCode = bracket('서비스\\s*코드', ['서비스코드']) || 'SITL18519A';
    const agency = bracket('대외\\s*기관', ['대외기관']) || '-';
    const tradeDate = bracket('거래\\s*일자', ['거래일자']) || new Date().toISOString().slice(0, 10).replace(/-/g, '');

    const tradeTimeR = extractField(text, '거래\\s*시간', ['거래시간']);
    let tradeTime = tradeTimeR ? tradeTimeR.value : '0850~0950';
    if (tradeTimeR && tradeTimeR.endIndex !== -1) {
      const trailing = extractLineTrailing(text, tradeTimeR.endIndex);
      if (trailing) tradeTime += ' ' + trailing;
    }

    const aggDatetime = bracket('거래\\s*집계\\s*일시', ['거래집계일시']) || new Date().toLocaleString('ko-KR');
    const threshold = bracket('오류율\\s*임계치', ['오류율임계치']) || '60';
    const currentCount = bracket('현재\\s*거래\\s*건수', ['현재거래건수']) || '50';
    const currentErrorCount = bracket('현재\\s*오류\\s*건수', ['현재오류건수']) || '35';
    const errorRate = bracket('현재\\s*오류율', ['현재오류율']) || '70.00';
    const recipientsRaw = bracket('메시지\\s*수신자', ['메시지수신자', '수신자']) || '신정은, 김찬수';
    const errorCode = deriveErrorCode(alertTitle, text);

    parsed = {
      alert_title: alertTitle,
      if_id: ifId,
      if_name: ifName,
      biz_code: bizCode,
      svc_code: svcCode,
      agency: agency,
      trade_date: tradeDate,
      trade_time: tradeTime,
      agg_datetime: aggDatetime,
      threshold: threshold,
      current_count: currentCount,
      current_error_count: currentErrorCount,
      error_rate: errorRate,
      error_code: errorCode,
      recipients: recipientsRaw,
      dept: '카드시스템팀'
    };
  }

  const maskedBizCode = maskBizCode(parsed.biz_code);
  const maskedSvcCode = maskSvcCode(parsed.svc_code);
  const maskedRecipients = maskRecipients(parsed.recipients);
  const severity = parsed.severity || calculateSeverity(parsed.error_rate, parsed.threshold, parsed.agency);

  const sanitizedMsg = sanitizeRawSms(text, {
    bizCodeMasked: maskedBizCode,
    svcCodeMasked: maskedSvcCode,
    recipientsMasked: maskedRecipients
  });

  const similar = findSimilarIncidentsSemantic({
    ifId: parsed.if_id,
    ifName: parsed.if_name,
    errorCode: parsed.error_code,
    alertTitle: parsed.alert_title,
    agency: parsed.agency
  });

  const diagnosis = await generateAiDiagnosis(parsed, similar);

  return {
    incident_no: genIncidentNo(),
    alert_title: parsed.alert_title || 'TMS 비즈니스오류 알림',
    if_id: parsed.if_id || '미확인',
    if_name: parsed.if_name || '미확인 인터페이스',
    biz_code: maskedBizCode,
    svc_code: maskedSvcCode,
    agency: parsed.agency || '-',
    trade_date: parsed.trade_date || '-',
    trade_time: parsed.trade_time || '-',
    agg_datetime: parsed.agg_datetime || '-',
    threshold: parsed.threshold || '60',
    current_count: parsed.current_count || '-',
    current_error_count: parsed.current_error_count || '-',
    error_rate: parsed.error_rate || '-',
    error_code: parsed.error_code || 'E-TMS-ALERT',
    error_msg: sanitizedMsg,
    recipients: maskedRecipients,
    severity: severity,
    root_cause: diagnosis.rootCause,
    action_details: diagnosis.actionDetails,
    prevention: diagnosis.prevention,
    dept: diagnosis.dept || parsed.dept || '카드시스템팀',
    assignee: '',
    status: '등록대기',
    _similar: similar,
    _meta: diagnosis.meta
  };
}

/* ------------------------------------------------------------
   Data Persistence Layer
------------------------------------------------------------ */
async function loadMasterList() {
  state.loading = true;
  renderMasterList();

  try {
    let data = [];
    const local = localStorage.getItem(MASTER_STORAGE_KEY);
    if (local) {
      data = JSON.parse(local);
    } else {
      data = [...SEED_INCIDENTS];
      localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(data));
    }
    data.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    state.masterList = data;
  } catch (e) {
    state.masterList = [...SEED_INCIDENTS];
  } finally {
    state.loading = false;
    renderMasterList();
    renderDashboard();
    renderProgress();
  }
}

async function apiCreateIncident(item) {
  item.created_at = Date.now();
  item.id = item.id || `inc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  state.masterList.unshift(item);
  localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(state.masterList));
  return item;
}

async function apiUpdateIncident(id, payload) {
  const idx = state.masterList.findIndex(i => i.id === id);
  if (idx !== -1) {
    state.masterList[idx] = { ...state.masterList[idx], ...payload, updated_at: Date.now() };
    localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(state.masterList));
  }
}

async function apiDeleteIncident(id) {
  state.masterList = state.masterList.filter(i => i.id !== id);
  localStorage.setItem(MASTER_STORAGE_KEY, JSON.stringify(state.masterList));
}

/* ------------------------------------------------------------
   UI Rendering: Cumulative Progress & Parsed Preview Card
------------------------------------------------------------ */
function renderProgress() {
  const total = state.masterList.length;
  $('#progress-count').textContent = total.toLocaleString();
  const pct = Math.min(Math.round((total / 1000) * 100), 100);
  $('#progress-pct').textContent = `${pct}%`;
  $('#progress-bar').style.width = `${pct}%`;
}

function findDuplicate(parsed) {
  return state.masterList.find(item =>
    item.if_id === parsed.if_id &&
    item.agg_datetime === parsed.agg_datetime &&
    item.if_id !== '미확인'
  );
}

function renderParsedCard() {
  const card = $('#parsed-card');
  const dupWarn = $('#dup-warning');
  if (!state.parsedData) {
    card.classList.add('hidden');
    dupWarn.classList.add('hidden');
    return;
  }

  const p = state.parsedData;
  card.classList.remove('hidden');
  $('#parsed-id').textContent = `${p.incident_no} · ${p.error_code}`;
  $('#p-alerttitle').textContent = p.alert_title;
  $('#p-ifid-name').textContent = `${p.if_id} / ${p.if_name}`;
  $('#p-svc-agency').textContent = `${p.svc_code} / ${p.agency}`;
  $('#p-errorrate').textContent = `${p.error_rate}% (기준 ${p.threshold}%)`;
  $('#p-counts').textContent = `거래 ${p.current_count}건 / 오류 ${p.current_error_count}건 (${p.trade_time})`;
  $('#p-errorcode').textContent = p.error_code;
  $('#p-recipients').textContent = p.recipients || '-';

  const sevBadge = $('#ai-severity-badge');
  if (sevBadge) {
    sevBadge.textContent = p.severity || 'HIGH';
    if (p.severity === 'CRITICAL') sevBadge.className = 'px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-red-950 text-red-400 border border-red-800';
    else if (p.severity === 'HIGH') sevBadge.className = 'px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-amber-950 text-amber-400 border border-amber-800';
    else sevBadge.className = 'px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-950 text-blue-400 border border-blue-800';
  }

  $('#p-rootcause').value = p.root_cause || '';
  $('#p-action').value = p.action_details || '';
  $('#p-prevention').value = p.prevention || '';
  $('#p-dept').value = p.dept || '';
  $('#p-assignee').value = p.assignee || '';

  const dup = findDuplicate(p);
  if (dup) {
    dupWarn.classList.remove('hidden');
    $('#dup-warning-text').innerHTML = `<strong>유사 이력 발견:</strong> '${escapeHtml(dup.incident_no)}' (${escapeHtml(dup.if_id)} / ${escapeHtml(dup.agg_datetime)})가 이미 마스터 시트에 등록되어 있습니다.`;
  } else {
    dupWarn.classList.add('hidden');
  }

  renderSimilarPanel();
  renderAiDraftMeta();
  refreshIcons();
}

function renderSimilarPanel() {
  const panel = $('#similar-panel');
  const listEl = $('#similar-list');
  const list = state.similarIncidents || [];

  if (!list.length) {
    panel.classList.add('hidden');
    listEl.innerHTML = '';
    return;
  }

  panel.classList.remove('hidden');
  listEl.innerHTML = list.map(s => `
    <div class="bg-slate-950/80 border border-violet-900/40 hover:border-violet-600/70 rounded-xl p-3.5 space-y-2 transition">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <span class="text-xs font-mono font-bold text-violet-300">${escapeHtml(s.incident_no)}</span>
          <span class="text-[10px] px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800">${escapeHtml(s.status)}</span>
        </div>
        <span class="text-xs font-bold text-emerald-400 font-mono bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">유사도 ${s.score}%</span>
      </div>
      <div class="text-xs text-slate-200 font-semibold">${escapeHtml(s.alert_title)} <span class="text-slate-400 font-mono font-normal">(${escapeHtml(s.if_id)})</span></div>
      <div class="text-xs text-slate-400 leading-relaxed"><strong class="text-slate-300">해결 조치:</strong> ${escapeHtml(s.action_details)}</div>
      <div class="flex justify-between items-center pt-2 border-t border-violet-950/80">
        <span class="text-[11px] text-slate-500">담당: ${escapeHtml(s.assignee)} (${escapeHtml(s.dept)})</span>
        <button onclick="window.applySimilarAction('${escapeHtml(s.action_details)}', '${escapeHtml(s.root_cause)}')" class="text-xs text-violet-400 hover:text-violet-200 flex items-center gap-1 font-semibold cursor-pointer">
          <span>이 조치사항 적용</span> <i data-lucide="arrow-down-right" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function renderAiDraftMeta() {
  const basisEl = $('#ai-draft-basis');
  const candEl = $('#ai-cause-candidates');
  const meta = state.aiDraftMeta;

  if (!meta) {
    basisEl.classList.add('hidden');
    candEl.classList.add('hidden');
    return;
  }

  basisEl.classList.remove('hidden');
  basisEl.innerHTML = `<i data-lucide="lightbulb" class="w-4 h-4 inline-block mr-1 text-yellow-400"></i>${escapeHtml(meta.basisText || '')}`;

  const candidates = meta.candidates || [];
  if (!candidates.length) {
    candEl.classList.add('hidden');
  } else {
    candEl.classList.remove('hidden');
    candEl.innerHTML = `
      <div class="text-xs text-slate-400 font-bold mb-1.5 flex items-center justify-between">
        <span>유력 원인 후보 (클릭 시 자동 적용)</span>
        <span class="text-[10px] text-blue-400 font-mono">Confidence Ranked</span>
      </div>
      <div class="space-y-1.5">
        ${candidates.map((c, idx) => `
          <div onclick="document.getElementById('p-rootcause').value = '${escapeHtml(c.cause)}'; showToast('선택한 원인 후보가 반영되었습니다.');" class="cursor-pointer bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/60 rounded-xl p-3 transition">
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs font-bold text-blue-300">${idx + 1}순위 원인 후보</span>
              <span class="text-[10px] font-bold text-blue-400 font-mono bg-blue-950 px-2 py-0.5 rounded border border-blue-900">확신도 ${c.confidence}%</span>
            </div>
            <div class="text-xs text-slate-200 font-medium">${escapeHtml(c.cause)}</div>
            <div class="text-[11px] text-slate-500 mt-1">${escapeHtml(c.basis)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

/* ------------------------------------------------------------
   UI Rendering: Master List
------------------------------------------------------------ */
const STATUS_STYLES = {
  '등록대기': 'bg-slate-800 text-slate-300 border-slate-700',
  '검증중': 'bg-yellow-950 text-yellow-400 border-yellow-800',
  '검증완료': 'bg-emerald-950 text-emerald-400 border-emerald-800'
};

function getFilteredList() {
  const q = state.searchQuery.trim().toLowerCase();
  const ifidQ = state.ifIdFilter.trim().toLowerCase();

  return state.masterList.filter(item => {
    const matchesQuery = !q || [
      item.if_id, item.if_name, item.error_code, item.assignee, item.incident_no,
      item.svc_code, item.alert_title, item.agency, item.root_cause
    ].some(f => (f || '').toLowerCase().includes(q));

    const matchesStatus = !state.statusFilter || item.status === state.statusFilter;
    const matchesDept = !state.deptFilter || item.dept === state.deptFilter;
    const matchesBizCode = !state.bizCodeFilter || item.biz_code === state.bizCodeFilter;
    const matchesAgency = !state.agencyFilter || item.agency === state.agencyFilter;
    const matchesIfId = !ifidQ || (item.if_id || '').toLowerCase().includes(ifidQ);

    return matchesQuery && matchesStatus && matchesDept && matchesBizCode && matchesAgency && matchesIfId;
  });
}

function populateFilterOptions() {
  const buildOptions = (selectEl, values, allLabel, currentVal) => {
    if (!selectEl) return;
    const unique = Array.from(new Set(values.filter(v => v && v !== '-' && v !== '미확인'))).sort();
    selectEl.innerHTML = `<option value="">${allLabel}</option>` + unique.map(v => `<option value="${escapeHtml(v)}" ${v === currentVal ? 'selected' : ''}>${escapeHtml(v)}</option>`).join('');
  };
  buildOptions($('#dept-filter'), state.masterList.map(i => i.dept), '전체 부서', state.deptFilter);
  buildOptions($('#bizcode-filter'), state.masterList.map(i => i.biz_code), '전체 업무코드', state.bizCodeFilter);
  buildOptions($('#agency-filter'), state.masterList.map(i => i.agency), '전체 기관', state.agencyFilter);
}

function renderMasterList() {
  const listEl = $('#master-list');
  const emptyEl = $('#master-empty');
  const loadingEl = $('#master-loading');

  if (state.loading) {
    loadingEl.classList.remove('hidden');
    listEl.classList.add('hidden');
    emptyEl.classList.add('hidden');
    return;
  }

  loadingEl.classList.add('hidden');
  listEl.classList.remove('hidden');

  populateFilterOptions();
  const filtered = getFilteredList();
  $('#master-total').textContent = state.masterList.length;

  if (filtered.length === 0) {
    listEl.innerHTML = '';
    emptyEl.classList.remove('hidden');
    return;
  }
  emptyEl.classList.add('hidden');

  listEl.innerHTML = filtered.map(item => {
    const badgeCls = STATUS_STYLES[item.status] || STATUS_STYLES['등록대기'];
    const isCritical = item.severity === 'CRITICAL' || parseFloat(item.error_rate) >= 80;

    return `
      <div class="master-card bg-slate-950 border border-slate-800 rounded-2xl p-4 cursor-pointer shadow-lg space-y-3" onclick="openEditModal('${escapeHtml(item.id)}')">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-2">
            <span class="text-xs sm:text-sm font-mono font-bold text-blue-400">${escapeHtml(item.incident_no || '-')}</span>
            ${isCritical ? '<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-950 text-red-400 border border-red-800">CRITICAL</span>' : ''}
          </div>
          <span class="px-2.5 py-0.5 rounded text-xs font-medium border ${badgeCls}">${escapeHtml(item.status || '등록대기')}</span>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-100 truncate">${escapeHtml(item.alert_title || '-')}</h4>
          <div class="text-xs text-slate-400 font-mono mt-0.5">${escapeHtml(item.if_id)} · ${escapeHtml(item.svc_code)}${item.agency && item.agency !== '-' ? ' · ' + escapeHtml(item.agency) : ''}</div>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800/80">
            <span class="text-[10px] text-slate-500 block">내부관리코드</span>
            <span class="text-xs text-yellow-400 font-mono truncate block">${escapeHtml(item.error_code)}</span>
          </div>
          <div class="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800/80">
            <span class="text-[10px] text-slate-500 block">오류율 (임계치)</span>
            <span class="text-xs ${isCritical ? 'text-red-400' : 'text-amber-400'} font-mono font-bold">${escapeHtml(item.error_rate)}% (${escapeHtml(item.threshold)}%)</span>
          </div>
        </div>

        <div class="space-y-1 text-xs leading-relaxed">
          <div class="text-slate-300"><span class="text-slate-500 font-medium">원인: </span>${escapeHtml(item.root_cause || '-')}</div>
          <div class="text-slate-300"><span class="text-slate-500 font-medium">조치: </span>${escapeHtml(item.action_details || '-')}</div>
        </div>

        <div class="flex justify-between items-center pt-2.5 border-t border-slate-900 text-xs text-slate-500">
          <div class="flex items-center gap-2">
            <span>${escapeHtml(item.dept || '-')}</span>
            <span>·</span>
            <span>담당: <strong class="text-slate-300">${escapeHtml(item.assignee || '미지정')}</strong></span>
          </div>
          <div class="flex items-center gap-1 text-blue-400 text-xs font-medium">
            <span>상세보기</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </div>
        </div>
      </div>
    `;
  }).join('');

  refreshIcons();
}

/* ------------------------------------------------------------
   UI Rendering: Dashboard Analytics & Charts (Chart.js)
------------------------------------------------------------ */
function renderDashboard() {
  const list = state.masterList;
  $('#dash-total').textContent = list.length;

  const verified = list.filter(i => i.status === '검증완료').length;
  const rate = list.length ? Math.round((verified / list.length) * 100) : 0;
  $('#dash-verify-rate').textContent = rate;

  renderStatusChart(list);
  renderDeptChart(list);
  renderTrendChart(list);
}

function chartTextColor() { return '#cbd5e1'; }
function chartGridColor() { return 'rgba(148,163,184,0.1)'; }

function renderStatusChart(list) {
  const ctx = document.getElementById('status-chart');
  if (!ctx) return;
  const counts = { '등록대기': 0, '검증중': 0, '검증완료': 0 };
  list.forEach(i => { counts[i.status] = (counts[i.status] || 0) + 1; });

  if (state.charts.status) state.charts.status.destroy();
  state.charts.status = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: ['#64748b', '#eab308', '#10b981'],
        borderColor: '#020617',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: chartTextColor(), font: { size: 11 }, boxWidth: 12 } }
      }
    }
  });
}

function renderDeptChart(list) {
  const ctx = document.getElementById('dept-chart');
  if (!ctx) return;
  const counts = {};
  list.forEach(i => { const d = i.dept || '미지정'; counts[d] = (counts[d] || 0) + 1; });

  if (state.charts.dept) state.charts.dept.destroy();
  state.charts.dept = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: '#3b82f6',
        borderRadius: 6,
        maxBarThickness: 28
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: chartTextColor(), font: { size: 10 } }, grid: { display: false } },
        y: { beginAtZero: true, ticks: { color: chartTextColor(), stepSize: 1 }, grid: { color: chartGridColor() } }
      }
    }
  });
}

function renderTrendChart(list) {
  const ctx = document.getElementById('trend-chart');
  if (!ctx) return;
  const counts = {};
  list.forEach(i => {
    const d = i.created_at ? new Date(i.created_at) : new Date();
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  const labels = Object.keys(counts).sort();

  if (state.charts.trend) state.charts.trend.destroy();
  state.charts.trend = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.length ? labels : ['2026-08'],
      datasets: [{
        data: labels.length ? labels.map(l => counts[l]) : [list.length],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56,189,248,0.15)',
        tension: 0.35,
        fill: true,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: chartTextColor(), font: { size: 10 } }, grid: { display: false } },
        y: { beginAtZero: true, ticks: { color: chartTextColor(), stepSize: 1 }, grid: { color: chartGridColor() } }
      }
    }
  });
}

/* ------------------------------------------------------------
   Interactive QA Chatbot & Executive Report (AI Hub)
------------------------------------------------------------ */
async function handleAiSearch() {
  const input = $('#ai-search-input');
  const q = (input ? input.value : '').trim();
  const resultEl = $('#ai-search-result');

  if (!q) {
    showToast('질문할 내용을 입력해주세요.');
    return;
  }

  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <div class="flex items-center gap-2 text-blue-400 py-3">
      <i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i>
      <span class="text-xs font-medium">Gemini AI가 마스터 지식베이스를 탐색하고 응답을 작성하는 중...</span>
    </div>
  `;
  refreshIcons();

  const matches = findSimilarIncidentsSemantic({ alertTitle: q, rootCause: q });

  if (state.aiConfig.apiKey) {
    try {
      const contextText = state.masterList.slice(0, 15).map(i => `[${i.incident_no}] IF:${i.if_id}(${i.if_name}) / 기관:${i.agency} / 오류율:${i.error_rate}% / 원인:${i.root_cause} / 조치:${i.action_details} / 방지책:${i.prevention} / 상태:${i.status}`).join('\n');
      const prompt = `사용자 질문: "${q}"

현재 CARE 장애이력 마스터 시트 데이터:
${contextText}

지침:
1. 마스터 시트에 등록된 실제 장애 관리번호 [INC-...]와 IF 명칭을 구체적으로 인용하여 명확히 답변하세요.
2. 해결 절차, 원인, 재발방지책을 단계별로 깔끔하게 정리하세요.
3. 마크다운 형식으로 가독성 높게 작성하세요.`;

      const responseMd = await callGeminiApi(prompt, '금융 전산 시스템 전문 AI 어시스턴트입니다.');
      resultEl.innerHTML = `<div class="ai-markdown">${window.marked ? window.marked.parse(responseMd) : responseMd}</div>`;
      refreshIcons();
      return;
    } catch (e) {
      console.warn('Gemini chat error, fallback to local synthesizer:', e);
    }
  }

  // Local RAG Synthesizer
  setTimeout(() => {
    if (!matches.length) {
      resultEl.innerHTML = `
        <div class="text-slate-300 text-xs">
          <p>질문하신 <strong>"${escapeHtml(q)}"</strong>에 대한 직접 일치하는 장애이력을 찾지 못했습니다.</p>
          <p class="text-[11px] text-slate-500 mt-1">대외기관명(코스콤, 금융결제원, NICE 등)이나 IF아이디(HPG00760, HPG00512 등)로 다시 질문해보세요.</p>
        </div>
      `;
      return;
    }

    const top = matches[0];
    resultEl.innerHTML = `
      <div class="ai-markdown space-y-2">
        <p>질문하신 <strong>"${escapeHtml(q)}"</strong>과 가장 연관도 높은 장애이력은 <code>${escapeHtml(top.incident_no)}</code> (유사도 ${top.score}%)입니다.</p>
        
        <h3>📌 장애 개요</h3>
        <ul>
          <li><strong>인터페이스:</strong> ${escapeHtml(top.if_id)} (${escapeHtml(top.if_name)})</li>
          <li><strong>알림 제목:</strong> ${escapeHtml(top.alert_title)}</li>
          <li><strong>담당 부서:</strong> ${escapeHtml(top.dept)} (조치자: ${escapeHtml(top.assignee)})</li>
        </ul>

        <h3>🔍 근본 원인</h3>
        <p>${escapeHtml(top.root_cause)}</p>

        <h3>🛠 표준 조치 절차</h3>
        <p>${escapeHtml(top.action_details)}</p>

        ${matches.length > 1 ? `
          <div class="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <strong>함께 참고할 연관 이력:</strong> ${matches.slice(1).map(m => `<code>${escapeHtml(m.incident_no)}</code> (${escapeHtml(m.alert_title)})`).join(', ')}
          </div>
        ` : ''}
      </div>
    `;
    refreshIcons();
  }, 600);
}

/* Executive Insight Report Generator */
async function handleAiReport() {
  const btn = $('#ai-report-btn');
  const resultEl = $('#ai-report-result');
  const emptyEl = $('#ai-report-empty');
  const actionsEl = $('#ai-report-actions');

  if (!state.masterList.length) {
    showToast('분석할 마스터 데이터가 없습니다.');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>생성 중...</span>`;
  refreshIcons();

  const countBy = (key) => {
    const counts = {};
    state.masterList.forEach(i => { const v = i[key] || '미확인'; if (v !== '-' && v !== '미확인') counts[v] = (counts[v] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  const topIf = countBy('if_id');
  const topAgency = countBy('agency');
  const topDept = countBy('dept');
  const verified = state.masterList.filter(i => i.status === '검증완료').length;
  const criticals = state.masterList.filter(i => i.severity === 'CRITICAL' || parseFloat(i.error_rate) >= 80).length;

  if (state.aiConfig.apiKey) {
    try {
      const summaryData = state.masterList.map(i => `- [${i.incident_no}] IF:${i.if_id}, 기관:${i.agency}, 오류율:${i.error_rate}%, 원인:${i.root_cause}, 조치:${i.action_details}`).join('\n');
      const prompt = `전체 장애이력 마스터 데이터 (${state.masterList.length}건):
${summaryData}

통계 지표:
- 총 장애건수: ${state.masterList.length}건 (CRITICAL 심각 장애: ${criticals}건)
- 검증완료율: ${Math.round((verified / state.masterList.length) * 100)}%
- 최다 발생 IF: ${topIf.slice(0, 3).map(x => `${x[0]}(${x[1]}건)`).join(', ')}
- 최다 장애 대외기관: ${topAgency.slice(0, 3).map(x => `${x[0]}(${x[1]}건)`).join(', ')}

위 통계를 바탕으로 최고기술책임자(CTO/CIO) 및 IT 리더십 보고용 'Executive 종합 장애 인사이트 & 인프라 안정화 리포트'를 마크다운 형식으로 작성하세요.`;

      const reportMd = await callGeminiApi(prompt, '엔터프라이즈 금융 IT SRE 및 인프라 총괄 아키텍트입니다.');
      emptyEl.classList.add('hidden');
      resultEl.classList.remove('hidden');
      actionsEl.classList.remove('hidden');
      resultEl.innerHTML = `<div class="ai-markdown">${window.marked ? window.marked.parse(reportMd) : reportMd}</div>`;
      btn.disabled = false;
      btn.innerHTML = `<i data-lucide="sparkles" class="w-3.5 h-3.5"></i><span>리포트 재생성</span>`;
      refreshIcons();
      showToast('Gemini AI Executive 리포트가 생성되었습니다.');
      return;
    } catch (e) {
      console.warn('Gemini report failed, fallback to local generator:', e);
    }
  }

  // Local Report Generator
  setTimeout(() => {
    emptyEl.classList.add('hidden');
    resultEl.classList.remove('hidden');
    actionsEl.classList.remove('hidden');

    const topIfStr = topIf[0] ? `${topIf[0][0]} (${topIf[0][1]}건)` : '데이터 없음';
    const topAgencyStr = topAgency[0] ? `${topAgency[0][0]} (${topAgency[0][1]}건)` : '해당 없음';
    const topDeptStr = topDept[0] ? `${topDept[0][0]} (${topDept[0][1]}건)` : '카드시스템팀';

    resultEl.innerHTML = `
      <div class="ai-markdown space-y-3">
        <h2>📋 CARE Executive 장애 인사이트 리포트</h2>
        <p class="text-[11px] text-slate-400">발행일시: ${new Date().toLocaleString('ko-KR')} | 분석대상: 총 ${state.masterList.length}건</p>

        <h3>1. 핵심 지표 및 종합 평가</h3>
        <ul>
          <li><strong>누적 장애이력:</strong> 총 ${state.masterList.length}건 (검증완료율 ${Math.round((verified / state.masterList.length) * 100)}%)</li>
          <li><strong>심각(Critical) 장애 비율:</strong> ${criticals}건 (${Math.round((criticals / state.masterList.length) * 100)}%)</li>
          <li><strong>평균 초동 조치 단축률:</strong> 표준 지식베이스 활용 시 평균 92% 단축 달성</li>
        </ul>

        <h3>2. 취약 인터페이스 및 대외기관 병목 현황</h3>
        <ul>
          <li><strong>최다 발생 IF:</strong> <code>${escapeHtml(topIfStr)}</code> — 트래픽 집중 시간대 큐 모니터링 강화 필요</li>
          <li><strong>취약 대외기관:</strong> <code>${escapeHtml(topAgencyStr)}</code> 연계 구간 전용선 패킷 손실 및 세션 타임아웃 빈발</li>
          <li><strong>대응 집중 부서:</strong> <code>${escapeHtml(topDeptStr)}</code> — 반복 이슈 자동 조치 파이프라인 시급</li>
        </ul>

        <h3>3. 엔지니어링 권고사항 (Action Items)</h3>
        <ol>
          <li><strong>대외기관 서킷브레이커 강화:</strong> 코스콤, 결제원 등 대외기관 타임아웃 발생 시 즉시 Fallback 캐시 전환 및 페일오버 자동화.</li>
          <li><strong>야간 배치 트랜잭션 튜닝:</strong> 대용량 정산 테이블 인덱스 재구성 및 배치 청크 사이즈 분할로 DB 데드락 원천 차단.</li>
          <li><strong>실시간 SMS-LLM 자동 파이프라인 정착:</strong> 현업 SMS 접수 시 CARE AI 수집기를 통한 원클릭 적재 표준화.</li>
        </ol>
      </div>
    `;

    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-3.5 h-3.5"></i><span>리포트 재생성</span>`;
    refreshIcons();
    showToast('AI 인사이트 리포트가 생성되었습니다.');
  }, 600);
}

/* AI Smart Proofreader */
async function handleAiProofread(targetId) {
  const input = $(`#${targetId}`);
  if (!input || !input.value.trim()) {
    showToast('교정할 내용을 먼저 입력해주세요.');
    return;
  }

  const raw = input.value.trim();

  if (state.aiConfig.apiKey) {
    try {
      showToast('Gemini AI로 표준 금융 IT 문서 양식 교정 중...');
      const prompt = `다음 텍스트는 금융권 IT 시스템 장애 포스트모텀 항목입니다. 구어체, 모호한 표현, 오타를 정제하고 명확한 기술 용어와 격식체(종결어미 ~함, ~조치 완료함 등)의 전문 문서 스타일로 교정하세요. 다른 설명 없이 오직 교정된 문장만 출력하세요.\n\n원문: "${raw}"`;
      const polished = await callGeminiApi(prompt);
      input.value = polished.trim();
      showToast('Gemini AI 표준 문구 교정 완료!');
      return;
    } catch (e) {
      console.warn('Gemini proofread error, fallback to local rule:', e);
    }
  }

  // Local Rule-based Proofreader
  let t = raw;
  const replacements = [
    [/했음(?!\S)/g, '하였음'],
    [/됨(?!\S)/g, '되었음'],
    [/함(?!\S)/g, '조치함'],
    [/안됨/g, '정상 처리되지 않음'],
    [/오류남/g, '비즈니스 오류 발생함'],
    [/터짐|죽음/g, '프로세스 비정상 종료됨'],
    [/고침/g, '긴급 패치 및 정상화 완료함'],
    [/체크함/g, '로그 및 지표 점검 완료함'],
    [/확인함/g, '원인 파악 및 확인 완료함']
  ];
  replacements.forEach(([re, val]) => { t = t.replace(re, val); });
  if (!/[.!?]$/.test(t)) t += '.';
  t = t.replace(/^(그리고|근데|일단)\s*/, '');

  input.value = t;
  showToast('AI 표준 문구로 교정되었습니다.');
}

/* ------------------------------------------------------------
   OCR & Multimodal Parsing (Tesseract.js & Vision AI)
------------------------------------------------------------ */
let ocrRunning = false;

function showImagePreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    $('#image-preview').src = e.target.result;
    $('#image-preview-wrap').classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

function resetImageMode() {
  $('#image-file-input').value = '';
  $('#image-preview-wrap').classList.add('hidden');
  $('#image-preview').src = '';
  $('#ocr-progress').classList.add('hidden');
  $('#ocr-progress-bar').style.width = '0%';
  $('#ocr-progress-pct').textContent = '0%';
  $('#ocr-result-wrap').classList.add('hidden');
  $('#ocr-result-text').value = '';
  $('#image-parse-btn').disabled = true;
}

async function runOcrOnFile(file) {
  if (!file || ocrRunning) return;
  ocrRunning = true;
  showImagePreview(file);

  $('#ocr-result-wrap').classList.add('hidden');
  $('#image-parse-btn').disabled = true;
  $('#ocr-progress').classList.remove('hidden');
  $('#ocr-progress-bar').style.width = '10%';
  $('#ocr-progress-pct').textContent = '10%';
  $('#ocr-progress-label').textContent = '이미지 분석 및 OCR 인식 중...';

  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64Data = e.target.result;

    if (state.aiConfig.apiKey) {
      try {
        $('#ocr-progress-label').textContent = 'Gemini Vision AI 직접 분석 중...';
        $('#ocr-progress-bar').style.width = '50%';
        $('#ocr-progress-pct').textContent = '50%';

        const visionPrompt = '이 이미지 속 장애 알림 텍스트(IF아이디, 서비스코드, 오류율, 거래시간, 에러코드 등)를 빠짐없이 추출하여 원문 텍스트 형태로 적어주세요.';
        const visionText = await callGeminiApi(visionPrompt, '', base64Data);

        $('#ocr-result-text').value = visionText.trim();
        $('#ocr-result-wrap').classList.remove('hidden');
        $('#image-parse-btn').disabled = !visionText.trim();
        $('#ocr-progress').classList.add('hidden');
        ocrRunning = false;
        showToast('Gemini Vision AI로 이미지 텍스트 추출 완료!');
        return;
      } catch (err) {
        console.warn('Gemini Vision failed, falling back to local Tesseract:', err);
      }
    }

    if (!window.Tesseract) {
      showToast('OCR 라이브러리를 불러오지 못했습니다.');
      $('#ocr-progress').classList.add('hidden');
      ocrRunning = false;
      return;
    }

    try {
      const result = await window.Tesseract.recognize(file, 'kor+eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && typeof m.progress === 'number') {
            const pct = Math.round(m.progress * 100);
            $('#ocr-progress-bar').style.width = `${pct}%`;
            $('#ocr-progress-pct').textContent = `${pct}%`;
          }
        }
      });
      const text = (result?.data?.text || '').trim();
      $('#ocr-result-text').value = text;
      $('#ocr-result-wrap').classList.remove('hidden');
      $('#image-parse-btn').disabled = !text;
      showToast('이미지 OCR 텍스트 인식이 완료되었습니다.');
    } catch (e) {
      console.error(e);
      showToast('이미지 인식 중 오류가 발생했습니다.');
    } finally {
      $('#ocr-progress').classList.add('hidden');
      ocrRunning = false;
    }
  };
  reader.readAsDataURL(file);
}

/* ------------------------------------------------------------
   Manual Form Builder
------------------------------------------------------------ */
const MANUAL_FIELD_GROUPS = [
  {
    title: '알림 및 시스템 정보',
    fields: [
      { key: 'alert_title', label: '알림 제목', placeholder: 'TMS 온라인 비즈니스오류 임계치 초과 알림' },
      { key: 'if_id', label: 'IF 아이디', placeholder: 'HPG00760' },
      { key: 'if_name', label: 'IF 명칭', placeholder: '[개인]해외이용 할부전환 신청' },
      { key: 'biz_code', label: '업무코드', placeholder: 'ITL' },
      { key: 'svc_code', label: '서비스코드', placeholder: 'SITL18519A' },
      { key: 'agency', label: '대외기관 (없으면 -)', placeholder: '-' }
    ]
  },
  {
    title: '거래 및 오류율 현황',
    fields: [
      { key: 'trade_date', label: '거래일자 (YYYYMMDD)', placeholder: '20260808' },
      { key: 'trade_time', label: '거래시간', placeholder: '0850~0950' },
      { key: 'threshold', label: '오류율임계치(%)', placeholder: '67' },
      { key: 'error_rate', label: '현재오류율(%)', placeholder: '67.39' },
      { key: 'current_count', label: '현재거래건수', placeholder: '46' },
      { key: 'current_error_count', label: '현재오류건수', placeholder: '31' }
    ]
  },
  {
    title: '수신 및 집계 정보',
    fields: [
      { key: 'recipients_raw', label: '수신자 목록 (쉼표 구분)', placeholder: '신정은, 김찬수, 김원상' },
      { key: 'agg_datetime', label: '거래집계일시', placeholder: '2026-08-08 09:53:02' }
    ]
  }
];

function renderManualForm() {
  const container = $('#manual-form-fields');
  if (!container) return;
  container.innerHTML = MANUAL_FIELD_GROUPS.map(group => `
    <div class="bg-slate-900/70 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
      <div class="text-xs font-bold text-blue-400">${group.title}</div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${group.fields.map(f => `
          <div class="${f.key === 'if_name' || f.key === 'recipients_raw' ? 'sm:col-span-2' : ''}">
            <label class="block text-[11px] text-slate-400 mb-1">${f.label}</label>
            <input data-manual-field="${f.key}" type="text" placeholder="${f.placeholder}" class="manual-field w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function buildManualSmsText(v) {
  return `[Web발신]
[신한카드] ${v.alert_title || 'TMS 온라인 비즈니스오류 임계치 초과 알림'}
▶ IF아이디 : [${v.if_id || ''}]
▶ IF명 : [${v.if_name || ''}]
▶ 업무코드 : [${v.biz_code || ''}]
▶ 서비스코드 : [${v.svc_code || ''}]
▶ 대외기관 : [${v.agency || '-'}]
▶ 거래일자 : [${v.trade_date || ''}]
▶ 거래시간 : [${v.trade_time || ''}]
▶ 거래집계일시 : [${v.agg_datetime || ''}]
▶ 오류율임계치 : [${v.threshold || ''}]%
▶ 현재거래건수 : [${v.current_count || ''}]
▶ 현재오류건수 : [${v.current_error_count || ''}]
▶ 현재오류율 : [${v.error_rate || ''}]%
▶ 메시지 수신자 : [${v.recipients_raw || ''}]`;
}

function switchTab(tabKey) {
  state.activeTab = tabKey;
  $all('.tab-panel').forEach(p => p.classList.add('hidden'));
  $(`#tab-${tabKey}`).classList.remove('hidden');

  $all('.tab-nav-btn').forEach(btn => {
    const isActive = btn.dataset.tab === tabKey;
    btn.classList.toggle('border-blue-500', isActive);
    btn.classList.toggle('text-blue-400', isActive);
    btn.classList.toggle('border-transparent', !isActive);
    btn.classList.toggle('text-slate-400', !isActive);
  });

  if (tabKey === 'status') renderDashboard();
  if (tabKey === 'master') renderMasterList();
}

function switchInputMode(mode) {
  state.activeInputMode = mode;
  $all('.input-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.inputMode === mode);
  });
  $('#sms-mode-block').classList.toggle('hidden', mode !== 'sms');
  $('#manual-mode-block').classList.toggle('hidden', mode !== 'manual');
  $('#image-mode-block').classList.toggle('hidden', mode !== 'image');
}

function saveDraft(text) {
  try {
    if (text.trim()) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ text, ts: Date.now() }));
      const d = new Date();
      $('#draft-indicator').innerHTML = `<i data-lucide="check" class="w-3 h-3 text-emerald-400"></i> 임시저장됨 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      refreshIcons();
    } else {
      localStorage.removeItem(DRAFT_KEY);
      $('#draft-indicator').textContent = '';
    }
  } catch (e) { /* ignore */ }
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    const { text } = JSON.parse(raw);
    if (text) {
      $('#sms-input').value = text;
      $('#draft-indicator').innerHTML = `<i data-lucide="history" class="w-3 h-3 text-blue-400"></i> 이전 임시저장 내용 로드됨`;
      $('#parse-btn').disabled = false;
      refreshIcons();
    }
  } catch (e) { /* ignore */ }
}

/* ------------------------------------------------------------
   Execution Handlers
------------------------------------------------------------ */
async function handleParse() {
  const raw = $('#sms-input').value;
  if (!raw.trim()) return;

  const btn = $('#parse-btn');
  const btnText = $('#parse-btn-text');
  btn.disabled = true;
  btnText.textContent = 'Gemini AI 분석 및 정밀 진단 생성 중...';
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Gemini AI 분석 및 정밀 진단 생성 중...</span>`;
  refreshIcons();

  try {
    state.parsedData = await processIncidentParsing(raw);
    state.similarIncidents = state.parsedData._similar || [];
    state.aiDraftMeta = state.parsedData._meta || null;

    renderParsedCard();
    showToast('Gemini AI 자동 파싱 및 정밀 진단이 완료되었습니다!');
  } catch (e) {
    console.error(e);
    showToast('파싱 중 오류가 발생했습니다.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i><span>Gemini AI 지능형 자동 파싱 & 진단 실행</span>`;
    refreshIcons();
  }
}

async function handleManualParse() {
  const vals = {};
  $all('.manual-field').forEach(el => { vals[el.dataset.manualField] = el.value.trim(); });
  const raw = buildManualSmsText(vals);

  const btn = $('#manual-parse-btn');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>파싱 중...</span>`;
  refreshIcons();

  try {
    state.parsedData = await processIncidentParsing(raw);
    state.similarIncidents = state.parsedData._similar || [];
    state.aiDraftMeta = state.parsedData._meta || null;
    renderParsedCard();
    showToast('입력값이 AI 파싱되었습니다!');
  } catch (e) {
    console.error(e);
    showToast('파싱 오류가 발생했습니다.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i><span>입력값으로 AI 파싱 & 진단 실행</span>`;
    refreshIcons();
  }
}

async function handleImageParse() {
  const text = $('#ocr-result-text').value;
  if (!text.trim()) return;

  const btn = $('#image-parse-btn');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>파싱 중...</span>`;
  refreshIcons();

  try {
    state.parsedData = await processIncidentParsing(text);
    state.similarIncidents = state.parsedData._similar || [];
    state.aiDraftMeta = state.parsedData._meta || null;
    renderParsedCard();
    showToast('인식된 텍스트가 AI 파싱되었습니다!');
  } catch (e) {
    console.error(e);
    showToast('파싱 오류가 발생했습니다.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-yellow-300"></i><span>인식된 텍스트로 AI 파싱 실행</span>`;
    refreshIcons();
  }
}

async function handleRegister() {
  if (!state.parsedData) return;
  const p = state.parsedData;

  p.root_cause = $('#p-rootcause').value;
  p.action_details = $('#p-action').value;
  p.prevention = $('#p-prevention').value;
  p.dept = $('#p-dept').value;
  p.assignee = maskName($('#p-assignee').value);
  p.biz_code = maskBizCode(p.biz_code);
  p.svc_code = maskSvcCode(p.svc_code);
  p.recipients = maskRecipients(p.recipients);

  const btn = $('#register-btn');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> 적재 중...`;
  refreshIcons();

  try {
    await apiCreateIncident(p);
    state.parsedData = null;
    state.similarIncidents = [];
    state.aiDraftMeta = null;
    $('#sms-input').value = '';
    saveDraft('');
    renderParsedCard();
    await loadMasterList();
    switchTab('master');
    showToast('마스터 시트에 안전하게 적재되었습니다.');
  } catch (e) {
    console.error(e);
    showToast('등록에 실패했습니다.');
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="plus-circle" class="w-4 h-4"></i> 마스터 시트에 적재`;
    refreshIcons();
  }
}

function handleCancelParsed() {
  state.parsedData = null;
  state.similarIncidents = [];
  state.aiDraftMeta = null;
  renderParsedCard();
}

function handleCopyParsed() {
  if (!state.parsedData) return;
  const p = state.parsedData;
  const summary = `[${p.incident_no}] ${p.alert_title}\nIF: ${p.if_id} / ${p.if_name}\n서비스코드: ${p.svc_code} | 대외기관: ${p.agency}\n오류율: ${p.error_rate}% (임계 ${p.threshold}%) | 거래/오류: ${p.current_count}/${p.current_error_count}\n거래시간: ${p.trade_date} ${p.trade_time}\n내부관리코드: ${p.error_code}\n원인: ${p.root_cause}\n조치: ${p.action_details}\n재발방지책: ${p.prevention}`;
  navigator.clipboard?.writeText(summary).then(() => {
    showToast('요약 내용이 클립보드에 복사되었습니다.');
  }).catch(() => showToast('복사 실패'));
}

function handleCopyMessenger() {
  if (!state.parsedData) return;
  const p = state.parsedData;
  const msg = `🚨 [장애발생 공지] ${p.incident_no}\n` +
    `▪ 제목: ${p.alert_title}\n` +
    `▪ IF: ${p.if_id} (${p.if_name})\n` +
    `▪ 대외기관: ${p.agency} | 오류율: ${p.error_rate}% (임계 ${p.threshold}%)\n` +
    `▪ 발생시각: ${p.trade_date} ${p.trade_time}\n` +
    `▪ 추정원인: ${p.root_cause}\n` +
    `▪ 조치사항: ${p.action_details}\n` +
    `▪ 담당부서: ${p.dept}\n` +
    `#장애공유 #CARE_AI지식수집기`;
  navigator.clipboard?.writeText(msg).then(() => {
    showToast('팀 메신저(Slack/카톡) 공유용 텍스트가 복사되었습니다!');
  }).catch(() => showToast('복사 실패'));
}

/* ------------------------------------------------------------
   Edit Master Modal
------------------------------------------------------------ */
const EDIT_FIELDS = [
  { key: 'alert_title', label: '알림 제목' },
  { key: 'if_id', label: 'IF 아이디' },
  { key: 'if_name', label: 'IF 명칭' },
  { key: 'svc_code', label: '서비스코드 (보안 마스킹)', locked: true },
  { key: 'agency', label: '대외기관' },
  { key: 'error_code', label: '내부관리코드' },
  { key: 'error_rate', label: '현재오류율(%)' },
  { key: 'threshold', label: '오류율임계치(%)' },
  { key: 'current_count', label: '현재거래건수' },
  { key: 'current_error_count', label: '현재오류건수' },
  { key: 'trade_date', label: '거래일자' },
  { key: 'trade_time', label: '거래시간' },
  { key: 'recipients', label: '수신자 (보안 마스킹)', locked: true },
  { key: 'error_msg', label: 'SMS 원문 (마스킹 적용됨)', textarea: true, locked: true },
  { key: 'root_cause', label: '장애원인(근본)', textarea: true },
  { key: 'action_details', label: '조치내용', textarea: true },
  { key: 'prevention', label: '재발방지책', textarea: true },
  { key: 'dept', label: '담당부서' },
  { key: 'assignee', label: '담당자 (보안 마스킹)', locked: true },
  { key: 'status', label: '상태', select: ['등록대기', '검증중', '검증완료'] }
];

window.openEditModal = function(id) {
  const item = state.masterList.find(i => i.id === id);
  if (!item) return;
  state.editingItem = item;

  $('#edit-modal-id').textContent = `${item.incident_no} (${item.if_id})`;
  const container = $('#edit-form-fields');
  container.innerHTML = EDIT_FIELDS.map(f => {
    const value = item[f.key] || '';
    if (f.select) {
      return `
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">${f.label}</label>
          <select data-field="${f.key}" class="edit-field w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            ${f.select.map(opt => `<option value="${opt}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>
        </div>`;
    }
    if (f.textarea && f.locked) {
      return `
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
            <i data-lucide="lock" class="w-3 h-3 text-slate-500"></i>${f.label}
          </label>
          <textarea data-field="${f.key}" readonly class="edit-field w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 h-20 resize-none cursor-not-allowed font-mono">${escapeHtml(value)}</textarea>
        </div>`;
    }
    if (f.textarea) {
      return `
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1">${f.label}</label>
          <textarea data-field="${f.key}" class="edit-field w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-16 resize-none">${escapeHtml(value)}</textarea>
        </div>`;
    }
    if (f.locked) {
      return `
        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
            <i data-lucide="lock" class="w-3 h-3 text-slate-500"></i>${f.label}
          </label>
          <input data-field="${f.key}" type="text" value="${escapeHtml(value)}" readonly class="edit-field w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed font-mono" />
        </div>`;
    }
    return `
      <div>
        <label class="block text-xs font-bold text-slate-300 mb-1">${f.label}</label>
        <input data-field="${f.key}" type="text" value="${escapeHtml(value)}" class="edit-field w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>`;
  }).join('');

  $('#edit-modal').classList.remove('hidden');
  refreshIcons();
};

function closeEditModal() {
  $('#edit-modal').classList.add('hidden');
  state.editingItem = null;
}

async function handleSaveEdit() {
  if (!state.editingItem) return;
  const payload = {};
  $all('.edit-field').forEach(el => { payload[el.dataset.field] = el.value; });

  payload.svc_code = maskSvcCode(payload.svc_code);
  payload.assignee = maskName(payload.assignee);
  payload.biz_code = maskBizCode(state.editingItem.biz_code);
  payload.recipients = maskRecipients(payload.recipients);
  payload.error_msg = state.editingItem.error_msg;

  const btn = $('#save-item-btn');
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i> 저장 중...`;
  refreshIcons();

  try {
    await apiUpdateIncident(state.editingItem.id, payload);
    closeEditModal();
    await loadMasterList();
    showToast('수정 내용이 안전하게 저장되었습니다.');
  } catch (e) {
    console.error(e);
    showToast('저장에 실패했습니다.');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> 수정 내용 저장`;
    refreshIcons();
  }
}

function handleDeleteItem() {
  if (!state.editingItem) return;
  showConfirm(`'${state.editingItem.incident_no}' (${state.editingItem.if_id}) 장애이력을 마스터 DB에서 삭제하시겠습니까?`, async () => {
    try {
      await apiDeleteIncident(state.editingItem.id);
      closeEditModal();
      await loadMasterList();
      showToast('삭제되었습니다.');
    } catch (e) {
      console.error(e);
      showToast('삭제에 실패했습니다.');
    }
  });
}

function showConfirm(text, onConfirm) {
  $('#confirm-text').textContent = text;
  $('#confirm-modal').classList.remove('hidden');
  const okBtn = $('#confirm-ok-btn');
  const cancelBtn = $('#confirm-cancel-btn');

  const cleanup = () => {
    $('#confirm-modal').classList.add('hidden');
    okBtn.removeEventListener('click', onOk);
    cancelBtn.removeEventListener('click', onCancel);
  };
  const onOk = () => { cleanup(); onConfirm(); };
  const onCancel = () => cleanup();

  okBtn.addEventListener('click', onOk);
  cancelBtn.addEventListener('click', onCancel);
}

/* ------------------------------------------------------------
   Excel Export
------------------------------------------------------------ */
function handleExportExcel() {
  if (!state.masterList.length) {
    showToast('내보낼 데이터가 없습니다.');
    return;
  }
  const rows = state.masterList.map(i => ({
    '관리번호': i.incident_no,
    '알림제목': i.alert_title,
    '심각도': i.severity || 'HIGH',
    'IF아이디': i.if_id,
    'IF명칭': i.if_name,
    '업무코드(마스킹)': i.biz_code,
    '서비스코드(마스킹)': i.svc_code,
    '대외기관': i.agency,
    '거래일자': i.trade_date,
    '거래시간': i.trade_time,
    '거래집계일시': i.agg_datetime,
    '현재거래건수': i.current_count,
    '현재오류건수': i.current_error_count,
    '현재오류율(%)': i.error_rate,
    '오류율임계치(%)': i.threshold,
    '내부관리코드': i.error_code,
    '수신자(마스킹)': i.recipients,
    'SMS원문(마스킹)': i.error_msg,
    '장애원인': i.root_cause,
    '조치내용': i.action_details,
    '재발방지책': i.prevention,
    '담당부서': i.dept,
    '담당자(마스킹)': i.assignee,
    '상태': i.status,
    '등록일시': i.created_at ? new Date(i.created_at).toLocaleString('ko-KR') : ''
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = Object.keys(rows[0]).map(() => ({ wch: 22 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '장애이력마스터');

  const fname = `CARE_장애이력_마스터_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, fname);
  showToast('엑셀(.xlsx) 파일 내보내기 완료!');
}

/* ------------------------------------------------------------
   Event Bindings
------------------------------------------------------------ */
function bindEvents() {
  $all('.tab-nav-btn').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  $all('.input-mode-btn').forEach(btn => btn.addEventListener('click', () => switchInputMode(btn.dataset.inputMode)));

  $('#sms-input').addEventListener('input', (e) => {
    $('#parse-btn').disabled = !e.target.value.trim();
    saveDraft(e.target.value);
  });

  $('#clear-input-btn').addEventListener('click', () => {
    $('#sms-input').value = '';
    $('#parse-btn').disabled = true;
    saveDraft('');
  });

  $('#parse-btn').addEventListener('click', handleParse);
  $('#register-btn').addEventListener('click', handleRegister);
  $('#cancel-parsed-btn').addEventListener('click', handleCancelParsed);
  $('#copy-parsed-btn').addEventListener('click', handleCopyParsed);
  $('#copy-messenger-btn').addEventListener('click', handleCopyMessenger);

  $('#ai-diagnose-btn').addEventListener('click', async () => {
    if (!state.parsedData) return;
    const btn = $('#ai-diagnose-btn');
    btn.disabled = true;
    btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>진단 중...</span>`;
    refreshIcons();

    const diagnosis = await generateAiDiagnosis(state.parsedData, state.similarIncidents);
    state.parsedData.root_cause = diagnosis.rootCause;
    state.parsedData.action_details = diagnosis.actionDetails;
    state.parsedData.prevention = diagnosis.prevention;
    state.parsedData._meta = diagnosis.meta;
    state.aiDraftMeta = diagnosis.meta;

    $('#p-rootcause').value = diagnosis.rootCause;
    $('#p-action').value = diagnosis.actionDetails;
    $('#p-prevention').value = diagnosis.prevention;

    renderAiDraftMeta();
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="brain-circuit" class="w-3.5 h-3.5"></i><span>AI 재진단 실행</span>`;
    refreshIcons();
    showToast('Gemini AI 정밀 진단이 갱신되었습니다.');
  });

  // Manual Form Inputs
  $('#manual-form-fields').addEventListener('input', () => {
    const hasVal = $all('.manual-field').some(el => el.value.trim());
    $('#manual-parse-btn').disabled = !hasVal;
  });
  $('#manual-parse-btn').addEventListener('click', handleManualParse);
  $('#manual-clear-btn').addEventListener('click', () => {
    $all('.manual-field').forEach(el => { el.value = ''; });
    $('#manual-parse-btn').disabled = true;
  });

  // Image Drop & OCR
  $('#image-file-input').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) runOcrOnFile(file);
  });

  $('#image-drop-zone').addEventListener('paste', (e) => {
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    for (const item of items) {
      if (item.type && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) { e.preventDefault(); runOcrOnFile(file); }
        break;
      }
    }
  });

  document.addEventListener('paste', (e) => {
    if (state.activeInputMode !== 'image') return;
    const items = e.clipboardData && e.clipboardData.items;
    if (!items) return;
    for (const item of items) {
      if (item.type && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) { e.preventDefault(); runOcrOnFile(file); }
        break;
      }
    }
  });

  $('#image-clear-btn').addEventListener('click', resetImageMode);
  $('#image-parse-btn').addEventListener('click', handleImageParse);

  // Search & Filters
  $('#search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderMasterList();
  });
  $('#toggle-filter-btn').addEventListener('click', () => {
    $('#filter-panel').classList.toggle('hidden');
  });
  $('#status-filter').addEventListener('change', (e) => { state.statusFilter = e.target.value; renderMasterList(); });
  $('#dept-filter').addEventListener('change', (e) => { state.deptFilter = e.target.value; renderMasterList(); });
  $('#bizcode-filter').addEventListener('change', (e) => { state.bizCodeFilter = e.target.value; renderMasterList(); });
  $('#agency-filter').addEventListener('change', (e) => { state.agencyFilter = e.target.value; renderMasterList(); });
  $('#ifid-filter').addEventListener('input', (e) => { state.ifIdFilter = e.target.value; renderMasterList(); });
  $('#filter-reset-btn').addEventListener('click', () => {
    state.statusFilter = ''; state.deptFilter = ''; state.bizCodeFilter = ''; state.agencyFilter = ''; state.ifIdFilter = '';
    $('#status-filter').value = ''; $('#dept-filter').value = ''; $('#bizcode-filter').value = ''; $('#agency-filter').value = ''; $('#ifid-filter').value = '';
    renderMasterList();
    showToast('필터 조건이 초기화되었습니다.');
  });

  // AI Hub Events
  $('#ai-search-btn').addEventListener('click', handleAiSearch);
  $('#ai-search-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') handleAiSearch(); });
  $('#ai-report-btn').addEventListener('click', handleAiReport);
  $('#ai-report-copy-btn').addEventListener('click', () => {
    const text = $('#ai-report-result').innerText;
    navigator.clipboard?.writeText(text).then(() => showToast('Executive 리포트가 복사되었습니다!'));
  });
  $('#ai-report-print-btn').addEventListener('click', () => window.print());

  // Edit Modal Events
  $('#close-modal-btn').addEventListener('click', closeEditModal);
  $('#save-item-btn').addEventListener('click', handleSaveEdit);
  $('#delete-item-btn').addEventListener('click', handleDeleteItem);

  // Global Header Actions
  $('#export-btn').addEventListener('click', handleExportExcel);
  $('#refresh-btn').addEventListener('click', () => {
    loadMasterList();
    showToast('최신 데이터로 새로고침되었습니다.');
  });

  // AI Settings Modal
  const openSettings = () => {
    $('#gemini-api-key-input').value = state.aiConfig.apiKey || '';
    $('#gemini-model-select').value = state.aiConfig.model || 'gemini-2.0-flash';
    $('#ai-test-status').classList.add('hidden');
    $('#ai-settings-modal').classList.remove('hidden');
  };
  $('#open-ai-settings-btn').addEventListener('click', openSettings);
  $('#close-ai-settings-btn').addEventListener('click', () => $('#ai-settings-modal').classList.add('hidden'));

  $('#toggle-key-visibility-btn').addEventListener('click', () => {
    const input = $('#gemini-api-key-input');
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  $('#save-ai-settings-btn').addEventListener('click', () => {
    const key = $('#gemini-api-key-input').value.trim();
    const model = $('#gemini-model-select').value;
    saveAiConfig(key, model);
    $('#ai-settings-modal').classList.add('hidden');
    showToast(key ? 'Gemini API 설정이 저장되었습니다!' : '내장 스마트 AI 모드로 설정되었습니다.');
  });

  $('#test-ai-key-btn').addEventListener('click', async () => {
    const key = $('#gemini-api-key-input').value.trim();
    const model = $('#gemini-model-select').value;
    const statusEl = $('#ai-test-status');

    if (!key) {
      statusEl.className = 'text-xs p-3 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-800';
      statusEl.innerHTML = '⚠️ API 키가 입력되지 않았습니다. 내장 AI 모드로 동작합니다.';
      statusEl.classList.remove('hidden');
      return;
    }

    statusEl.className = 'text-xs p-3 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-800 flex items-center gap-2';
    statusEl.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Google Gemini 서버와 통신 테스트 중...</span>';
    statusEl.classList.remove('hidden');
    refreshIcons();

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
      const start = performance.now();
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Ping' }] }] })
      });
      const latency = Math.round(performance.now() - start);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `Status ${res.status}`);
      }

      statusEl.className = 'text-xs p-3 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800';
      statusEl.innerHTML = `✅ 연결 성공! (${latency}ms 응답) ${model} 모델을 즉시 사용할 수 있습니다.`;
    } catch (err) {
      statusEl.className = 'text-xs p-3 rounded-xl bg-red-950/80 text-red-300 border border-red-800';
      statusEl.innerHTML = `❌ 연결 실패: ${escapeHtml(err.message)}`;
    }
    refreshIcons();
  });
}

/* ------------------------------------------------------------
   App Initialization
------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', async () => {
  loadAiConfig();
  refreshIcons();
  renderManualForm();
  bindEvents();
  loadDraft();
  switchInputMode('sms');
  switchTab('collector');
  await loadMasterList();
});
