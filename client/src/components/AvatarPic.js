import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import React from 'react'

const AvatarPic = function(props) {
  return (
<Avatar className={props.size}>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
  )
}

export default AvatarPic;
