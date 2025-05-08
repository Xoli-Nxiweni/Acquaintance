// "use client"

// import { createContext, useContext, useEffect, useState } from "react"

// const ThemeContext = createContext({
//   theme: "light",
//   toggleTheme: () => {},
// })

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light")

//   useEffect(() => {
//     // Check for system preference on initial load
//     const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
//     const savedTheme = localStorage.getItem("theme")

//     if (savedTheme) {
//       setTheme(savedTheme)
//     } else {
//       setTheme(prefersDark ? "dark" : "light")
//     }

//     // Add listener for changes in system preference
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
//     const handleChange = (e) => {
//       if (!localStorage.getItem("theme")) {
//         setTheme(e.matches ? "dark" : "light")
//       }
//     }

//     mediaQuery.addEventListener("change", handleChange)

//     return () => mediaQuery.removeEventListener("change", handleChange)
//   }, [])

//   useEffect(() => {
//     // Apply theme to document
//     document.documentElement.setAttribute("data-theme", theme)
//     localStorage.setItem("theme", theme)

//     if (theme === "dark") {
//       document.documentElement.classList.add("dark")
//     } else {
//       document.documentElement.classList.remove("dark")
//     }
//   }, [theme])

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light")
//   }

//   return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
// }

// export const useTheme = () => useContext(ThemeContext)
