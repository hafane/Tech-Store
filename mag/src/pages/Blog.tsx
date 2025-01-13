import { Blogs } from "../utils/constants/BlogConstants"
import { CgCalendar } from "react-icons/cg"
import { LuTimer } from "react-icons/lu"

const Blog = () => {
	return (
		<div>
			<div className="container block sm:grid sm:grid-cols-2 sm:gap-6 max-w-[1200px] mx-auto">
				{Blogs.map(blog => (
					<article className="bg-white rounded-b-md shadow-md" key={blog.id}>
						<img
							className="w-full max-h-[306px] rounded-t-md"
							src={blog.image}
							alt={blog.title}
							loading="lazy"
						/>
						<div className="p-3 overflow-hidden">
							<div className="flex justify-between [&>span]:text-sm [&>span]:text-zinc-500">
								<span className="flex gap-2 items-center">
                                    <CgCalendar size={18}/>
                                    {blog.date}
                                </span>
								<span className="flex gap-2 items-center">
                                    <LuTimer size={18}/>
                                    {blog.timeRead}
                                </span>
							</div>
							<h1 className="text-lg font-bold">{blog.title}</h1>
							<p className="font-light">{blog.description}</p>
						</div>
					</article>
				))}
			</div>
		</div>
	)
}

export default Blog
