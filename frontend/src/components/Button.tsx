
function Button(props: any) {
    
  return (
    <div className="flex flex-col w-full sm:w-auto sm:flex-row p-4">
      <button onClick={props.onClick} type="button"
          className="flex flex-row items-center justify-center bg-black w-full px-4 py-4 mb-4 text-sm font-bold border-2 text-white  leading-6 capitalize duration-100 transform rounded-md shadow-lg cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1">
              {props.type == "SignUp" ? "Create my account" : "Log in"}
          <span className="ml-4">
              <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
              </svg>
          </span>
      </button>

  
</div>
  )

}

export default Button