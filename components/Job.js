import Link from 'next/link';

const Job = ({ job }) => {
    return (
        <div className='mx-10 mb-4 mt-20 pl-16 pr-16'>
            <p className='text-xl font-bold underline'>{job.title}</p>
            <h2 className='text-base font-normal mt-3'>{job.description}</h2>
            <div className='mt-4'>
                <h4 className='inline'>Posted by</h4>
                <div className='ml-3 -mt-6 inline'>
                    <span>
                        <Link href={`/job/${job.id}`}>
                            <a className='text-xl font-bold underline'>{job.title}</a>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Job