import { ChangeEvent} from 'react'

interface InputType {
  label: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type: string
}

function InputBox({label, placeholder, onChange, type} : InputType) {
  return (
    <div className='w-full'>
        <label  className="block text-lg text-center pl-2 lg:text-left font-bold text-gray-900 mb-1 ">{label}</label>
        <input  onChange={onChange} type={type}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder={placeholder} required />
    </div>
  )
}

export default InputBox