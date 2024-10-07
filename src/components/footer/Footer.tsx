import { PhoneIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/images/logo/mainlogo.png";

export default function Footer() {
  return (
    <>
      <footer className="px-[30px] md:px-[130px] bg-white">
        <div className="container mx-auto border-t border-gray-300 pt-10 md:pt-[100px] lg:mb-10">
          <div className="hidden sm:block">
            <img src={logo} alt="Logo" className="mb-4 h-[48px] w-[134px]" />{" "}
          </div>
        </div>
        {/* First Row */}

        <div className="container mx-auto border-b-2 border-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
            {/* First Column */}
            <div className="flex flex-col items-start justify-end order-3 md:order-1">
              <h3 className="font-semibold text-[14px] mb-4 leading-[15px] tracking-[0.75px]">
                CONNECTED WITH US
              </h3>
              <div className="flex space-x-4">
                <a className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="#00000"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="#00000"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="#00000"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="#00000"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Second Column */}
            <div className="flex flex-col items-start justify-end md:border-r border-gray-300 md:pr-6 lg:pr-10 order-2">
              <h3 className="font-semibold text-[14px] mb-4 leading-[15px] tracking-[0.75px] uppercase">
                Important Links
              </h3>
              <ul className="flex flex-col gap-2 md:flex-row md:gap-4">
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 hover:underline font-normal text-[13px] leading-[26px]"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 hover:underline font-normal text-[13px] leading-[26px]"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/help"
                    className="text-gray-600 hover:underline font-normal text-[13px] leading-[26px]"
                  >
                    Help & FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Third Column */}
            <div className="flex flex-col items-start lg:px-10 justify-end order-1 md:order-3">
              <div className="flex items-center justify-center w-8 h-8 mb-3 rounded-full bg-[#1AA5C3] hover:bg-gray-300 transition-colors duration-200">
                <PhoneIcon className="size-5 fill-white" />
              </div>
              <h3 className="font-normal text-[15px] mb-2 leading-[20px]">
                Helpline
              </h3>
              <p className="font-semibold text-[16px] md:text-[26px] leading-[20px] tracking-[0.35px]">
                1800 456 84788
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="py-4 lg:py-8 items-center justify-end">
          <div className="flex justify-center items-center">
            <p className="font-normal text-[13px] leading-[13px] text-gray-500 text-center">
              Arab Deals © 2023. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
