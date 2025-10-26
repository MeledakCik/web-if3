'use client';

import { useEffect, useState } from "react";
import {
    FiFolder,
    FiFileText,
    FiFile,
    FiImage,
    FiCode,
    FiArrowLeft,
    FiDownload,
    FiCopy,
} from "react-icons/fi";
import {
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaHtml5,
    FaPython,
} from "react-icons/fa";

interface FileItem {
    name: string;
    url: string;
}

export default function Project() {
    const [gurus, setGurus] = useState<string[]>([]);
    const [selectedGuru, setSelectedGuru] = useState<string | null>(null);
    const [files, setFiles] = useState<FileItem[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
    const [fileContent, setFileContent] = useState<string>("");

    // Ambil daftar guru
    useEffect(() => {
        fetch("/api/materi")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setGurus(data.gurus);
            });
    }, []);

    // Buka folder guru
    const openFolder = (guru: string) => {
        setSelectedGuru(guru);
        setSelectedFile(null);
        fetch(`/api/materi/${guru}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setFiles(data.files);
            });
    };

    // Buka file (tanpa auto-download)
    const openFile = async (file: FileItem) => {
        setSelectedFile(file);
        const ext = file.name.split(".").pop()?.toLowerCase();

        if (["py", "pas", "txt", "html", "js", "css", "json"].includes(ext || "")) {
            const res = await fetch(file.url);
            const text = await res.text();
            setFileContent(text);
        } else {
            setFileContent("");
        }
    };

    // Tombol copy isi file
    const copyToClipboard = () => {
        if (fileContent) {
            navigator.clipboard.writeText(fileContent);
            alert("✅ Kode berhasil disalin ke clipboard!");
        }
    };

    // Tombol download file
    const downloadFile = () => {
        if (selectedFile) {
            const link = document.createElement("a");
            link.href = selectedFile.url;
            link.download = selectedFile.name;
            link.click();
        }
    };

    // Ikon file
    const getFileIcon = (filename: string) => {
        const ext = filename.split(".").pop()?.toLowerCase();
        switch (ext) {
            case "py":
                return <FaPython className="text-yellow-500 w-10 h-10 mx-auto" />;
            case "pdf":
                return <FaFilePdf className="text-red-500 w-10 h-10 mx-auto" />;
            case "jpg":
            case "jpeg":
            case "png":
                return <FiImage className="text-green-500 w-10 h-10 mx-auto" />;
            case "doc":
            case "docx":
                return <FaFileWord className="text-blue-500 w-10 h-10 mx-auto" />;
            case "xls":
            case "xlsx":
                return <FaFileExcel className="text-green-600 w-10 h-10 mx-auto" />;
            case "html":
                return <FaHtml5 className="text-orange-500 w-10 h-10 mx-auto" />;
            case "pas":
                return <FiCode className="text-orange-400 w-10 h-10 mx-auto" />;
            case "txt":
                return <FiFileText className="text-gray-600 w-10 h-10 mx-auto" />;
            default:
                return <FiFile className="text-gray-400 w-10 h-10 mx-auto" />;
        }
    };

    const formatName = (name: string) => name.replace(/_/g, " ");

    return (
        <div className="h-full overflow-hidden p-6">
            <div className="p-4 flex-shrink-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                    📘 Materi Guru
                </h2>
                <h2 className="text-lg md:text-xl font-bold mb-4 text-left">
                    Semester 1
                </h2>
            </div>

            <div className="flex-1 flex justify-center items-center overflow-hidden p-4">
                {/* Tampilan utama */}
                {!selectedGuru ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 md:gap-6 justify-items-center w-full max-w-7xl">
                        {gurus.map((guru, idx) => (
                            <div
                                key={idx}
                                onClick={() => openFolder(guru)}
                                className="cursor-pointer w-full sm:w-[140px] h-[140px] rounded-2xl bg-white border border-gray-300 hover:border-blue-400 hover:shadow-lg p-4 text-center transition-all flex flex-col items-center justify-center"
                            >
                                <FiFolder className="w-12 h-12 text-blue-400 mb-2" />
                                <span className="text-sm md:text-base font-medium text-gray-700 truncate w-full">
                                    {formatName(guru)}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : selectedFile ? (
                    <div className="w-full max-w-5xl h-[80vh] flex flex-col bg-white shadow-md rounded-xl p-6">
                        <button
                            onClick={() => setSelectedFile(null)}
                            className="text-blue-500 mb-4 underline hover:text-blue-400 flex items-center gap-1 text-sm md:text-base"
                        >
                            <FiArrowLeft /> Kembali ke daftar file
                        </button>

                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 break-words">
                                {selectedFile.name}
                            </h3>
                            <div className="flex gap-3">
                                {fileContent && (
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm transition-all"
                                    >
                                        <FiCopy /> Salin
                                    </button>
                                )}
                                <button
                                    onClick={downloadFile}
                                    className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-all"
                                >
                                    <FiDownload /> Download
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 border rounded-lg bg-gray-50 overflow-y-auto whitespace-pre-wrap p-4">
                            {fileContent ? (
                                <pre className="text-sm text-gray-800 font-mono">
                                    {fileContent}
                                </pre>
                            ) : (
                                <iframe
                                    src={selectedFile.url}
                                    className="w-full h-full rounded-lg border"
                                    title={selectedFile.name}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-6xl">
                        <button
                            onClick={() => setSelectedGuru(null)}
                            className="text-blue-500 mb-6 underline hover:text-blue-400 transition-all text-sm md:text-base"
                        >
                            ← Kembali ke daftar guru
                        </button>

                        <h3 className="text-lg md:text-xl font-semibold mb-6 text-center text-gray-800">
                            Materi dari {formatName(selectedGuru)}
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6">
                            {files.map((file, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => openFile(file)}
                                    className="cursor-pointer bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md p-4 md:p-5 rounded-2xl text-center transition-all flex flex-col items-center justify-center w-full sm:w-[140px] h-[140px]"
                                >
                                    {getFileIcon(file.name)}
                                    <div className="mt-2 text-xs md:text-sm text-gray-700 truncate w-full">
                                        {file.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
