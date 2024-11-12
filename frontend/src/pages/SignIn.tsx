
import Auth from '../components/Auth'
import Quote from '../components/Quote'

function SignIn() {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div>
            <Auth type='SignIn' />
        </div>
        <div className='lg:block hidden'>
        <Quote />
        </div>
    </div>
    </div>
  )
}

export default SignIn