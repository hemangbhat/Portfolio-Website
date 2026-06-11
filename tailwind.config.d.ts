declare const _default: {
    darkMode: "class";
    content: string[];
    theme: {
        extend: {
            colors: {
                bg: string;
                surface: string;
                'surface-2': string;
                fg: string;
                muted: string;
                accent: string;
                border: string;
            };
            fontFamily: {
                sans: [string, string, string, string];
                serif: [string, string, string, string];
            };
            fontSize: {
                display: [string, {
                    lineHeight: string;
                    letterSpacing: string;
                }];
            };
            borderRadius: {
                '2xl': string;
                '3xl': string;
            };
            boxShadow: {
                soft: string;
                lift: string;
                glow: string;
            };
            maxWidth: {
                content: string;
            };
            keyframes: {
                'fade-in': {
                    from: {
                        opacity: string;
                    };
                    to: {
                        opacity: string;
                    };
                };
            };
            animation: {
                'fade-in': string;
            };
        };
    };
    plugins: never[];
};
export default _default;
