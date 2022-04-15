import * as tuitsDao from "../mongo/tuits-dao.js"

const findAllTuits = async (req, res) => {
  const tuits = await tuitsDao.findAllTuits()
  res.json(tuits);
}

const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.stats = {};
  newTuit.stats.likes = 0;
  newTuit.stats.dislikes = 0;
  newTuit.stats.retuits = 0;
  newTuit.stats.comments = 0;
  newTuit.postedBy = {};
  newTuit.postedBy.username = 'iris';
  newTuit.handle = 'iris';
  newTuit.logoimage = "/tuiter/ruby.png";
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}

const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  res.send(status);
}

const updateTuit = async (req, res) => {
  const tuitdIdToUpdate = req.params.tid;
  const updatedTuit = req.body;
  const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updatedTuit);
  res.send(status);
}

// comment
// import posts from "../tuits.js";
// let tuits = posts;
//
// const createTuit = (req, res) => {
//   const newTuit = req.body;
//   newTuit._id = (new Date()).getTime()+'';
//   newTuit.postedBy = {};
//   newTuit.postedBy.username = 'iris';
//   newTuit.stats = {};
//   newTuit.stats.likes = 0;
//   newTuit.stats.dislikes = 0;
//   newTuit.stats.retuits = 0;
//   newTuit.stats.comments = 0;
//   newTuit.handle = 'iris';
//   newTuit.logoimage = "/tuiter/ruby.png";
//   tuits.push(newTuit);
//   res.json(newTuit);
// }
//
// const findAllTuits = (req, res) => {
//   res.json(tuits);
// }
//
// const updateTuit = (req, res) => {
//   const tuitdIdToUpdate = req.params.tid;
//   const updatedTuit = req.body;
//   tuits = tuits.map(t => t._id === tuitdIdToUpdate ? updatedTuit : t);
//   res.sendStatus(200);
// }
//
// const deleteTuit = (req, res) => {
//   const tuitdIdToDelete = req.params.tid;
//   tuits = tuits.filter(t => t._id !== tuitdIdToDelete);
//   res.sendStatus(200);
// }

export default (app) => {
  app.post('/api/tuits', createTuit);
  app.get('/api/tuits', findAllTuits);
  app.put('/api/tuits/:tid', updateTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
}
