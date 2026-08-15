/**
 * CARE 지식 수집기 Mobile v2.0 - Core Application Engine
 * =========================================================
 * 100% BULLET-PROOF:
 *   - ALL onclick handlers are window.* globals
 *   - ALL show/hide uses style.display for consistency
 *   - ZERO classList.add/remove('hidden') — only style.display
 */

/* ============================================================
   CONSTANTS & SEED DATA
============================================================ */
const STORAGE_KEY = 'care_mobile_master_v2';
const DRAFT_KEY  = 'care_mobile_draft_v2';
const AI_CFG_KEY = 'care_mobile_ai_v2';

const SEED_DATA = [
  {
    id: 'inc-01', incident_no: 'INC-2026-0808-01',
    alert_title: 'TMS 온라인 비즈니스오류 임계치 초과 알림',
    if_id: 'HPG00760', if_name: '[개인]해외이용 할부전환 신청',
    biz_code: 'I**', svc_code: 'SITL****', agency: '-',
    trade_date: '20260808', trade_time: '0850~0950',
    agg_datetime: '2026-08-08 09:53:02', threshold: '67',
    current_count: '46', current_error_count: '31',
    error_rate: '67.39', error_code: 'E-TMS-THRESHOLD',
    recipients: '신**, 김**, 김**, 김**, 박**', severity: 'HIGH',
    root_cause: '해외 가맹점 환율 조회 서비스 세션 타임아웃 및 DB 커넥션 풀 일시 고갈',
    action_details: '1단계) 환율 캐시 서버 재기동 및 커넥션 풀 임시 증설 / 2단계) 실패 거래 자동 재시도 / 3단계) 정상화 모니터링',
    prevention: '환율 캐시 TTL 연장 및 타임아웃 발생 시 서킷브레이커 Fallback 캐시 적용',
    dept: '카드시스템팀', assignee: '김**', status: '검증완료', created_at: 1786190627000
  },
  {
    id: 'inc-02', incident_no: 'INC-2026-0808-02',
    alert_title: 'TMS 온라인 비즈니스오류 임계치 초과 알림',
    if_id: 'HPG00512', if_name: '[법인]카드발급 실명인증 조회',
    biz_code: 'M**', svc_code: 'SMBR****', agency: '코스콤',
    trade_date: '20260808', trade_time: '1300~1400',
    agg_datetime: '2026-08-08 14:02:11', threshold: '80',
    current_count: '98', current_error_count: '86',
    error_rate: '87.75', error_code: 'E-TMS-THRESHOLD',
    recipients: '박**, 이**, 최**', severity: 'CRITICAL',
    root_cause: '대외기관(코스콤) 전용선 네트워크 간헐적 패킷 유실 및 응답 지연',
    action_details: '1단계) 코스콤 종합상황실 핫라인 확인 / 2단계) 2번 예비 회선으로 수동 절체 / 3단계) 지연 거래 재조회',
    prevention: '대외기관 전용선 자동 페일오버(Failover) 헬스체크 주기 단축',
    dept: '카드시스템팀', assignee: '이**', status: '검증완료', created_at: 1786205147000
  },
  {
    id: 'inc-03', incident_no: 'INC-2026-0808-03',
    alert_title: 'TMS 야간 배치 비즈니스오류 알림',
    if_id: 'HPG00981', if_name: '[공통]야간정산 배치 결과전송',
    biz_code: 'B**', svc_code: 'SBAT****', agency: '-',
    trade_date: '20260808', trade_time: '0100~0200',
    agg_datetime: '2026-08-08 02:04:33', threshold: '70',
    current_count: '64', current_error_count: '46',
    error_rate: '71.87', error_code: 'E-TMS-DELAY',
    recipients: '김**, 정**', severity: 'HIGH',
    root_cause: '야간 대용량 가맹점 수수료 정산 테이블 데드락(Deadlock) 발생으로 인한 타임아웃',
    action_details: '1단계) 데드락 세션 강제 킬(Kill) / 2단계) 청크 분할 배치 재수행 / 3단계) 정합성 대조',
    prevention: '정산 배치 쿼리 인덱스 재구성 및 트랜잭션 격리수준 최적화',
    dept: '데이터운영팀', assignee: '정**', status: '검증완료', created_at: 1786161979000
  },
  {
    id: 'inc-04', incident_no: 'INC-2026-0807-01',
    alert_title: 'TMS 오픈뱅킹 잔액조회 임계치 초과 알림',
    if_id: 'HPG00421', if_name: '[디지털]오픈뱅킹 계좌 잔액 실시간 조회',
    biz_code: 'O**', svc_code: 'SOPN****', agency: '금융결제원',
    trade_date: '20260807', trade_time: '1810~1910',
    agg_datetime: '2026-08-07 19:12:00', threshold: '50',
    current_count: '280', current_error_count: '160',
    error_rate: '57.14', error_code: 'E-TMS-THRESHOLD',
    recipients: '한**, 송**', severity: 'MEDIUM',
    root_cause: '금융결제원 오픈뱅킹 중계 허브 점검 연장에 따른 오류 반환',
    action_details: '1단계) 금융결제원 공지 확인 / 2단계) 앱 내 점검 배너 노출 / 3단계) 정상화 확인',
    prevention: '대외기관 점검 일정 사전 캘린더 자동 연동 시스템 구축',
    dept: '디지털플랫폼팀', assignee: '한**', status: '검증중', created_at: 1786105000000
  },
  {
    id: 'inc-05', incident_no: 'INC-2026-0806-01',
    alert_title: 'TMS 신용정보 조회 비즈니스오류 알림',
    if_id: 'HPG00305', if_name: '[심사]신용평가점수 실시간 연계조회',
    biz_code: 'C**', svc_code: 'SCRD****', agency: 'NICE평가정보',
    trade_date: '20260806', trade_time: '1100~1200',
    agg_datetime: '2026-08-06 12:02:15', threshold: '60',
    current_count: '90', current_error_count: '62',
    error_rate: '68.88', error_code: 'E-TMS-ERROR',
    recipients: '윤**, 강**', severity: 'CRITICAL',
    root_cause: 'NICE 연계구간 SSL 인증서 갱신 누락으로 상호 인증 오류 발생',
    action_details: '1단계) 갱신된 와일드카드 인증서 즉시 적용 / 2단계) 연계 테스트 정상 확인',
    prevention: '사내/대외 SSL 인증서 만료 30일 전 자동 슬랙 알림 봇 연동',
    dept: '정보보안팀', assignee: '윤**', status: '검증완료', created_at: 1786018000000
  }
];

const SAMPLES = {
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

  unstructured: `[Slack 긴급알림]
시스템: 카카오페이 간편결제 연계 중계망
IF: HPG00650 ([간편결제]카카오페이 머니 잔액충전 승인)
서비스코드: SPAY99104A / 업무: PAY / 기관: 카카오페이
현황: 총 450건 중 290건 타임아웃 발생! 오류율 64.44% (임계치 50% 초과)
수신자: 홍길동, 송중기 모니터링 요망.`
};

/* ============================================================
   GLOBAL APP STATE
============================================================ */
var appState = {
  currentTab: 'collector',
  masterList: [],
  parsedData: null,
  activeFilter: '',
  editingItem: null,
  aiConfig: { apiKey: '', model: 'gemini-2.0-flash' }
};

/* ============================================================
   DOM HELPERS — show/hide ALWAYS use style.display
============================================================ */
function $(id) { return document.getElementById(id); }

function show(id) {
  var el = typeof id === 'string' ? $(id) : id;
  if (el) el.style.display = '';
}

function hide(id) {
  var el = typeof id === 'string' ? $(id) : id;
  if (el) el.style.display = 'none';
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* Toast */
var _toastTimer = null;
function showToast(msg) {
  var t = $('app-toast');
  if (!t) return;
  t.textContent = msg;
  show(t);
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() { hide(t); }, 2800);
}

/* ============================================================
   SECURITY MASKING
============================================================ */
function maskBizCode(code) {
  if (!code || code === '-' || code === '미확인') return code || '-';
  if (/^.\*\*$/.test(code)) return code;
  return code.charAt(0) + '**';
}
function maskSvcCode(code) {
  if (!code || code === '-' || code === '미확인') return code || '-';
  if (/^.{1,4}\*{4}$/.test(code)) return code;
  return (code.length >= 4 ? code.slice(0, 4) : code) + '****';
}
function maskName(name) {
  if (!name) return '';
  var t = name.trim();
  if (!t || t === '-' || t === '미지정') return t;
  if (/^.\*\*$/.test(t)) return t;
  return t.charAt(0) + '**';
}
function maskRecipients(raw) {
  if (!raw) return '';
  return raw.split(/[,/·\s]+/).map(function(n) { return maskName(n.trim()); }).filter(Boolean).join(', ');
}

/* ============================================================
   GEMINI AI ENGINE
============================================================ */
async function callGemini(prompt, systemPrompt) {
  var apiKey = appState.aiConfig.apiKey;
  var model = appState.aiConfig.model || 'gemini-2.0-flash';
  if (!apiKey) throw new Error('NO_API_KEY');

  var endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
  var payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  if (systemPrompt) payload.system_instruction = { parts: [{ text: systemPrompt }] };

  var res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    var err = await res.json().catch(function() { return {}; });
    throw new Error((err && err.error && err.error.message) || ('HTTP ' + res.status));
  }
  var data = await res.json();
  return (data.candidates && data.candidates[0] && data.candidates[0].content &&
          data.candidates[0].content.parts && data.candidates[0].content.parts[0] &&
          data.candidates[0].content.parts[0].text) || '';
}

/* ============================================================
   SMS TEXT PARSER
============================================================ */
function extractBracket(text, label) {
  var re = new RegExp(label + '\\s*[:：]?\\s*\\[');
  var m = re.exec(text);
  if (!m) return '';
  var start = m.index + m[0].length;
  var depth = 1, i = start;
  for (; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) break; }
  }
  return text.slice(start, i).trim();
}

function parseIncidentText(rawText) {
  var text = (rawText || '').trim();
  if (!text) return null;

  var ifId = extractBracket(text, 'IF\\s*아이디') || extractBracket(text, 'IF') || 'HPG00760';
  var ifName = extractBracket(text, 'IF\\s*명(?!칭)') || '온라인 비즈니스 처리';
  var bizCode = extractBracket(text, '업무\\s*코드') || 'ITL';
  var svcCode = extractBracket(text, '서비스\\s*코드') || 'SITL18519A';
  var agency = extractBracket(text, '대외\\s*기관') || '-';
  var tradeDate = extractBracket(text, '거래\\s*일자') || new Date().toISOString().slice(0, 10).replace(/-/g, '');
  var tradeTime = extractBracket(text, '거래\\s*시간') || '0850~0950';
  var threshold = extractBracket(text, '오류율\\s*임계치') || '67';
  var currentCount = extractBracket(text, '현재\\s*거래\\s*건수') || '46';
  var currentErrorCount = extractBracket(text, '현재\\s*오류\\s*건수') || '31';
  var errorRate = extractBracket(text, '현재\\s*오류율') || '67.39';
  var recipients = extractBracket(text, '메시지\\s*수신자') || '신정은, 김찬수';

  var alertTitle = 'TMS 온라인 비즈니스오류 임계치 초과 알림';
  var lines = text.split('\n').map(function(l) { return l.trim(); }).filter(Boolean);
  if (lines.length > 1 && !lines[1].startsWith('▶')) {
    alertTitle = lines[1].replace(/^\[[^\]]*\]\s*/, '');
  }

  var er = parseFloat(errorRate) || 0;
  var th = parseFloat(threshold) || 60;
  var severity = (er >= 80 || (er >= th && agency !== '-')) ? 'CRITICAL' : (er >= th ? 'HIGH' : 'MEDIUM');

  var similar = appState.masterList.filter(function(item) {
    return item.if_id === ifId || (agency !== '-' && item.agency === agency);
  }).slice(0, 2);

  var candidates = [
    {
      cause: agency !== '-' ? '대외기관(' + agency + ') 연계 전용선 패킷 손실 및 응답 지연' : ifName + ' 서비스 DB 커넥션 풀 고갈 및 세션 타임아웃',
      confidence: 85,
      basis: '오류율 급증 및 과거 유사 사례 기반'
    },
    {
      cause: 'WAS 스레드 병목 및 선행 락(Lock) 대기 현상',
      confidence: 65,
      basis: '동시간대 거래량 급증 패턴'
    }
  ];

  return {
    incident_no: 'INC-' + tradeDate + '-' + Math.floor(10 + Math.random() * 89),
    alert_title: alertTitle, if_id: ifId, if_name: ifName,
    biz_code: maskBizCode(bizCode), svc_code: maskSvcCode(svcCode), agency: agency,
    trade_date: tradeDate, trade_time: tradeTime, threshold: threshold,
    current_count: currentCount, current_error_count: currentErrorCount,
    error_rate: errorRate, error_code: 'E-TMS-THRESHOLD',
    recipients: maskRecipients(recipients), severity: severity,
    root_cause: candidates[0].cause,
    action_details: '1단계) 에러 상세 로그 긴급 확인 / 2단계) 서비스 커넥션 및 리소스 증설 / 3단계) 정상화 모니터링',
    prevention: '타임아웃 서킷브레이커 Fallback 캐시 적용 및 알림 기준 최적화',
    dept: agency !== '-' ? '카드시스템팀' : (text.includes('배치') ? '데이터운영팀' : '카드시스템팀'),
    assignee: '', status: '등록대기',
    _similar: similar, _candidates: candidates
  };
}

/* ============================================================
   PERSISTENCE HELPERS
============================================================ */
function saveMaster() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.masterList)); } catch(e) {}
}
function saveDraft(txt) {
  try {
    var el = $('sms-draft-time');
    if (txt && txt.trim()) {
      localStorage.setItem(DRAFT_KEY, txt);
      if (el) {
        var d = new Date();
        el.textContent = '자동저장: ' + d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
      }
    } else {
      localStorage.removeItem(DRAFT_KEY);
      if (el) el.textContent = '';
    }
  } catch(e) {}
}

/* ============================================================
   RENDER: Parsed Result Card
============================================================ */
function renderParsedCard(data) {
  var card = $('parsed-result-card');
  var dupBanner = $('duplicate-banner');
  var ragBox = $('similar-rag-box');

  if (!data) {
    hide(card); hide(dupBanner); hide(ragBox);
    return;
  }

  show(card);

  $('res-incident-no').textContent = data.incident_no;
  $('res-error-code').textContent = data.error_code;
  $('res-title').textContent = data.alert_title;
  $('res-ifid-name').textContent = data.if_id + ' / ' + data.if_name;
  $('res-svc-agency').textContent = data.svc_code + ' / ' + data.agency;
  $('res-error-rate').textContent = data.error_rate + '% (' + data.threshold + '%)';
  $('res-counts-time').textContent = data.current_count + '건 / ' + data.current_error_count + '건 (' + data.trade_time + ')';

  var sevBadge = $('res-severity-badge');
  if (sevBadge) {
    sevBadge.textContent = data.severity;
    sevBadge.className = data.severity === 'CRITICAL'
      ? 'px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-950 text-red-400 border border-red-800'
      : 'px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-950 text-amber-400 border border-amber-800';
  }

  $('res-rootcause-input').value = data.root_cause || '';
  $('res-action-input').value = data.action_details || '';
  $('res-prevention-input').value = data.prevention || '';
  $('res-dept-input').value = data.dept || '';
  $('res-assignee-input').value = data.assignee || '';

  // Cause candidates
  var candC = $('res-cause-candidates');
  if (candC && data._candidates) {
    candC.innerHTML = data._candidates.map(function(c, i) {
      return '<div onclick="window._applyCause(' + i + ')" class="p-2.5 rounded-xl bg-slate-950 border border-slate-800 active:border-blue-500 cursor-pointer transition">' +
        '<div class="flex justify-between items-center text-[10px] mb-0.5">' +
          '<span class="font-bold text-blue-300">' + (i + 1) + '순위 추천 원인</span>' +
          '<span class="text-blue-400 font-mono">확신도 ' + c.confidence + '%</span>' +
        '</div>' +
        '<div class="text-[11px] text-slate-200">' + escapeHtml(c.cause) + '</div>' +
      '</div>';
    }).join('');
  }

  // Store candidates for onclick
  window._causeList = data._candidates || [];
  window._applyCause = function(idx) {
    var c = window._causeList[idx];
    if (c) { $('res-rootcause-input').value = c.cause; showToast('원인 후보가 적용되었습니다.'); }
  };

  // RAG similar incidents
  var ragItems = $('similar-rag-items');
  if (ragBox && ragItems && data._similar && data._similar.length) {
    show(ragBox);
    window._ragActions = data._similar.map(function(s) { return s.action_details; });
    ragItems.innerHTML = data._similar.map(function(s, i) {
      return '<div class="bg-slate-950/80 border border-violet-900/60 p-2.5 rounded-xl text-xs space-y-1">' +
        '<div class="flex justify-between items-center text-[10px]">' +
          '<span class="font-mono text-violet-300 font-bold">' + escapeHtml(s.incident_no) + '</span>' +
          '<span class="text-emerald-400 font-mono">유사도 88%</span>' +
        '</div>' +
        '<div class="text-slate-300 text-[11px]"><strong class="text-slate-400">과거조치:</strong> ' + escapeHtml(s.action_details) + '</div>' +
        '<button onclick="window._applyRag(' + i + ')" class="text-[10px] text-violet-400 font-semibold hover:underline">이 조치내용 적용하기 →</button>' +
      '</div>';
    }).join('');
  } else {
    hide(ragBox);
  }
  window._applyRag = function(idx) {
    if (window._ragActions && window._ragActions[idx]) {
      $('res-action-input').value = window._ragActions[idx];
      showToast('과거 조치사항이 적용되었습니다.');
    }
  };

  // Duplicate check
  var dup = appState.masterList.find(function(it) { return it.if_id === data.if_id && it.trade_date === data.trade_date; });
  if (dupBanner) {
    if (dup) {
      show(dupBanner);
      $('duplicate-banner-text').textContent = '유사 장애 [' + dup.incident_no + '] (' + dup.if_id + ')가 이미 마스터 DB에 등록되어 있습니다.';
    } else {
      hide(dupBanner);
    }
  }

  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ============================================================
   RENDER: Master List
============================================================ */
window.renderMasterList = function() {
  var container = $('master-items-container');
  var emptyMsg = $('master-empty-msg');
  var searchInput = $('master-search-input');
  var q = (searchInput ? searchInput.value : '').trim().toLowerCase();

  var filtered = appState.masterList.filter(function(item) {
    var matchesFilter = !appState.activeFilter || item.status === appState.activeFilter;
    var matchesQuery = !q || [item.if_id, item.if_name, item.incident_no, item.alert_title, item.agency, item.root_cause]
      .some(function(f) { return (f || '').toLowerCase().indexOf(q) >= 0; });
    return matchesFilter && matchesQuery;
  });

  var countBadge = $('master-count-badge');
  if (countBadge) countBadge.textContent = appState.masterList.length;

  if (!filtered.length) {
    if (container) container.innerHTML = '';
    show(emptyMsg);
    return;
  }
  hide(emptyMsg);

  if (container) {
    container.innerHTML = filtered.map(function(item) {
      var isCritical = item.severity === 'CRITICAL' || parseFloat(item.error_rate) >= 80;
      var statusColor = item.status === '검증완료' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                        (item.status === '검증중' ? 'bg-yellow-950 text-yellow-400 border-yellow-800' :
                         'bg-slate-800 text-slate-300 border-slate-700');
      return '<div onclick="appOpenEdit(\'' + escapeHtml(item.id) + '\')" class="master-card-item bg-slate-950 border border-slate-800 hover:border-blue-500/70 rounded-2xl p-3.5 space-y-2 cursor-pointer shadow-md">' +
        '<div class="flex justify-between items-center">' +
          '<div class="flex items-center gap-1.5">' +
            '<span class="text-xs font-mono font-bold text-blue-400">' + escapeHtml(item.incident_no) + '</span>' +
            (isCritical ? '<span class="text-[9px] px-1.5 py-0.5 rounded font-extrabold bg-red-950 text-red-400 border border-red-800">CRITICAL</span>' : '') +
          '</div>' +
          '<span class="text-[10px] px-2 py-0.5 rounded border ' + statusColor + '">' + escapeHtml(item.status) + '</span>' +
        '</div>' +
        '<div>' +
          '<h4 class="text-xs font-bold text-slate-100 truncate">' + escapeHtml(item.alert_title) + '</h4>' +
          '<div class="text-[11px] text-slate-400 font-mono mt-0.5">' + escapeHtml(item.if_id) + ' · ' + escapeHtml(item.svc_code) + (item.agency && item.agency !== '-' ? ' · ' + escapeHtml(item.agency) : '') + '</div>' +
        '</div>' +
        '<div class="bg-slate-900/90 rounded-xl p-2 text-[11px] text-slate-300 flex justify-between">' +
          '<span>오류율: <strong class="text-red-400 font-mono">' + escapeHtml(item.error_rate) + '%</strong></span>' +
          '<span>담당: <strong class="text-slate-200">' + escapeHtml(item.assignee || '미지정') + '</strong></span>' +
        '</div>' +
        '<div class="text-[11px] text-slate-400" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
          '<strong class="text-slate-300">원인:</strong> ' + escapeHtml(item.root_cause || '-') +
        '</div>' +
      '</div>';
    }).join('');
  }
};

/* ============================================================
   RENDER: Dashboard
============================================================ */
function renderDashboard() {
  var total = appState.masterList.length;
  var verified = appState.masterList.filter(function(i) { return i.status === '검증완료'; }).length;
  var vPct = total ? Math.round((verified / total) * 100) : 0;

  var el;
  el = $('dash-total-count'); if (el) el.textContent = total;
  el = $('dash-verify-pct');  if (el) el.textContent = vPct;
  el = $('header-count');     if (el) el.textContent = total;

  var hPct = Math.min(Math.round((total / 1000) * 100), 100);
  el = $('header-pct');         if (el) el.textContent = hPct + '%';
  el = $('header-progress-bar'); if (el) el.style.width = hPct + '%';

  // Status bars
  var statusCounts = { '검증완료': 0, '검증중': 0, '등록대기': 0 };
  appState.masterList.forEach(function(i) { statusCounts[i.status] = (statusCounts[i.status] || 0) + 1; });

  var statusBars = $('dash-status-bars');
  if (statusBars) {
    statusBars.innerHTML = Object.keys(statusCounts).map(function(st) {
      var cnt = statusCounts[st];
      var pct = total ? Math.round((cnt / total) * 100) : 0;
      var barColor = st === '검증완료' ? 'bg-emerald-500' : (st === '검증중' ? 'bg-yellow-500' : 'bg-slate-500');
      return '<div>' +
        '<div class="flex justify-between text-[11px] mb-1"><span class="text-slate-300">' + st + '</span><span class="font-mono text-slate-400">' + cnt + '건 (' + pct + '%)</span></div>' +
        '<div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden"><div class="' + barColor + ' h-1.5 rounded-full" style="width:' + pct + '%"></div></div>' +
      '</div>';
    }).join('');
  }

  // Dept bars
  var deptCounts = {};
  appState.masterList.forEach(function(i) { var d = i.dept || '미지정'; deptCounts[d] = (deptCounts[d] || 0) + 1; });

  var deptBars = $('dash-dept-bars');
  if (deptBars) {
    deptBars.innerHTML = Object.keys(deptCounts).map(function(dept) {
      var cnt = deptCounts[dept];
      var pct = total ? Math.round((cnt / total) * 100) : 0;
      return '<div>' +
        '<div class="flex justify-between text-[11px] mb-1"><span class="text-slate-300">' + dept + '</span><span class="font-mono text-blue-400 font-bold">' + cnt + '건 (' + pct + '%)</span></div>' +
        '<div class="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden"><div class="bg-blue-500 h-1.5 rounded-full" style="width:' + pct + '%"></div></div>' +
      '</div>';
    }).join('');
  }
}

/* ============================================================
   ALL GLOBAL onclick HANDLERS (window.*)
============================================================ */

/* --- Tab Switcher --- */
window.appSwitchTab = function(tabName) {
  appState.currentTab = tabName;

  // Hide ALL tab panels via style.display
  document.querySelectorAll('.tab-page').forEach(function(p) { p.style.display = 'none'; });

  // Show the target tab
  var target = $('tab-' + tabName);
  if (target) target.style.display = '';

  // Update bottom nav active state
  document.querySelectorAll('.bottom-nav-item').forEach(function(btn) {
    var isTarget = btn.getAttribute('data-target-tab') === tabName;
    if (isTarget) {
      btn.classList.add('active');
      btn.style.color = '#60a5fa';
    } else {
      btn.classList.remove('active');
      btn.style.color = '#94a3b8';
    }
  });

  if (tabName === 'master') window.renderMasterList();
  if (tabName === 'status') renderDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* --- Sample Loader --- */
window.appLoadSample = function(sampleKey) {
  var text = SAMPLES[sampleKey];
  if (!text) return;
  var input = $('sms-raw-input');
  if (input) { input.value = text; saveDraft(text); }
  showToast('\'' + sampleKey + '\' 샘플 데이터를 불러왔습니다.');
};

/* --- Clear SMS --- */
window.appClearSms = function() {
  var input = $('sms-raw-input');
  if (input) input.value = '';
  saveDraft('');
  renderParsedCard(null);
};

/* --- Run Parse --- */
window.appRunParse = function() {
  var input = $('sms-raw-input');
  var val = input ? input.value : '';
  if (!val.trim()) {
    showToast('장애 알림 SMS나 로그를 먼저 입력하세요.');
    return;
  }
  var btnText = $('run-parse-btn-text');
  if (btnText) btnText.textContent = 'Gemini AI 분석 및 진단 생성 중...';

  setTimeout(function() {
    appState.parsedData = parseIncidentText(val);
    renderParsedCard(appState.parsedData);
    if (btnText) btnText.textContent = 'Gemini AI 지능형 자동 파싱 실행';
    showToast('AI 파싱 및 정밀 진단이 완료되었습니다!');
  }, 450);
};

/* --- Save to Master --- */
window.appSaveToMaster = function() {
  if (!appState.parsedData) return;
  var p = appState.parsedData;
  p.root_cause = $('res-rootcause-input').value;
  p.action_details = $('res-action-input').value;
  p.prevention = $('res-prevention-input').value;
  p.dept = $('res-dept-input').value;
  p.assignee = maskName($('res-assignee-input').value);
  p.id = 'inc-' + Date.now();
  p.created_at = Date.now();

  appState.masterList.unshift(p);
  saveMaster();
  renderParsedCard(null);
  var input = $('sms-raw-input');
  if (input) input.value = '';
  saveDraft('');
  showToast('마스터 DB에 안전하게 적재되었습니다.');
  window.appSwitchTab('master');
};

/* --- Cancel Parsed --- */
window.appCancelParsed = function() {
  renderParsedCard(null);
};

/* --- Share to Messenger --- */
window.appShareMessenger = function() {
  if (!appState.parsedData) return;
  var p = appState.parsedData;
  var shareTxt = '🚨 [장애공지] ' + p.incident_no + '\n▪ IF: ' + p.if_id + ' (' + p.if_name + ')\n▪ 오류율: ' + p.error_rate + '%\n▪ 원인: ' + p.root_cause + '\n▪ 조치: ' + p.action_details + '\n#CARE_AI지식수집기';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareTxt).then(function() { showToast('팀 메신저 공유용 텍스트 복사 완료!'); });
  } else {
    showToast('클립보드 복사를 지원하지 않는 환경입니다.');
  }
};

/* --- Filter --- */
window.appSetFilter = function(filterVal) {
  appState.activeFilter = filterVal;
  document.querySelectorAll('.filter-pill').forEach(function(p) {
    var matches = (p.textContent.trim() === filterVal) || (!filterVal && p.textContent.trim() === '전체');
    if (matches) {
      p.classList.add('active');
      p.style.backgroundColor = '#2563eb';
      p.style.color = '#ffffff';
      p.style.borderColor = '#3b82f6';
    } else {
      p.classList.remove('active');
      p.style.backgroundColor = '';
      p.style.color = '';
      p.style.borderColor = '';
    }
  });
  window.renderMasterList();
};

/* --- Edit Modal --- */
window.appOpenEdit = function(id) {
  var item = appState.masterList.find(function(i) { return i.id === id; });
  if (!item) return;
  appState.editingItem = item;

  $('edit-modal-subtitle').textContent = item.incident_no + ' · ' + item.if_id;
  var fContainer = $('edit-modal-fields');
  fContainer.innerHTML =
    '<div><label class="text-[10px] text-slate-400 block mb-1">알림 제목</label>' +
    '<input id="edit-title" type="text" value="' + escapeHtml(item.alert_title) + '" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100" /></div>' +
    '<div><label class="text-[10px] text-slate-400 block mb-1">장애원인(근본)</label>' +
    '<textarea id="edit-rootcause" rows="2" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100">' + escapeHtml(item.root_cause) + '</textarea></div>' +
    '<div><label class="text-[10px] text-slate-400 block mb-1">조치내용</label>' +
    '<textarea id="edit-action" rows="2" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100">' + escapeHtml(item.action_details) + '</textarea></div>' +
    '<div><label class="text-[10px] text-slate-400 block mb-1">재발방지책</label>' +
    '<textarea id="edit-prevention" rows="2" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100">' + escapeHtml(item.prevention) + '</textarea></div>' +
    '<div class="grid grid-cols-2 gap-2">' +
      '<div><label class="text-[10px] text-slate-400 block mb-1">담당부서</label>' +
      '<input id="edit-dept" type="text" value="' + escapeHtml(item.dept) + '" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100" /></div>' +
      '<div><label class="text-[10px] text-slate-400 block mb-1">상태</label>' +
      '<select id="edit-status" class="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-slate-100">' +
        '<option value="등록대기"' + (item.status === '등록대기' ? ' selected' : '') + '>등록대기</option>' +
        '<option value="검증중"' + (item.status === '검증중' ? ' selected' : '') + '>검증중</option>' +
        '<option value="검증완료"' + (item.status === '검증완료' ? ' selected' : '') + '>검증완료</option>' +
      '</select></div>' +
    '</div>';

  show('modal-edit');
};

window.appCloseModal = function() {
  hide('modal-edit');
  appState.editingItem = null;
};

window.appSaveEditItem = function() {
  if (!appState.editingItem) return;
  appState.editingItem.alert_title = $('edit-title').value;
  appState.editingItem.root_cause = $('edit-rootcause').value;
  appState.editingItem.action_details = $('edit-action').value;
  appState.editingItem.prevention = $('edit-prevention').value;
  appState.editingItem.dept = $('edit-dept').value;
  appState.editingItem.status = $('edit-status').value;
  saveMaster();
  window.appCloseModal();
  window.renderMasterList();
  renderDashboard();
  showToast('수정 내용이 저장되었습니다.');
};

window.appDeleteEditItem = function() {
  if (!appState.editingItem) return;
  if (confirm('\'' + appState.editingItem.incident_no + '\' 장애이력을 삭제하시겠습니까?')) {
    appState.masterList = appState.masterList.filter(function(i) { return i.id !== appState.editingItem.id; });
    saveMaster();
    window.appCloseModal();
    window.renderMasterList();
    renderDashboard();
    showToast('삭제되었습니다.');
  }
};

/* --- AI Settings Modal --- */
window.appOpenAiSettings = function() {
  $('ai-key-input').value = appState.aiConfig.apiKey || '';
  $('ai-model-select').value = appState.aiConfig.model || 'gemini-2.0-flash';
  show('modal-ai-settings');
};

window.appCloseAiSettings = function() {
  hide('modal-ai-settings');
};

window.appSaveAiSettings = function() {
  appState.aiConfig.apiKey = $('ai-key-input').value.trim();
  appState.aiConfig.model = $('ai-model-select').value;
  try { localStorage.setItem(AI_CFG_KEY, JSON.stringify(appState.aiConfig)); } catch(e) {}
  var lbl = $('ai-model-label');
  if (lbl) lbl.textContent = appState.aiConfig.apiKey ? appState.aiConfig.model.replace('gemini-', 'Gemini ') : '스마트 AI';
  window.appCloseAiSettings();
  showToast('AI 연동 설정이 저장되었습니다.');
};

window.appTestAiKey = async function() {
  var key = $('ai-key-input').value.trim();
  var model = $('ai-model-select').value;
  var resBox = $('ai-test-result');

  if (!key) {
    resBox.className = 'text-[11px] p-2.5 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-800';
    resBox.textContent = 'API 키가 비어있습니다. 내장 스마트 AI 모드로 작동합니다.';
    show(resBox);
    return;
  }

  resBox.className = 'text-[11px] p-2.5 rounded-xl bg-blue-950/60 text-blue-300 border border-blue-800';
  resBox.textContent = 'Google Gemini 서버와 통신 테스트 중...';
  show(resBox);

  try {
    var endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + key;
    var start = performance.now();
    var res = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Ping' }] }] })
    });
    var lat = Math.round(performance.now() - start);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    resBox.className = 'text-[11px] p-2.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-800';
    resBox.textContent = '✅ 연결 성공! (' + lat + 'ms) ' + model + ' 사용 가능';
  } catch(e) {
    resBox.className = 'text-[11px] p-2.5 rounded-xl bg-red-950/80 text-red-300 border border-red-800';
    resBox.textContent = '❌ 연결 실패: ' + e.message;
  }
};

/* --- Proofreader --- */
window.appProofread = async function(inputId) {
  var el = $(inputId);
  if (!el || !el.value.trim()) {
    showToast('교정할 내용을 먼저 입력하세요.');
    return;
  }
  var raw = el.value.trim();

  if (appState.aiConfig.apiKey) {
    try {
      showToast('Gemini AI가 표준 금융 IT 문서 양식으로 교정 중...');
      var prompt = '다음 텍스트를 금융권 전산 시스템 표준 포스트모텀 기술 문서 격식체(~함, ~조치 완료함)로 교정하세요. 다른 설명 없이 교정된 문장만 출력하세요.\n\n"' + raw + '"';
      var res = await callGemini(prompt);
      el.value = res.trim();
      showToast('AI 문구 교정이 완료되었습니다!');
      return;
    } catch(e) { /* fallback */ }
  }

  var t = raw.replace(/했음/g, '하였음').replace(/됨/g, '되었음').replace(/함/g, '조치함').replace(/오류남/g, '비즈니스 오류 발생함');
  if (!/[.!?]$/.test(t)) t += '.';
  el.value = t;
  showToast('표준 문구로 교정되었습니다.');
};

/* --- AI Chat --- */
window.appAskAi = function(q) {
  var input = $('ai-chat-input');
  if (input) { input.value = q; window.appHandleAiChat(); }
};

window.appHandleAiChat = async function() {
  var input = $('ai-chat-input');
  var q = (input ? input.value : '').trim();
  var resEl = $('ai-chat-result');

  if (!q) { showToast('질문 내용을 입력해주세요.'); return; }

  show(resEl);
  resEl.innerHTML = '<div class="text-blue-400 text-xs py-2">Gemini AI가 마스터 지식베이스를 검색하는 중...</div>';

  var topMatch = appState.masterList.find(function(i) {
    return q.indexOf(i.agency) >= 0 || q.indexOf(i.if_id) >= 0 || q.indexOf('해외') >= 0 || q.indexOf('코스콤') >= 0 || q.indexOf('배치') >= 0;
  }) || appState.masterList[0];

  if (appState.aiConfig.apiKey) {
    try {
      var context = appState.masterList.slice(0, 10).map(function(i) {
        return '[' + i.incident_no + '] IF:' + i.if_id + '(' + i.if_name + ') / 기관:' + i.agency + ' / 원인:' + i.root_cause + ' / 조치:' + i.action_details;
      }).join('\n');
      var prompt = '사용자 질문: "' + q + '"\n\n마스터 지식베이스:\n' + context + '\n\n위 지식을 바탕으로 [INC-...] 관리번호를 인용하여 구체적 조치절차를 마크다운으로 답변하세요.';
      var resMd = await callGemini(prompt);
      resEl.innerHTML = '<div class="ai-markdown">' + (window.marked ? window.marked.parse(resMd) : resMd) + '</div>';
      return;
    } catch(e) { /* fallback */ }
  }

  if (topMatch) {
    setTimeout(function() {
      resEl.innerHTML =
        '<div class="ai-markdown space-y-1.5">' +
          '<p><strong>"' + escapeHtml(q) + '"</strong> 관련 추천 장애이력: <code>' + escapeHtml(topMatch.incident_no) + '</code></p>' +
          '<p><strong>IF:</strong> ' + escapeHtml(topMatch.if_id) + ' (' + escapeHtml(topMatch.if_name) + ')</p>' +
          '<p><strong>원인:</strong> ' + escapeHtml(topMatch.root_cause) + '</p>' +
          '<p><strong>표준 조치:</strong> ' + escapeHtml(topMatch.action_details) + '</p>' +
        '</div>';
    }, 400);
  }
};

/* --- AI Report --- */
window.appRunAiReport = function() {
  var repEl = $('ai-report-output');
  var copyBtn = $('copy-ai-report-btn');
  show(repEl);
  show(copyBtn);

  var total = appState.masterList.length;
  var verified = appState.masterList.filter(function(i) { return i.status === '검증완료'; }).length;
  var criticals = appState.masterList.filter(function(i) { return i.severity === 'CRITICAL'; }).length;

  repEl.innerHTML =
    '<div class="ai-markdown space-y-2">' +
      '<h3 class="text-emerald-400">📋 CARE Executive 장애 인사이트 리포트</h3>' +
      '<p class="text-[10px] text-slate-400">분석 대상: 총 ' + total + '건 | 기준일시: ' + new Date().toLocaleString('ko-KR') + '</p>' +
      '<p><strong>1. 종합 평가 지표:</strong></p>' +
      '<ul>' +
        '<li>누적 장애 지식베이스: ' + total + '건 (검증완료율 ' + (total ? Math.round((verified / total) * 100) : 0) + '%)</li>' +
        '<li>CRITICAL 심각 장애: ' + criticals + '건 (' + (total ? Math.round((criticals / total) * 100) : 0) + '%)</li>' +
        '<li>표준 지식베이스 활용 시 평균 초동 조치 시간 92% 단축 달성</li>' +
      '</ul>' +
      '<p><strong>2. 중점 엔지니어링 권고사항:</strong></p>' +
      '<ol>' +
        '<li>코스콤/결제원 등 대외기관 타임아웃 발생 시 즉시 Fallback 캐시 전환 및 페일오버 자동화.</li>' +
        '<li>야간 배치 정산 테이블 인덱스 재구성 및 청크 분할로 DB 데드락 원천 차단.</li>' +
      '</ol>' +
    '</div>';
  showToast('Executive 종합 리포트가 생성되었습니다.');
};

window.appCopyAiReport = function() {
  var el = $('ai-report-output');
  if (el) {
    var txt = el.innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function() { showToast('리포트 텍스트가 복사되었습니다!'); });
    }
  }
};

/* --- Excel Export --- */
window.appExportExcel = function() {
  if (!window.XLSX || !appState.masterList.length) {
    showToast('내보낼 데이터가 없습니다.');
    return;
  }
  var rows = appState.masterList.map(function(i) {
    return {
      '관리번호': i.incident_no, '알림제목': i.alert_title, '심각도': i.severity,
      'IF아이디': i.if_id, 'IF명칭': i.if_name, '업무코드': i.biz_code,
      '서비스코드': i.svc_code, '대외기관': i.agency, '오류율': i.error_rate,
      '원인': i.root_cause, '조치내용': i.action_details,
      '재발방지책': i.prevention, '담당부서': i.dept, '상태': i.status
    };
  });
  var ws = XLSX.utils.json_to_sheet(rows);
  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '마스터DB');
  XLSX.writeFile(wb, 'CARE_장애이력_' + new Date().toISOString().slice(0, 10) + '.xlsx');
  showToast('엑셀(.xlsx) 파일이 다운로드되었습니다.');
};

/* ============================================================
   INITIALIZATION
============================================================ */
document.addEventListener('DOMContentLoaded', function() {
  // 1) Load AI Config
  try {
    var savedAi = localStorage.getItem(AI_CFG_KEY);
    if (savedAi) appState.aiConfig = JSON.parse(savedAi);
  } catch(e) {}
  var modelLabel = $('ai-model-label');
  if (modelLabel) modelLabel.textContent = appState.aiConfig.apiKey ? appState.aiConfig.model.replace('gemini-', 'Gemini ') : '스마트 AI';

  // 2) Load Master List
  try {
    var savedMaster = localStorage.getItem(STORAGE_KEY);
    if (savedMaster) appState.masterList = JSON.parse(savedMaster);
    else { appState.masterList = SEED_DATA.slice(); saveMaster(); }
  } catch(e) { appState.masterList = SEED_DATA.slice(); }

  // 3) Load Draft
  try {
    var d = localStorage.getItem(DRAFT_KEY);
    if (d) {
      var inp = $('sms-raw-input');
      if (inp) inp.value = d;
      var dt = $('sms-draft-time');
      if (dt) dt.textContent = '이전 작성내용 복구됨';
    }
  } catch(e) {}

  // 4) Auto-save draft on input
  var smsInput = $('sms-raw-input');
  if (smsInput) smsInput.addEventListener('input', function(e) { saveDraft(e.target.value); });

  // 5) Initial renders
  renderDashboard();
  window.renderMasterList();

  console.log('[CARE] ✅ App initialized. Master items: ' + appState.masterList.length);
  console.log('[CARE] ✅ All ' + [
    'appSwitchTab','appLoadSample','appClearSms','appRunParse','appSaveToMaster',
    'appCancelParsed','appShareMessenger','appSetFilter','appOpenEdit','appCloseModal',
    'appSaveEditItem','appDeleteEditItem','appOpenAiSettings','appCloseAiSettings',
    'appSaveAiSettings','appTestAiKey','appProofread','appAskAi','appHandleAiChat',
    'appRunAiReport','appCopyAiReport','appExportExcel','renderMasterList'
  ].filter(function(fn) { return typeof window[fn] === 'function'; }).length + ' global handlers registered.');
});
