import AppBar from "./AppBar";
import parse from 'html-react-parser';
import Avatar from "./Avatar";
type FullBlogType = {
  title: string;
  content: string;
  publishedDate: string;
  authorName: string;
  authorId?: string
};

function FullBlog({ title, content, publishedDate, authorName }: FullBlogType) {
  const created_at = publishedDate.split("T")[0];
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString("en-gb", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div>
      <AppBar />
      <div className="grid lg:grid-cols-12 px-10  pt-12 w-full">
        <div className="col-span-10  border-r border-gray-600 ">
          <div className="lg:text-4xl text-2xl font-bold tracking-tight border-b border-gray-600 pb-4">
            {parse(title)}{" "}
            <div className="text-lg font-semibold mt-1 text-gray-600">
              Posted on {formattedDate}
            </div>
          </div>

          <div className="lg:text-lg p-8 pl-0 text-justify ">
            <pre>
              {parse(content)}
            </pre>
          </div>
        </div>

        <div className="col-span-2 pl-4 hidden lg:block ">
          <div className="fixed w-full">
            <p className=" font-bold uppercase mt-8 border-b border-gray-600 text-gray-600">Author</p>

            <div className=" font-custom flex items-center gap-2 pt-4 tracking-wide text-lg ">
              <Avatar authorName={authorName} />
              <div>
                {authorName[0].toUpperCase()}{authorName.slice(1,)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FullBlog;
