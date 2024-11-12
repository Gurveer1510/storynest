
type avatarProp = {
    authorName: string | null
}
function Avatar({authorName } : avatarProp ) {
  return (
    
    <div className="relative flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-300 rounded-full ">
        <span className="font-medium text-gray-600 ">{authorName && authorName[0] && authorName[0].toUpperCase()}</span>
    </div>
    
  )
}

export default Avatar