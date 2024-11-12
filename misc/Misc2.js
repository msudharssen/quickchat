import React from 'react'
import { useToast } from "@/hooks/use-toast"


export default function Misc2({name}) {
    const { toast } = useToast()

  return (
      toast({
        title: `${name} has been added sucessfully`,
        description: "Refresh Page to Update Friends",
      })
  )
}
