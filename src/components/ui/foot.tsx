"use client"

export default function Footer() {
  return (
    <footer className="text-center py-4">
        <div className="border-t border-gray-300 dark:border-gray-700 my-8 w-[80%] mx-auto"></div>
        <p className="text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} 
            {' '}Jacky Feng. All rights reserved.
        </p>
        <p className="text-gray-600 dark:text-gray-400">Keep hungry, keep foolish..</p>
    </footer>
  )
}
