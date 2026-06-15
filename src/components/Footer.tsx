import { FOOTER, BRAND } from "../constants/strings";

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-3">{FOOTER.about.title}</h3>
            <p className="text-gray-500 leading-relaxed text-xs">
              {FOOTER.about.description}
            </p>
          </div>

          {/* Built With */}
          <div>
            <h3 className="text-white font-semibold mb-3">{FOOTER.builtWith.title}</h3>
            <ul className="space-y-1 text-gray-500 text-xs">
              {FOOTER.builtWith.technologies.map((tech: { label: string; url: string }) => (
                <li key={tech.label}>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {tech.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">{FOOTER.links.title}</h3>
            <ul className="space-y-1 text-gray-500 text-xs">
              {FOOTER.links.items.map((item: { label: string; url: string }) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          {/* Credits */}
          <div className="mb-4">
            <p className="text-gray-600 text-xs leading-relaxed">
              {FOOTER.credits.builtBy}{" "}
              <span className="text-red-400">❤️</span> {FOOTER.credits.by}{" "}
              <a
                href="https://github.com/harishrao1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Harish Rao
              </a>
              . {FOOTER.credits.poweredBy}{" "}
              <a
                href="https://openai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                OpenAI
              </a>
              {" "}
              {FOOTER.credits.and}{" "}
              <a
                href="https://firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Firebase
              </a>
              . {FOOTER.credits.specialThanks}
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-gray-600 text-xs gap-3">
            <p>
              &copy; {FOOTER.copyright.year} {BRAND.name}. All rights reserved.{" "}
              {FOOTER.copyright.separator} {FOOTER.copyright.license}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/harishrao1/ai-mock-interviewer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
