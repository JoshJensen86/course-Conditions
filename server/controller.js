const courses = require('./db.json')
// const scores = require('./db2.json')
let globalId = 22

module.exports = {
    getCourses: (req, res) => res.status(200).send(courses),

    deleteCourse: (req, res) => {
        let index = courses.findIndex(elem => elem.id === +req.params.id)
        courses.splice(index, 1)
        res.status(200).send(courses)
    },
    createCourse: (req, res) => {
        let {title, rating, imageURL} = req.body
        let newCourse = {
            title, 
            rating,
            imageURL,
            id: globalId
        }
        courses.push(newCourse)
        res.status(200).send(courses)
        globalId++
    },
    updateCourse: (req, res) => {
        // console.log(req.params.id)
        // console.log(req.body.type)

        const existingId = +req.params.id;
        let index = courses.findIndex(course => course.id === existingId);
        if(req.body.type === 'plus'){
            if(courses[index].rating >= 10){
                res.status(400).send('cannot rate a course over 10')
            } else {
                courses[index].rating++
                res.status(200).send(courses)
            }
        }else {
            if(courses[index].rating <= 1) {
                res.status(400).send('we cannot rate a course under 1')
            }else {
                courses[index].rating--
                res.status(200).send(courses)
            }
        }
        
    }
  
}




    


