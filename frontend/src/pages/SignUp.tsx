import Auth from '../components/Auth'
import Quote from '../components/Quote'

function SignUp() {
  return (
    <>

    <div className='grid grid-cols-1 lg:grid-cols-2'>
        <div>
            <Auth type='SignUp' />
        </div>
        <div className='lg:block hidden'>
        <Quote />
        </div>
    </div>
    </>
  )
}

export default SignUp