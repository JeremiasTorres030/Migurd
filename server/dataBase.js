import mongoose from 'mongoose'
import { MONGODB_URI } from './env.config.js'

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI)
    console.log('la base de dato esta conectada a ' + db.connection.name)
  } catch (error) {
    console.log(error)
  }
}
