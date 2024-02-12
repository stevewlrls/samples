import polka from 'polka'
import serveStatic from 'serve-static'
import bodyParser from 'body-parser'

const app = polka()

app.use(serveStatic('public', { index: ['index.html'] }))
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/contactUs', (req, res) => {
  res.end(
    `<html>
  <body>
    <h1>Contact received!</h1>
    <pre>${JSON.stringify(req.body, null, 2)}</pre>
  </body>
</html>`
  )
})

app.listen(3000)
