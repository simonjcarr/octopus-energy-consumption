import React from 'react'
const API_URL = process.env.APP_API_BASE
const VERCEL_URL = process.env.VERCEL_URL
function page() {
  return (
    <div>
      <div>page</div>
      <div>API URL {API_URL}</div>
      <div>VERCEL URL {VERCEL_URL}</div>
    </div>
  )
}

export default page