const scores = require('./db2.json')
let globalId = 22

module.exports ={



getScores: (req, res) => res.status(200).send(scores),

    deleteScore: (req, res) => {
        let index = scores.findIndex(elem => elem.id === +req.params.id)
        scores.splice(index, 1)
        res.status(200).send(scores)
    },
    createScore: (req, res) => {
        let {score, name, course} = req.body
        let newScore = {
            score, 
            name,
            course,
            id: globalId
        }
        scores.push(newScore)
        res.status(200).send(scores)
        globalId++
    },
    

}