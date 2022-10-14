import { Link } from 'react-router-dom'
import Card from '../components/shared/Card'

const AboutPage = () => {
  return (
    <Card>
      <div className='about'>
        <h1>
          About this project
        </h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <Link to='/'>
          Back Home
        </Link>
      </div>
    </Card>
  )
}

export default AboutPage