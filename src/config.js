import dotenv from "dotenv"
dotenv.config()

export const port = parseInt(process.env.PORT, 10) || 3000
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`
export const frontUrl = process.env.FRONT_URL
export const backUrl = process.env.BACK_URL
