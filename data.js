/* 투두 모양 json 설계

tag: 
[{
    "name":"과제",
    "background":"#fffff"
}]
todos: 
  [{
    "tag":"과제",
    "todos": [
      {
        "id": 1,
        "content": "세오스 1주차 과제",
        "date": "2025-03-15",
        "isComplete": false
      }
    ]
  }
]
  */

const initialTagData = [
  {
    name: "기본",
    background:
      "linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(246, 250, 255) 100%)", // 올바른 색상 코드 (잘못된 #fffff 수정)
  },
  {
    name: "과제",
    background: "#E3EAF5",
  },
  {
    name: "일정",
    background: "#C6D3EE",
  },
];
const color = [
  "#E3EAF5",
  "#C6D3EE",
  "#BCC8E6",
  "#E5DFF5",
  "#D7E3F3",
  "#CFE0F1",
  "#D9D0F2",
  "#E1E7F8",
  "#D0D7F1",
  "#E8E3FA",

  // 🔹 추가된 색상 (연한 핑크 & 그레이 핑크)
  "#F4D7DA", // 연한 핑크
  "#EAC4D5", // 라이트 로즈핑크
  "#DFC5B7", // 부드러운 핑크 베이지
  "#E8D7C4", // 웜톤 핑크 베이지

  // 🔹 추가된 색상 (베이지 계열)
  "#F5E6CC", // 크리미 베이지
  "#EEDDCB", // 샌드 베이지
  "#DDD1BF", // 뉴트럴 베이지
  "#F3ECE0", // 페일 베이지

  // 🔹 추가된 색상 (추가 블루 & 퍼플)
  "#A5B8E0", // 소프트 블루
  "#B5AEE4", // 라이트 바이올렛
  "#C2B8F4", // 페리윙클 블루
  "#9CB6F5", // 세레니티 블루

  // 🔹 추가된 색상 (그레이 계열)
  "#D4D4D4", // 밝은 그레이
  "#C0C0C0", // 미디엄 그레이
  "#B8B8B8", // 스톤 그레이
  "#E6E6E6", // 페일 그레이

  // 🔹 추가된 색상 (추가 블루 & 퍼플)
  "#A2D2FF", // 스카이 블루
  "#CDB4DB", // 라이트 라벤더
  "#BDE0FE", // 페일 블루
  "#D0AEE0", // 소프트 퍼플
  "#A6C6FF", // 라이트 코발트 블루
  "#E5B8F4", // 라이트 핑크 퍼플
];

// 초기 투두 데이터
const initialTodos = [
  {
    tag: "과제",
    todos: [
      {
        id: 1,
        content: "세오스 1주차 과제",
        date: "2025-03-15",
        isComplete: false,
      },
      {
        id: 3,
        content:
          "우측 상단의 '태그 추가'를 사용해서 새로운 태그를 추가해보세요!",
        date: "2025-03-15",
        isComplete: false,
      },
      {
        id: 4,
        content: "새로운 할일을 추가해보세요! 날짜와 태그 지정이 가능합니다 :)",
        date: "2025-03-15",
        isComplete: false,
      },
      {
        id: 5,
        content: "체크박스를 클릭하면 투두가 완료/미완료 처리 됩니다.",
        date: "2025-03-15",
        isComplete: false,
      },
      {
        id: 6,
        content: "더이상 필요 없는 투두는 '삭제' 버튼을 눌러주세요!",
        date: "2025-03-15",
        isComplete: false,
      },
    ],
  },
  {
    tag: "기본",
    todos: [
      {
        id: 2,
        content: "기본 데이터",
        date: "2025-03-17",
        isComplete: false,
      },
    ],
  },
  {
    tag: "일정",
    todos: [],
  },
];

export { initialTagData, color, initialTodos };
