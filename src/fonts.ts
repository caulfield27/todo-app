import localFont from "next/font/local"

export const PoppinsText = localFont({
    src: [
        {
            path: "../public/fonts/Poppins-Bold.woff2", weight: '600', style: "normal"
        },
        {
            path: "../public/fonts/Poppins-Italic.woff2", weight: '400', style: "normal"
        },
        {
            path: "../public/fonts/Poppins-Regular.woff2", weight: '400', style: "normal"
        }
    ],
    variable: "--poppins-font",
    display: "swap"
})