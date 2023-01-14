import React from 'react'
const API_URL = process.env.APP_API_BASE

function page() {
  return (
    <div>
      <div>page</div>
      <div>API URL {API_URL}</div>
    </div>
  )
}

export default page