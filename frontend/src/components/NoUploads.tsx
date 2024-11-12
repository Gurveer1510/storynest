import { Link } from "react-router-dom"
import pen from "../assets/pen.png"

const NoUploads = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center">
            <div className="mb-4">
                <svg
                    className="mx-auto h-16 w-16 md:h-24 md:w-24 text-gray-400 dark:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">No stories yet</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
                You haven't uploaded or published any stories. Start sharing your thoughts with the world!
            </p>
            <Link to={"/publish"} className="w-52 md:w-fit inline-flex gap-1 md:gap-2 items-center justify-center bg-black text-white px-2 md:px-6 py-2 rounded-lg">
                <img className="h-4" src={pen} alt="" />
                <span>Write your first story</span>
            </Link>
        </div>
    )
}

export default NoUploads
