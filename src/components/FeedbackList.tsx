import {motion, AnimatePresence} from 'framer-motion';
import { useContext } from 'react';
import FeedbackContext, { FeedbackContextType } from '../context/FeedbackContext';
import FeedbackItem from "./FeedbackItem";


const FeedbackList = () => {
  const { feedback } = useContext(FeedbackContext) as FeedbackContextType
  if(!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }
  return (
    <div className="feedback-list">
      <AnimatePresence>
        {feedback.map((item) => (
          <motion.div 
          key={item.id}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          >
            <FeedbackItem 
            key={item.id} 
            item={item} 
            />
          </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )

  // Version without the animation
  // return (
  //   <div className="feedback=list">
  //     {feedback.map((item) => (
  //       <FeedbackItem 
  //       key={item.id} 
  //       item={item} 
  //       handleDelete={handleDelete}/>
  //     ))}
  //   </div>
  // )
}

export default FeedbackList