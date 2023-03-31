import * as tuitsDao from '../tuits/tuits-dao.js'

const createTuit = async (req, res) => {
    const newTuit = req.body;
    newTuit.likes = 0;
    newTuit.liked = false;
    const insertedTuit = await tuitsDao
        .createTuit(newTuit);

    res.json(insertedTuit);
}
const findTuits  = async (req, res) => {
    console.log("find tuits got called")
    const tuits = await tuitsDao.findTuits()
    console.log("TESTING log:", tuits)
    res.json(tuits)
}

const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    const status = tuitsDao
        .deleteTuit(tuitdIdToDelete);
    res.sendStatus(status);
}

const updateTuit = (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    const status = tuitsDao
        .updateTuit(tuitdIdToUpdate,
            updates);
    res.sendStatus(status);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
