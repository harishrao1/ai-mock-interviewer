import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LOGIN } from "../constants/strings";

function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { user, loading, error, signInWithGoogle, signInWithMock } =
    useAuthStore();

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Left panel — hero (desktop only) */}
      <div className="hidden lg:flex flex-col justify-center px-14 xl:px-20 w-[46%] relative overflow-hidden border-r border-gray-800/50">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 left-4 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 animate-slide-in-left">
          <h1 className="text-6xl font-bold tracking-tight mb-5">
            Mock<span className="text-indigo-400">AI</span>
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            {LOGIN.heroSubtitle.map((line, index) => (
              <span key={index}>
                {line}
                {index < LOGIN.heroSubtitle.length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="mt-10 space-y-3">
            {LOGIN.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/60">
            <p className="text-xs text-gray-600">
              {LOGIN.sideNote}
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — sign in */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-slide-in-right">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <h1 className="text-4xl font-bold">
              Mock<span className="text-indigo-400">AI</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              {LOGIN.mobileSubtitle}
            </p>
          </div>

          <div className="hidden lg:block mb-8">
            <h2 className="text-2xl font-semibold">{LOGIN.welcomeTitle}</h2>
            <p className="text-gray-500 text-sm mt-1">
              {LOGIN.welcomeSubtitle}
            </p>
          </div>

          {/* Google sign-in */}
          <div className="space-y-3">
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 active:scale-[0.99] text-gray-900 font-medium py-3 px-4 rounded-xl transition-all shadow-sm"
            >
              <GoogleLogo />
              {LOGIN.buttons.google}
            </button>

            <button
              onClick={signInWithMock}
              className="w-full flex items-center justify-center gap-3 bg-gray-900 border border-gray-850 hover:bg-gray-800 hover:text-white active:scale-[0.99] text-gray-300 font-medium py-3 px-4 rounded-xl transition-all shadow-sm"
            >
              {LOGIN.buttons.mockAccount}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
          )}

          <div className="mt-8 space-y-2">
            {LOGIN.authNotes.map((note, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="mt-0.5 shrink-0 text-indigo-500/60">→</span>
                {note}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
