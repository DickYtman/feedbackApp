import { useState, useEffect, useContext } from "react"
import FeedbackContext, { FeedbackContextType } from "../context/FeedbackContext"
import RatingSelect from "./RatingSelect"
import Button from "./shared/Button"
import Card from "./shared/Card"


const FeedbackForm = () => {
  const [text, setText] = useState<string>('')
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true)
  const [message, setMessage] = useState<string | null>('')
  const [rating, setRating] = useState<number>(10)
  
  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext) as FeedbackContextType

  const handleTextChange = (ev:any) => {
    ev.preventDefault()
    if(text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be atleast 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(ev.target.value)
  }

  const handleSubmit = (ev:any) => {
    ev.preventDefault()
    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }

      if(feedbackEdit.edit === true ) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    }
  }

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      const { rating, text } = feedbackEdit.item
      setBtnDisabled(false)
      setText(text)
      setRating(rating)
    }
  }, [feedbackEdit])

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating:number) => setRating(rating)}/>
        <div className="input-group">
          <input 
          onChange={handleTextChange} 
          type="text" 
          placeholder="Write a review" 
          value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
