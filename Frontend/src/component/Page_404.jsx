
import { Link, useNavigate } from 'react-router-dom';
import image1 from './../assets/404.avif'
import image2 from './../assets/404.avif'


const Page_404 = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-white dark:bg-gray-900 flex text-center justify-center h-screen">
            <div className="grid grid-cols-1  text-center justify-center sm:grid-cols-2">
                <div className="mt-20">
                    <div className="text-center justify-center flex">
                        <img src={image1} alt="logo" className='h-40 w-40 ' />
                    </div>
                    <div className="grid grid-cols-1">
                        <p className="p-3 text-xl text-center">
                            <span className="text-6xl font-extrabold">404.</span> Error Occurred
                        </p>
                        <h1 className="mt-3 text-4xl font-bold text-gray-800 dark:text-white md:text-3xl">Page not found</h1>
                        <p className="m-5 text-2xl text-gray-800 dark:text-gray-400">The page you are looking for does not exist. Here are some helpful links:</p>

                        <div className="flex items-center justify-center text-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" onClick={() => { navigate(-1) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>Go back</span>
                            </button>

                            <Link to='/'><button className="px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                Take me home
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div className=" hidden text-center justify-center m-20 sm:block">
                    <img src={image2} alt="crying child" />
                </div>
            </div>

        </section>
    )
}

export default Page_404