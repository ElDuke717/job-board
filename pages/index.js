import Jobs from 'components/Jobs'
import prisma from 'lib/prisma'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getJobs, getUser } from 'lib/data.js'
import Link from 'next/link'

export default function Home({ jobs, user }) {
  const { data: session } = useSession()
  const router = useRouter()

  if (session && !session.user.name) {
    router.push('/setup')
  }

  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>

      {!session && (
        <a className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
          href='/api/auth/signin'>
          login
        </a>
      )}

      {session && (
        <>
          <p className='mb-10 text-2xl font-normal'>
            Welcome, {user.name}
            {user.company && (
              <span className='bg-black text-white uppercase text-sm p-2'>
                Company
              </span>
            )}
          </p>
          {user.company ? (
            <>
              <Link href={`/new`}>
                <button
                  className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
                >
                  click here to post a new job
                </button>
              </Link>
              <Link href={`/dashboard`}>
                <button className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
                  see all the jobs you posted
                </button>
              </Link>
            </>
          ) : (
            <div className='flex justify-center'>
              <Link href={`/dashboard`}>
                <button className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
                  see all the jobs you applied to
                </button>
              </Link>
            </div>
          )}
        </>
      )}

      <Jobs jobs={jobs} />
    </div>
  )
}

export async function getServerSideProps(context) {
  // notice that we have to pass prisma as a second argument to the getJobs function.  Code intended for the server
  //is wrapped in getServerSideProps  - Next.js would load the server code in the browser resulting in an error.
  const session = await getSession(context)

  let jobs = await getJobs(prisma, context)
  jobs = JSON.parse(JSON.stringify(jobs))

  if (!session) {
    return {
      props: { jobs },
    }
  }

  let user = await getUser(session.user.id, prisma, context)
  user = JSON.parse(JSON.stringify(user))

  return {
    props: {
      jobs,
      user
    },
  }
}