import { createContext, useState } from 'react'
import { dataFeedbackProps } from '../data/FeedbackData'
const { v4: uuidv4 } = require('uuid');

interface FeedbackEditProps {
  item: dataFeedbackProps;
  edit: boolean;
}

export type FeedbackContextType = {
  feedback: dataFeedbackProps[];
  feedbackEdit: FeedbackEditProps;
  deleteFeedback: Function;
  addFeedback: Function;
  editFeedback: Function;
  updateFeedback: Function;
}
const FeedbackContext = createContext<FeedbackContextType | null>(null)

export const FeedbackProvider = ({children}:any) => {
  const [feedback, setFeedback] = useState<dataFeedbackProps[]>([
    {
      id:1,
      rating: 10,
      text: 'This feedback item 1',
    },
    {
      id:2,
      rating: 9,
      text: 'This feedback item 2',
    },
    {
      id:3,
      rating: 8,
      text: 'This feedback item 3',
    },
  ])


  const [feedbackEdit, setFeedbackEdit] = useState<FeedbackEditProps>({
    item: {
      id: 0,
      rating: 0,
      text: '',
    },
    edit:false,
  })

  const deleteFeedback = (id:number) => {
    if(window.confirm('Are you sure you want to delete?'))
    {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback:dataFeedbackProps) => {
    newFeedback.id = uuidv4()
    // current ...feedback + newFeedback on top of it
    setFeedback([newFeedback, ...feedback])
  }

  // Set item to be updated
  const editFeedback = (item:dataFeedbackProps) => {
    setFeedbackEdit ({
      item,
      edit:true
    }) 
  }

  const updateFeedback = (id:number, updItem:dataFeedbackProps) => {
    setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem } : item))
  }

  return (<FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
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