import { Link, useNavigate } from "react-router-dom";
import { logout } from "../requests";
import { useEffect, useState } from "react";
import storynestImage from "../assets/storynest.png"
import quill from "../assets/quill.png"

export default function Hero() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (token) {
      setLoggedIn(true)
      navigate("/blogs")
    } else {
      setLoggedIn(false)
    }
  }, [token])

  function handleLogOut() {
    logout()
    setLoggedIn(false)
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary text-primary-foreground px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <div>
            <img className="h-10" src={quill} alt="" />
          </div>
          <span className="sr-only">StoryNest</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/signin" className={`text-sm font-medium hover:underline underline-offset-4 border px-2 py-1 ${loggedIn ? "hidden" : null}  rounded-lg`}>
            Sign in
          </Link>
          <Link to="/signup" className={`text-sm font-medium hover:underline underline-offset-4  border px-2 py-1 ${loggedIn ? "hidden" : null} rounded-lg`}>
            Sign up
          </Link>
          <button onClick={handleLogOut} type="button" className={`text-sm font-medium hover:underline underline-offset-4  border px-2 py-1 rounded-lg ${!loggedIn ? "hidden" : null}`}>
            Log Out
          </button>

        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <div className="pb-0 flex justify-center">
                <img className="h-28 " src={storynestImage} alt="storynest" />
              </div>
              <p className="text-xl text-muted-foreground md:text-2xl">
                Explore the world of creative writing and storytelling.
              </p>
              <Link
                to="/blogs"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Explore the Stories
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="container flex flex-col gap-2 sm:flex-row justify-between">
          <p className="text-xs">&copy; 2024 StoryNest. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link to="/terms" className="text-xs hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-xs hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
