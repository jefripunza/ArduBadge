module.exports = {
    use: function(app, access_logger) {
        // get recently added
        app.get('/stats/recent', async function(req, res) {
            //return the last libraries to be acccessed for the first time
            try {
                let recentlyWatched = await access_logger.recentNewLibnames(10);
                res.json(recentlyWatched);
            } catch(err) {
                res.json([]);
            }
        });
    }
}