import React from 'react'
import Users from './parts/Users'
import Money from './parts/Money'

const Slider = () => {
  return (
    <div className="min-w-full flex justify-start   p-1 gap-2 overflow-x-auto ">
      <Users />
      <Money />
    </div>
  )
}

export default Slider
