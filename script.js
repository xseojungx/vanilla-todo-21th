import { initialTagData, initialTodos, color } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  let tags = JSON.parse(sessionStorage.getItem("tags")) || [];
  let todos = JSON.parse(sessionStorage.getItem("todos")) || [];

  /****** 🍀 초기화 *********/
  const initial = () => {
    // 태그 초기화
    if (!tags || tags.length === 0) {
      sessionStorage.setItem("tags", JSON.stringify(initialTagData));
      tags = [...initialTagData]; // 기본 데이터로 설정
    }

    // 할 일 초기화
    if (!todos || todos.length === 0) {
      sessionStorage.setItem("todos", JSON.stringify(initialTodos));
      todos = [...initialTodos]; // 기본 데이터로 설정
    }
  };

  /****** 🍀 우측 상단 날짜 핸들링 *********/
  const today = new Date();
  let date = document.createElement("p");
  //css 입히기
  date.setAttribute("id", "date-display");
  //date 포메팅 후 텍스트 추가하기
  date.textContent = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  let dateParent = document.body.children[0].children[1];
  //parent의 0번째 자식으로로 추가하기
  dateParent.prepend(date);

  /******** 🍀 날짜, 디데이 포메팅 *******/
  // D-Day 계산 함수
  const getDdayInfo = (dateString) => {
    today.setHours(0, 0, 0, 0); // 시간 초기화 (자정 기준)

    const targetDate = new Date(dateString); // 목표 날짜
    targetDate.setHours(0, 0, 0, 0); // 시간 초기화

    const diffTime = targetDate - today; // 밀리초 단위 차이 계산
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // 일 단위 변환

    // D-Day 문자열 생성
    let dDayText = "";
    if (diffDays > 0) {
      dDayText = `D-${diffDays}`;
    } else if (diffDays === 0) {
      dDayText = "D-Day";
    } else {
      dDayText = `D+${Math.abs(diffDays)}`; //음수이므로 절댓값 처리
    }

    //날짜 형식 포켓팅
    const formattedDate = targetDate
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/-/g, ".");

    return {
      dDayText,
      formattedDate,
    };
  };

  /******** 🍀 입력창 태그 드롭다운 랜더링 *******/
  const dropDown = document.getElementById("add-tag");

  const renderDropDownList = () => {
    dropDown.innerHTML = ""; //중복 랜더링 방지를 위한 초기화
    tags.forEach((data) => {
      const option = document.createElement("option");
      option.value = data.name;
      option.textContent = data.name;
      dropDown.appendChild(option);
    });
  };

  /******** 🍀 태그 추가 버튼 *******/
  const addTag = () => {
    const tagInput = document.getElementById("tag-input-text");
    const tagName = tagInput.value.trim();

    if (!tagName) {
      return alert("태그 이름을 입력해주세요!");
    }

    // 태그 중복 추가 방지를 위한 중복 확인
    const isDuplicate = tags.some((tag) => tag.name === tagName);
    if (isDuplicate) {
      return alert("이미 존재하는 태그입니다.");
    }

    // 새로운 태그 객체 생성
    const newTag = {
      name: tagName,
      background: getRandomColor(), // 랜덤 배경색 추가
    };

    // 태그 배열에 추가
    tags.push(newTag);

    // 세션 스토리지 업데이트
    sessionStorage.setItem("tags", JSON.stringify(tags));

    // 투두 배열에 추가
    todos.push({ tag: tagName, todos: [] });

    //투두 스토리지 업데이트
    sessionStorage.setItem("todos", JSON.stringify(todos));

    console.log("새로운 태그 추가:", newTag);

    // 드롭다운 및 태그 리스트 업데이트
    renderDropDownList();
    renderSingleTagContainer(newTag);

    //입력 필드 초기화
    tagInput.value = "";
  };

  /******** 🍀 태그 별 상자 랜더링 *******/
  const tagList = document.getElementById("todo-list-container");

  // 태그 컨테이너 생성 공통 함수
  // 처음에 innerHtml 사용했는데 찾아보니 보안상 위험하다고 해서 다시 만듬
  const createTagContainerElement = (tagData) => {
    // 가장 바깥 리스트 감싸는 div 생성
    const todoList = document.createElement("div");
    // 클래스, 배경색 설정
    todoList.classList.add("todo-list");
    todoList.style.backgroundColor = tagData.background;

    // 리스트 제목 추가
    const tagName = document.createElement("h2");
    tagName.textContent = tagData.name;

    // 태그를 위한 ul 요소 생성
    const ul = document.createElement("ul");
    ul.id = tagData.name;

    // append
    todoList.append(tagName, ul);
    return todoList;
  };

  // 단일 태그 컨테이너 렌더링 함수
  const renderSingleTagContainer = (newTag) => {
    const container = createTagContainerElement(newTag);
    tagList.appendChild(container);
  };

  // 모든 태그 렌더링 함수
  const renderTags = () => {
    // 기존 내용 초기화
    tagList.innerHTML = "";
    tags.forEach((data) => {
      tagList.appendChild(createTagContainerElement(data));
    });
  };

  // 태그 배경 랜덤 색상 생성 함수
  const getRandomColor = () => {
    return color[Math.floor(Math.random() * color.length)];
  };

  /******** 🍀 투두 랜더링 *******/
  // 공통된 투두 아이템을 생성하는 함수
  const createTodoElement = (todo) => {
    // 새로운 li 요소 생성
    const li = document.createElement("li");
    li.id = todo.id;

    //윗줄
    const textDiv = document.createElement("div");

    // 체크박스 추가
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.isComplete;
    checkBox.classList.add("todo-checkbox");
    checkBox.addEventListener("change", toggleComplete);

    // 할 일 내용 추가
    const todoText = document.createElement("span");
    todoText.textContent = todo.content;
    todoText.classList.add("todo-text");

    //아랫줄
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("todo-date-div");
    if (todo.date) {
      // 날짜 포매팅
      const { dDayText, formattedDate } = getDdayInfo(todo.date);

      // 디데이
      const dDaySpan = document.createElement("span");
      dDaySpan.textContent = dDayText;

      // 날짜
      const dateSpan = document.createElement("span");
      dateSpan.textContent = formattedDate;

      dateDiv.append(dDaySpan, dateSpan);
    }

    // 삭제 버튼
    const deleteSpan = document.createElement("span");
    deleteSpan.textContent = "삭제";
    deleteSpan.classList.add("delete-btn");
    deleteSpan.addEventListener("click", deleteTodo);

    // 요소 조립
    dateDiv.appendChild(deleteSpan);
    textDiv.append(checkBox, todoText);
    li.append(textDiv, dateDiv);

    return li;
  };

  // 투두 리스트 렌더링
  const renderTodos = () => {
    todos.forEach((todoData) => {
      // 태그에 맞는 ul을 찾음
      const ul = document.getElementById(todoData.tag);
      if (!ul) return; // 해당 태그가 없으면 건너뜀

      todoData.todos.forEach((todo) => {
        ul.appendChild(createTodoElement(todo));
      });
    });
  };

  // 단일 투두 렌더링
  const renderSingleTodo = (tag, newTodo) => {
    const ul = document.getElementById(tag);
    if (!ul) return;

    ul.appendChild(createTodoElement(newTodo));
  };

  const addButton = document.getElementById("add-todo");

  const addTodo = () => {
    const id = Date.now();
    const text = document.getElementById("todo-input-text").value.trim();
    if (text === "") return alert("할 일을 입력해주세요.");
    const date = document.getElementById("todo-input-date").value;
    const tag = document.getElementById("add-tag").value;
    console.log(text, date, tag);

    const newTodo = {
      id: id,
      content: text,
      date: date,
      isComplete: false,
    };

    let existingTag = todos.find((data) => data.tag === tag);
    console.log(existingTag);
    if (existingTag) {
      // 기존 태그에 할 일이 있는 경우 → 해당 태그의 todos 배열에 추가
      existingTag.todos.push(newTodo);
    } else return alert("에러");

    //세션에 저장
    sessionStorage.setItem("todos", JSON.stringify(todos));

    renderSingleTodo(tag, newTodo);

    // 입력 필드 초기화
    document.getElementById("todo-input-text").value = "";
    document.getElementById("todo-input-date").value = "";
    document.getElementById("add-tag").value = "";
  };

  /******** 🍀 할일 삭제 함수 *******/
  const deleteTodo = (event) => {
    const li = event.target.closest("li"); // 가장 가까운 <li> 요소 찾기
    if (!li) return;

    const todoId = Number(li.id); // 삭제할 투두 ID
    const ul = li.parentElement; // 해당 태그의 <ul> 요소
    const tagName = ul.id; // 태그 이름 가져오기

    // 해당 태그 찾기
    let tagIndex = todos.findIndex((tag) => tag.tag === tagName);
    if (tagIndex === -1) return;

    // 해당 태그의 todos 배열에서 삭제할 투두 제거
    todos[tagIndex].todos = todos[tagIndex].todos.filter(
      (todo) => todo.id !== todoId
    );

    // 세션 업데이트
    sessionStorage.setItem("todos", JSON.stringify(todos));

    // 화면에서 요소 제거
    li.remove();
  };

  /******** 🍀 체크박스 상태 변경 함수 *******/
  const toggleComplete = (event) => {
    const checkbox = event.target;
    const li = checkbox.closest("li");
    if (!li) return;

    const todoId = Number(li.id); // 체크할 투두 ID
    const ul = li.parentElement; // 해당 태그의 <ul> 요소
    const tagName = ul.id; // 태그 이름 가져오기

    // 해당 태그 찾기
    let tag = todos.find((tag) => tag.tag === tagName);
    if (!tag) return;

    // 해당 투두 찾기
    let todo = tag.todos.find((todo) => todo.id === todoId);
    if (!todo) return;

    // 상태 변경
    todo.isComplete = checkbox.checked;

    // 세션 업데이트
    sessionStorage.setItem("todos", JSON.stringify(todos));

    console.log(`할 일 ID ${todoId} 상태 변경:`, todo.isComplete);
  };

  initial();

  document.getElementById("add-new-tag").addEventListener("click", addTag);
  addButton.addEventListener("click", addTodo);
  renderDropDownList();
  renderTags();
  renderTodos();
});
