import Jobs from 'components/Jobs'
import { getJobs } from 'lib/data'
import prisma from 'lib/prisma'

export default function Home({ jobs }) {
  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>
      <Jobs jobs={jobs} />
    </div>
  )
}

export async function getServerSideProps(context) {
  // notice that we have to pass prisma as a second argument to the getJobs function.  Code intended for the server
  //is wrapped in getServerSideProps  - Next.js would load the server code in the browser resulting in an error.
  let jobs = await getJobs(prisma, context)
  jobs = JSON.parse(JSON.stringify(jobs))
  return {
    props: {
      jobs,
    },
  }
}