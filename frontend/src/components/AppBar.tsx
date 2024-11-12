import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import storyNestImage from "../assets/storynest.png"

function AppBar() {

  const { pathname } = useLocation()

  return (
    <div className=" border-b border-b-slate-600 flex items-center justify-between px-4 md:px-10 py-2">
      <Link to={"/"}><div className="font-custom text-xl"><img className="h-8" src={storyNestImage} alt="" /></div></Link>
      <div className="flex gap-1 md:gap-4 items-center">
        {
          pathname == "/publish" || pathname == `/profile/${localStorage.getItem("userId")}` ? null : (
            <Link to={"/publish"}>
              <button
                type="submit"
                className=" hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-4 md:px-8 py-1 bg-[#0070f3] rounded-md text-white font-md transition duration-200 ease-linear"
              >
                <p className="font-semibold ">New</p>
              </button>
            </Link>
          )
        }

        {
          pathname == `/profile/${localStorage.getItem("userId")}` ? null : (<>
            <Link to={`/profile/${localStorage.getItem("userId")}`}>
              <div>
                <Avatar authorName={localStorage.getItem("username")} />
              </div>
            </Link>
          </>
          )
        }

      </div>
    </div >
  );
}

export default AppBar;
