import { useEffect, useState } from "react";

type BIPEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const KEY = "map_install_banner_seen";

export function InstallBanner() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(KEY)) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BIPEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return dismiss();
    await deferred.prompt();
    await deferred.userChoice.catch(() => {});
    dismiss();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-md rounded-2xl border border-white/10 bg-[#0b1426]/95 p-4 text-white shadow-2xl backdrop-blur">
      <div className="flex items-start gap-3">
        <img src="/icon-192.png" alt="" width={40} height={40} className="h-10 w-10 rounded-lg" />
        <div className="flex-1">
          <p className="text-sm font-semibold">Install Maritime Academy Pro</p>
          <p className="mt-0.5 text-xs text-white/70">Add to your home screen for offline access.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={install} className="rounded-md bg-amber-400 px-3 py-1.5 text-xs font-semibold text-[#060e1a]">
              Install
            </button>
            <button onClick={dismiss} className="rounded-md border border-white/20 px-3 py-1.5 text-xs text-white/80">
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}