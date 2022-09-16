const config = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Nunito', 'Helvetica Neue', 'Arial']
		},
		colors: {
			white: '#FFFFFF',
			blue: '#268FF0',
			gray: {
				100: '#F8F8F8',
				200: '#E5E5E5',
				400: '#888888',
				500: '#666666',
				600: '#333333'
			}
		},
		extend: {}
	},
	plugins: []
};

module.exports = config;
