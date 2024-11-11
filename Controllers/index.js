const Joke = require('../Models/Joke')

exports.get_jokes = async (req, res) => {
    try {
        const jokes = await Joke.find()
        if (jokes) {
            res.status(200).json(jokes)
        } else {
            res.status(500).json({
                message: { msgBody: 'An error has occurred whilst getting the jokes.', msgError: true, err },
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: { msgBody: 'An error has occurred whilst getting the Jokes.', msgError: true, err },
        })
    }
}

exports.create_joke = (req, res) => {
    const { type, setup, punchline } = req.body
    const newJoke = new Joke({
        type,
        setup,
        punchline
    })
    newJoke.save()
        .then(data => {
            res.status(200).json({
                message: 'The Joke was successfully created'
            })
        }).catch(err => {
            res.status(500).json({
                message: { msgBody: 'An error has occurred whilst creating a new Joke.', msgError: true, err },
            })
        })
}

exports.delete_joke = (req, res) => {
    Joke.deleteOne({ _id: req.params.id })
        .then(data => {
            if (!data) {
                res
                    .status(404)
                    .json({ message: 'No joke found for provided ID' })
                return
            }
            res.status(200).json({
                message: 'Joke successfully deleted',
            })
        }).catch(err => {
            res.status(500).json({
                message: { msgBody: 'An error has occurred whilst deleting the Joke.', msgError: true, err },
            })
        })
}

exports.like_joke = (req, res) => {
    Joke.updateOne({ _id: req.params.id }, { $inc: { likes: 1 } })
        .then(() => {
            res.status(200).json({
                message: 'Joke liked',
            })
        }).catch(err => {
            res.status(500).json({
                message: { msgBody: 'An error has occurred whilst updating a Joke.', msgError: true, err },
            })
        })
}