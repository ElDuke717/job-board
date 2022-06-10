import Link from 'next/link';

const Job = ({ job }) => {
    return (
        <div className='mx-10 mb-4 mt-20 pl-16 pr-16'>
            <Link href={`/job/${job.id}`}>
                <a className='text-xl font-bold underline'>{job.title}</a>
            </Link>
            <h2 className='text-base font-normal mt-3'>{job.description}</h2>
            <div className='mt-4'>
                <h4 className='inline'>Posted by</h4>
                <div className='ml-3 -mt-6 inline'>
                    <span>
                        {/* Link has the advantage of loading client-side code faster */}
                        <Link href={`/job/${job.id}`}>
                            <a className='text-xl font-bold underline'>{job.author.name}</a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Job