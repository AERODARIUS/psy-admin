export default ({ database, path }, callback) => {
  database.ref(path).once('value').then((snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};
