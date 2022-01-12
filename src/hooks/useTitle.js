import { useEffect } from "react"

export function useTitle(title) {
    useEffect(() => {
      const prevTitle = document.title
      if (title) {
        document.title = 'The Book of Shifting Antiquity - ' + title;
      } else {
          document.title = 'The Book of Shifting Antiquity';
      }
      return () => {
        document.title = prevTitle
      }
    })
  }