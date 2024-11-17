import blogs from "../../blogs.json";

function Home() {
  const tags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));
  const authors = Array.from(new Set(blogs.map((blog) => blog.author)));

  return (
    <div className="flex flex-col p-10 lg:flex-row">
      <div className="flex-1">
        <div className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded-3xl border p-10">
              <img
                src={blog.image}
                alt={blog.title}
                className="mb-4 h-72 w-full rounded-3xl object-cover"
              />
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p>{blog.description}</p>
              <p>
                {blog.author} - {new Date(blog.date).toLocaleDateString()}
              </p>
              <div className="flex flex-wrap">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag mb-2 mr-2 rounded-full px-2 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 w-full lg:mt-0 lg:w-1/3 lg:pl-4">
        <div className="mb-4 rounded-3xl border p-4">
          <h2 className="mb-2 text-xl font-bold">Popular Tags</h2>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="tag mb-2 mr-2 rounded-full px-2 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border p-4">
          <h2 className="mb-2 text-xl font-bold">Featured Authors</h2>
          <ul>
            {authors.map((author) => (
              <li key={author} className="mb-2">
                {author}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
