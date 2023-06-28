//the required modules express, mongoose, and the ShortUrl model/schema are imported.
// An instance of the Express application is created.
const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shorturl')
const app = express()

mongoose.connect('mongodb+srv://meghanathformacironman:RHwzS3OvJrFSXunL@cluster0.mvttxm7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {
  const { q: searchText } = req.query;
  const shortUrls = searchText
    ? await ShortUrl.find({
        $or: [
          { full: { $regex: searchText, $options: 'i' } },
          { short: { $regex: searchText, $options: 'i' } },
          { note: { $regex: searchText, $options: 'i' } },
        ],
      }).exec()
    : await ShortUrl.find().exec();
  const errorMessage = '';
  res.render('index', { shortUrls, errorMessage });
});

app.post('/shortUrls', async (req, res) => {
  const { fullUrl, note } = req.body;
  const existingShortUrl = await ShortUrl.findOne({ full: fullUrl });

  if (existingShortUrl) {
      let errorMessage = 'URL already exists.';
      const shortUrls = await ShortUrl.find().exec();
      res.render('index', { shortUrls, errorMessage });
  } else {
      if(note){
      const existingNote = await ShortUrl.findOne({ note: note });

      if (existingNote) {
          let errorMessage = 'Note already exists.';
          const shortUrls = await ShortUrl.find().exec();
          res.render('index', { shortUrls, errorMessage });
      } else {
          await ShortUrl.create({ full: fullUrl, note });
          res.redirect('/');
      }
   }else
  {
      await ShortUrl.create({ full: fullUrl });
      res.redirect('/');
  }

  }
}); 

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (!shortUrl) return res.sendStatus(404);

  await ShortUrl.findOneAndUpdate(
    { short: req.params.shortUrl },
    { $inc: { clicks: 1 } }
  );

  res.redirect(301, shortUrl.full);
});


app.post('/shortUrls/:id/delete', async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findByIdAndDelete(req.params.id);
    if (!shortUrl) {
      return res.sendStatus(404);
    }

    console.log('Short URL deleted:', shortUrl);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.status(500).redirect('/error-page');
  }
});





app.listen(process.env.PORT || 5000);
