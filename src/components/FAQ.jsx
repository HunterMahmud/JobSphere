import Link from "next/link";


const FAQ = () => {
  return (
    <div data-aos="fade-right" data-aos-duration="2000" className="mx-1 md:mx-4 my-6 md:my-10">
      <section className="dark:bg-[#ffebcc1d] border border-orange-300 rounded-lg dark:text-gray-800">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
          <h2 className="text-2xl font-semibold sm:text-4xl text-center">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 mb-8 dark:text-gray-600 text-center md:w-[60%] mx-auto">
            Here we providing some (FAQ) Frequently Asked Questions with
            answers. Check it now, these can help you to know your basic
            Questions.
          </p>
          <div className="space-y-4">
            {/* 1st */}
            <details
              className="w-full border border-orange-200 rounded-lg"
              open=""
            >
              <summary className="px-4 text-lg font-semibold py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                <span className="font-bold">1.</span> How do we create a profile on JobSphere to apply for jobs?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 lg:text-lg -mt-4 dark:text-gray-600">
                <span className="font-semibold">Answer:</span> This can guide job seekers on the registration process and setting up their profile, ensuring they can start applying for jobs easily.{" "}
              </p>
              <div className="-mt-6 ml-6 p-2">
                <Link to="jobs">
                  <button className="btn btn-sm md:btn-wide btn-accent mt-2">
                    <span className="lg:text-xl">Click to See Jobs</span>
                  </button>
                </Link>
              </div>
            </details>
            {/* 2nd */}
            <details
              className="w-full border border-orange-200 rounded-lg"
              open=""
            >
              <summary className="px-4 text-lg font-semibold py-6 focus:outline-none focus-visible:dark:ring-violet-600">
                <span className="font-bold">2.</span> What types of companies post jobs on JobSphere?
              </summary>
              <p className="px-4 py-6 pt-0 ml-4 lg:text-lg -mt-4 dark:text-gray-600">
                <span className="font-semibold">Answer:</span> This gives job seekers insights into the kinds of employers they might find on the platform (startups, enterprises, tech companies, etc.).{" "}
              </p>
              <div className="-mt-6 ml-6 p-2">
                <Link to="/companies">
                  <button className="btn btn-sm md:btn-wide btn-warning mt-2">
                    <span className="lg:text-xl">Click to See Companies</span>
                  </button>
                </Link>
              </div>
            </details>
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
