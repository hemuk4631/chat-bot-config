/* eslint-disable */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      fontSize: {
        xxs: '10px',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      extend: {
        colors: {
          superAdmin: {
            c1: '#4D0F28',
            c2: '#7A163E',
          },
          admin: {
            c1: '#710193',
            c2: '#BE36E7',
          },
          cwhManager: {
            c1: '#A32CC4',
            c2: '#CF5EEE',
          },
          hubManager: {
            c1: '#9E7BB5',
            c2: '#BC93D6',
          },
          ccSupervisor: {
            c1: '#A1045A',
            c2: '#DA0E7E',
          },
          callingAgent: {
            c1: '#9867C5',
            c2: '#B87CEF',
          },
          gray: {
            0: '#808080',
            100: '#f7fafc',
            200: '#edf2f7',
            300: '#e2e8f0',
            400: '#cbd5e0',
            500: '#a0aec0',
            600: '#718096',
            700: '#4a5568',
            800: '#2d3748',
            900: '#1a202c',
            g1: '#F8F8F8',
            g2: '#5E6366',
            g3: '#D6D6D6',
            g4: '#999999',
            g5: '#9E9E9E',
            1000: '#666666',
            100000: '#F9F9F9',
            g6: '#E9ECF4',
            g7: '#F4F4F4',
            g8: '#E0E0E0',
            g9: '#F5F5F5',
            g10: '#3D3D3D',
          },
          blue: {
            100: '#ebf8ff',
            200: '#bee3f8',
            300: '#94AAD8',
            400: '#83BAF9',
            500: '#83BAF9',
            600: '#4F97F5',
            700: '#408DF7',
            800: '#224091',
            c1: '#42A5F5',
            c2: '#0A4492',
          },
          white: {
            0: '#FFFFFF',
            100: '#F8F8F8',
            200: '#EEEEEE',
          },
          red: {
            100: '#E21616',
          },
          green: {
            0: '#58BF68',
            100: '#7E833C',
          },
          yellow: {
            0: '#FF9933',
            10: '#FDB137',
            100: 'rgba(255, 153, 51, 0.1)',
            1000: 'rgba(226, 22, 22, 0.1)',
          },
          'box-shadow-gray': '0px 1px 20px rgba(0, 0, 0, 0.15)',
          shadow: {
            0: '0px 0px 14px rgba(0, 0, 0, 0.25)',
            10: '0px 0px 12px rgba(0, 0, 0, 0.09)',
            100: '0px 1px 20px rgba(0, 0, 0, 0.15)',
          },
        },
        height: {
          100: '38vh',
          1000: '100vh',
        },
        width: {
          428: '428px',
        },
        borderRadius: {
          half: '50px',
          '3xl': '0px 0px 10px rgba(0, 0, 0, 0.15)',
        },
        zIndex: {
          100: 100,
          10000: 10000,
        },
      },
      screens: {
        laptop: '1366px',
        'small-laptop': '1280px',
      },
    },
    boxShadow: {
      custom: '0px 0px 8px 0px rgba(0, 0, 0, 0.15)',
    },
  };
  