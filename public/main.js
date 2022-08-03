const coursesContainer = document.querySelector('#courses-container')
const form = document.querySelector('#courseDmg')
const scoresContainer = document.querySelector('#scores-container')
const form2 = document.querySelector('#courseScore')
//need to declar another form, so that I can add an event listener at the bottom of 
//this page.


const baseURL = `http://localhost:4000`

const coursesCallback = ({ data: courses }) => displayCourses(courses)

const errCallback = err => console.log(err.response.data)

const scoresCallBack = ({ data: scores}) => displayScores(scores)

// const bestScoreCallback = ({ data: scores}) => displayScores(scores)
// const worstScoreCallback = ({ data: scores}) => displayScores(scores)

const getAllCourses = () => axios.get(`${baseURL}/api/courses`).then(coursesCallback).catch(errCallback)
const createCourse = body => axios.post(`${baseURL}/api/courses`, body).then(coursesCallback).catch(errCallback)
const deleteCourse = id => axios.delete(`${baseURL}/api/courses/${id}`).then(coursesCallback).catch(errCallback)
const updateCourse = (id, type) => axios.put(`${baseURL}/api/courses/${id}`, {type}).then(coursesCallback).catch(errCallback)

const getAllScores = () => axios.get(`${baseURL}/api/scores`).then(scoresCallBack).catch(errCallback)
const deleteScore = id => axios.delete(`${baseURL}/api/scores/${id}`).then(scoresCallBack).catch(errCallback)
const createScore = body => axios.post(`${baseURL}/api/scores`, body).then(scoresCallBack).catch(errCallback)

//need a get request for the best score and worst score.
//write a "getBestScores axios request."

// const getBestScore = () => axios.get(`${baseURL}/api/scores`).then(bestScoreCallback).catch(errCallback)
// const getWorstScore = () => axios.get(`${baseURL}/api/scores`).then(worstScoreCallback).catch(errCallback)


//handle response
function submitHandler(e) {
    e.preventDefault()

    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createCourse(bodyObj)

    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createCourseCard(course) {
    const courseCard = document.createElement('div')
    courseCard.classList.add('course-card')

    courseCard.innerHTML = `<img alt='course cover' src=${course.imageURL} class="course-cover"/>
    <p class="course-title">${course.title}</p>
    <div class="btns-container">
        <button onclick="updateCourse(${course.id}, 'minus')">-</button>
        <p class="course-rating">${course.rating} points</p>
        <button onclick="updateCourse(${course.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteCourse(${course.id})">delete</button>
    `


    coursesContainer.appendChild(courseCard)
}

function displayCourses(arr) {
    coursesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCourseCard(arr[i])
    }
}

function createScoreCard(score) {
    const scoreCard = document.createElement('div')
    scoreCard.classList.add('score-card')

    scoreCard.innerHTML = `
    <p class="score-total">${score.score}</p>
    <button onclick="deleteScore(${score.id})">Dispute!</button>
    <p class="player-name">${score.name}</p>
    <p class="course-name">${score.course}</p>`

    scoresContainer.appendChild(scoreCard)
}
function displayScores(arr) {
    scoresContainer.innerHTML = ``
    for(let i= 0; i< arr.length; i++) {
        createScoreCard(arr[i])
    }
}

function submitHandlerScore(e) {
    e.preventDefault()

    let score = document.querySelector('#score')
    let name = document.querySelector('#name')
    let course = document.querySelector('#course')

    let bodyObj = {
        score: score.value,
        name: name.value, 
        course: course.value
    }

    createScore(bodyObj)

    score.value = ''
    name.value = ''
    course.value = ''
}


form.addEventListener('submit', submitHandler)

form2.addEventListener('submit', submitHandlerScore)

getAllCourses()

getAllScores()
