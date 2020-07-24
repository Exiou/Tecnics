import 'dotenv/config'
import app from './app'

app.listen(process.env.PORT, () => console.log(`Backend running on port ${process.env.PORT}`))
