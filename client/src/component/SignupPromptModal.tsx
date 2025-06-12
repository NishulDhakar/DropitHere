

interface SignupPromptModalProps {
  open: boolean;
  onClose: () => void;
}

export function SignupPromptModal({ open, onClose }: SignupPromptModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xs w-full text-center border border-gray-200">
        <div className="mb-3 text-3xl">🔒</div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          Sign Up Required
        </h2>
        <p className="mb-6 text-gray-600 text-sm">
          Please sign up or sign in to add links or notes.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => {
              localStorage.removeItem("guest");
              window.location.href = "/signup";
            }}
          >
            Sign Up
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold border border-gray-200 hover:bg-gray-200 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
        <div className="mt-4 text-xs text-gray-400">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-500 underline hover:text-blue-700"
            onClick={() => {
              localStorage.removeItem("guest");
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}