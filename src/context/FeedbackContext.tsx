import { createContext, useState, useEffect } from 'react'
import { dataFeedbackProps } from '../data/FeedbackData'

interface FeedbackEditProps {
  item: dataFeedbackProps;
  edit: boolean;
}

export type FeedbackContextType = {
  feedback: dataFeedbackProps[];
  feedbackEdit: FeedbackEditProps;
  isLoading: boolean;
  deleteFeedback: Function;
  addFeedback: Function;
  editFeedback: Function;
  updateFeedback: Function;
}
const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({children}:any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [feedback, setFeedback] = useState<dataFeedbackProps[]>([])
  const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditProps>({
    item: {
      id: 0,
      rating: 0,
      text: '',
    },
    edit:false,
  })

  useEffect(() => {
    fetchFeedback()
    
  }, [])


  //feedback Fetch
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc")
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  } 

  const deleteFeedback = async(id:number) => {
    if(window.confirm('Are you sure you want to delete?'))
    {
      await fetch(`/feedback/${id}`, { method: 'DELETE' })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = async(newFeedback:dataFeedbackProps) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()
    // current ...feedback + newFeedback on top of it
    setFeedback([data, ...feedback])
  }

  // Set item to be updated
  const editFeedback = (item:dataFeedbackProps) => {
    setFeedbackEdit ({
      item,
      edit:true
    }) 
  }

  const updateFeedback = async(id:number, updItem:dataFeedbackProps) => {
    const response = await fetch(`/feedback/${id}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updItem)
    })
    const data = await response.json()
    setFeedback(feedback.map((item) => (item.id === id ? data : item)))
    setFeedbackEdit({
      //@ts-ignore
      item: {},
      edit: false,
    })
  }

  return (<FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
  )
}

export default FeedbackContext