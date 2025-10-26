'use client';

import { installFetchMonitor } from "@/app/fetch-monitor";
import { useState, useEffect } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
const intents = [
    {
        label: "error",
        examples: [
            "error muncul", "bug di halaman", "tidak bisa klik", "gagal load",
            "halaman eror", "kenapa halaman gagal", "tugas eror"
        ]
    },
    {
        label: "page",
        examples: [
            "halaman dashboard", "form login", "tombol submit",
            "komponen sidebar", "masuk dashboard"
        ]
    },
    {
        label: "navigation",
        examples: [
            "buka halaman", "ke dashboard", "ke materi", "pindah page",
            "pergi ke", "masuk ke menu", "arahkan ke"
        ]
    },
    {
        label: "general",
        examples: ["cara pakai fitur", "bisa bantu?", "mohon penjelasan"]
    }
];
const tokenize = (text: string) =>
    text.toLowerCase().replace(/[^\w\s]/gi, "").split(/\s+/);

const cosineSim = (vecA: Record<string, number>, vecB: Record<string, number>) => {
    let dot = 0, magA = 0, magB = 0;
    for (let key in vecA) {
        dot += (vecA[key] || 0) * (vecB[key] || 0);
        magA += (vecA[key] || 0) ** 2;
    }
    for (let key in vecB) {
        magB += (vecB[key] || 0) ** 2;
    }
    return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
};

type BotReply = {
    text: string;
    showReport: boolean;
    page?: string | null;
};


const vectorize = (tokens: string[]) => {
    const vec: Record<string, number> = {};
    tokens.forEach(t => {
        let weight = 1;
        if (["error", "eror", "bug", "gagal"].includes(t)) weight = 3; // bobot lebih tinggi
        vec[t] = (vec[t] || 0) + weight;
    });
    return vec;
};

const detectIntentSmart = (text: string) => {
    const textVec = vectorize(tokenize(text));
    let bestScore = 0;
    let bestIntent = "unknown";

    intents.forEach(i => {
        i.examples.forEach(ex => {
            const score = cosineSim(textVec, vectorize(tokenize(ex)));
            if (score > bestScore) {
                bestScore = score;
                bestIntent = i.label;
            }
        });
    });
    return bestIntent;
};

export default function ChatAI() {
    const [open, setOpen] = useState(false);
    const [chatMode, setChatMode] = useState(false);
    const [message, setMessage] = useState("");
    const [typing, setTyping] = useState(false);
    const [lastError, setLastError] = useState<any>(null);

    const [chat, setChat] = useState([{ from: "ai", text: "Apa ada yang bisa aku bantu?" }]);
    const [pageList, setPageList] = useState<string[]>([]);
    const router = useRouter();
    useEffect(() => {
        fetch("/api/pages")
            .then(r => r.json())
            .then(d => setPageList(d.pages || []))
            .catch(err => {
                console.error("Gagal fetch pages:", err);
                saveError({ type: "api", message: String(err) });
            });
    }, []);

    const saveError = (err: any) => {
        setLastError(err);
        if (!err) return;
        localStorage.setItem("lastError", JSON.stringify(err));
    };

    const sendErrorReport = async () => {
        if (!lastError) return;
        try {
            await fetch("/api/report-error", {
                method: "POST",
                body: JSON.stringify({
                    error: lastError,
                    page: window.location.pathname,
                    userAgent: navigator.userAgent,
                    time: new Date().toISOString(),
                }),
                headers: { "Content-Type": "application/json" }
            });
            setChat(prev => [...prev, { from: "ai", text: "✅ Bug telah dilaporkan ke developer!" }]);
        } catch (e) {
            setChat(prev => [...prev, { from: "ai", text: "⚠️ Gagal mengirim laporan bug!" }]);
        }
    };

    useEffect(() => {
        const cached: any = localStorage.getItem("lastError");
        if (cached && cached !== "null") setLastError(JSON.parse(cached));

        installFetchMonitor(saveError);

        const offline = () => saveError({ type: "network", message: "Koneksi internet terputus!" });
        const runtimeError = (e: any) => saveError({ type: "runtime", message: e?.message });

        window.addEventListener("offline", offline);
        window.addEventListener("error", runtimeError);

        return () => {
            window.removeEventListener("offline", offline);
            window.removeEventListener("error", runtimeError);
        };
    }, []);

    const getErrorResponse = () => {
        if (!lastError) return { text: "✅ Sistem berjalan normal! Tidak ada error terdeteksi.", showReport: false };

        const reportButtonNote = "\n\n🐞 Jika error terus muncul, klik tombol untuk melaporkan bug ke developer 👇";

        let message = "";
        let showReport = true;

        switch (lastError.type) {
            case "offline": message = "📡 Kamu sedang Offline!\n➡️ Periksa koneksi internet."; break;
            case "runtime": message = `⚠️ Error script: ${lastError.message}`; break;
            case "promise": message = `⏳ Async gagal: ${lastError.message}`; break;
            case "network": message = `🌐 Gagal fetch data: ${lastError.message}`; break;
            case "api": message = `❌ API error: ${lastError.status} - ${lastError.message}`; break;
            default: message = `🔍 Error tidak diketahui: ${lastError?.message || "Tidak ada info"}`;
        }

        return { text: `${message}${reportButtonNote}`, showReport };
    };

    const sendMessage = () => {
        if (!message) return;
        const userText = message;
        setChat(prev => [...prev, { from: "user", text: userText }]);
        setMessage("");
        setTyping(true);

        setTimeout(() => {
            let botReply: BotReply = { text: "Baik, saya siap membantu ", showReport: false };
            const intent = detectIntentSmart(userText);

            switch (intent) {
                case "navigation":
                    const target = pageList.find(p =>
                        userText.toLowerCase().includes(
                            p.split("/").filter(Boolean).pop()?.toLowerCase() || ""
                        )
                    );

                    if (target) {
                        botReply = {
                            text: `🔗 Mengarahkan ke halaman: ${target}`,
                            showReport: false,
                            page: target
                        };
                    } else {
                        botReply = {
                            text: `📌 List halaman:\n${pageList.join("\n")}`,
                            showReport: false
                        };
                    }
                    break;

                case "error":
                    botReply = getErrorResponse();
                    break;
                case "page":
                    const match = pageList.filter(p => {
                        const clean = p.replace("/page.tsx", "").replace(/\//g, "");
                        return userText.toLowerCase().includes(clean.toLowerCase());
                    });

                    if (match.length > 0) {
                        botReply = {
                            text: `📄 Mau pindah ke halaman: ${match[0]} ?`,
                            showReport: false,
                            page: match[0]  // ⬅️ penting!
                        };
                    } else {
                        botReply = {
                            text: `📌 Halaman tersedia:\n${pageList.join("\n")}`,
                            showReport: false
                        };
                    }
                    break;

                case "general":
                    botReply = { text: "🤖 Pertanyaanmu dicatat. Aku akan bantu sebisa mungkin.", showReport: false };
                    break;
                default:
                    botReply = { text: "🤔 Maaf, aku belum mengerti. Bisa dijelaskan lebih rinci?", showReport: false };
            }

            setChat(prev => [...prev, {
                from: "ai",
                text: botReply.text,
                showReport: botReply.showReport,
                page: (botReply as any).page || null
            }]);
            setTyping(false);
        }, 700);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <div className={`${open ? "opacity-100" : "opacity-0 pointer-events-none"} transition-all`}>
                {open && (
                    <div className="w-80 h-[480px] bg-white shadow-2xl border rounded-xl flex flex-col">
                        <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                            <span className="font-semibold text-sm">Chat AI Assistant</span>
                            <button onClick={() => setOpen(false)}><FiX size={18} /></button>
                        </div>

                        {!chatMode ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 gap-3">
                                <p className="font-semibold text-gray-800 text-lg">Selamat datang 👋</p>
                                <p className="text-gray-600 text-xs">Saya bisa membantu mendeteksi error pada aplikasi ini.</p>
                                <button onClick={() => setChatMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md">Mulai Chat</button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-3">
                                    {chat.map((c: any, i) => (
                                        <div key={i} className={`flex gap-2 ${c.from === "ai" ? "justify-start" : "justify-end"}`}>
                                            {c.from === "ai" && (
                                                <div className="w-6 h-6 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full">AI</div>
                                            )}

                                            <div className={`px-3 py-2 rounded-2xl text-sm ${c.from === "ai" ? "bg-white border text-gray-800" : "bg-blue-600 text-white"}`}>
                                                {c.text}
                                                {c.showReport && (
                                                    <button onClick={sendErrorReport} className="block w-full bg-red-600 text-white font-semibold mt-2 p-2 rounded-md text-xs hover:bg-red-700">
                                                        Laporkan Bug
                                                    </button>
                                                )}
                                                {c.page && (
                                                    <button
                                                        onClick={() => router.push(c.page)}
                                                        className="block w-full bg-green-600 text-white font-semibold mt-2 p-2 rounded-md text-xs hover:bg-green-700"
                                                    >
                                                        🚀 Pergi ke halaman
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-3 border-t bg-white flex gap-2">
                                    <input
                                        placeholder="Ketik pesan..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                        className="flex-1 rounded-full border px-3 py-2 text-sm outline-none"
                                    />
                                    <button onClick={sendMessage} className="bg-blue-600 text-white rounded-full p-2">
                                        <FiSend size={16} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <button onClick={() => { setOpen(!open); if (!open) setChatMode(false); }} className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center">
                <FiMessageSquare size={28} />
            </button>
        </div>
    );
}
