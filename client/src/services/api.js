import React from 'react'
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "Content-type": "application/json",
  },
})

export default function Api() {
  return (
    <div>
      
    </div>
  )
}
