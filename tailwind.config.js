module.exports = {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            'primary': '#47aaa9',
            'secondary': '#333333',
            'background': '#fafafa',

            // 'primary': '#A5D6A7',
            // 'secondary': '#81C784',
            // 'background': '#f9fafb',

            'white': '#FFFFFF',
            'black': '#000000',

            // 'gray-50': '#f9fafb',
            // 'gray-100': '#f3f4f6',
            'gray-200': '#e5e7eb',
            'gray-300': '#d1d5db',
            'gray-400': '#9ca3af',
            'gray-500': '#6b7280',
            'gray-600': '#4b5563',
            'gray-700': '#374151',
            'gray-900': '#212121',

            'green-200': '#A5D6A7', // primary
            'green-300': '#81C784', // secondary
            'green-400': '#66BB6A', // view page edit button
            // 'green-500': '#4CAF50',
            'green-800': '#2E7D32',

            'red-700': '#D32F2F',
            'red-800': '#C62828',
        }
    },
    plugins: [],
}
