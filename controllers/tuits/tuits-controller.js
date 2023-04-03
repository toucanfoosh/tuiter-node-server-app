import posts from "./tuits.js";
let tuits = posts;

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime() + '';
    tuits.push(newTuit);
    res.json(newTuit);
}
const findTuits = (req, res) => {
    const type = req.query.type
    if (type) {
        const tuitsOfType = tuits
            .filter(t => t.type === type)
        res.json(tuitsOfType)
        return
    }
    res.json(tuits)
}
const updateTuit = (req, res) => {
    const tuitId = req.params['tid'];
    const updates = req.body;
    tuits = tuits.map((t) =>
        t._id === tuitId ?
            { ...t, ...updates } :
            t
    );
    res.sendStatus(200);
}
const deleteTuit = (req, res) => {
    const tuitId = req.params['tid'];
    tuits = tuits.filter(t =>
        t._id !== tuitId);
    res.sendStatus(200);
}

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}
