const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let TotalCorrect = 0

function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()   

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")   
}

function selectAnswer(event) {
    const answerClicked = event.target
    
    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        TotalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const perfomance = Math.floor(TotalCorrect = 100 / totalQuestion)

    let mensagem = ""

    switch (true) {
        case (perfomance > 90):
            message = "Excelente"
            break
        case (perfomance > 70):
            message = "Muito Bom"
            break
        case (perfomance > 50):
            message = "Bom"
            break
        default:
            message = "Pode Melhorar :("
    }

    $questionsContainer.innerHTML = 
    `
    <p class="final-message">
        Você acertou ${TotalCorrect} de ${totalQuestion} questões!
        <span>Resultado: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
        Refazer Teste
    </button>
    `
}

const questions = [
    {
        question: "Qual é o país mais populoso do mundo?",
        answers: [
            { text: "Portugal", correct: false },
            { text: "China", correct: true },
            { text: "Rússia", correct: false },
            { text: "Itália", correct: false }
        ]
    },
    {
        question: "Qual é o menor e o maior país do mundo?",
        answers: [
            { text: "Portugal e Estados Unidos", correct: false },
            { text: "Rússia e Suíça", correct: false },
            { text: "Vaticano e França", correct: false },
            { text: "Rússia e Vaticano", correct: true}
        ]
    },
    {
        question: "Quem venceu a Copa do Mundo de 1986?",
        answers: [
            { text: "Argentina", correct: true },
            { text: "França", correct: false },
            { text: "Brasil", correct: false },
            { text: "Espanha", correct: false }
        ]
    },
    {
        question: "Quantas estrelas há na galáxia Via Láctea?",
        answers: [
            { text: "700 à 800 bilhões de estrelas", correct: false },
            { text: "500 à 600 bilhões de estrelas", correct: false },
            { text: "200 à 400 bilhões de estrelas", correct: true },
            { text: "300 à 400 bilhões de estrelas", correct: false }
        ]
    }, 
    {
        question: "Qual é o tamanho da Via Láctea?",
        answers: [
            { text: "100 mil anos-luz de diâmetro", correct: true },
            { text: "500 mil anos-luz de diâmetro", correct: false },
            { text: "200 mil anos-luz de diâmetro", correct: false },
            { text: "900 mil anos-luz de diâmetro", correct: false }
        ]
    },
    {
        question: "Qual foi a maior descoberta do telescópio James Web?",
        answers: [
            { text: "Descobriu o planeta Júpiter", correct: false },
            { text: "Descobriu a galáxia de Andrômeda", correct: false },
            { text: "Descobriu o buraco negro Sagitarius A", correct: false },
            { text: "Uma segunda estrela moribunda na Nebulosa do Anel Sul", correct: true }
        ]
    }
]