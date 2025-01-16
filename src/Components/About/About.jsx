import { motion } from 'framer-motion';
const About = () => {
  return (
    <section className="py-24  relative">
      <div className="wrap px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <motion.div
              className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex"
              animate={{ y: [0, -10, 0] }} // Moves up (-10px) then back to 0
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} // Loops infinitely
            >
              <img
                className=" rounded-xl min-h-[320px] object-cover"
                src="https://lh3.googleusercontent.com/G5vPYl0kHJYhdPbL6lKrrIjSxcZu3mHTjIpPTWZTag-zp2cturMQhC4ZWoBZvx9HC49-_x9C7m9WR_kD4cKUuvxmSM2I_64fSahx_3TapokimRDQK6xksRv4HXBGSVUPsHZR_JBjcajb5X1Sb5gYuGo"
                alt="about Us image"
              />
            </motion.div>

            <motion.img
      className="sm:ml-0 ml-auto max-h-[320px] w-full rounded-xl object-cover"
      src="https://images.stockcake.com/public/2/6/3/2639ff95-26e2-4275-8a40-5671823a7d81_large/sunlit-glass-facade-stockcake.jpg"
      alt="about Us image"
      animate={{ y: [0, 10, 0] }} // Moves down (+10px) then back to 0
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} // Loops infinitely
    />
          </div>
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <h2 className="text-textT text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  About the Building
                </h2>
                <p className="text-textT/80 text-base font-normal leading-relaxed lg:text-start text-center">
                  The building is an architectural masterpiece designed to bring
                  modern functionality while maintaining timeless elegance. With
                  state-of-the-art facilities and eco-friendly features, it
                  stands as a beacon of innovation in urban development. The
                  blend of glass, steel, and natural elements makes it a
                  visually captivating structure that seamlessly integrates with
                  its surroundings.
                </p>
              </div>

              <div className="space-y-4 text-lg  ">
                <h3 className="text-2xl font-semibold text-textT">
                  Key Features:
                </h3>
                <ul className="list-inside list-disc text-textT/80">
                  <li>Stunning glass facade</li>
                  <li>Eco-friendly energy systems</li>
                  <li>Modern amenities and workspaces</li>
                  <li>Spacious floor plans</li>
                  <li>Advanced security features</li>
                </ul>
              </div>
              {/* <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                  <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    33+
                  </h3>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Years of Experience
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    125+
                  </h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Successful Projects
                  </h6>
                </div>
                <div className="flex-col justify-start items-start inline-flex">
                  <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">
                    52+
                  </h4>
                  <h6 className="text-gray-500 text-base font-normal leading-relaxed">
                    Happy Clients
                  </h6>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
