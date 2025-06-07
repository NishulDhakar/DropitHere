import { GithubIcon } from "../icons/GithubIcon";
import { TwitterIcon } from "../icons/twitter";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-center px-6 py-4">
        <div className="flex gap-6 items-center">
          <a
            href="https://github.com/nishuldhakar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <GithubIcon />
          </a>
          
          <a
            href="https://twitter.com/nishuldhakar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}