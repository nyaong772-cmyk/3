/* =====================================================================
 *  📱 스토리 내용 데이터 파일 (data.ts)
 * ---------------------------------------------------------------------
 *  이 파일 하나만 고치면 폰 안의 "내용"이 전부 바뀝니다.
 *  코드를 몰라도 괜찮아요. 아래 규칙만 지켜주세요.
 *
 *  ✅ 글자는 항상 따옴표 "..." 안에 씁니다.        예) name: "윤동희",
 *  ✅ 각 줄 끝의 쉼표(,)는 지우지 마세요.
 *  ✅ 항목을 추가할 땐 { ... }, 덩어리를 통째로 복사해서 붙여넣으세요.
 *  ✅ 숫자(나이, 밀리초 등)는 따옴표 없이 씁니다.    예) age: 24,
 *
 *  🖼  사진 바꾸는 법
 *     1. 원하는 사진을 /public/photos 폴더에 넣습니다. (예: my-photo.jpg)
 *     2. 아래 경로를 "/photos/my-photo.jpg" 처럼 바꿉니다.
 *        ("/public" 은 빼고 "/photos/..." 로 시작해야 해요!)
 * ===================================================================== */

/* ---------------------------------------------------------------------
 * 1. 폰 기본 설정 (시간, 날짜, 배터리, 배경화면)
 * ------------------------------------------------------------------- */
export const phone = {
  // 폰에 표시될 시간. "02:14" 처럼 쓰면 고정, null 로 쓰면 실제 현재 시간이 나와요.
  time: "2:14" as string | null,

  // 잠금화면/위젯에 표시될 날짜 (time 을 고정했을 때 사용)
  date: "10월 29일 월요일",
  dayNumber: 20, // 캘린더 아이콘/위젯에 보이는 "날짜 숫자"
  weekday: "화요일", // 캘린더 위젯 상단 빨간 글씨

  batteryPercent: 91, // 배터리 잔량 (0~100). 20 이하면 빨간색이 돼요.
  carrier: "SKT",

  // 🖼 잠금화면 배경사진 — /public/photos 폴더에 사진을 넣고 경로만 바꾸세요.
  lockWallpaper: "/photos/ssbwallpaper.jpg",
  // 🖼 홈화면 배경사진
  homeWallpaper: "/photos/ssbwallpaper.jpg"
}

/* ---------------------------------------------------------------------
 * 2. 등장인물
 * ------------------------------------------------------------------- */
export const people = {
  // 폰 주인
  owner: {
    name: "손성빈",
    age: 25,
    gender: "남성",
    photo: "/photos/profile-sungbin.png",
    instagramId: "sungbin.son",
  },
  // 메시지 상대
  donghee: {
    name: "윤동희",
    age: 24,
    photo: "",
    phoneNumber: "010-4821-0937",
  },
}

/* ---------------------------------------------------------------------
 * 3. 잠금화면 알림
 *    - 위에서부터 순서대로 하나씩 떠오릅니다.
 *    - delay: 이전 알림 후 몇 밀리초 뒤에 뜰지 (1000 = 1초)
 *    - app 종류: "messages" | "phone" | "instagram" | "kakao" | "calendar"
 * ------------------------------------------------------------------- */
export const lockNotifications = [
  {
    app: "phone",
    appName: "전화",
    title: "부재중 전화",
    body: "우리 동희 (3)",
    time: "1시간 전",
    delay: 1200,
  },
  {
    app: "instagram",
    appName: "Instagram",
    title: "",
    body: "dh_yoon91님이 회원님의 스토리를 좋아합니다.",
    time: "32분 전",
    delay: 1600,
  },
  {
    app: "messages",
    appName: "메시지",
    title: "우리 동희",
    body: "형 자요?",
    time: "16분 전",
    delay: 1600,
  },
]

/* ---------------------------------------------------------------------
 * 4. 메시지(iMessage) 대화
 * ------------------------------------------------------------------- */

// 4-1. 윤동희와 "이미 있던" 대화 기록 (페이지를 열면 처음부터 보이는 메시지)
//   from: "them" = 상대방(회색 말풍선) / "me" = 손성빈(파란 말풍선)
//   divider: 그 메시지 위에 가운데 회색 시간 표시를 넣고 싶을 때 씀
export const dongheeHistory = [
  { from: "them", text: "형 오늘 고생했어요", divider: "그저께 오후 6:12" },
  { from: "me", text: "너가 더" },
  { from: "them", text: "내일 뭐 해요?"},
  { from: "me", text: "몰라 그냥 집에 있지 않을까?"},
  { from: "me", text: "왜?"},
  { from: "them", text: "아니요 그냥 궁금해서요"},
  { from: "them", text: "그래~"}, 
  { from: "them", text: "형 따로 일정 없으면 내일 만날래요?", divider: "그저께 오후 6:37"},
  { from: "them", text: "근데 형 아까 그거 진짜 아니에요", divider: "어제 오후 11:40" },
  { from: "them", text: "제 말 좀 들어봐요" },
  { from: "me", text: "그냥 나중에 얘기하자" },
  { from: "them", text: "형 자요?", divider: "오늘 오전 1:58" },
]

// 마지막 "내가 보낸" 메시지 아래에 붙는 읽음 표시
export const dongheeReadReceipt = "읽음 어제 오후 11:52"

// 4-2. ⭐ 실시간으로 "도착하는" 메시지 (가장 중요한 연출)
//   - 위에서부터 한 줄씩 순서대로 도착합니다.
//   - typingMs: 도착 직전 "..." (입력 중) 표시가 보이는 시간 (밀리초)
//   - waitMs  : 이전 메시지 도착 후, 다음 "..." 가 뜨기까지 쉬는 시간
//     (typingMs + waitMs ≈ 2~3초 간격)
export const dongheeLiveMessages = [
  { text: "형", typingMs: 1400, waitMs: 1200 },
  { text: "성빈이형", typingMs: 1500, waitMs: 1000 },
  { text: "진짜 오해예요 통화 좀 해요", typingMs: 2000, waitMs: 1000 },
  { text: "제가 다 설명할게요", typingMs: 1800, waitMs: 1000 },
]

// 실시간 메시지가 언제 시작될지
//   "chatOpen" = 윤동희 대화방을 처음 열었을 때 시작 (추천: 눈앞에서 "..." 연출을 볼 수 있음)
//   "home"     = 잠금 해제 후 홈 화면에 들어오자마자 시작 (위쪽 배너 알림으로 도착)
export const liveMessagesStartWhen: "chatOpen" | "home" = "chatOpen"

// 실시간 메시지 도착 시 대화 목록에 표시될 시간
export const liveMessageTime = "오전 2:14"

// 4-3. 대화 목록에 보이는 다른 대화방들 (샘플)
//   unread: true 면 이름 옆에 파란 점이 표시돼요.
export const otherThreads = [
  {
    id: "mom",
    name: "엄마",
    photo: "",
    time: "어제",
    unread: false,
    messages: [
      { from: "them", text: "성빈아 밥은 먹고 다녀?", divider: "어제 오후 7:03" },
      { from: "me", text: "응 먹었어" },
      { from: "them", text: "주말에 집에 한번 와" },
      { from: "me", text: "넹" },
    ],
  },
  {
    id: "jinwook",
    name: "김진욱",
    photo: "",
    time: "어제",
    unread: false,
    messages: [
      { from: "them", text: "내일 수업 대리출석 가능?", divider: "어제 오후 3:20" },
      { from: "me", text: "ㄴㄴ 나도 못감" },
      { from: "them", text: "ㅇㅋ" },
    ],
  },
  {
    id: "jeongmin",
    name: "박정민",
    photo: "",
    time: "어제",
    unread: false,
    messages: [
      {from: "them", text: "오늘 감사했습니다 선배님", divider: "10월 2일 (금) 오후 6:21" },
      {from:"me", text: "ㅎㅎ너도 담에 또 보자"},
      {from: "them", text: "제가 데리러 갈까요?", divider: "10월 4일 (일) 오전 3:34" },
      {from: "me", text:"괜찮아 동희 온대"},
      {from: "them", text: "넵"},
      {from: "them", text: "형 저 엘베 앞에서 기다릴게요", divider: "그저께 오후 2:47" }
      {from: "them", text: "저 엘베 앞에서 기다리는 중이에요", divider: "어제 오후 2:43" }
    ]

    id: "delivery",
    name: "#1588-1255",
    photo: "",
    time: "10월 18일",
    unread: false,
    messages: [
      {
        from: "them",
        text: "[CJ대한통운] 고객님의 상품이 배송완료 되었습니다.",
        divider: "10월 18일 (일) 오후 2:41",
      },
    ],
  },
]

/* ---------------------------------------------------------------------
 * 5. 전화 앱 — 최근 통화 기록 (샘플)
 *   type: "missed" (부재중, 빨간 글씨) | "incoming" (수신) | "outgoing" (발신)
 *   count: 연속 통화 횟수 (괄호 숫자). 1 이면 표시 안 됨
 * ------------------------------------------------------------------- */
export const callHistory = [
  { name: "윤동희", type: "missed", label: "휴대전화", time: "오전 1:12", count: 3 },
  { name: "윤동희", type: "outgoing", label: "휴대전화", time: "어제", count: 1 },
  { name: "엄마", type: "incoming", label: "휴대전화", time: "어제", count: 1 },
  { name: "김지우", type: "missed", label: "휴대전화", time: "일요일", count: 1 },
  { name: "010-2231-8890", type: "incoming", label: "대한민국", time: "토요일", count: 2 },
]

/* ---------------------------------------------------------------------
 * 6. 메모 앱 (샘플)
 *   body 안에서 줄을 바꾸려면 \n 을 쓰세요.
 * ------------------------------------------------------------------- */
export const notes = [
  {
    title: "할 일",
    date: "오전 1:40",
    body: "할 일\n- 윤동희 후드집업 돌려주기\n- 과제 제출 (금)\n- 엄마 생신 선물",
  },
  {
    title: "그날 있었던 일",
    date: "어제",
    body: "그날 있었던 일\n\n(2단계에서 내용을 채워주세요)",
  },
  {
    title: "비밀번호 힌트",
    date: "10월 12일",
    body: "비밀번호 힌트\n\n첫 만남 날짜",
  },
]

/* ---------------------------------------------------------------------
 * 7. 캘린더 앱 (샘플)
 *   date: "YYYY-MM-DD" 형식 / color: 일정 색상 (red, blue, green, orange, purple)
 * ------------------------------------------------------------------- */
export const calendar = {
  year: 2026,
  month: 10, // 처음 보여줄 달 (1~12)
  today: 20, // 오늘 날짜 (빨간 동그라미)
  events: [
    { date: "2026-10-20", time: "오후 7:00", title: "동희랑 영화관", color: "pink" },
    { date: "2026-10-23", time: "오후 11:59", title: "과제 마감", color: "red" },
    { date: "2026-10-25", time: "종일", title: "엄마 생신", color: "orange" },
    { date: "2026-10-17", time: "오후 8:00", title: "정민이 밥약", color: "green" },
    { date: "2026-10-12", time: "오전 11:00", title: "동희 집", color: "pink" }
  ],
}

/* ---------------------------------------------------------------------
 * 8. 앨범(사진) 앱 (샘플)
 *   /public/photos 폴더에 사진을 넣고 경로를 추가/수정하세요.
 * ------------------------------------------------------------------- */
export const photos = [
  { src: "/photos/photo-1.png", date: "어제" },
  { src: "/photos/photo-6.png", date: "어제" },
  { src: "/photos/photo-2.png", date: "10월 17일" },
  { src: "/photos/photo-4.png", date: "10월 17일" },
  { src: "/photos/photo-3.png", date: "10월 12일" },
  { src: "/photos/photo-5.png", date: "9월 28일" },
  { src: "/photos/profile-donghee.png", date: "9월 28일" },
  { src: "/photos/profile-sungbin.png", date: "9월 3일" },
]

/* ---------------------------------------------------------------------
 * 9. 인스타그램 앱 (샘플)
 * ------------------------------------------------------------------- */
export const instagram = {
  stories: [
    { username: "내 스토리", photo: "/photos/profile-sungbin.png" },
    { username: "dh_yoon", photo: "/photos/profile-donghee.png" },
    { username: "jiwoo.k", photo: "/photos/photo-3.png" },
    { username: "hoops_seoul", photo: "/photos/photo-4.png" },
  ],
  posts: [
    {
      username: "dh_yoon91",
      userPhoto: "/photos/profile-donghee.png",
      location: "을지로",
      image: "/photos/photo-1.png",
      likes: 48,
      caption: "형이랑 한잔 🍻",
      time: "2일 전",
    },
    {
      username: "sungbin.son",
      userPhoto: "/photos/profile-sungbin.png",
      location: "강릉 경포해변",
      image: "/photos/photo-5.png",
      likes: 112,
      caption: "새벽 바다",
      time: "3주 전",
    },
  ],
}

/* ---------------------------------------------------------------------
 * 10. 음악 앱 (샘플)
 *   color: 앨범 커버 대신 보여줄 색 (원하면 image 에 사진 경로를 넣어도 됨)
 * ------------------------------------------------------------------- */
export const music = {
  nowPlaying: { title: "우린 왜 힘들까 (feat. JCLEF)", rtist: "기리보이", image: "/photos/photo-6.png" },
  recent: [
    { title: "자기 전", artist: "손성빈", image: "/photos/photo-2.png" },
    { title: "드라이브", artist: "손성빈", image: "/photos/photo-6.png" },
    { title: "동희", artist: "손성빈", image: "/photos/photo-1.png" },
    { title: "운동할 때", artist: "손성빈", image: "/photos/photo-4.png" },
  ],
}

/* ---------------------------------------------------------------------
 * 11. 홈 화면 앱 이름 (아이콘 아래 글씨)
 * ------------------------------------------------------------------- */
export const appLabels = {
  messages: "메시지",
  phone: "전화",
  instagram: "Instagram",
  music: "음악",
  photos: "사진",
  notes: "메모",
  calendar: "캘린더",
  safari: "Safari",
  camera: "카메라",
  settings: "설정",
  clock: "시계",
  weather: "날씨",
  kakao: "카카오톡",
  maps: "지도",
}
