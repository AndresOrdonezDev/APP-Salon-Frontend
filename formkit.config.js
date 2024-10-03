import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      global: {
        wrapper: "space-y-1 mb-2",
        message: "bg-red-500 text-white text-center text-xs lg:text-sm uppercase p-1 my-3 rounded-lg",
        label: 'block mb-1 font-bold text-white',
        input: 'w-full p-1 lg:p-2 rounded-lg border-gray-300 text-gray-700'
      },
      submit: {
        input:'$reset bg-blue-600 hover:bg-blue-700 transition text-white w-full p-1 lg:p-2 rounded-lg mt-5'
      },
    }),
  },
};

export default config;
