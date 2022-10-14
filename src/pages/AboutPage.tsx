import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>
          About this project
        </h1>
        <p>This is a React app to leave feedback for a product or service. <br /> Write your feedback atleast 10 characters, choose the rate you wanna leave and then submit it. <br/> You can update the review by pushing an edit button and change it in the main section. <br /> You can also delete the feedback.</p>
        <Link to='/'>
          Back Home
        </Link>
      </div>
    </Card>
  )
}

export default AboutPage