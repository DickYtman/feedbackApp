import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import { FC } from 'react'
import { dataFeedbackProps } from '../data/FeedbackData';
import Card from './shared/Card';
import FeedbackContext, { FeedbackContextType } from '../context/FeedbackContext';

interface FeedbackItemProps {
  item:dataFeedbackProps;
}

const FeedbackItem:FC<FeedbackItemProps> = (props) => {
  const { item } = props
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext) as FeedbackContextType
  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <button className="close">
        <FaTimes onClick={() => deleteFeedback(item.id)} color='purple'/>
      </button>
      <button className="edit">
        <FaEdit color='purple' onClick={() => editFeedback(item)}/>
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

export default FeedbackItem