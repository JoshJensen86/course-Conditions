const express = require ('express')
const cors = require ('cors')
const app = express()


app.use (express.json())
app.use (cors())

const {getCourses,
        deleteCourse,
        createCourse,
        updateCourse
        
    } = require('./controller.js')

const {getScores,
    deleteScore,
    createScore

} = require('./controller2.js')


app.get('/api/courses', getCourses)
//need to add endpoints for 
//delete.Score, and app.post for createScore.
app.get('/api/scores', getScores)

app.delete('/api/scores/:id', deleteScore)

app.delete('/api/courses/:id', deleteCourse)

app.post('/api/scores', createScore)

app.post('/api/courses', createCourse)

app.put('/api/courses/:id', updateCourse)

app.listen(4000, () => console.log('Running on 4000!!!! SIR!!'))
