"use client"

import { Post } from "@prisma/client"
import { formatInTimeZone } from "date-fns-tz"
import { CircleChevronRightIcon, LeafIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PostCardProps {
  post: Post
}

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter()

  return (
    <div className="relative border border-zinc-300 rounded-sm overflow-hidden h-[450px] shadow-md">
      <Image src={post.banner} alt="banner" width={0} height={0} sizes="100vw" className="w-full h-56 absolute -z-10" />
      <div className="absolute top-3 left-3 font-extrabold text-teal-500 rounded-full border-[3px] text-sm border-teal-500 px-2 py-1">
        NEWS
      </div>
      <div className="absolute top-40 ml-3 text-white text-2xl z-10 font-bold tracking-wide">{post.title}</div>
      <div className="mt-56 p-3">
        <div className="text-xs font-semibold">
          {formatInTimeZone(new Date(post.createdAt), "Asia/Ho_Chi_Minh", "PPP")}
        </div>
        <div className="text-sm mt-3">{post.description}</div>
      </div>
      <div
        className="flex items-center gap-3 absolute bottom-3 left-3 text-teal-700 cursor-pointer"
        onClick={() => router.push(`/posts/${post.id}`)}
      >
        <CircleChevronRightIcon className="w-5 h-5" />
        <p className="font-semibold">Read more</p>
      </div>
    </div>
  )
}

export default PostCard
