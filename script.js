let questions = [
  {
    type: "single",
    q: "2 + 2 = ?",
    options: ["2", "4", "6"],
    correct: 1
  },
  {
    type: "multi",
    q: "Select even numbers",
    options: ["1", "2", "3", "4"],
    correct: [1, 3]
  },
  {
    type: "fill",
    q: "5 + 3 = ?",
    correct: "8"
  }
];

let current = 0;
let score = 0;
let selected = null;

function loadQuestion() {
  let q = questions[current];
  document.getElementById("question").innerText = q.q;

  let ansDiv = document.getElementById("answers");
  ansDiv.innerHTML = "";

  // SINGLE SELECT
  if (q.type === "single") {
    q.options.forEach((opt, i) => {
      let div = document.createElement("div");
      div.className = "answer";
      div.innerText = opt;

      div.onclick = () => {
        selected = i;

        let all = document.querySelectorAll(".answer");
        all.forEach(el => el.classList.remove("selected"));

        div.classList.add("selected");
      };

      ansDiv.appendChild(div);
    });
  }

  // MULTI SELECT
  if (q.type === "multi") {
    q.options.forEach((opt, i) => {
      let label = document.createElement("label");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = i;

      label.appendChild(checkbox);
      label.append(" " + opt);

      ansDiv.appendChild(label);
      ansDiv.appendChild(document.createElement("br"));
    });
  }

  // FILL IN BLANK
  if (q.type === "fill") {
    let input = document.createElement("input");
    input.type = "text";
    input.id = "fill";

    ansDiv.appendChild(input);
  }
}

function nextQuestion() {
  let q = questions[current];

  // SINGLE
  if (q.type === "single") {
    if (selected === null) {
      alert("Select answer");
      return;
    }

    if (selected === q.correct) score++;
  }

  // MULTI
  if (q.type === "multi") {
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    let selectedArr = [];

    checkboxes.forEach(cb => {
      if (cb.checked) selectedArr.push(Number(cb.value));
    });

    if (selectedArr.length === 0) {
      alert("Select at least one");
      return;
    }

    if (JSON.stringify(selectedArr.sort()) === JSON.stringify(q.correct.sort())) {
      score++;
    }
  }

  // FILL
  if (q.type === "fill") {
    let val = document.getElementById("fill").value;

    if (val.trim() === "") {
      alert("Enter answer");
      return;
    }

    if (val.trim().toLowerCase() === q.correct.toLowerCase()) {
      score++;
    }
  }

  selected = null;
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let card = document.querySelector(".card");

  card.innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
    <button id="restartBtn" class="btn">Restart</button>
  `;

  document.getElementById("restartBtn").addEventListener("click", restart);
}

function restart() {
  current = 0;
  score = 0;
  selected = null;

  document.querySelector(".card").innerHTML = `
    <h2 id="question"></h2>
    <div id="answers"></div>
    <button onclick="nextQuestion()" class="btn">Next</button>
  `;

  loadQuestion();
}

// start app
loadQuestion();