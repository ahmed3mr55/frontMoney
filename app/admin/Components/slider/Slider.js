import React from 'react'
import Users from './parts/Users'
import Money from './parts/Money'

const Slider = () => {
  return (
    <div className="min-w-full flex justify-center items-centerp-1 gap-2 overflow-x-auto pb-5">
      <Users />
      <Money />
    </div>
  )
}

export default Slider
