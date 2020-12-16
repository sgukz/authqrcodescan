const scan = (req, res) => {
  try {
    let name = 'hello'

    res.render('scan.html', { name: name })
  } catch (e) {
    console.log(e)
  }
}

export { scan }
